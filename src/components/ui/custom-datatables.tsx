"use client";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  displayPagination: boolean;
  page?: PaginationState;
  total?: number | undefined;
  rowClassName?: string;
  wrapperClassName?: string;
  setPage?: React.Dispatch<React.SetStateAction<PaginationState>>;
  openFormAction?: () => void;
  buttonName?: string;
  buttonIshow?: boolean;
  showHeader?: boolean;
  headerTitle?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  displayPagination,
  page,
  total = 100,
  rowClassName,
  wrapperClassName,
  openFormAction,
  buttonName,
  buttonIshow,
  showHeader,
  headerTitle,
  setPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(total / (page?.pageSize ?? 5)),
    onPaginationChange: setPage,
    state: {
      sorting,
      columnVisibility: {},
      pagination: {
        pageIndex: page?.pageIndex ?? 0,
        pageSize: page?.pageSize ?? 5,
      },
    },
    manualPagination: true,
  });

  return (
    <>
      <div className={cn("space-y-2", wrapperClassName)}>
        <div className="border border-t-0 rounded-b-md">
          {loading && (
            <div className="absolute top-0 left-0 bg-green h-full w-full z-50 bg-white bg-opacity-90 text-black font-semibold text-xl flex justify-center items-center">
              Please Wait...
            </div>
          )}
          {(showHeader || buttonIshow) && (
            <div className="flex flex-row justify-between py-4 border border-b-0 rounded-t-xl overflow-auto">
              <div className="text-xl font-bold">
                <h1 className="px-4 py-3">{headerTitle}</h1>
              </div>
              <div className="flex flex-row gap-2 px-4">
                {buttonIshow && (
                  <>
                    <Button
                      variant={"outline"}
                      className="border border-[#74E291]"
                    >
                      Filter by
                    </Button>
                    <Button
                      className="bg-[#74E291] text-[#272829]"
                      variant={"outline"}
                      onClick={openFormAction}
                    >
                      {buttonName}
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={rowClassName}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className={rowClassName}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={rowClassName}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {displayPagination && (
          <div className="mr-10">
            <div className="flex items-center space-x-2 justify-end mt-2">
              <div className="flex w-[100px] items-center justify-center text-xs font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage() || loading}
                size="icon"
              >
                <RxDoubleArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || loading}
                size="icon"
              >
                <RxChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || loading}
                size="icon"
              >
                <RxChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-6 w-6 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage() || loading}
                size="icon"
              >
                <RxDoubleArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
