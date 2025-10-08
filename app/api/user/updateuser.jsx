import axios from "axios";
import { toast } from "sonner";
export default function updateUser(apiEndpointUpdate, user, setLoading) {
  setLoading(true);
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);

  if (user.profilePic && typeof user.profilePic !== "string") {
    formData.append("file", user.profilePic);
  }

  formData.append("dateOfBirth", user.dateOfBirth);

  axios
    .put(apiEndpointUpdate, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      localStorage.removeItem("user");
      console.log("User updated successfully:", response.data);
      toast.success("User updated successfully");
      localStorage.setItem("user", JSON.stringify(response.data?.data));
      setLoading(false);
    })
    .catch((error) => {
      console.error("There was an error updating the user!", error);
      toast.error("There was an error updating the user!");
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
}
