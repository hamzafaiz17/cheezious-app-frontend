"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FetchUsers from "../api/users/fetchUsers";
import DeleteUsercompo from "../components/users/deleteUser";
import EditUserCom from "../components/users/editUser";
import { Toaster } from "sonner";

export default function UsersPage() {
  let [users, setUsers] = useState([]);

  let apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "auth/users";

  useEffect(() => {
    FetchUsers(apiEndpoint, users, setUsers);
  }, [apiEndpoint]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        return <div className="capitalize">{Number(row.id) + 1}</div>;
      },
    },
    {
      accessorKey: "profilepic",
      header: "",
      cell: ({ row }) => {
        return (
          <img className="w-[40px] rounded" src={row.getValue("profilepic")} />
        );
      },
    },

    {
      accessorFn: (row) => row.name ?? "Unknown",
      id: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div className="lowercase">{row.getValue("name")}</div>;
      },
    },

    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`capitalize inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium inset-ring bg-gray-50 ${
            row.getValue("status") === "inactive"
              ? "text-red-500 inset-ring-red-500"
              : row.getValue("status") === "active"
              ? "text-green-500 inset-ring-green-500"
              : ""
          }`}
        >
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
      cell: ({ row }) => (
        <div>
          {row.getValue("dateOfBirth") !== null
            ? row.getValue("dateOfBirth").slice(0, 10)
            : row.getValue("dateOfBirth")}
        </div>
      ),
    },
    {
      id: "_id",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const userId = row.original?._id;
        return (
          <>
            <div className="flex items-center gap-3">
              <div>
                <EditUserCom
                  userId={userId}
                  users={users}
                  setUsers={setUsers}
                />
              </div>
              <div>
                <DeleteUsercompo
                  userId={userId}
                  users={users}
                  setUsers={setUsers}
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <Toaster />

      {users && (
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search By Name"
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm mr-5"
            />
            <Input
              placeholder="Search By Email"
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Search By Role"
              value={table.getColumn("role")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("role")?.setFilterValue(event.target.value)
              }
              className="max-w-sm ms-5"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
