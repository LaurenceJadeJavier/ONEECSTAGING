import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../apiAuth";
import { toast } from "sonner";

export const useCoorForgotPassword = () => {
  const queryClient = useQueryClient();

  const submitPayload = async (data: any) => {
    try {
      const res = await apiAuth.post("/coor/forgot", data);
      if (res.status === 200) {
        console.log(res.status);
      }
    } catch (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: submitPayload,
    onSuccess: () => {
      // toast.success("Password Reset Link sent successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-forgot-password"] });
    },
    onError: (err: any) => {
      toast.error(`Email not found `);
    },
    networkMode: "always",
  });
};
