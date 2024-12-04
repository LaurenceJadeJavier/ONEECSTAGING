// TypeScript interfaces for the API response

export interface ApiResponse {
  status: string;
  message: string;
  data: UserData;
  code: number;
}

export interface UserData {
  id: number;
  userId: number;
  meterId: number;
  status: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  deletedAt: string | null; // ISO 8601 date string or null
  user: User;
  meterAccount: MeterAccount;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthdate: string; // ISO 8601 date string
  email: string;
  contact_number: string;
  gender: string;
  address: string;
  role: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  deleted_at: string | null; // ISO 8601 date string or null
}

export interface MeterAccount {
  id: number;
  coopId: number;
  meterNumber: number;
  meterAccountName: string;
  meterAddress: string;
  customerType: string;
  meterActivated: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  deletedAt: string | null; // ISO 8601 date string or null
}
