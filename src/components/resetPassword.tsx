"use client";
import { useRouter } from "next/navigation";
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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import logo from "../../assets/image/logo.png";
import resetwebp from "../../assets/image/resetwebp.png";
import Spinner from "@/components/ui/spinner";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SuspenseWrapper from "@/components/SuspenseWrapper";
import { UseResetPasswordSchema } from "../../utils/schema/reset-password/useResetPasswordSchema";
import useResetPassword from "../../utils/custom hooks/auth/useResetPassword";

type FormValues = z.infer<typeof UseResetPasswordSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate, isPending } = useResetPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(UseResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const onSubmit = (data: FormValues) => {
    // console.log("Token:", token);
    // console.log("Form Data:", data);
    if (token) {
      mutate({ token, newPassword: data.password });
    }
  };

  return (
    <>
      <SuspenseWrapper>
        <div className="min min-h-screen flex flex-row">
          <div className="border border-red-800 w-1/2 flex   justify-center">
            <div className=" my-auto w-96 space-y-4  ">
              <Image src={logo} alt="logo" width={90} className="my-10" />
              <h1 className="font-bold text-4xl">Reset your Password</h1>
              <Form {...form}>
                <form
                  className="space-y-1 text-[#212A3E]"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
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
                            placeholder="Enter your New Password Here"
                          />
                        </FormControl>
                        <FormMessage className=" text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full border-x-0 border-t-0 text-xs"
                            placeholder="Re-Enter your New Password Here"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#74E291] text-[#272829]"
                    size={"sm"}
                    variant={"default"}
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="bg-[#263238] w-1/2 flex justify-center">
            <Image
              src={resetwebp}
              alt="loginwebp"
              width={500}
              className="m-auto"
            />
          </div>
        </div>
      </SuspenseWrapper>
    </>
  );
};

export default ResetPassword;
