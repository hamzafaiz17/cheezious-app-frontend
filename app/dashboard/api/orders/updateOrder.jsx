import axios from "axios";
import { toast } from "sonner";

export default function UpdateOrder(
  apiEndpoint,
  selectedStatus,
  { setLoading, setSelectedStatus, orders, setOrders, orderId, onSuccess }
) {
  setLoading(true);
  axios
    .put(
      apiEndpoint,
      { status: selectedStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      toast.success("Order Updated Successfully");
      const updatedList = orders.map((o) =>
        o._id === orderId ? response.data.data : o
      );
      setOrders(updatedList);
      onSuccess();
    })
    .catch((error) => {
      toast.error("Error updating product");
    })
    .finally(() => {
      setLoading(false);
    });
}
