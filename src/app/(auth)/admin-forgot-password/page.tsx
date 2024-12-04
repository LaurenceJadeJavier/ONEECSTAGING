"use client";

import Image from "next/image";
import logo from "../../../../assets/image/logo.png";
import forgotpassword from "../../../../assets/image/forgotpasswordwebp.webp";
import { z } from "zod";
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
import { useForgotPasswordSchema } from "../../../../utils/schema/fogot-password/useForgotPasswordSchema";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import sucess from "../../../../assets/image/Frame.png";
import useAdminForgotPassword from "../../../../utils/custom hooks/auth/useAdminForgotPassword";
import Spinner from "@/components/ui/spinner";

type FormValues = z.infer<typeof useForgotPasswordSchema>;

function ForgotPassword() {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const { mutate, isPending, isSuccess } = useAdminForgotPassword();
  const form = useForm<FormValues>({
    resolver: zodResolver(useForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        setIsShow(true);
      },
    });
  };

  return (
    <>
      <div className="min min-h-screen flex flex-row">
        <div className=" w-1/2 flex   justify-center">
          <div className=" my-auto w-96 space-y-4  ">
            <Image src={logo} alt="logo" width={90} className="my-10" />
            <h1 className="font-bold text-4xl">Forgot Password</h1>
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
                <div className="my-3">
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#74E291] text-[#272829]"
                    size={"sm"}
                    variant={"default"}
                  >
                    {isPending ? <Spinner /> : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="bg-[#263238] w-1/2 flex justify-center">
          <Image
            src={forgotpassword}
            alt="loginwebp"
            width={700}
            className="m-auto"
          />
        </div>
      </div>

      <Dialog open={isShow}>
        <DialogContent className="w-3/4 md:min-w-1/4 rounded-md flex flex-col items-center justify-center space-y-4 ">
          <DialogHeader>
            <Image src={sucess} alt="success" width={60} className="mx-auto" />
            <DialogTitle className="text-center">
              Password Reset Request
            </DialogTitle>
            <DialogDescription className="mx-auto text-center">
              A link to reset your password has been sent to your email. Please
              check your inbox and follow the instructions to proceed.
            </DialogDescription>
          </DialogHeader>
          <Button className="w-full mt-4 bg-[#74E291] text-[#272829]" asChild>
            <Link href={"/login"}>Confirm</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ForgotPassword;
