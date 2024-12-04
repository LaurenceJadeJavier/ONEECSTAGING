"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { useCoopRoleTable } from "../../../../../utils/custom hooks/coor/useCoorItems";
import { useRole } from "../../../../../utils/custom hooks/auth/useAuth";
import { Role } from "../../../../../types/useCoorTypes";
import { useRouter } from "next/navigation";

export default function RoleManagementPage() {
  const router = useRouter();

  const { data: userData, isLoading: RoleLoading } = useRole();
  const isSuperAdmin = userData?.data?.coordinatorRole === "COOPSUPERADMIN";
  const hasDeletePermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("delete"));
  const hasEditPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("edit"));
  const hasViewPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("view"));
  const hasAddPermission =
    isSuperAdmin ||
    userData?.data?.roles?.some((role) => role.permissions.includes("add"));
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(() => {
    return {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
    };
  }, [page]);

  const handleViewNavigate = (id: number) => {
    router.push(`role-details/${id}`);
  };

  const { data: roles, isLoading } = useCoopRoleTable(pagination);
  const column = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              className="text-xs"
              variant="table"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Id
              <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              className="text-xs"
              variant="table"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Role Name
              <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
          );
        },
      },

      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          return (
            <div>
              <Button
                variant={"outline"}
                size={"sm"}
                className="text-xs p-2"
                onClick={() => handleViewNavigate(row.original.id)}
              >
                View Details
              </Button>
            </div>
          );
        },
      },
    ],
    [hasViewPermission, hasEditPermission, hasDeletePermission]
  );

  const handleOpenModal = () => {
    router.push("/add-role");
  };

  return (
    <>
      <div className=" w-full px-10  ">
        <div className="w-full mx-auto  ">
          <DataTable
            buttonIshow={hasAddPermission}
            buttonName="Add Role"
            openFormAction={handleOpenModal}
            displayPagination
            columns={column}
            data={roles?.roles ?? []}
            wrapperClassName="text-center"
            rowClassName="text-xs text-center"
            page={page}
            loading={isLoading}
            setPage={setPage}
            total={roles?.totalCount}
            headerTitle="User Role"
            showHeader={true}
          />
        </div>
      </div>
    </>
  );
}
