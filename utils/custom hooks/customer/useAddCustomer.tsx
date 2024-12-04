import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { getCookie } from "cookies-next";
import { Customer } from "./useAddCustomerProps";
import { toast } from "sonner";

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  const addCustomer = async (data: any) => {
    const token = getCookie("token");
    return await apiAuth.post(`/user/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      toast.success("Customer account successfully created");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};
