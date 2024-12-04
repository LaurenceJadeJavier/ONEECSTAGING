"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import dummy from "../../../assets/image/dummy.png";
import DebouncedInput from "@/components/ui/debounceinput";
import { useState } from "react";
import logo from "../../../assets/image/whitelogo.png";
import { MdOutlineFolderShared } from "react-icons/md";
import Link from "next/link";
import { useLogout } from "../../../utils/custom hooks/auth/useLogout";
import { deleteCookie, getCookie } from "cookies-next";

import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { toast } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: useLogout,
    networkMode: "always",
  });

  async function handleLogout() {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
      toast.error("No token found. Please log in.");

      return;
    }
    try {
      const res = await mutateAsync(token);
      if (res.status === 200) {
        deleteCookie("token");
        router.push("/admin-login");
        toast.success("Logged out successfully.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  const handleNavigateSettings = () => {
    router.push("/account-settings");
  };

  return (
    <>
      <NextTopLoader easing="ease" showSpinner={false} color="#272829" />
      <div className="flex flex-row h-screen overflow-auto ">
        <div className="w-56 bg-[#263238] min-h-screen flex flex-row fixed h-full  ">
          <div className="w-full flex flex-col justify-between my-6 px-2 ">
            <div className="mx-auto">
              <Image src={logo} alt="logo" />
              <Link
                href={"/coop-accounts"}
                className="flex flex-row gap-3 items-center  text-white text-sm pt-10"
              >
                <MdOutlineFolderShared color="white" size={22} />
                <p>Coop Accounts</p>
              </Link>
            </div>
            <div>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="w-full bg-[#74E291] text-[#272829]"
                onClick={handleLogout}
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Logout"}
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-56 flex-1 flex flex-col overflow-auto">
          <div className="flex flex-row justify-between items-center px-10 my-8">
            <h1 className="text-xl font-bold">Coop Accounts</h1>
            <div className=" flex flex-row gap-4 justify-between border border-slate-400 rounded-full p-2 shadow-md">
              <div className="m-auto">
                <DebouncedInput
                  value={searchText ?? ""}
                  onChange={(value) => setSearchText(String(value))}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild className="rounded-full ">
                  <Button variant="outline" asChild>
                    <Image src={dummy} alt="dummy" width={55} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 mx-2">
                  <div>
                    <Button
                      className="w-full border bg-[#74E291]"
                      variant={"ghost"}
                      size={"sm"}
                      onClick={handleNavigateSettings}
                    >
                      Account Settings
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
