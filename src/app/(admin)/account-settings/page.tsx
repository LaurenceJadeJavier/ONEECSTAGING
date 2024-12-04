"use client";
import Image from "next/image";
import backgroundsettings from "../../../../assets/image/bg-acc-settings.png";
import avatar from "../../../../assets/image/avatar.png";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useChangePasswordSchema } from "../../../../utils/schema/reset-password/useResetPasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/ui/spinner";
import { useAdminChangePassword } from "../../../../utils/custom hooks/admin/useAddCoopAccounts";

type FormValues = z.infer<typeof useChangePasswordSchema>;
export default function AccountSettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useAdminChangePassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(useChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const onSubmit = (data: FormValues) => {
    // console.log(data);
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <div className=" bg-gray-100 pl-[0.85rem]">
        <Image
          src={backgroundsettings}
          alt="backgroundsettings"
          className="fixed"
        />
        <div className="flex justify-center absolute right-[13rem] left-[]  top-48 ">
          <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 ">
            <div className="flex flex-row items-center gap-10 py-6 ">
              <div className="flex flex-col gap-2">
                <Image src={avatar} alt="avatar" width={230} />
                <Button
                  variant={"ghost"}
                  className="bg-[#74E291] text-[#272829]"
                  onClick={handleOpenModal}
                >
                  Change Password
                </Button>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="font-bold text-lg">
                  <h1>Personal Details</h1>
                </div>
                <div className="grid grid-cols-3 space-x-8">
                  <div>
                    <p>FirstName</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                  <div>
                    <p>Middle Name</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                  <div>
                    <p>Last Name</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-2 gap-4 ">
                  <div>
                    <p>Contact Number</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                  <div>
                    <p>Email Address</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <p>Address</p>
                    <Input
                      type="text"
                      placeholder="Email"
                      disabled
                      className="bg-[#C9C9C9]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog onOpenChange={(val) => setIsModalOpen(val)} open={isModalOpen}>
        <DialogContent className="min-w-fit space-y-3">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Change Password
            </DialogTitle>
          </DialogHeader>
          <div className="min-w-fit  space-y-6">
            <Form {...form}>
              <form
                className="space-y-1 text-[#212A3E]"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-[#C9C9C9] text-xs"
                        />
                      </FormControl>
                      <FormMessage className=" text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-[#C9C9C9] text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                          className="w-full border border-[#C9C9C9] text-xs"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="w-full">
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#74E291] text-[#272829]"
                    size={"sm"}
                    variant={"default"}
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
