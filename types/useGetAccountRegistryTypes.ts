export interface AccountRegistriesResponse {
  status?: string;
  message?: string;
  data?: AccountRegistriesData;
  code?: number;
}

export interface AccountRegistriesData {
  ar: AccountRegistry[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AccountRegistry {
  id: number;
  userId: number;
  meterId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
  meterAccount: MeterAccount;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  birthdate: string;
  email: string;
  contact_number: string;
  gender: string;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MeterAccount {
  id: number;
  coopId: number;
  meterNumber: number;
  meterAccountName: string;
  meterAddress: string;
  customerType: string;
  meterActivated: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
