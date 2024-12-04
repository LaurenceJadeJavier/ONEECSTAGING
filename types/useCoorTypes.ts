export interface RoleTableData {
  roles: Role[];
  totalCount: number;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
  modules: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CoorsTableData {
  users: Coors[];
  totalCount: number;
}
export interface Coors {
  id: number;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  email: string;
  contact_number: string;
  coop_id: number;
  address: string | null;
  role: string;
  loginAttempts: number;
  lastLoginAttempt: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
