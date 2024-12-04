import { create } from "zustand";

interface CoopDetailsData {
  data: CoopDetail;
}

interface CoopDetail {
  id: number; // Update to number
  name: string;
  description: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  contact: string;
}

interface CoopState {
  coopDetails: CoopDetail | null;
  setCoopDetails: (details: CoopDetail) => void;
}

export const useCoopStore = create<CoopState>((set) => ({
  coopDetails: null,
  setCoopDetails: (details) => set({ coopDetails: details }),
}));
