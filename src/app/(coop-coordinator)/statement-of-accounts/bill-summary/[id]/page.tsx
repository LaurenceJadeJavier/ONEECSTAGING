"use client";

import { useEffect } from "react";
import { useSelectedUser } from "../../../../../../utils/contextProvider";

export default function BillSummaryPage() {
  const { selectedUserId } = useSelectedUser();

  useEffect(() => {
    console.log("Selected User ID in BillSummaryPage:", selectedUserId);
  }, [selectedUserId]);

  return (
    <>
      <div>
        <h1>Bill Summary</h1>
        <div>Selected User ID: {selectedUserId}</div>
      </div>
    </>
  );
}
