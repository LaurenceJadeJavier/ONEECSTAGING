"use effect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { getCookie } from "cookies-next";

import { toast } from "sonner";
import { CoorsTableData, RoleTableData } from "../../../types/useCoorTypes";
import { Roles, RolesData, RoleUpdatePayload } from "./useCoorItemsProps";

export const useAddRoles = () => {
  const queryClient = useQueryClient();

  const addData = async (data: any) => {
    const token = getCookie("token");
    return await apiAuth.post(`/role/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  return useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coor"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};
export default useAddRoles;

const fetchAllRoles = async () => {
  const token = getCookie("token");
  const response = await apiAuth.get("/role/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ["coor"],
    queryFn: () => fetchAllRoles(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: "always",
  });
};

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const fetchCoopTableData = async (
  page: PaginationState
): Promise<RoleTableData> => {
  const token = getCookie("token");
  const response = await apiAuth.get("/role/list", {
    params: {
      page: page?.pageIndex + 1,
      limit: page.pageSize ?? 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const useCoopRoleTable = (page: PaginationState) => {
  return useQuery({
    queryKey: ["coor", page],
    queryFn: () => fetchCoopTableData(page),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: "always",
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  const deleteData = async (id: number) => {
    const token = getCookie("token");
    return await apiAuth.delete(`/role/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      toast.success("Coop deleted successfully updated");
      queryClient.invalidateQueries({ queryKey: ["coor"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  const updateData = async (payload: { id: number } & RoleUpdatePayload) => {
    const token = getCookie("token");
    return await apiAuth.put(`/role/update/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coor"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};

// get all role id
export const useGetRoles = (id: number) => {
  const fetcher = (id: number): Promise<RolesData> => {
    const token = getCookie("token");
    return apiAuth
      .get(`/role/show/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data);
  };
  return useQuery({
    queryKey: ["coor", id],
    queryFn: () => fetcher(id),
    enabled: id > 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

//change password
type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export const useCoorChangePassword = () => {
  const queryClient = useQueryClient();
  const changePassword = async (data: ChangePasswordPayload) => {
    const token = getCookie("token");
    return await apiAuth.put(`/coor/change-password`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Successfully Password Updated");
      queryClient.invalidateQueries({ queryKey: ["coor"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
    networkMode: "always",
  });
};
