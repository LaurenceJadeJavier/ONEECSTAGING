"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedUserContextProps {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
}

const SelectedUserContext = createContext<SelectedUserContextProps | undefined>(
  undefined
);

export const SelectedUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedUser must be used within a SelectedUserProvider"
    );
  }
  return context;
};
