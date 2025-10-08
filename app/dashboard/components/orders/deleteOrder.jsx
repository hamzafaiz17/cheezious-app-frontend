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
import deleteOrder from "../../api/orders/deleteOrder";
export default function DeleteOrder({ orderId, orders, setOrders }) {
  function delOrder() {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let apiEndpoint = baseURL + apiVersion + "orders/" + orderId;
    deleteOrder(apiEndpoint, setOrders, orders, orderId);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={
            "py-1 px-2 bg-transparent hover:bg-transparent hover:no-underline underline  underline-offset-[2px] decoration-[1.5px] font-bold  uppercase cursor-pointer text-red-500"
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
            className="py-3 px-5 font-bold cursor-pointer bg-red-500 text-white hover:bg-red-500"
            onClick={() => delOrder()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
