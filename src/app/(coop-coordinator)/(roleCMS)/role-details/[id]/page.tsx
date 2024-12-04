"use client";

import { useParams } from "next/navigation";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useAddRoleSchema } from "../../../../../../utils/schema/coordinator/useAddRoleSchema";
import { useEffect, useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { Button } from "@/components/ui/button";
import {
  useGetRoles,
  useUpdateRole,
} from "../../../../../../utils/custom hooks/coor/useCoorItems";
import { toast } from "sonner";

// Define your options
const Permissions: Option[] = [
  { value: "edit", label: "Edit" },
  { value: "add", label: "Add" },
  { value: "view", label: "View" },
  { value: "delete", label: "Delete" },
];

const Modules: Option[] = [
  { value: "/role", label: "Role Management" },
  { value: "/soa", label: "SOA" },
  { value: "/users", label: "Users" },
  { value: "/customer-management", label: "Customer Management" },
  { value: "/approvals", label: "Approval" },
];

// Infer TypeScript types from zod schemas
type AddRoleFormValues = z.infer<typeof useAddRoleSchema>;

const RoleDetails = () => {
  const { id } = useParams();
  const roleId = parseInt(id as string);
  const { mutate, isPending } = useUpdateRole();

  const { data: role, error, isLoading } = useGetRoles(roleId);

  const defaultModules =
    role?.data?.modules.map((module: string) => ({
      value: module,
      label: module,
    })) || [];
  const defaultPermissions =
    role?.data?.permissions.map((perm: string) => ({
      value: perm,
      label: perm,
    })) || [];

  const form = useForm<AddRoleFormValues>({
    defaultValues: {
      name: role?.data?.name || "",
      modules: defaultModules,
      permissions: defaultPermissions,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const { isDirty } = useFormState({ control: form.control });
  console.log("Form Dirty State:", isDirty);

  useEffect(() => {
    if (role?.data) {
      form.reset({
        name: role.data.name,
        modules: role.data.modules.map((module: string) => ({
          value: module,
          label: module,
        })),
        permissions: role.data.permissions.map((perm: string) => ({
          value: perm,
          label: perm,
        })),
      });
    }
  }, [role, form]);

  const handleSave = (data: AddRoleFormValues) => {
    console.log("handleSave called", data);
    if (true) {
      const updatePayload = {
        name: data.name,
        permissions: data?.permissions.map((option) => option.value),
        modules: data.modules.map((option) => option.value),
      };
      console.log("Update Payload:", updatePayload);
      console.log("Mutation Function:", mutate);

      mutate(
        { id: roleId, ...updatePayload },
        {
          onSuccess: () => {
            console.log("Mutation Success");
            setIsEditing(false);
            toast.success("Role updated successfully");
          },
          onError: (err) => {
            console.error("Mutation Error:", err);
            toast.error(`Error updating role: ${err.message}`);
          },
        }
      );
    }
  };

  return (
    <div className="w-full px-10">
      <div className="w-full">
        <div className="text-xl font-bold">
          <h1 className="px-4 py-3">Role Details</h1>
          {isLoading && (
            <div className="absolute top-0 left-0 bg-green h-full w-full z-50 bg-white bg-opacity-90 text-black font-semibold text-xl flex justify-center items-center">
              Please Wait...
            </div>
          )}
          <div className="w-[40rem] px-4 py-3">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSave)}>
                <FormItem>
                  <FormLabel className="text-xs text-[#272829]">
                    Role Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full border border-[#C9C9C9] text-xs  rounded-md"
                      {...form.register("name")}
                      readOnly={!isEditing}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormField
                    control={form.control}
                    name="modules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Modules
                        </FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <MultipleSelector
                              className="border border-[#C9C9C9]  rounded-md"
                              {...field}
                              hidePlaceholderWhenSelected={true}
                              defaultOptions={Modules}
                              placeholder="Select Modules"
                              emptyIndicator={
                                <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                                  No results found.
                                </p>
                              }
                              onChange={(selected) => field.onChange(selected)}
                            />
                          ) : (
                            <Input
                              className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                              value={field.value
                                .map((option) => option.label)
                                .join(", ")}
                              readOnly
                            />
                          )}
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </FormItem>
                <FormItem>
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Permissions
                        </FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <MultipleSelector
                              className="border border-[#C9C9C9]  rounded-md "
                              {...field}
                              hidePlaceholderWhenSelected={true}
                              defaultOptions={Permissions}
                              placeholder="Select Permissions"
                              emptyIndicator={
                                <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                                  No results found.
                                </p>
                              }
                              onChange={(selected) => field.onChange(selected)}
                            />
                          ) : (
                            <Input
                              className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]  rounded-md"
                              value={field.value
                                .map((option) => option.label)
                                .join(", ")}
                              readOnly
                            />
                          )}
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <FormMessage className="text-xs" />
                <div className="w-full grid grid-cols-5 gap-4 mt-5">
                  {isEditing && (
                    <Button
                      type="submit"
                      className="bg-[#74E291]"
                      variant={"secondary"}
                    >
                      {isPending ? "Saving..." : "Save"}
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className={`${
                      isEditing ? "bg-[#E27474] text-[#A11414]" : "bg-[#74E291]"
                    }`}
                    variant={"secondary"}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    type="button"
                    className="border border-[#E27474] text-[#A11414]"
                    variant={"outline"}
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;
