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
import delteCategories from "../api/delete-category";

export function DeleteCategory(props) {
  function deleteCategory() {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let apiEndpoint = baseURL + apiVersion + "categories/" + props.categoryID;

    delteCategories(apiEndpoint, props.setCategories);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">
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
            onClick={() => deleteCategory()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
