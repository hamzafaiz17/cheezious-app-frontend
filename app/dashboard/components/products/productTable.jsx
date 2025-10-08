// columns.js
import UpdateProduct from "./editProduct";
import { DeleteProduct } from "./deleteProduct";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  {
    id: "_id",
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
    accessorKey: "serial",
    header: "#",
    cell: ({ row }) => {
      const id = row.index + 1;
      console.log(id);
      return <span>{id}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const img =
        row.getValue("image") ?? "/uploads/images/product-placeholder.webp";
      return (
        <img
          src={img}
          alt="Product"
          className="h-12 w-12 rounded object-contain me-auto"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        style={{ paddingLeft: "0" }}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const proCategory = row.original?.category?.title ?? "N/A";
      return <div>{proCategory}</div>;
    },
  },
  {
    accessorKey: "Author",
    header: () => <div>Author</div>,
    cell: ({ row }) => {
      const Author = row.original?.userid?.name ?? "N/A";
      return <div>{Author}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => {
      const rating = row.original.rating?.rate ?? "N/A";
      return <div className="">{rating}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PKR",
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      let productId = row.original._id;
      return (
        <div className="text-right font-medium flex gap-2">
          <div>
            <UpdateProduct productId={productId} />
          </div>
          <div>
            <DeleteProduct productId={productId} />
          </div>
        </div>
      );
    },
  },
];
export const getColumns = ({
  products,
  setProducts,
  categories,
  setCategories,
}) => [
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
    accessorKey: "serial",
    header: "#",
    cell: ({ row }) => {
      const id = row.index + 1;
      return <span>{id}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const img =
        row.getValue("image") ?? "/uploads/images/product-placeholder.webp";
      return (
        <img
          src={img}
          alt="Product"
          className="h-12 w-12 rounded object-contain me-auto"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        style={{ paddingLeft: "0" }}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      const proCategory = row.original?.category?.title ?? "N/A";
      return <div>{proCategory}</div>;
    },
  },
  {
    accessorKey: "Author",
    header: () => <div>Author</div>,
    cell: ({ row }) => {
      const Author = row.original?.userid?.name ?? "N/A";
      return <div>{Author}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => {
      const rating = row.original.rating?.rate ?? "N/A";
      return <div className="">{rating}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PKR",
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      let productId = row.original._id;

      return (
        <div className="text-right font-medium flex gap-2">
          <div>
            <UpdateProduct
              productId={productId}
              setProducts={setProducts}
              products={products}
              categories={categories}
              setCategories={setCategories}
            />
          </div>
          <div>
            <DeleteProduct
              productId={productId}
              setProducts={setProducts}
              products={products}
            />
          </div>
        </div>
      );
    },
  },
];
