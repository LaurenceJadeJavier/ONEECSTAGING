"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Download, Eye } from "lucide-react";
import { useState } from "react";

import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { z } from "zod";
import { useForm } from "react-hook-form";
import DebouncedInput from "@/components/ui/debounceinput";
import { DeleteIcons, EditIcons } from "@/components/SideIcons";

import {
  combinedSchema,
  useAddCustomerSchema,
} from "../../../../utils/schema/coordinator/useAddCustomerSchema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddCustomer } from "../../../../utils/custom hooks/customer/useAddCustomer";
import { toast } from "sonner";

type SoaProps = {
  accountNo: string;
  fullName: string;
  email: string;
  mobileNo: string;
  address: string;
};
type formValues = z.infer<typeof combinedSchema>;
export default function CustomerManagement() {
  const { mutate, isPending } = useAddCustomer();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<formValues>({
    defaultValues: {
      userData: {
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        email: "",
        contact_number: "",
        address: "",
      },
      meterData: {
        meterNumber: 0,
        customerType: "",
      },
    },
    resolver: zodResolver(combinedSchema),
  });
  const column: ColumnDef<SoaProps>[] = [
    {
      accessorKey: "accountNo",
      header: ({ column }) => {
        return (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Account No.
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email Address
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "mobileNo",
      header: ({ column }) => {
        return (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mobile No.
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row justify-center">
            <Button
              size={"icon"}
              variant={"link"}
              // onClick={() => handleEditClick(row.original.id)}
            >
              {/* <LiaEditSolid color="#2E65F3" size={20} /> */}
              <EditIcons />
            </Button>
            <Button
              size={"icon"}
              variant={"link"}
              // onClick={() => handleDeleteClick(row.original.id)}
            >
              {/* <RiDeleteBin5Line color="#F32D2D" size={20} /> */}
              <DeleteIcons />
            </Button>
          </div>
        );
      },
    },
  ];
  const RoleDetail = [
    {
      accountNo: "AC001",
      fullName: "John Doe",
      email: "1@gmail.com",
      mobileNo: "09466753063",
      address: "Quezon City",
    },
    {
      accountNo: "AC002",
      fullName: "Jane Smith",
      email: "2@gmail.com",
      mobileNo: "09466753064",
      address: "Makati City",
    },
    {
      accountNo: "AC003",
      fullName: "Alice Johnson",
      email: "3@gmail.com",
      mobileNo: "09466753065",
      address: "Cebu City",
    },
    {
      accountNo: "AC004",
      fullName: "Bob Brown",
      email: "4@gmail.com",
      mobileNo: "09466753066",
      address: "Davao City",
    },
    {
      accountNo: "AC005",
      fullName: "Charlie Davis",
      email: "5@gmail.com",
      mobileNo: "09466753067",
      address: "Iloilo City",
    },
  ];
  const handleDetails = (id: string) => {
    console.log(id);
  };
  const handleModalOpen = () => {
    setIsOpen(true);
    // toast.custom(<div>12312</div>);
  };
  const handleSubmitValue = (data: formValues) => {
    mutate(data);
  };
  return (
    <>
      <div className=" w-full px-10  ">
        <div className="w-full mx-auto  ">
          <DataTable
            showHeader={true}
            headerTitle="Customer Details"
            displayPagination
            columns={column}
            data={RoleDetail}
            rowClassName="text-xs text-center "
            wrapperClassName="text-center"
            openFormAction={handleModalOpen}
            buttonName="Add Customer"
            buttonIshow={true}
          />
        </div>
      </div>
      <Dialog onOpenChange={(val) => setIsOpen(val)} open={isOpen}>
        <DialogContent className="max-w-full space-y-3 ">
          <DialogHeader>
            <DialogTitle className="w-full">Add Customer</DialogTitle>
          </DialogHeader>
          <hr className="mt-1 w-full bg-[#263238]" />
          <div className="w-full ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitValue)}>
                <div className="grid grid-cols-3 gap-6 w-full ">
                  <FormField
                    control={form.control}
                    name="meterData.meterNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          Account No.
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="w-full border border-[#C9C9C9] text-xs"
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            value={field.value || ""} // Ensure value is always a string for input
                          />
                        </FormControl>
                        <FormMessage className=" text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="meterData.customerType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs text-[#272829]">
                          Customer Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder=" Customer type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Residential">
                              Residential
                            </SelectItem>
                            <SelectItem value="Commercial">
                              Commercial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-6 w-full ">
                  <FormField
                    control={form.control}
                    name="userData.first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-[#272829]">
                          FirstName
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
                    name="userData.middle_name"
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
                  <FormField
                    control={form.control}
                    name="userData.last_name"
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
                <div className="grid grid-cols-3 gap-6 w-full">
                  <FormField
                    control={form.control}
                    name="userData.gender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs text-[#272829]">
                          Gender
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Prefer not to say">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userData.email"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                  <FormField
                    control={form.control}
                    name="userData.contact_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                <div>
                  <FormField
                    control={form.control}
                    name="userData.address"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                <div className="flex justify-end gap-4 py-3">
                  <Button
                    variant={"ghost"}
                    type="button"
                    // onClick={() => setIsModalOpen(false)}
                    className="border border-[#74E291]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#74E291]"
                    variant={"default"}
                    // disabled={isPending}
                  >
                    {/* {isPending ? <Spinner /> : "Submit"} */}
                    Submit
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
