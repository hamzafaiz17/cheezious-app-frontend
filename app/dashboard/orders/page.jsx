"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "sonner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import EditOrder from "../components/orders/editOrder";
import DeleteOrder from "../components/orders/deleteOrder";
import fetchOrders from "@/app/dashboard/api/orders/fetch-orders";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrdersPage() {
  let [orders, setOrders] = useState([]);
  let apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "orders";

  useEffect(() => {
    fetchOrders(apiEndpoint, orders, setOrders);
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
      accessorKey: "orderid",
      header: "Order Id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("orderid")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => row.getValue("createdAt").slice(0, 10),
    },

    {
      accessorFn: (row) => row.userid?.name ?? "Unknown",
      id: "userid",
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
        return <div className="lowercase">{row.getValue("userid")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`capitalize inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium inset-ring bg-gray-50 ${
            row.getValue("status") === "pending"
              ? "text-yellow-500 inset-ring-yellow-500"
              : row.getValue("status") === "cancelled"
              ? "text-red-500 inset-ring-red-500"
              : row.getValue("status") === "completed"
              ? "text-green-500 inset-ring-green-500"
              : ""
          }`}
        >
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: () => <div>Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalPrice"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PKR",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Dilivery",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("paymentMethod") === "cash_on_delivery"
            ? "Cash On Delivery"
            : ""}
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Items",
      cell: ({ row }) => <div>{row.getValue("products").length}</div>,
    },
    {
      id: "_id",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const orderId = row.original?._id;
        return (
          <>
            <div className="flex items-center gap-3">
              <div>
                <EditOrder
                  orderId={orderId}
                  orders={orders}
                  setOrders={setOrders}
                />
              </div>
              <div>
                <DeleteOrder
                  orderId={orderId}
                  orders={orders}
                  setOrders={setOrders}
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
    data: orders,
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
      {orders.length === 0 && (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      )}

      {orders.length > 0 && (
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search Name"
              value={table.getColumn("userid")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("userid")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
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
