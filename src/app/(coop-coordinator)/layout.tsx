"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useRole } from "../../../utils/custom hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";

import logo from "../../../assets/image/whitelogo.png";
import dummy from "../../../assets/image/dummy.png";
import NextTopLoader from "nextjs-toploader";
import {
  ApprovalCMS,
  CustomerCMS,
  RoleCMSIcons,
  SOACMS,
  UserCMS,
} from "@/components/SideIcons";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useCoorLogout } from "../../../utils/custom hooks/auth/useCoordinatorAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface MenuItem {
  label: string;
  key: string;
  icon: ReactNode;
  isActive?: boolean;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: userData, isLoading } = useRole(); // Fetch user data
  // console.log("user data", userData);

  const [dynamicContent, setDynamicContent] = useState("");

  useEffect(() => {
    if (isLoading) return;
    const dynamicPathPatterns = {
      statementOfAccounts: /^\/statement-of-accounts\/(\d+)$/,
      roleDetails: /^\/role-details\/(\d+)$/,
    };
    let matched = false;
    for (const [key, pattern] of Object.entries(dynamicPathPatterns)) {
      const match = pathname.match(pattern);
      if (match) {
        const id = match[1];
        switch (key) {
          case "statementOfAccounts":
            setDynamicContent(`Statement of Accounts`);
            matched = true;
            break;
          case "roleDetails":
            setDynamicContent("Roles"); // Set content for role details with ID
            matched = true;
            break;
        }
        break;
      }
    }

    // Fallback for static pages
    if (!matched) {
      switch (pathname) {
        case "/role-management":
          setDynamicContent("Roles");
          break;
        case "/users":
          setDynamicContent("Users");
          break;
        case "/customer-management":
          setDynamicContent("Customer Management");
          break;
        case "/approval":
          setDynamicContent("Approval");
          break;
        case "/statement-of-accounts":
          setDynamicContent("Statement of Accounts");
          break;
        case "/coop-change-password":
          setDynamicContent("Profile Settings");
          break;
        default:
          setDynamicContent("Default Content");
          break;
      }
    }
  }, [pathname, isLoading]);

  const sidebarItems: { [key: string]: MenuItem } = {
    "/role": {
      label: "Role Management",
      key: "/role-management",
      icon: <RoleCMSIcons />,
    },
    "/users": {
      label: "Users",
      key: "/users",
      icon: <UserCMS />,
    },
    "/soa": {
      label: "Statement of Accounts",
      key: "/statement-of-accounts",
      icon: <SOACMS />,
    },
    "/customer-management": {
      label: "Customer Management",
      key: "/customer-management",
      icon: <CustomerCMS />,
    },
    "/approvals": {
      label: "Approval",
      key: "/approval",
      icon: <ApprovalCMS />,
    },
  };

  // const defaultSideBar = sidebarItems.map((item: any) => (
  //   <li key={item.key}>
  //     <Link
  //       href={item.key}
  //       className={`flex items-center gap-4 text-sm pt-4 ${
  //         item.isActive
  //           ? "text-white bg-[#37474F] fill-[#FFFFFF] border-l-4 border-[#74E291]"
  //           : "text-[#565F64] fill-[#565F64]"
  //       }`}
  //     >
  //       {item.icon}
  //       <span>{item.label}</span>
  //     </Link>
  //   </li>
  // ));

  const generateMenuItems = () => {
    if (isLoading) return [];

    const modules = userData?.data?.roles[0]?.modules || [];

    if (!modules.length) {
      // console.log("No modules found in API response.");
      return [];
    }

    return modules
      .map((module: string) => {
        const item = sidebarItems[module];
        // console.log("module", module);
        if (item) {
          // return { ...item, isActive: pathname === item.key };
          return item;
        }
        return null;
      })
      .filter(Boolean) as MenuItem[];
  };

  const filteredItems = generateMenuItems();
  // console.log("sidebar: ", filteredItems);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: useCoorLogout,
    networkMode: "always",
  });

  const handleLogout = async () => {
    const token = getCookie("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      router.push("/login");
      return;
    }
    try {
      const res = await mutateAsync(token);
      if (res.status === 200) {
        deleteCookie("token");
        router.push("/login");
        toast.success("Logged out successfully.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-row h-screen overflow-auto">
      <div className="w-60 bg-[#263238] min-h-screen flex flex-row fixed h-full">
        <div className="w-full flex flex-col justify-between my-6 px-2">
          <div className="mx-auto">
            <Image src={logo} alt="logo" className="p-3 ml-2" />
            <ul>
              {userData?.data.coordinatorRole === "COOPSUPERADMIN"
                ? Object.values(sidebarItems).map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.key}
                        className={`flex items-center gap-4 text-sm pt-4 ${
                          pathname === item.key
                            ? "text-white  fill-[#FFFFFF] border-l-4 border-[#74E291]"
                            : "text-[#565F64] fill-[#565F64]"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))
                : filteredItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.key}
                        className={`flex items-center gap-4 text-sm pt-4 ${
                          item.isActive
                            ? "text-white  fill-[#FFFFFF] border-l-4 border-[#74E291]"
                            : "text-[#565F64] fill-[#565F64]"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
            </ul>
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
          <div>
            <h1 className="px-4 py-2 text-2xl font-bold">{dynamicContent}</h1>
          </div>
          <div className="flex flex-row gap-4 justify-between border border-slate-400 rounded-full px-1 py-2 shadow-md">
            <div className="w-full m-auto">
              <h1 className="font-bold">Welcome, Jane Cruz</h1>
            </div>

            <Popover>
              <PopoverTrigger asChild className="rounded-full">
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
                    onClick={() => router.push("/coop-change-password")}
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
      <NextTopLoader easing="ease" showSpinner={false} color="#272829" />
    </div>
  );
}
