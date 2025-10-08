import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteProduct from "../../api/products/delete-product";

export function DeleteProduct({ productId, setProducts, products }) {
  function delProduct() {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let apiEndpoint = baseURL + apiVersion + "products/" + productId;
    deleteProduct(apiEndpoint, setProducts, products, productId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={
            "py-3 px-4 font-bold bg-red-500 hover:bg-red-500 uppercase cursor-pointer text-white"
          }
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-3 px-5 font-bold cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-3 px-5 font-bold cursor-pointer"
            onClick={() => delProduct()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
