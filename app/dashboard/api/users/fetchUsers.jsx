"use client";
import axios from "axios";
import { toast } from "sonner";
export default function FetchUsers(apiEndpoint, users, setUsers) {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  axios
    .get(apiEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setUsers(response.data.data);
    })
    .catch((err) => {
      toast.error("Error Fetching Users");
    });
  return;
}
