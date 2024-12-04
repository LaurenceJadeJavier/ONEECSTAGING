import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { getCookie } from "cookies-next";
import {
  CoopDetail,
  CoopDetailsData,
  CoopTableData,
  UpdateCoopPayload,
} from "./useAdminProps";
import { toast } from "sonner";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

// Fetch paginated cooperative data
const fetchCoopTableData = async (
  page: PaginationState
): Promise<CoopTableData> => {
  const token = getCookie("token");
  const response = await apiAuth.get("/coop/list", {
    params: {
      page: page.pageIndex + 1,
      limit: page.pageSize ?? 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const useCoopTable = (page: PaginationState) => {
  return useQuery({
    queryKey: ["coops", page.pageIndex, page.pageSize],
    queryFn: () => fetchCoopTableData(page),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useAddCoopAccounts = () => {
  const queryClient = useQueryClient();

  const addData = async (data: any) => {
    const token = getCookie("token");
    return await apiAuth.post(`/coop/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: addData,
    onSuccess: () => {
      toast.success("Coop successfully created");
      queryClient.invalidateQueries({ queryKey: ["coops"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
  });
};

// Fetch cooperative details
export const useCoopDetails = (id: string) => {
  const fetcher = (id: string): Promise<CoopDetailsData> => {
    const token = getCookie("token");
    return apiAuth
      .get(`/coop/show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  };

  return useQuery({
    queryKey: ["coops", id],
    queryFn: () => fetcher(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

// Update cooperative account
export const useUpdateCoop = () => {
  const queryClient = useQueryClient();

  const updateData = async ({ id, ...data }: UpdateCoopPayload) => {
    const token = getCookie("token");
    return await apiAuth.put(`/coop/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      toast.success("Coop successfully updated");
      queryClient.invalidateQueries({ queryKey: ["coops"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
  });
};

// Delete cooperative account
export const useDeleteCoop = () => {
  const queryClient = useQueryClient();

  const deleteData = async (id: string) => {
    const token = getCookie("token");
    return await apiAuth.delete(`/coop/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      toast.success("Coop deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["coops"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
  });
};

// Change admin password
type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useAdminChangePassword = () => {
  const queryClient = useQueryClient();

  const changePassword = async (data: ChangePasswordPayload) => {
    const token = getCookie("token");
    return await apiAuth.put(`/admin/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password successfully updated");
      queryClient.invalidateQueries({ queryKey: ["admin-forgot-password"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
  });
};
