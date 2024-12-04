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
import { useCallback, useMemo, useState } from "react";

import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { z } from "zod";
import { UseCreateSOASchema } from "../../../../utils/schema/coordinator/useCreateSOASchema";
import { useForm } from "react-hook-form";
import DebouncedInput from "@/components/ui/debounceinput";
import { AddIcons, DeleteIcons, VIcons } from "@/components/SideIcons";
import { useRouter } from "next/navigation";

import {
  AccountRegistriesData,
  AccountRegistriesResponse,
  AccountRegistry,
} from "../../../../types/useGetAccountRegistryTypes";

import {
  useGetAllAccountRegistry,
  useGetSingleAccount,
} from "../../../../utils/custom hooks/soa/useSOAItems";
import { useSelectedUser } from "../../../../utils/contextProvider";
import { useGetBillList } from "../../../../utils/custom hooks/bill/useGetBill";

// type CreateSoaProps = z.infer<typeof UseCreateSOASchema>;

export default function SoaPage() {
  const [searchText, setSearchText] = useState("");
  const { selectedUserId, setSelectedUserId } = useSelectedUser();
  const { data: singleAccount, isLoading } = useGetSingleAccount(
    selectedUserId ?? 0
  );
  // const { data: billListData, isLoading: billLoading } = useGetBillList(
  //   selectedUserId ?? 0
  // );
  // console.log("biilldata", billListData);

  const { data: responseData = [], isLoading: ARLoading } =
    useGetAllAccountRegistry();
  const AccountRegistry = responseData?.data?.ar || [];
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = useCallback(
    (id: number) => {
      setSelectedUserId(id);
      router.push(`/statement-of-accounts/${id}`);
    },
    [router, setSelectedUserId] // Add setSelectedUserId here
  );

  // Memoize getRows using useCallback
  const getRows = useCallback(
    (id: number) => {
      router.push(`/statement-of-accounts/account-details/${id}`);
      setSelectedUserId(id);
      console.log(id);
    },
    [router, setSelectedUserId] // Add setSelectedUserId here
  );
  const columns = useMemo<ColumnDef<AccountRegistry>[]>(
    () => [
      {
        accessorKey: "meterAccount.meterNumber",
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
        id: "fullName",
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
          const { first_name, middle_name, last_name } = row.original.user;
          return (
            <span>
              {first_name} {middle_name ? `${middle_name} ` : ""} {last_name}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const date = new Date(row.original.updatedAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return <span>{formattedDate}</span>;
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-center py-1">
            <Button
              variant="link"
              size="sm"
              className="border-r-indigo-500"
              onClick={() => handleCreate(row.original.id)}
            >
              <AddIcons />
            </Button>
            <Button
              size="icon"
              variant="link"
              onClick={() => {
                getRows(row.original.id);
              }}
            >
              <VIcons />
            </Button>
            <Button
              size="icon"
              variant="link"
              // onClick={() => handleDownload(row.original.meterAccount.meterNumber)}
            >
              <DeleteIcons />
            </Button>
          </div>
        ),
      },
    ],
    [getRows, handleCreate]
  );

  return (
    <>
      <div className=" w-full px-10  ">
        <div className="w-full mx-auto  ">
          <div className="flex flex-row justify-between py-4 border border-b-0 rounded-t-xl overflow-auto ">
            <div className="text-xl font-bold">
              <h1 className="px-4 py-3">Account List</h1>
            </div>

            <div className="flex gap-2 py-2 mr-4 w-72">
              <DebouncedInput
                value={searchText ?? ""}
                onChange={(value) => setSearchText(String(value))}
              />
            </div>
          </div>
          <DataTable
            displayPagination
            loading={ARLoading}
            columns={columns}
            data={AccountRegistry}
            rowClassName="text-xs text-center "
            wrapperClassName="text-center"
          />
        </div>
      </div>
      <Dialog onOpenChange={(val) => setIsOpen(val)} open={isOpen}>
        <DialogContent className="min-w-fit  space-y-3 ">
          <DialogHeader>
            <DialogTitle className="w-full">Create Soa</DialogTitle>
          </DialogHeader>
          <hr className="mt-1 w-full bg-[#263238]" />
          <div className="w-full">12312</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
