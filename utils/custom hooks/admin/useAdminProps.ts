export interface CoopTableData {
  totalCount: number;
  coops: Coop[];
}

export interface Coop {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CoopDetailsData {
  data: CoopDetail;
}

export interface CoopDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  contact: string;
}

export interface UpdateCoopPayload {
  id: string;
  name: string;
  description: string;
  email?: string;
  contact?: string;
  address?: string;
}
