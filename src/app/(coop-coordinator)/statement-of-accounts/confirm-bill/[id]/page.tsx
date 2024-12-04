"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../../../../assets/image/logo.png";
import { useEffect, useState } from "react";
import { SigleAccountRegistriesResponse } from "../../../../../../types/useGetSingleAccountTypes";
import { useSelectedUser } from "../../../../../../utils/contextProvider";
import {
  useCreateBill,
  useGetSingleAccount,
} from "../../../../../../utils/custom hooks/soa/useSOAItems";
import { z } from "zod";
import { useCreateBillSchema } from "../../../../../../utils/schema/coordinator/useCreateBillSchema";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

type billValues = z.infer<typeof useCreateBillSchema>;

export default function ConfirmBill() {
  const router = useRouter();
  const form = useForm<billValues>({
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      dueDate: undefined,
      kwhConsume: 0,
      rate: 0,
      distribution: 0,
      generation: 0,
      sLoss: 0,
      transmission: 0,
      subsidies: 0,
      gTax: 0,
      fitAll: 0,
      applied: 0,
      other: 0,
      uCharges: 0,
      nextDate: undefined,
      billDate: undefined,
      readingDate: undefined,
    },
    resolver: zodResolver(useCreateBillSchema),
  });
  const { selectedUserId } = useSelectedUser();
  const {
    data: SingleAccountData,
    isLoading,
    isError,
  } = useGetSingleAccount(selectedUserId ?? 0);

  const [accountData, setAccountData] =
    useState<SigleAccountRegistriesResponse | null>(null);
  const [billData, setBillData] = useState<any>(null);

  const { mutate, isPending } = useCreateBill();

  useEffect(() => {
    const storedBillData = sessionStorage.getItem("billData");
    if (storedBillData) {
      setBillData(JSON.parse(storedBillData));
    }
  }, []);

  useEffect(() => {
    if (selectedUserId && SingleAccountData) {
      setAccountData(SingleAccountData);
    }
  }, [selectedUserId, SingleAccountData]);

  useEffect(() => {
    if (billData) {
      form.reset({
        fromDate: billData?.formattedFromDate,
        toDate: billData?.formattedToDate,
        dueDate: billData?.formattedDueDate,
        kwhConsume: billData?.kwhConsume,
        rate: billData?.rate,
        distribution: billData?.distribution,
        generation: billData?.generation,
        sLoss: billData?.sLoss,
        transmission: billData?.transmission,
        subsidies: billData?.subsidies,
        gTax: billData?.gTax,
        fitAll: billData?.fitAll,
        applied: billData?.applied,
        other: billData?.other,
        uCharges: billData?.uCharges,
        nextDate: billData?.formattedNextDate,
        billDate: billData?.formattedBillDate,
        readingDate: billData?.formattedReadingDate,
      });
    }
  }, [billData, form]);
  const handleSubmitValue = (data: billValues) => {
    mutate(
      { id: selectedUserId, payload: data },
      {
        onSuccess: () => router.push("/statement-of-accounts"),
      }
    );
    console.log("forms", data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitValue)}>
          <div className="w-full px-10">
            <div className="w-full mx-auto">
              <div className=" flex flex-row">
                <div className="w-[60%] border border-[#C9C9C9] rounded-3xl p-4 mx-auto">
                  <div className="py-2">
                    <Image src={logo} alt="logo" className="" width={160} />
                  </div>
                  <div className="space-y-1 text-sm">
                    <h1 className="font-bold">
                      Account No:{" "}
                      <span className="font-normal">
                        {accountData?.data?.userId}
                      </span>
                    </h1>
                    <h1>
                      Billing Statement No.:
                      <span>{billData?.referenceNumber}</span>
                    </h1>
                    <h1>{`${accountData?.data?.user.first_name} ${accountData?.data?.user.last_name}`}</h1>
                    <h1>{accountData?.data?.user.address}</h1>
                  </div>

                  <div className="w-full border border-[#C9C9C9] rounded-md mt-2 p-3 space-y-6">
                    <h1 className="text-xl font-bold">Personal Details</h1>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <h1>Billing Period</h1>
                        <span>{`${formatDate(
                          billData?.formattedFromDate
                        )} to ${formatDate(billData?.formattedToDate)}`}</span>
                      </div>
                      <div>
                        <h1>Bill Date</h1>
                        <span>{formatDate(billData?.formattedBillDate)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <h1>Date of Reading</h1>
                        <span>
                          {formatDate(billData?.formattedReadingDate)}
                        </span>
                      </div>
                      <div>
                        <h1>Electric Meter Number</h1>
                        <span>
                          {accountData?.data?.meterAccount.meterNumber}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <h1>Date of Next Meter Reading</h1>
                        <span>{formatDate(billData?.formattedNextDate)}</span>
                      </div>
                      <div>
                        <h1>Customer Type</h1>
                        <span>
                          {accountData?.data?.meterAccount.customerType}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <h1>Current Reading</h1>
                        <span>{formatCurrency(billData?.cRead)}</span>
                      </div>
                      <div>
                        <h1>Rate this month</h1>
                        <span>{billData?.rate}</span>
                      </div>
                      <div>
                        <h1>Actual Consumption</h1>
                        <span>{billData?.kwhConsume || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border border-[#C9C9C9] rounded-md mt-2 p-3 space-y-6 bg-[#C0EECC]">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <h1>Please Pay</h1>
                        <span>
                          {formatCurrency(billData?.totalAmount || 0)}
                        </span>
                      </div>
                      <div>
                        <h1>Due Date</h1>
                        <span>
                          {billData?.formattedDueDate
                            ? formatDate(billData.formattedDueDate)
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border border-[#C9C9C9] rounded-md mt-2 p-3 space-y-6">
                    <h1 className="text-xl font-bold">Personal Details</h1>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className=" grid grid-rows-3 space-y-2 text-sm">
                        <h1>Generation:</h1>
                        <h1>Transmission:</h1>
                        <h1>System Loss::</h1>
                        <h1>Distribution (oneEC):</h1>
                        <h1>Subsidies:</h1>
                        <h1>Government Taxes::</h1>
                        <h1>Universal Charges::</h1>
                        <h1>FiT-All::</h1>
                        <h1>Applied Charges::</h1>
                        <h1>Other Charges::</h1>
                      </div>
                      <div className=" grid grid-rows-3 space-y-2 text-sm">
                        <h1>{formatCurrency(billData?.generationCharge)}</h1>
                        <h1>{formatCurrency(billData?.transmissionCharge)}</h1>
                        <h1>{formatCurrency(billData?.systemLossCharge)}</h1>
                        <h1>{formatCurrency(billData?.distributionCharge)}</h1>
                        <h1>{formatCurrency(billData?.subsidiesCharge)}</h1>
                        <h1>{formatCurrency(billData?.governmentTax)}</h1>
                        <h1>{formatCurrency(billData?.uCharges)}</h1>
                        <h1>{formatCurrency(billData?.fitAllCharge)}</h1>
                        <h1>{formatCurrency(billData?.appliedCharge)}</h1>
                        <h1>{formatCurrency(billData?.otherCharge)}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="border border-[#74E291] bg-[#74E291] text-[#272829]"
                  >
                    {isPending ? <Spinner /> : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
