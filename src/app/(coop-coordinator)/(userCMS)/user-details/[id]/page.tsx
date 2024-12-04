"use client";
import { useParams } from "next/navigation";
import {
  useGetAllRoles,
  useGetRoles,
  useUpdateRole,
} from "../../../../../../utils/custom hooks/coor/useCoorItems";
import { z } from "zod";
import { combinedUpdateSchema } from "../../../../../../utils/schema/coordinator/useAddUserSchema";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import {
  useGetCoor,
  useUpdateCoor,
} from "../../../../../../utils/custom hooks/coor/useUsersItems";
import { toast } from "sonner";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselector";
import { Button } from "@/components/ui/button";

type UpdateRole = z.infer<typeof combinedUpdateSchema>;
export default function UserDetails() {
  const { id } = useParams();
  const roleId = parseInt(id as string);

  const { mutate: updateCoor, isPending: coorLoading } = useUpdateCoor();
  const { data: getCoorData, isLoading: getCoorDataLoading } =
    useGetCoor(roleId);
  const { data: role, error } = useGetRoles(roleId);
  const { data: rolesData, isLoading } = useGetAllRoles();
  const roleee = rolesData?.data.roles || [];

  const defaultRoleIds = Array.isArray(roleee?.data?.id)
    ? roleee.data.id
    : [roleee?.data?.id].filter(Boolean);
  const form = useForm<UpdateRole>({
    defaultValues: {
      address: getCoorData?.data?.address || "",
      contact_number: getCoorData?.data?.contact_number || "",
      first_name: getCoorData?.data?.first_name || "",
      middle_name: getCoorData?.data?.middle_name || "",
      last_name: getCoorData?.data?.last_name || "",
      roleIds: defaultRoleIds,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const { isDirty } = useFormState({ control: form.control });
  console.log("Form Dirty State:", isDirty);
  useEffect(() => {
    if (getCoorData) {
      form.reset({
        address: getCoorData.data.address || "",
        contact_number: getCoorData.data.contact_number || "",
        first_name: getCoorData.data.first_name || "",
        middle_name: getCoorData.data.middle_name || "",
        last_name: getCoorData.data.last_name || "",
        roleIds: defaultRoleIds || "",
      });
    }
  }, [getCoorData, form]);

  // UseEffect to manage role loading state or errors
  useEffect(() => {
    if (error) {
      toast.error("Error loading roles data");
    }
  }, [error]);
  const handleSave = (value: UpdateRole) => {
    const payload = {
      data: {
        first_name: value.first_name,
        middle_name: value.middle_name,
        last_name: value.last_name,
        contact_number: value.contact_number,
        address: value.address,
      },
      roleIds: value.roleIds,
    };

    updateCoor(
      { id: roleId, ...payload },
      {
        onSuccess: () => {
          toast.success("Role updated successfully");
          setIsEditing(false);
        },
        onError: (error: any) => {
          console.error("Update failed:", error);
          toast.error(`Error updating role: ${error.message}`);
        },
      }
    );
  };

  return (
    <>
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
                    <FormField
                      control={form.control}
                      name="roleIds"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Select Role</FormLabel>
                          {isEditing ? (
                            <MultiSelector
                              onValuesChange={field.onChange}
                              values={field.value}
                            >
                              <MultiSelectorTrigger>
                                <MultiSelectorInput placeholder="Select roles" />
                              </MultiSelectorTrigger>
                              <MultiSelectorContent>
                                <MultiSelectorList>
                                  {roleee.map((rolee: any) => (
                                    <MultiSelectorItem
                                      key={rolee.id}
                                      value={rolee.id || rolee.name}
                                    >
                                      {rolee.name}
                                    </MultiSelectorItem>
                                  ))}
                                </MultiSelectorList>
                              </MultiSelectorContent>
                            </MultiSelector>
                          ) : (
                            <Input
                              className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                              value={
                                roleee
                                  .filter((rolee: any) =>
                                    field.value.includes(rolee.id)
                                  )
                                  .map((rolee: any) => rolee.name)
                                  .join(", ") || "No roles selected"
                              }
                              readOnly
                            />
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-xs text-[#272829]">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border border-[#C9C9C9] text-xs  rounded-md"
                        {...form.register("first_name")}
                        readOnly={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-xs text-[#272829]">
                      Middle Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border border-[#C9C9C9] text-xs  rounded-md"
                        {...form.register("middle_name")}
                        readOnly={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-xs text-[#272829]">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border border-[#C9C9C9] text-xs  rounded-md"
                        {...form.register("last_name")}
                        readOnly={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-xs text-[#272829]">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border border-[#C9C9C9] text-xs  rounded-md"
                        {...form.register("address")}
                        readOnly={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                  <div className="w-full grid grid-cols-5 gap-4 mt-5">
                    {isEditing && (
                      <Button
                        type="submit"
                        className="bg-[#74E291]"
                        variant={"secondary"}
                      >
                        {coorLoading ? "Saving..." : "Save"}
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`${
                        isEditing
                          ? "bg-[#E27474] text-[#A11414]"
                          : "bg-[#74E291]"
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
    </>
  );
}
