import { getCookie } from "cookies-next";
import apiAuth from "../../apiAuth";

export const useLogout = async (token: string) => {
  try {
    const response = await apiAuth.post("/admin/logout", null, {
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
