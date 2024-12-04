import { Role } from "../../../types/useCoorTypes";

export interface RoleUpdatePayload {
  name: string;
  permissions: string[]; // Array of permissions  "edit", "delete"
  modules: string[]; // Array of modules  "dashboard", "settings"
}

export interface RolesData {
  data: Role;
}

export interface Roles {
  id: number;
  name: string;
  permissions: string[];
  modules: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CoorData {
  data: Coor;
  roleIds: number[];
}

export interface Coor {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
  address: string;
}

export interface GetCoorData {
  data: CoorGetData;
}

export interface CoorGetData {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  coop_id: number;
  address: string;
  role: string;
  loginAttempts: number;
  lastLoginAttempt: string | null; // Can be ISO 8601 string or null
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  deleted_at: string | null; // Can be ISO 8601 string or null
}
