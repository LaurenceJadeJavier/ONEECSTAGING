import { getCookie } from "cookies-next";
import { BillResponse } from "../../../types/useBillListTypes";
import apiAuth from "../../apiAuth";
import { useQuery } from "@tanstack/react-query";
import { SingleBill } from "./useGetSingleBill";
import {
  BillData,
  BillDataResponse,
  PDFBillResponse,
} from "../../../types/usePdfTypes";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export const useGetBillList = (id: number, page: PaginationState) => {
  const fetcher = (
    id: number,
    page: PaginationState
  ): Promise<BillResponse> => {
    const token = getCookie("token");
    return apiAuth
      .get(`/bill/list/${id}`, {
        params: {
          page: page.pageIndex + 1,
          limit: page.pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Raw API Response:", res.data);
        return res.data;
      });
  };

  return useQuery({
    queryKey: ["bill-list", id, page.pageIndex, page.pageSize],
    queryFn: () => fetcher(id, page),
    enabled: id > 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

//////////////////
export const useGetSingleBill = (id: number) => {
  const billfetcher = async (id: number): Promise<PDFBillResponse> => {
    const token = getCookie("token");
    try {
      const response = await apiAuth.get(`/bill/show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Raw Single Bill Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching bill data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["bill-show", id],
    queryFn: () => billfetcher(id),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
