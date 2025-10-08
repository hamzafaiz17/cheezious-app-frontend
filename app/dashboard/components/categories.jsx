"use client";
import { Button } from "@/components/ui/button";
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

import { useEffect, useState, useRef } from "react";
import getCategories from "../api/get-categories";
import addCategory from "../api/add-category";
import { Loader2, Plus } from "lucide-react";
import { DeleteCategory } from "./deleteCategory";
import { UpdateCategory } from "./updateCategory";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Toaster } from "sonner";

export function Categories() {
  let [categories, setCategories] = useState([]);
  let [category, seCategory] = useState({
    title: "",
    description: "",
    image: null,
  });
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      seCategory({ ...category, image: file });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let categoryApiEndpoint = baseURL + apiVersion + "categories";
  const Categories = () => {
    getCategories(categoryApiEndpoint, setCategories);
  };

  useEffect(() => {
    Categories();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={
              "w-[150px] text-sm py-1 px-2  font-medium  cursor-pointer flex gap-1 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-sm"
            }
          >
            <Plus size={18} className="mt-[2px]" /> Create Category
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Make sure All Required Fields are Filed
            </DialogDescription>
          </DialogHeader>
          <form encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  className="col-span-3"
                  type={"file"}
                  onChange={(e) =>
                    seCategory({ ...category, image: e.target.files[0] })
                  }
                />
              </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <div
                  onClick={handleClick}
                  className="w-32 h-32  border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Click to select
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  className="col-span-3"
                  name="name"
                  onChange={(e) =>
                    seCategory({ ...category, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Description
                </Label>
                <Input
                  className="col-span-3"
                  type={"text"}
                  onChange={(e) =>
                    seCategory({ ...category, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="py-3 px-4 font-bold uppercase cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  addCategory(categoryApiEndpoint, category, {
                    setLoading,
                    setCategories,
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
                  "Add Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <img src={category.image} width={30} alt={category.title} />
              </TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <UpdateCategory
                    categoryID={category._id}
                    item={category}
                    setCategories={setCategories}
                  />
                  <DeleteCategory
                    categoryID={category._id}
                    setCategories={setCategories}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
