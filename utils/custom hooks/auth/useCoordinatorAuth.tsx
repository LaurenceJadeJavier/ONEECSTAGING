import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

import apiAuth from "../../apiAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCoorLogin = () => {
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
      const res = await apiAuth.post("/coor/authenticate/", data);
      const token = res.data?.data?.token;
      if (res.status === 200 && token) {
        setCookie("token", token);
        // console.log("Token set in cookies");
        router.push("/role-management");
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

export const useCoorLogout = async (token: string) => {
  try {
    const response = await apiAuth.post("/coor/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
    return response;
  } catch (error: any) {
    throw Error(error.response?.data?.message || "Logout failed");
  }
};
