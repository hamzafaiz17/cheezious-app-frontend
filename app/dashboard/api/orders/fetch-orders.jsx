"use client";
import axios from "axios";

export default function fetchOrders(apiEndpoint, orders, setOrders) {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // replace the orders array with response data
      setOrders(response.data.data || []);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
}
