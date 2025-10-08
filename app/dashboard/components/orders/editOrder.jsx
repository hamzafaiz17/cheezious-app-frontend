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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UpdateOrder from "../../api/orders/updateOrder";

export default function EditOrder({ orderId, orders, setOrders }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    orders?.find((o) => o._id === orderId)?.status || ""
  );
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "orders/" + orderId;

  useEffect(() => {
    // Jab orderId ya orders change ho, selectedStatus ko update karein
    setSelectedStatus(orders?.find((o) => o._id === orderId)?.status || "");
  }, [orderId, orders]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            "py-1 px-2 bg-transparent hover:bg-transparent hover:no-underline underline  underline-offset-[2px] decoration-[1.5px] font-bold uppercase cursor-pointer"
          }
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form>
          <div>
            <Label htmlFor="Status" className="text-right w-[100%]">
              Change Status *
            </Label>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value)}
              >
                <SelectTrigger className="sm:w-[100%] md:w-[250px]">
                  <SelectValue placeholder="-- Status --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            className="py-3 px-4 font-bold uppercase cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              UpdateOrder(
                apiEndpoint,
                { status: selectedStatus },
                {
                  setLoading,
                  setSelectedStatus,
                  orders,
                  setOrders,
                  orderId,
                  onSuccess: () => setOpen(false),
                }
              );
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
      </DialogContent>
    </Dialog>
  );
}
