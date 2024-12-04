export interface BillResponse {
  status: string;
  message: string;
  data: {
    accountRegistry: Ar; // Changed from Ar[] to Ar
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  code: number;
}

export interface Ar {
  id: number;
  userId: number;
  meterId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  meterAccount: MeterAccount;
  user: User;
}

export interface MeterAccount {
  id: number;
  coopId: number;
  meterNumber: number;
  meterAccountName: string;
  meterAddress: string;
  customerType: string;
  meterActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  Bill: Bill[];
}

export interface Bill {
  id: number;
  meterAccountId: number;
  fromDate: Date;
  toDate: Date;
  nextDate: Date;
  billDate: Date;
  readingDate: Date;
  cRead: number;
  pRead: number;
  kwhConsume: number;
  distribution: number;
  generation: number;
  sLoss: number;
  transmission: number;
  subsidies: number;
  gTax: number;
  fitAll: number;
  applied: number;
  other: number;
  uCharges: number;
  rate: number;
  amount: number;
  referenceNumber: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  prevBill: number;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthdate: Date;
  email: string;
  contact_number: string;
  gender: string;
  address: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
