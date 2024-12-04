"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { toast } from "./ui/use-toast";
import { IdleTimerProvider, useIdleTimerContext } from "react-idle-timer";

interface ChildrenProps {
  children: React.ReactNode;
}

const IdleTimerContext = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const idle = async () => {
    try {
      const token = getCookie("token");
      const response = await api.get(`endpoints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        deleteCookie("token");
        router.push("/");
        toast({
          description: "You have been inactive for 5 minutes, logging out",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <IdleTimerProvider timeout={30000 * 1000} onIdle={idle}>
      {children}
    </IdleTimerProvider>
  );
};
export default IdleTimerContext;
