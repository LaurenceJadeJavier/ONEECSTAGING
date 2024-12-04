"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelectedUser } from "../../../../../../utils/contextProvider";
import { SigleAccountRegistriesResponse } from "../../../../../../types/useGetSingleAccountTypes";
import { useGetSingleAccount } from "../../../../../../utils/custom hooks/soa/useSOAItems";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  useGetBillList,
  useGetSingleBill,
} from "../../../../../../utils/custom hooks/bill/useGetBill";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/custom-datatables";
import { DownloadIcons, VIcons, ViewIcons } from "@/components/SideIcons";
import BillPDF from "@/components/BillPDF";
import { useRouter } from "next/navigation";

import {
  BillData,
  BillDataResponse,
  MeterData,
  PDFBillResponse,
} from "../../../../../../types/usePdfTypes";

export default function Component() {
  const router = useRouter();
  const { selectedUserId, setSelectedUserId } = useSelectedUser();
  const [isDownload, setIsDownload] = useState(false);
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
    data: SingleAccountData,
    isLoading: accountLoading,
    isError: accountError,
  } = useGetSingleAccount(selectedUserId ?? 0);
  const { data: billListData, isLoading: billLoading } = useGetBillList(
    selectedUserId ?? 0,
    pagination
  );

  const { data } = useGetSingleBill(selectedUserId ?? 0);
  console.log("single bill", data);

  const downloadBillPDF = async (
    data: BillData | undefined,
    meterAcc: MeterData | undefined
  ) => {
    console.log("Data:", data);
    console.log("Meter Account:", meterAcc);

    const blob = await pdf(
      <BillPDF data={data} meterAcc={meterAcc} />
    ).toBlob();
    // saveAs(blob, `bill.pdf`);
    setIsDownload(false);
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const transformedData =
    billListData?.data?.accountRegistry?.meterAccount?.Bill?.map((bill) => ({
      ...billListData.data.accountRegistry,
      bill,
      billingPeriod:
        bill.fromDate && bill.toDate
          ? `${format(new Date(bill.fromDate), "MMM dd yyyy")} to ${format(
              new Date(bill.toDate),
              "MMM dd yyyy"
            )}`
          : "-",
    })) || [];

  console.log("Transformed Data:", transformedData);
  const getRows = useCallback(
    (id: number) => {
      router.push(`/statement-of-accounts/account-details/${id}`);
      setSelectedUserId(id);
      console.log(id);
    },
    [router, setSelectedUserId] // Add setSelectedUserId here
  );

  const [accountData, setAccountData] =
    useState<SigleAccountRegistriesResponse | null>(null);

  useEffect(() => {
    if (selectedUserId && SingleAccountData) {
      setAccountData(SingleAccountData);
    }
  }, [selectedUserId, SingleAccountData]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "referenceNumber",
        accessorKey: "bill.referenceNumber",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reference Number
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => row.original.bill.referenceNumber || "-",
      },
      {
        id: "billingPeriod",
        accessorKey: "billingPeriod",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Billing Period
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => row.original.billingPeriod || "-",
      },
      {
        id: "billDate",
        accessorKey: "bill.billDate",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Bill Date
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) =>
          row.original.bill.billDate
            ? format(new Date(row.original.bill.billDate), "MMM/dd/yyyy")
            : "-",
      },
      {
        id: "dueDate",
        accessorKey: "bill.dueDate",
        header: ({ column }) => (
          <Button
            className="text-xs"
            variant="table"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) =>
          row.original.bill.dueDate
            ? format(new Date(row.original.bill.dueDate), "MMM/dd/yyyy")
            : "-",
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-center py-1">
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

              onClick={() =>
                downloadBillPDF(row.original.bill, row.original.meterAccount)
              }
            >
              <DownloadIcons />
            </Button>
          </div>
        ),
      },
    ],
    [getRows]
  );

  return (
    <>
      <div className="w-full px-10">
        <div className="w-full mx-auto">
          <div className="w-full border border-[#C9C9C9] rounded-3xl p-4 relative">
            {accountLoading && (
              <div className="absolute top-0 left-0 h-full w-full z-50 bg-white bg-opacity-90 text-black font-semibold text-xl flex justify-center items-center">
                Please Wait...
              </div>
            )}
            <h1 className="text-xl font-bold">Personal Details</h1>
            <div className="flex flex-col">
              {accountData && accountData.data ? (
                <div className="flex flex-col">
                  <div className="grid grid-cols-3  mb-4 py-4">
                    <div>
                      <h1 className="text-xs text-[#272829]">Account No.</h1>
                      <h1 className="text-xs">
                        {accountData.data.meterAccount.meterNumber || ""}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-[#272829]">Customer Name</h1>
                      <h1 className="text-xs">
                        {[
                          accountData.data.user.first_name,
                          accountData.data.user.middle_name,
                          accountData.data.user.last_name,
                        ]
                          .filter(Boolean)
                          .join(" ") || ""}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-[#272829]">Customer Type</h1>
                      <h1 className="text-xs">
                        {accountData.data.meterAccount.customerType || ""}
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-3   mb-4">
                    <div>
                      <h1 className="text-xs text-[#272829]">Contact No.</h1>
                      <h1 className="text-xs">
                        {accountData.data.user.contact_number || ""}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-[#272829]">Address</h1>
                      <h1 className="text-xs">
                        {accountData.data.user.address}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-[#272829]">Email</h1>
                      <h1 className="text-xs">
                        {accountData.data.user.email || ""}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <div>No data available.</div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <DataTable
              page={page}
              setPage={setPage}
              displayPagination
              loading={billLoading}
              columns={columns}
              data={transformedData}
              rowClassName="text-xs text-center"
              wrapperClassName="text-center"
              showHeader={true}
              headerTitle="List of Statement of Account"
            />
          </div>
        </div>
      </div>
    </>
  );
}
