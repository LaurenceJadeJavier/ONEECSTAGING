"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  role: {
    permission: string[];
  };
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUser = () => {
      // Dummy user data with permissions
      const userData: User = {
        role: {
          permission: [
            "/role-management",
            "/users",
            "/statement-of-accounts",
            "/customer-management",
            "/approval",
          ],
        },
      };
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
