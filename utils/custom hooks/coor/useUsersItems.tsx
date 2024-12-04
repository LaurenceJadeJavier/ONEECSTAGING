"use effect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { getCookie } from "cookies-next";

import { CoorsTableData, RoleTableData } from "../../../types/useCoorTypes";
import {
  CoorData,
  GetCoorData,
  Roles,
  RolesData,
  RoleUpdatePayload,
} from "./useCoorItemsProps";
import { PaginationState } from "@tanstack/react-table";
import { toast } from "sonner";

const fetchCoorTableData = async (
  page: PaginationState
): Promise<CoorsTableData> => {
  const token = getCookie("token");
  const response = await apiAuth.get("/coor/list/coop", {
    params: {
      page: page?.pageIndex + 1,
      limit: page.pageSize ?? 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    users: response.data.data.coors,
    totalCount: response.data.data.pagination.total,
  };
};

export const useUserTable = (page: PaginationState) => {
  return useQuery({
    queryKey: ["coor-user", page],
    queryFn: () => fetchCoorTableData(page),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: "always",
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addUser = async (data: any) => {
    const token = getCookie("token");
    return await apiAuth.post(`/coor/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User successfully created");
      queryClient.invalidateQueries({ queryKey: ["coor-user"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};

export const useDeleteCoorUser = () => {
  const queryClient = useQueryClient();
  const deleteData = async (id: number) => {
    const token = getCookie("token");
    return await apiAuth.delete(`/coor/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      toast.success("Coordinator deleted successfully updated");
      queryClient.invalidateQueries({ queryKey: ["coor-user"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};

//update coordinator
export const useUpdateCoor = () => {
  const queryClient = useQueryClient();

  const updateData = async ({ id, ...payload }: any & CoorData) => {
    const token = getCookie("token");
    return await apiAuth.put(`/coor/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      toast.success("Role successfully updated");
      queryClient.invalidateQueries({ queryKey: ["coor-user"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
  });
};
//get single data

export const useGetCoor = (id: number) => {
  const fetcher = (id: number): Promise<GetCoorData> => {
    const token = getCookie("token");
    return apiAuth
      .get(`/coor/show/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data);
  };
  return useQuery({
    queryKey: ["coor-user", id],
    queryFn: () => fetcher(id),
    enabled: id > 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
