"use client";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useCreateBillSchema } from "../../../../../utils/schema/coordinator/useCreateBillSchema";

import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigleAccountRegistriesResponse } from "../../../../../types/useGetSingleAccountTypes";
import { useSelectedUser } from "../../../../../utils/contextProvider";
import {
  useCalculateBill,
  useGetSingleAccount,
} from "../../../../../utils/custom hooks/soa/useSOAItems";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
type FormValues = z.infer<typeof useCreateBillSchema>;
type BillValues = z.infer<typeof useCreateBillSchema>;
export default function SOAId() {
  const router = useRouter();

  const { selectedUserId } = useSelectedUser();
  const [accountData, setAccountData] =
    useState<SigleAccountRegistriesResponse | null>(null);
  const { mutate, isSuccess, isPending } = useCalculateBill();
  const form = useForm<FormValues>({
    defaultValues: {},
  });
  const billForm = useForm<BillValues>({
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

  const {
    data: SingleAccountData,
    isLoading,
    isError,
  } = useGetSingleAccount(selectedUserId ?? 0);

  useEffect(() => {
    if (selectedUserId && SingleAccountData) {
      setAccountData(SingleAccountData);
    }
  }, [selectedUserId, SingleAccountData]);
  const handleSubmitValue = (data: FormValues) => {
    mutate(
      { id: selectedUserId, payload: data },
      {
        onSuccess: (responseData) => {
          z;
          // Store response data in sessionStorage
          console.log("reponse data", responseData);
          sessionStorage.setItem("billData", JSON.stringify(responseData.data));
          router.push(`/statement-of-accounts/confirm-bill/${selectedUserId}`);
        },
      }
    );

    console.log("test", data);
  };
  return (
    <FormProvider {...form}>
      <div className="w-full px-10">
        <div className="w-full mx-auto">
          <div className="w-full border border-[#C9C9C9] rounded-3xl p-4">
            {isLoading && (
              <div className="absolute top-0 left-0 bg-green h-full w-full z-50 bg-white bg-opacity-90 text-black font-semibold text-xl flex justify-center items-center">
                Please Wait...
              </div>
            )}
            <h1 className="text-xl font-bold">Personal Details</h1>
            <div className="flex flex-col">
              {accountData && accountData.data ? (
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Account No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                          value={
                            accountData.data.meterAccount.meterNumber || ""
                          }
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                          value={
                            [
                              accountData.data.user.first_name,
                              accountData.data.user.middle_name,
                              accountData.data.user.last_name,
                            ]
                              .filter(Boolean)
                              .join(" ") || ""
                          }
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Contact No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                          value={accountData.data.user.contact_number || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                          value={accountData.data.user.address || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                    <FormItem>
                      <FormLabel className="text-xs text-[#272829]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-[#C9C9C9] text-xs bg-[#DDDDDD]"
                          value={accountData.data.user.email || ""}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                </form>
              ) : (
                <div>No data available.</div>
              )}
            </div>
          </div>
          <Form {...billForm}>
            <form onSubmit={billForm.handleSubmit(handleSubmitValue)}>
              <div className="w-full border border-[#C9C9C9] rounded-3xl p-4 mt-4">
                <h1 className="text-xl font-bold">Personal Details</h1>
                <div className="w-full">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <FormField
                      control={billForm.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Due Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={billForm.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Billing Period Start Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={billForm.control}
                      name="toDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Billing Period End Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <FormField
                      control={billForm.control}
                      name="billDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Bill Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={billForm.control}
                      name="readingDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Date of Meter Reading
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={billForm.control}
                      name="nextDate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col mt-4">
                          <FormLabel className="text-xs mr-2">
                            Date of Next Meter Reading
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full border border-[#C9C9C9] text-xs",
                                    !field.value &&
                                      "w-full border border-[#C9C9C9] text-xs"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span></span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(
                                      date.toISOString().split("T")[0]
                                    ); // Convert to 'YYYY-MM-DD'
                                  } else {
                                    field.onChange(""); // Handle clearing the date
                                  }
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <FormField
                      control={billForm.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col">
                          <FormLabel className="text-xs text-[#272829]">
                            Rate this Month
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="any" // Allow decimal values if needed
                              className="w-full border border-[#C9C9C9] text-xs"
                              onChange={(e) => {
                                // Convert input value to number and handle validation
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                  field.onChange(value);
                                } else {
                                  field.onChange(""); // Clear or handle invalid input
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={billForm.control}
                      name="kwhConsume"
                      render={({ field }) => (
                        <FormItem className="w-full flex flex-col">
                          <FormLabel className="text-xs text-[#272829]">
                            Actual Consumption
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="any" // Allow decimal values if needed
                              className="w-full border border-[#C9C9C9] text-xs"
                              onChange={(e) => {
                                // Convert input value to number and handle validation
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                  field.onChange(value);
                                } else {
                                  field.onChange(""); // Clear or handle invalid input
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border border-[#C9C9C9] rounded-3xl p-4 mt-4">
                <h1 className="text-xl font-bold">Bill Computation Summary</h1>
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-11">
                    <div className="w-full py-2">
                      <FormField
                        control={billForm.control}
                        name="generation"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-col">
                            <FormLabel className="text-xs text-[#272829]">
                              Generation
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="transmission"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-col">
                            <FormLabel className="text-xs text-[#272829]">
                              Transmission
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="sLoss"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-col">
                            <FormLabel className="text-xs text-[#272829]">
                              System Loss
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="distribution"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-col">
                            <FormLabel className="text-xs text-[#272829]">
                              Distribution (oneEC)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="subsidies"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-col">
                            <FormLabel className="text-xs text-[#272829]">
                              Subsidies
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full py-2">
                      <FormField
                        control={billForm.control}
                        name="gTax"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-row  items-center ">
                            <FormLabel className="text-xs text-[#272829] w-1/2">
                              Government Taxes
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="uCharges"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-row items-center ">
                            <FormLabel className="text-xs text-[#272829] w-1/2 ">
                              Universal Charges
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="fitAll"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-row items-center ">
                            <FormLabel className="text-xs text-[#272829] w-1/2">
                              FiT-All
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="applied"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-row items-center ">
                            <FormLabel className="text-xs text-[#272829] w-1/2">
                              Applied Charges
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={billForm.control}
                        name="other"
                        render={({ field }) => (
                          <FormItem className="w-full flex flex-row items-center ">
                            <FormLabel className="text-xs text-[#272829] w-1/2">
                              Other Charges
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any" // Allow decimal values if needed
                                className="w-full border border-[#C9C9C9] text-xs"
                                onChange={(e) => {
                                  // Convert input value to number and handle validation
                                  const value = parseFloat(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(""); // Clear or handle invalid input
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className=" text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <hr className="bg-[#C9C9C9] py-[1px]" />
                </div>
                <div className="mt-4">
                  <h1 className="font-bold text-sm">Total Amount Due:</h1>
                </div>
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
                  className="w-auto bg-[#74E291] text-[#272829]"
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
    </FormProvider>
  );
}
