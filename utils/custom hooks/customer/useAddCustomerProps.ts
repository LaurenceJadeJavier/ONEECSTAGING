export interface Customer {
  UserData: CustomerData;
  meterData: MeterAccountData;
}

export interface CustomerData {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  birthdate?: string;
  email: string;
  contact_number?: string | null;
  gender?: string | null;
  address?: string | null;
}

export interface MeterAccountData {
  meterNumber: number;
  customerType?: string;
  meterActivated: boolean;
}
