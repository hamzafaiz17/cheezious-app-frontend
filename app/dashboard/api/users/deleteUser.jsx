import axios from "axios";
import { toast } from "sonner";
export default function DeleteUser(apiEndpoint, users, setUsers, userId) {
  console.log(userId);
  axios
    .delete(apiEndpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      toast.success("User Deleted Successfully");
      const removeUser = users.filter((u) => u._id !== userId);
      setUsers(removeUser);
    })
    .catch((err) => {
      toast.error("Error");
    });
}
