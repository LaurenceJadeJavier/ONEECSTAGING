"use client";
import {
  CheckIcons,
  DeleteIcons,
  EditIcons,
  ViewIcons,
  XIcons,
} from "@/components/SideIcons";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface SoaProps {
  accountNo: string;
  fullName: string;
  email: string;

  address: string;
  status: "Pending" | "Decline" | "Approve";
}
const getStatusColor = (status: SoaProps["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-[#FD9B63] text-[#FFFFFF] py-1 px-4 rounded-md w-full";
    case "Decline":
      return "bg-[#EE4E4E] text-[#FFFFFF] py-1 px-4 rounded-md w-full";
    case "Approve":
      return "bg-[#508D4E] text-[#FFFFFF] py-1 px-4 rounded-md w-full";
    default:
      return "";
  }
};

export default function ApprovalPage() {
  const testing = () => {
    console.log("trully");
  };
  const columns: ColumnDef<SoaProps>[] = [
    {
      accessorKey: "accountNo",
      header: ({ column }) => (
        <Button
          className="text-xs"
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account No.
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
    },
    {
      accessorKey: "fullName",
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
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          className="text-xs"
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
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
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Button
            variant={"ghost"}
            onClick={testing}
            disabled={status !== "Pending"}
            className=" disabled:opacity-100"
          >
            <div
              className={`text-center ${getStatusColor(row.original.status)}`}
            >
              {row.original.status}
            </div>
          </Button>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex flex-row justify-center">
            {status === "Pending" ? (
              <>
                <Button size="icon" variant="link">
                  <CheckIcons />
                </Button>
                <Button size="icon" variant="link">
                  <XIcons />
                </Button>
              </>
            ) : (
              <>
                <Button size="icon" variant="link">
                  <ViewIcons />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const RoleDetail: SoaProps[] = [
    {
      accountNo: "AC001",
      fullName: "John Doe",
      email: "1@gmail.com",

      address: "Quezon City",
      status: "Pending",
    },
    {
      accountNo: "AC002",
      fullName: "Jane Smith",
      email: "2@gmail.com",

      address: "Makati City",
      status: "Approve",
    },
    {
      accountNo: "AC003",
      fullName: "Alice Johnson",
      email: "3@gmail.com",

      address: "Cebu City",
      status: "Decline",
    },
    {
      accountNo: "AC004",
      fullName: "Bob Brown",
      email: "4@gmail.com",

      address: "Davao City",
      status: "Approve",
    },
    {
      accountNo: "AC005",
      fullName: "Charlie Davis",
      email: "5@gmail.com",

      address: "Iloilo City",
      status: "Pending",
    },
  ];
  return (
    <>
      <div className=" w-full px-10  ">
        <div className="w-full mx-auto  ">
          <DataTable
            showHeader={true}
            headerTitle="Customer List"
            displayPagination
            columns={columns}
            data={RoleDetail}
            rowClassName="text-xs text-center "
            wrapperClassName="text-center"
            openFormAction={() => true}
            buttonName="Add Customer"
            buttonIshow={true}
          />
        </div>
      </div>
    </>
  );
}
