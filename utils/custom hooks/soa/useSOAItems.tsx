import { getCookie } from "cookies-next";
import apiAuth from "../../apiAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserData } from "./useSOAItemsProps";
import { toast } from "sonner";

const fetchAllAccounts = async () => {
  const token = getCookie("token");
  const response = await apiAuth.get("/ar/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAllAccountRegistry = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchAllAccounts(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: "always",
  });
};

export const useGetSingleAccount = (id: number) => {
  const fetcher = (id: number): Promise<UserData> => {
    const token = getCookie("token");
    return apiAuth
      .get(`/ar/show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => fetcher(id),
    enabled: id > 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCalculateBill = () => {
  const queryClient = useQueryClient();
  const calculateBill = async ({ id, payload }: { id: any; payload: any }) => {
    const token = getCookie("token");
    const response = await apiAuth.post(`/bill/calculate/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure response.data includes bill ID
  };
  return useMutation({
    mutationFn: calculateBill,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  const createBill = async ({ id, payload }: { id: any; payload: any }) => {
    const token = getCookie("token");
    return await apiAuth.post(`/bill/create/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      toast.success("Bill Created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};
