"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { combinedSchema } from "../../../../../utils/schema/coordinator/useAddUserSchema";
import { useAddUser } from "../../../../../utils/custom hooks/coor/useUsersItems";
import { useGetAllRoles } from "../../../../../utils/custom hooks/coor/useCoorItems";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Formvalues = z.infer<typeof combinedSchema>;

export default function AddUser() {
  const router = useRouter();
  const { mutate, isPending } = useAddUser();

  const { data: rolesData, isLoading } = useGetAllRoles();

  // Map roles to Option[] type
  const roles: Option[] =
    rolesData?.data.roles.map((role: any) => ({
      value: role.id.toString(), // Ensure value is a string
      label: role.name,
    })) || [];

  const form = useForm<Formvalues>({
    defaultValues: {
      address: "",
      email: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      contact_number: "",
      roleIds: [],
    },
    resolver: zodResolver(combinedSchema),
  });

  const handleSubmitValue = (value: Formvalues) => {
    const payload = {
      data: {
        first_name: value.first_name,
        middle_name: value.middle_name,
        last_name: value.last_name,
        email: value.email,
        contact_number: value.contact_number,
        address: value.address,
      },
      roleIds: value.roleIds,
    };
    mutate(payload, {
      onSuccess: () => {
        router.push("/users");
        toast.success("User successfully created");
      },
      onError: (error) => {
        toast.error("Failed to create user. Please try again.");
      },
    });
  };

  // Convert roleIds to strings for comparison
  const selectedRoleValues = form
    .getValues("roleIds")
    .map((id) => id.toString());
  const selectedRoles: Option[] = roles.filter((role) =>
    selectedRoleValues.includes(role.value)
  );

  return (
    <>
      <div className="w-full px-10">
        <div className="w-full">
          <div className="text-xl font-bold">
            <h1 className="px-4 py-3">Add user</h1>
            <div className="w-[40rem] px-4 py-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitValue)}>
                  <FormField
                    control={form.control}
                    name="roleIds"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Select Roles</FormLabel>
                        <MultipleSelector
                          className="border border-[#C9C9C9] rounded-md"
                          value={selectedRoles} // Set the current selected roles
                          hidePlaceholderWhenSelected={true}
                          defaultOptions={roles}
                          placeholder="Select Roles"
                          emptyIndicator={
                            <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                              No results found.
                            </p>
                          }
                          onChange={(selected) =>
                            field.onChange(
                              selected.map((option) => parseInt(option.value))
                            )
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-between w-1/2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              First Name
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
                    </div>
                    <div className="flex flex-col justify-between w-1/2">
                      <FormField
                        control={form.control}
                        name="middle_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Middle Name
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
                    </div>
                    <div className="flex flex-col justify-between w-1/2">
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-[#272829]">
                              Last Name
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
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-between w-1/2">
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
                                className="w-full border border-[#C9C9C9] text-xs"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col justify-between w-1/2">
                      <FormField
                        control={form.control}
                        name="contact_number"
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
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col justify-between w-1/2">
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
                            <FormMessage className="text-xs" />
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
