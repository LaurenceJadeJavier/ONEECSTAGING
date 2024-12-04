"use client";
import React from "react";
import SuspenseWrapper from "@/components/SuspenseWrapper"; // Adjust the import path if needed
import ResetPassword from "@/components/resetPassword";

const ResetPasswordPage: React.FC = () => {
  return (
    <SuspenseWrapper>
      <ResetPassword />
    </SuspenseWrapper>
  );
};

export default ResetPasswordPage;
