import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GetProduct from "../../api/products/get-product";
import editProduct from "../../api/products/editProduct";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditProduct({
  productId,
  products,
  setProducts,
  categories,
  setCategories,
  onSuccess,
}) {
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(false);
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "products/" + productId;

  let [updateProduct, setUpdateProduct] = useState({});
  let [imagePreview, setImagePreview] = useState("");

  const handleOnChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpdateProduct({ ...updateProduct, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    GetProduct(apiEndpoint, (data) => {
      setUpdateProduct(data);

      if (data.image && typeof data.image === "string") {
        setImagePreview(`${data.image}`);
      }
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"py-3 px-4 font-bold uppercase cursor-pointer"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
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
                  setUpdateProduct({ ...updateProduct, title: e.target.value })
                }
                value={updateProduct.title || ""}
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
                value={updateProduct.description}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
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
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="flex items-center">
                {updateProduct.image !== null ? (
                  <>
                    <img
                      src={imagePreview}
                      className="w-20"
                      alt={updateProduct.title}
                    />
                  </>
                ) : (
                  ""
                )}
                <Input
                  className="col-span-3 w-full"
                  type={"file"}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Category" className="text-right w-[100%]">
                Category*
              </Label>
              <Select
                defaultValue={updateProduct.category?._id || ""}
                onValueChange={(value) =>
                  setUpdateProduct({
                    ...updateProduct,
                    category: { _id: value },
                  })
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
                editProduct(apiEndpoint, updateProduct, {
                  setLoading,
                  setUpdateProduct,
                  products,
                  setProducts,
                  productId,
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
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
