"use client";

import { z } from "zod";
import { useAddCoopAccountsSchema } from "../../../../../utils/schema/admin/useAddCoopAccountScehma";
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
import Spinner from "@/components/ui/spinner";
import useAddCoopAccounts from "../../../../../utils/custom hooks/admin/useAddCoopAccounts";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type formValues = z.infer<typeof useAddCoopAccountsSchema>;
export default function AddCoop() {
  const router = useRouter();
  const { mutate, isPending } = useAddCoopAccounts();
  const form = useForm<formValues>({
    defaultValues: {
      address: "",
      name: "",
      description: "",
      coordinator: {
        contact_number: "",
        email: "",
      },
    },
    resolver: zodResolver(useAddCoopAccountsSchema),
  });

  const handleSubmitValue = (data: formValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/coop-accounts");
      },
    });
  };

  return (
    <>
      <div className="w-full px-10">
        <div className="w-full">
          <div className=" text-xl font-bold">
            <h1>Add Coop Account</h1>
            <div className="w-[40rem] px-4 py-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitValue)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Coop Name
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
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-between  w-1/2">
                      <FormField
                        control={form.control}
                        name="coordinator.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Email Address
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
                    </div>
                    <div className="flex flex-col  w-1/2">
                      <FormField
                        control={form.control}
                        name="coordinator.contact_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Mobile Number
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
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Address
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage className=" text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className=" flex flex-end">
                    <div className="flex justify-start gap-4 py-3">
                      <Button
                        variant={"ghost"}
                        type="button"
                        className="border border-[#74E291]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#74E291]"
                        variant={"default"}
                        disabled={isPending}
                      >
                        {isPending ? <Spinner /> : "Submit"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
