"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GetProducts from "../../api/products/get-products";
import getCategories from "../../api/get-categories";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AddProductAPI from "../../api/products/addProduct";
import { Toaster } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { getColumns } from "./productTable";

export default function ProductsDashboard() {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "products";
  let categoryApiEndpoint = baseURL + apiVersion + "categories";
  let [products, setProducts] = useState([]);
  let [addProduct, setAddProduct] = useState([
    {
      title: "",
      description: "",
      price: 0,
      userid: "",
      category: "",
      image: null,
    },
  ]);
  let [categories, setCategories] = useState([
    {
      _id: "",
      title: "",
      description: "",
      image: "",
    },
  ]);

  const columns = getColumns({
    products,
    setProducts,
    categories,
    setCategories,
  });

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // let GetCategories = async () => {
  //   getCategories();
  // };

  useEffect(() => {
    GetProducts(apiEndpoint, setProducts);
    getCategories(categoryApiEndpoint, setCategories);
  }, []);
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={
              " text-sm py-1 px-2  font-medium  cursor-pointer flex gap-1 items-center justify-center bg-gray-100 hover:bg-gray-200  rounded-sm"
            }
          >
            <Plus size={18} className="mt-[2px]" /> Create Product
          </button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Make sure All Required Fields are Filed
            </DialogDescription>
          </DialogHeader>
          <form encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title*
                </Label>
                <Input
                  className="col-span-3"
                  name="name"
                  onChange={(e) =>
                    setAddProduct({ ...addProduct, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Description
                </Label>
                <Textarea
                  className="col-span-3"
                  type={"text"}
                  onChange={(e) =>
                    setAddProduct({
                      ...addProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Price*
                </Label>
                <Input
                  className="col-span-3"
                  type={"number"}
                  onChange={(e) =>
                    setAddProduct({ ...addProduct, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  className="col-span-3"
                  type={"file"}
                  onChange={(e) =>
                    setAddProduct({ ...addProduct, image: e.target.files[0] })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Category" className="text-right w-[100%]">
                  Category*
                </Label>
                <Select
                  value={addProduct.category || ""}
                  onValueChange={(value) =>
                    setAddProduct({ ...addProduct, category: value })
                  }
                >
                  <SelectTrigger className="sm:w-[100%] md:w-[485px]">
                    <SelectValue placeholder="-- Select Category --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((item, i) => (
                        <SelectItem key={i} value={item._id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="py-3 px-4 font-bold uppercase cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  AddProductAPI(apiEndpoint, addProduct, {
                    setLoading,
                    setProducts,
                    onSuccess: () => setOpen(false),
                  });
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Add Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Products"
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
            {table.getRowModel().rows.length ? (
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
        <div className="flex-1 text-sm text-muted-foreground">
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
  );
}
