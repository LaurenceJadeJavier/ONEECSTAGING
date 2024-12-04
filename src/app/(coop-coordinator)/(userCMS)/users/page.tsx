"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import success from "../../../../../assets/image/delete.png";
import {
  Form,
  FormControl,
  FormDescription,
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
import Spinner from "@/components/ui/spinner";

import GlobalModalMessage from "@/components/GlobalModalMessage";
import {
  combinedSchema,
  combinedUpdateSchema,
} from "../../../../../utils/schema/coordinator/useAddUserSchema";

import { useRole } from "../../../../../utils/custom hooks/auth/useAuth";
import {
  useAddUser,
  useDeleteCoorUser,
  useGetCoor,
  useUpdateCoor,
  useUserTable,
} from "../../../../../utils/custom hooks/coor/useUsersItems";
import { Coors } from "../../../../../types/useCoorTypes";
import { useGetAllRoles } from "../../../../../utils/custom hooks/coor/useCoorItems";
import { Option } from "@/components/ui/multi-selector";
import { useRouter } from "next/navigation";

type CoopRoleDetailsProps = {
  id: string;
  fullName: string;
  email: string;
  contactNo: string;
  address: string;
};
type UpdateFormValues = z.infer<typeof combinedUpdateSchema>;
type FormValues = z.infer<typeof combinedSchema>;
export default function UserPage() {
  const router = useRouter();
  const { data: userData, isLoading: RoleLoading } = useRole();
  const isSuperAdmin = userData?.data?.coordinatorRole === "COOPSUPERADMIN";
  const hasDeletePermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("delete"));
  const hasEditPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("edit"));
  const hasViewPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("view"));
  const hasAddPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("add"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<FormValues>({
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
  const updateForm = useForm<UpdateFormValues>({
    defaultValues: {
      address: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      contact_number: "",
      roleIds: [],
    },
    resolver: zodResolver(combinedUpdateSchema),
  });
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(() => {
    return {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
    };
  }, [page]);
  const {
    data,
    isLoading: load,
    error,
  } = useUserTable({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleViewNavigate = (id: number) => {
    router.push(`user-details/${id}`);
  };
  const column = useMemo<ColumnDef<Coors>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
      },
      {
        accessorKey: "full_name",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const { first_name, middle_name, last_name } = row.original;

          const formattedName = `${first_name || ""} ${middle_name || ""} ${
            last_name || ""
          }`.trim();

          return (
            <div>
              <Button
                className="ml-2 text-xs font-normal"
                variant="table"
                onClick={() => {
                  getRows(row.original.id);
                }}
                disabled={!hasViewPermission}
              >
                {formattedName}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
      },
      {
        accessorKey: "contact_number",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
      },
      {
        accessorKey: "address",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <div>
              <Button
                variant={"outline"}
                size={"sm"}
                className="text-xs p-2"
                onClick={() => handleViewNavigate(row.original.id)}
              >
                View Details
              </Button>
            </div>
          );
        },
      },
    ],
    [hasDeletePermission, hasEditPermission, hasViewPermission]
  );

  const { mutate, isPending } = useAddUser();
  const { mutate: updateCoor, isPending: coorLoadin } = useUpdateCoor();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCoopId, setSelectedCoopId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteCoor, isPending: deleteCoorLoading } =
    useDeleteCoorUser();
  const { data: getCoorData, isLoading: getCoorDataLoading } = useGetCoor(
    selectedCoopId ?? 0
  );
  const { data: rolesData, isLoading } = useGetAllRoles();
  const role = rolesData?.data.roles || [];

  useEffect(() => {
    if (getCoorData) {
      const roles = Array.isArray(getCoorData.data.role)
        ? getCoorData.data.role
        : [getCoorData.data.role]; // Ensure role is always an array

      const formattedRoleIds = roles.map((roleId) => roleId);

      updateForm.reset({
        first_name: getCoorData.data.first_name || "",
        middle_name: getCoorData.data.middle_name || "",
        last_name: getCoorData.data.last_name || "",
        address: getCoorData.data.address || "",
        contact_number: getCoorData.data.contact_number || "",
        roleIds: formattedRoleIds,
      });
    }
  }, [getCoorData, updateForm]);
  // console.log(role, "rolesss");
  const handleOpenModal = () => {
    router.push("/add-user");
  };
  const handleSubmitValue = (value: FormValues) => {
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
        setIsModalOpen(false);
      },
    });
  };
  const handleUpdateValue = (value: UpdateFormValues) => {
    if (selectedCoopId) {
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
        { id: selectedCoopId, ...payload },
        {
          onSuccess: () => {
            setIsUpdateModalOpen(false);
          },
          onError: (error) => {
            console.error("Update failed:", error);
          },
        }
      );
    }
  };

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
      label: "Customer CMS",
    },
    {
      value: "/approval",
      label: "Approval",
    },
  ];
  const handleDeleteClick = (id: number) => {
    setIsDeleteModalOpen(true);
    setSelectedCoopId(id);
  };
  const handleConfirmDelete = () => {
    if (selectedCoopId !== null) {
      deleteCoor(selectedCoopId, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedCoopId(null);
        },
      });
    }
  };
  const getRows = (id: number) => {
    setSelectedCoopId(id);
    setIsOpen(true);
  };
  const handleEditClick = (id: number) => {
    setSelectedCoopId(id);
    setIsUpdateModalOpen(true);
  };
  return (
    <>
      <div className=" w-full px-10  ">
        <div className="w-full mx-auto  ">
          <DataTable
            buttonIshow={hasAddPermission}
            buttonName="Add User"
            displayPagination
            columns={column}
            data={data?.users || []}
            rowClassName="text-xs text-center "
            wrapperClassName="text-center"
            loading={load}
            openFormAction={handleOpenModal}
            page={page}
            setPage={setPage}
            total={data?.totalCount || 0}
            headerTitle="User Details"
            showHeader={true}
          />
        </div>
      </div>
      {/* add data */}
      <Dialog onOpenChange={(val) => setIsModalOpen(val)} open={isModalOpen}>
        <DialogContent className="min-w-fit  space-y-3">
          <DialogHeader>
            <DialogTitle className="w-full">Add User</DialogTitle>
          </DialogHeader>
          <div className="w-full ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitValue)}>
                <FormField
                  control={form.control}
                  name="roleIds"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Role</FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select roles" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {role.map((rolee: any) => (
                              <MultiSelectorItem
                                key={rolee.id} // Use `id` as the key
                                value={rolee.id || rolee.name}

                                // Use `id` as the value
                              >
                                {rolee.name} {/* Display the role name */}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex flex-row gap-4">
                  <div className="flex flex-col justify-between  w-1/2">
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className=" flex flex-row gap-4">
                  <div className="flex flex-col justify-between  w-1/2">
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
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
                  </div>
                </div>
                <div className="flex justify-end gap-4 py-3">
                  <Button variant={"ghost"} className="border border-[#74E291]">
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
        </DialogContent>
      </Dialog>
      {/* update data */}
      <Dialog
        onOpenChange={(val) => setIsUpdateModalOpen(val)}
        open={isUpdateModalOpen}
      >
        <DialogContent className="min-w-fit  space-y-3">
          <DialogHeader>
            <DialogTitle className="w-full">Edit User</DialogTitle>
          </DialogHeader>
          <div className="w-full ">
            <Form {...updateForm}>
              <form onSubmit={updateForm.handleSubmit(handleUpdateValue)}>
                <FormField
                  control={updateForm.control}
                  name="roleIds"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Select Role</FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select roles" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {role.map((rolee: any) => (
                              <MultiSelectorItem
                                key={rolee.id} // Use `id` as the key
                                value={rolee.id} // Use `id` as the value
                              >
                                {rolee.name} {/* Display the role name */}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex flex-row gap-4">
                  <div className="flex flex-col justify-between  w-1/2">
                    <FormField
                      control={updateForm.control}
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <FormField
                      control={updateForm.control}
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <FormField
                      control={updateForm.control}
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className=" flex flex-row gap-4">
                  <div className="flex flex-col justify-between  w-1/2"></div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <FormField
                      control={updateForm.control}
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
                          <FormMessage className=" text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-between  w-1/2">
                    <FormField
                      control={updateForm.control}
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
                  </div>
                </div>
                <div className="flex justify-end gap-4 py-3">
                  <Button variant={"ghost"} className="border border-[#74E291]">
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
        </DialogContent>
      </Dialog>
      {/* infoo data */}
      <Dialog onOpenChange={(val) => setIsOpen(val)} open={isOpen}>
        <DialogContent className="min-w-fit  space-y-3">
          <DialogHeader>
            <DialogTitle className="w-full">Add Role</DialogTitle>
          </DialogHeader>
          <hr className="mt-1 w-full bg-[#263238]" />
          <div className="w-full">
            {getCoorDataLoading ? (
              <div className="text-center">Loading...</div>
            ) : getCoorData ? (
              <div className="flex flex-col space-y-7">
                <div className="flex flex-row justify-between items-center px-2 w-full">
                  <div className="flex-1">
                    <h1 className="text-sm">Id No:</h1>
                    <h1 className="text-xs font-bold">{getCoorData.data.id}</h1>
                  </div>
                  <div className="flex-1 text-left">
                    <h1 className="text-sm">Role</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.role}
                    </h1>
                  </div>
                  <div className="flex-1"></div>
                </div>
                <div className="flex flex-row justify-between items-center px-2">
                  <div className="flex-1">
                    <h1 className="text-sm">First Name:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.first_name}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm">Middle Name:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.middle_name}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm">Last Name:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.last_name}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center px-2">
                  <div className="flex-1">
                    <h1 className="text-sm">Email Address:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.email}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm">Mobile Number:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.contact_number}
                    </h1>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-sm">Address:</h1>
                    <h1 className="text-xs font-bold">
                      {getCoorData.data.address}
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">No data available</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* delete data */}
      <GlobalModalMessage
        isOpen={isDeleteModalOpen}
        title="Delete User"
        description="Are you sure you want to delete this User? This action cannot be undone."
        imageSrc={success}
        cancelButtonName="Cancel"
        onClose={() => setIsDeleteModalOpen(false)}
        buttonName="Yes"
        onOk={() => handleConfirmDelete()}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
