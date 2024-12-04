// utils/custom hooks/auth/useResetPassword.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { toast } from "sonner";

type PayloadProps = {
  token: string;
  newPassword: string;
};

const useResetPassword = () => {
  const queryClient = useQueryClient();

  const submitPayload = async (data: PayloadProps) => {
    try {
      const res = await apiAuth.post("/admin/reset", data);
      const token = res.data?.token;
      if (res.status === 200) {
        toast.success("Password reset successful!");
      }
    } catch (error: any) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: submitPayload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-forgot-password"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message || "An error occurred"}`);
    },
    networkMode: "always",
  });
};

export default useResetPassword;
