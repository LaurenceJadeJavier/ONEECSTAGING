"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import success from "../../../../../assets/image/delete.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/ui/spinner";
import GlobalModalMessage from "@/components/GlobalModalMessage";
import {
  useAddCoopAccountsSchema,
  useUpdateCoopAccountsSchema,
} from "../../../../../utils/schema/admin/useAddCoopAccountScehma";

import { Coop } from "../../../../../utils/custom hooks/admin/useAdminProps";
import { useRouter } from "next/navigation";
import {
  useAddCoopAccounts,
  useCoopTable,
  useDeleteCoop,
  useUpdateCoop,
} from "../../../../../utils/custom hooks/admin/useAddCoopAccounts";
type UpdateCoopPayload = {
  id: number;
  name: string;
  address: string;
  description: string;
};

type UpdateFormValues = z.infer<typeof useUpdateCoopAccountsSchema>;
type FormValues = z.infer<typeof useAddCoopAccountsSchema>;
const CoopAccountPages = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCoopId, setSelectedCoopId] = useState<number | null>(null);
  const { mutate: updateCoop, isPending: isUpdating } = useUpdateCoop();
  // const { data: coopDetails, isLoading: coopDetailsLoading } = useCoopDetails(
  //   selectedCoopId ?? 0
  // );
  const { mutate, isPending } = useAddCoopAccounts();
  const { mutate: deleteCoop, isPending: deleteLoading } = useDeleteCoop();
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
  const { data: coop, isLoading } = useCoopTable(pagination);
  const form = useForm<FormValues>({
    defaultValues: {
      description: "",
      address: "",
      name: "",
      coordinator: {
        email: "",
        contact_number: "",
      },
    },
    resolver: zodResolver(useAddCoopAccountsSchema),
  });
  const updateForm = useForm<UpdateFormValues>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
    },
    resolver: zodResolver(useUpdateCoopAccountsSchema),
  });
  const handleOpenModal = () => {
    router.push("/add-accounts");
  };
  // const handleEditClick = (id: number) => {
  //   setSelectedCoopId(id);
  //   setIsUpdateModalOpen(true);
  // };
  // const handleDeleteClick = (id: number) => {
  //   setIsDeleteModalOpen(true);
  //   setSelectedCoopId(id);
  // };
  const handleViewNavigate = (id: number) => {
    router.push(`coop-details/${id}`);
    console.log(id);
  };
  // const handleConfirmDelete = () => {
  //   if (selectedCoopId !== null) {
  //     deleteCoop(selectedCoopId, {
  //       onSuccess: () => {
  //         // Close the delete modal and reset the selected ID
  //         setIsDeleteModalOpen(false);
  //         setSelectedCoopId(null);
  //       },
  //     });
  //   }
  // };
  const handleSubmitValue = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };
  // const handleUpdateSubmit = (data: UpdateFormValues) => {
  //   if (selectedCoopId) {
  //     const updatePayload = {
  //       id: selectedCoopId,
  //       name: data.name,
  //       address: data.address,
  //       description: data.description || "",
  //     };
  //     updateCoop(updatePayload, {
  //       onSuccess: () => {
  //         setIsUpdateModalOpen(false);
  //       },
  //     });
  //   }
  // };
  const getRows = (id: number) => {
    setSelectedCoopId(id);
    setIsOpen(true);
  };
  // useEffect(() => {
  //   if (coopDetails) {
  //     updateForm.reset({
  //       name: coopDetails.data.name || "",
  //       description: coopDetails.data.description || "",
  //       address: coopDetails.data.address || "",
  //     });
  //   }
  // }, [coopDetails, updateForm]);
  const columns = useMemo<ColumnDef<Coop>[]>(
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
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Coop Name
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <Button
              className="ml-2 text-xs font-normal"
              variant="table"
              onClick={() => {
                getRows(row.original.id);
              }}
            >
              {row.original.name}
            </Button>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
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
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Created
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => {
          if (!row.original.createdAt) return null;
          return (
            <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
          );
        },
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
    []
  );
  return (
    <>
      <div className=" w-full px-10 mb-10 ">
        <div className="w-full mx-auto">
          <div className="flex flex-row justify-between py-4 border border-b-0 rounded-t-xl overflow-auto ">
            <div className="text-xl font-bold">
              <h1 className="px-4 py-3">Coop Records</h1>
            </div>
            <div className="flex flex-row gap-2 px-4">
              <Button variant={"outline"} className="border border-[#74E291]">
                Filter by
              </Button>
              <Button
                className="bg-[#74E291] text-[#272829]"
                variant={"outline"}
                onClick={handleOpenModal}
              >
                Add Coop Account
              </Button>
            </div>
          </div>
          <DataTable
            displayPagination
            columns={columns}
            data={coop?.coops ?? []} // Make sure this matches the structure
            rowClassName="text-xs text-center"
            page={page}
            loading={isLoading}
            setPage={setPage}
            total={coop?.totalCount}
          />
        </div>
      </div>
      {/* add coope form hihih */}
      <Dialog onOpenChange={(val) => setIsModalOpen(val)} open={isModalOpen}>
        <DialogContent className="min-w-fit  space-y-3  ">
          <DialogHeader>
            <DialogTitle className="w-full">Add Coop Accounts</DialogTitle>
          </DialogHeader>
          <div className="w-full ">
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
                <div className="flex justify-end gap-4 py-3">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant={"ghost"}
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
        </DialogContent>
      </Dialog>
      {/* update coo form hihi */}
      {/* <Dialog
        onOpenChange={(val) => setIsUpdateModalOpen(val)}
        open={isUpdateModalOpen}
      >
        <DialogContent className="min-w-fit space-y-3">
          <DialogHeader>
            <DialogTitle className="w-full">Update Coop Account</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...updateForm}>
              <form onSubmit={updateForm.handleSubmit(handleUpdateSubmit)}>
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coop Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4" disabled={isUpdating}>
                  {isUpdating ? <Spinner /> : "Update Coop Account"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog> */}
      {/* modal of information */}
      {/* <GlobalModalMessage
        isOpen={isDeleteModalOpen}
        title="Delete Coop"
        description="Are you sure you want to delete this Coop? This action cannot be undone."
        imageSrc={success}
        cancelButtonName="Cancel"
        onClose={() => setIsDeleteModalOpen(false)}
        buttonName="Yes"
        onOk={() => handleConfirmDelete()}
        onCancel={() => setIsDeleteModalOpen(false)}
      /> */}
    </>
  );
};

export default CoopAccountPages;
