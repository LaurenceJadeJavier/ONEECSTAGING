import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiAuth from "../../apiAuth";
import { toast } from "sonner";

const useAdminForgotPassword = () => {
  const queryClient = useQueryClient();
  const submitPayload = async (data: any) => {
    try {
      const res = await apiAuth.post("/admin/forgot", data);
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      throw error;
    }
  };
  return useMutation({
    mutationFn: submitPayload,
    onSuccess: () => {
      toast.success("Password reset link sent successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-forgot-password"] });
    },
    onError: (err: any) => {
      toast.error(`${err.response?.data?.message}`);
    },
    networkMode: "always",
  });
};
export default useAdminForgotPassword;
