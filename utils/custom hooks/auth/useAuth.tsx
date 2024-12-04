"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

import apiAuth from "../../apiAuth";
import { useEffect, useState } from "react";
import { CoorRoleResponse } from "../../../types/useGetRoleTypes";
import { toast } from "sonner";

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (lockoutTime === 0) {
      setIsLockedOut(false);
    }
  }, [lockoutTime]);

  const addData = async (data: any) => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const res = await apiAuth.post("/admin/authenticate/", data);
      const token = res.data?.data?.token;
      if (res.status === 200 && token) {
        setCookie("token", token);
        // console.log("Token set in cookies");
        router.push("/coop-accounts");
      } else {
        throw new Error("Error logging in");
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        setIsLockedOut(true);
        setLockoutTime(60); // Set lockout time to 60 seconds
        // toast.error("Too many attempts. Please wait for 60 seconds.");
      } else {
        throw error;
      }
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
    networkMode: "always",
  });

  return {
    ...mutation,
    isLockedOut,
    lockoutTime,
  };
};

const fetchRole = async (): Promise<CoorRoleResponse> => {
  const token = getCookie("token");
  const response = await apiAuth.get<CoorRoleResponse>("/role/roleCoor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useRole = (): UseQueryResult<CoorRoleResponse, Error> => {
  return useQuery({
    queryKey: ["login"],
    queryFn: fetchRole,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    networkMode: "always",
  });
};
