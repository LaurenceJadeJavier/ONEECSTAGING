export interface CoorRoleResponse {
  status: string;
  message: string;
  data: {
    coordinatorRole: string;
    roles: Array<{
      id: number;
      name: string;
      permissions: string[];
      modules: string[];
    }>;
  };
  code: number;
}
