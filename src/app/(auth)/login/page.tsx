"use client";

import Image from "next/image";
import logo from "../../../../assets/image/logo.png";
import loginwebp from "../../../../assets/image/loginwebp.webp";
import { z } from "zod";
import { UseLoginSchema } from "../../../../utils/schema/login/useLoginSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthLogin } from "../../../../utils/custom hooks/auth/useAuth";
import Spinner from "@/components/ui/spinner";
import { useCoorLogin } from "../../../../utils/custom hooks/auth/useCoordinatorAuth";

type FormValues = z.infer<typeof UseLoginSchema>;

function LoginPage() {
  const { mutate, isPending, isError, isLockedOut, lockoutTime } =
    useCoorLogin();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(UseLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <>
      <div className="min min-h-screen flex flex-row">
        <div className=" w-1/2 flex   justify-center">
          <div className=" my-auto w-96 space-y-4  ">
            <Image src={logo} alt="logo" width={90} className="my-10" />
            <h1 className="font-bold text-4xl">Sign In to your Account</h1>
            <Form {...form}>
              <form
                className="space-y-1 text-[#212A3E]"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-x-0 border-t-0 text-xs"
                          placeholder="Enter your Email Address Here"
                        />
                      </FormControl>
                      <FormMessage className=" text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-x-0 border-t-0 text-xs"
                          placeholder="Enter your Password Here"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <h1 className="text-xs text-[#74E291] text-right py-1">
                  <Link href={"/forgot-password"}>Forgot Password?</Link>
                </h1>

                {isLockedOut ? (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Too many attempts. Please wait {lockoutTime} seconds.
                  </p>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#74E291] text-[#272829]"
                    size={"sm"}
                    variant={"table"}
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Sign In"}
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </div>
        <div className="bg-[#263238] w-1/2 flex justify-center">
          <Image
            src={loginwebp}
            alt="loginwebp"
            width={500}
            className="m-auto"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
