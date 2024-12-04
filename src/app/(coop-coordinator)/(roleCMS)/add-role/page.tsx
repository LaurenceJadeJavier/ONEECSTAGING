"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddRoleSchema } from "../../../../../utils/schema/coordinator/useAddRoleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import useAddRoles from "../../../../../utils/custom hooks/coor/useCoorItems";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Permissions: Option[] = [
  {
    value: "edit",
    label: "Edit",
  },
  {
    value: "add",
    label: "Add",
  },
  {
    value: "view",
    label: "View",
  },
  {
    value: "delete",
    label: "Delete",
  },
];

const Modules: Option[] = [
  {
    value: "/role",
    label: "Role Management",
  },
  {
    value: "/soa",
    label: "SOA",
  },
  {
    value: "/users",
    label: "Users",
  },
  {
    value: "/customer-management",
    label: "Customer Management",
  },
  {
    value: "/approvals",
    label: "Approval",
  },
];

type FormValues = z.infer<typeof useAddRoleSchema>;
export default function AddRolePage() {
  const router = useRouter();
  const { mutate, isPending } = useAddRoles();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      modules: [],
      permissions: [],
    },
    resolver: zodResolver(useAddRoleSchema),
  });
  const handleSubmitValue = (data: FormValues) => {
    const permissions = data.permissions.map((option) => option.value);
    const modules = data.modules.map((option) => option.value);
    const payload = {
      name: data.name,
      modules,
      permissions,
    };
    // console.log(payload);
    mutate(payload, {
      onSuccess: () => {
        router.push("/role-management");
        toast.success("Role and Permission successfully created");
      },
      onError: (error) => {
        toast.error("Failed to create Role and Permission. Please try again.");
      },
    });
  };
  return (
    <>
      <div className=" w-full px-10 ">
        <div className="w-full ">
          <div className="text-xl font-bold">
            <h1 className="px-4 py-3">Add Role</h1>
            <div className="w-[40rem] px-4 py-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitValue)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Role Name
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
                  <div className=" flex flex-row gap-4">
                    <div className="flex flex-col justify-between  w-1/2">
                      <FormField
                        control={form.control}
                        name="modules"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Modules
                            </FormLabel>
                            <FormControl>
                              <MultipleSelector
                                className="border border-[#C9C9C9] rounded-md"
                                {...field}
                                hidePlaceholderWhenSelected={true}
                                defaultOptions={Modules}
                                placeholder="Select Permissions"
                                emptyIndicator={
                                  <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                                    no results found.
                                  </p>
                                }
                                onChange={(selected) =>
                                  field.onChange(selected)
                                }
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col justify-between  w-1/2">
                      <FormField
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Permissions
                            </FormLabel>
                            <FormControl>
                              {/* <Input
                              {...field}
                              className="w-full border border-[#C9C9C9] text-xs"
                            /> */}
                              <MultipleSelector
                                className="border border-[#C9C9C9]  rounded-md"
                                {...field}
                                hidePlaceholderWhenSelected={true}
                                defaultOptions={Permissions}
                                placeholder="Select Permissions"
                                emptyIndicator={
                                  <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                                    no results found.
                                  </p>
                                }
                                onChange={(selected) =>
                                  field.onChange(selected)
                                }
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
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
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
