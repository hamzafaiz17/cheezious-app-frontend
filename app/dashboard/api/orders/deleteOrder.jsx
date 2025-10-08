import axios from "axios";
import { toast } from "sonner";
export default function deleteOrder(apiEndpoint, setOrders, orders, orderId) {
  axios
    .delete(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      toast.success("Order Deleted");
      const removeOrder = orders.filter((o) => o._id !== orderId);
      setOrders(removeOrder);
      console.log(response);
    })
    .catch(function (error) {
      toast.error("Error: ", error);
    });
}
