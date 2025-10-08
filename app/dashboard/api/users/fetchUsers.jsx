import axios from "axios";
import { toast } from "sonner";
export default function FetchUsers(apiEndpoint, users, setUsers) {
  axios
    .get(apiEndpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      setUsers(response.data.data);
    })
    .catch((err) => {
      toast.error("Error Fetching Users");
    });
  return;
}
