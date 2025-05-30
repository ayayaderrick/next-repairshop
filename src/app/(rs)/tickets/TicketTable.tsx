"use client";

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
  CircleCheckIcon,
  CircleXIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Filter from "@/components/react-table/Filter";
import { useState } from "react";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

const TicketTable = ({ data }: Props) => {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ticketDate", desc: false },
  ]);

  const columnHeadersArray: Array<keyof RowType> = [
    "ticketDate",
    "title",
    "tech",
    "firstName",
    "lastName",
    "email",
    "completed",
  ];

  const columnHelper = createColumnHelper<RowType>();

  const columns = columnHeadersArray.map((columnName) =>
    columnHelper.accessor(
      (row) => {
        //transform data
        const value = row[columnName];
        if (columnName === "ticketDate" && value instanceof Date) {
          return value.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        if (columnName === "completed") {
          return value ? "COMPLETED" : "OPEN";
        }
        return value;
      },
      {
        id: columnName,
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              className="pl-1 w-full justify-between"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {columnName[0].toUpperCase() + columnName.slice(1)}
              {column.getIsSorted() === "asc" && (
                <ArrowUp className="ml-2 w-4 h-4" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowDown className="ml-2 w-4 h-4" />
              )}
              {column.getIsSorted() !== "desc" &&
                column.getIsSorted() !== "asc" && (
                  <ArrowUpDown className="ml-2 w-4 h-4" />
                )}
            </Button>
          );
        },
        cell: ({ getValue }) => {
          //present data
          const value = getValue();
          if (columnName === "completed") {
            return (
              <div className="grid place-content-center">
                {value === "OPEN" ? (
                  <CircleXIcon className="text-red-600/60" />
                ) : (
                  <CircleCheckIcon className="text-green-600" />
                )}
              </div>
            );
          }
          return value;
        },
      }
    )
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="space-y-2 py-2">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() =>
                  router.push(`/tickets/form?ticketId=${row.original.id}`)
                }
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          {table.getFilteredRowModel().rows.length} result(s) returned.
        </div>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => table.resetSorting()}
            className="cursor-pointer"
          >
            Reset Sorting
          </Button>
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="cursor-pointer"
          >
            Reset Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
