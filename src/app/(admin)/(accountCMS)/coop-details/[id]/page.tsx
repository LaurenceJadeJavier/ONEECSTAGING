"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import {
  useCoopDetails,
  useDeleteCoop,
  useUpdateCoop,
} from "../../../../../../utils/custom hooks/admin/useAddCoopAccounts";
import { useUpdateCoopAccountsSchema } from "../../../../../../utils/schema/admin/useAddCoopAccountScehma";
import { useCoopStore } from "../../../../../../utils/services/coopstore/coopStore";
import { Textarea } from "@/components/ui/textarea";
import { UpdateCoopPayload } from "../../../../../../utils/custom hooks/admin/useAdminProps";
import { toast } from "sonner";

type UpdateValues = z.infer<typeof useUpdateCoopAccountsSchema>;

export default function CoopDetails() {
  const { id } = useParams();
  const router = useRouter();
  const coopId = id as string;
  const [isEdit, setIsEdit] = useState(false);
  const { data: coopData, isLoading } = useCoopDetails(`${id}`);
  const { mutate, isPending } = useUpdateCoop();
  const { mutate: deleteCoop, isPending: deleteLoading } = useDeleteCoop();
  const setCoopDetails = useCoopStore((state) => state.setCoopDetails);

  const form = useForm<UpdateValues>({
    defaultValues: {
      address: "",
      description: "",
      name: "",
    },
    resolver: zodResolver(useUpdateCoopAccountsSchema),
  });

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    if (coopData) {
      setCoopDetails(coopData.data);
      form.reset({
        address: coopData.data.address,
        description: coopData.data.description,
        name: coopData.data.name,
      });
    }
  }, [coopData, setCoopDetails, form]);

  const handleSave = (data: UpdateValues) => {
    const payload: UpdateCoopPayload = {
      id: coopId,
      name: data.name,
      address: data.address,
      description: data.description || "",
    };

    mutate(payload, {
      onSuccess: () => {
        router.push("/coop-accounts");
      },
    });
  };
  const handleDeleteCoop = () => {
    deleteCoop(`${id}`, {
      onSuccess: () => {
        router.push("/coop-accounts");
      },
    });
  };

  return (
    <div className="w-full px-10">
      <div className="w-full">
        <div className="text-xl font-bold">
          <h1>Coop Details</h1>
          {isLoading && (
            <div className="absolute top-0 left-0 bg-green h-full w-full z-50 bg-white bg-opacity-90 text-black font-semibold text-xl flex justify-center items-center">
              Please Wait...
            </div>
          )}
          <div className="w-[40rem] px-4 py-3">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSave)}>
                <FormItem>
                  <FormLabel className="text-xs text-[#272829]">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full border border-[#C9C9C9] text-xs rounded-md"
                      {...form.register("name")}
                      readOnly={!isEdit}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-xs text-[#272829]">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full border border-[#C9C9C9] text-xs rounded-md"
                      {...form.register("address")}
                      readOnly={!isEdit}
                    />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-xs text-[#272829]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full border border-[#C9C9C9] text-xs rounded-md"
                      {...form.register("description")}
                      readOnly={!isEdit}
                    />
                  </FormControl>
                </FormItem>
                <div className="w-full grid grid-cols-5 gap-4 mt-5">
                  {isEdit && (
                    <Button
                      type="submit"
                      className="bg-[#74E291]"
                      variant={"secondary"}
                    >
                      {isPending ? "Saving..." : "Save"}
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => setIsEdit(!isEdit)}
                    className={`${
                      isEdit ? "bg-[#E27474] text-[#A11414]" : "bg-[#74E291]"
                    }`}
                    variant={"secondary"}
                  >
                    {isEdit ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    type="button"
                    className="border border-[#E27474] text-[#A11414]"
                    variant={"outline"}
                    onClick={handleDeleteCoop}
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
  );
}
