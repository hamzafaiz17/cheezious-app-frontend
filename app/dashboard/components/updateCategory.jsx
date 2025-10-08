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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import updateCategory from "../api/update-category";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
export function UpdateCategory({ categoryID, item, setCategories }) {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "categories/" + categoryID;

  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let [category, seCategory] = useState({
    title: "",
    description: "",
    image: null,
  });

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
  useEffect(() => {
    if (open) {
      seCategory({
        title: item.title || "",
        description: item.description || "",
        image: item.image || null,
      });
      setSelectedImage(item.image);
    }
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"py-2 px-4 font-bold cursor-pointer"}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Make sure All Required Fields are Filed
          </DialogDescription>
        </DialogHeader>
        <form encType="multipart/form-data">
          <div className="grid gap-4 py-4">
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
                  <span className="text-gray-400 text-sm">Click to select</span>
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
                name="title"
                onChange={(e) =>
                  seCategory({
                    ...category,
                    title: e.target.value,
                  })
                }
                defaultValue={item.title}
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
                  seCategory({
                    ...category,
                    image: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Description
              </Label>
              <Input
                className="col-span-3"
                name="description"
                type={"text"}
                onChange={(e) =>
                  seCategory({
                    ...category,
                    description: e.target.value,
                  })
                }
                defaultValue={item.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="py-3 px-4 font-bold uppercase cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                updateCategory(apiEndpoint, category, {
                  setLoading,
                  setCategories,
                  onSuccess: () => setOpen(false),
                });
              }}
              disabled={loading}
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
