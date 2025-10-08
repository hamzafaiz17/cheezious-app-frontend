import axios from "axios";

export default function fetchOrders(apiEndpoint, orders, setOrders) {
  axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setOrders(...orders, response.data.data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
}
