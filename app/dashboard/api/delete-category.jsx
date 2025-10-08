import axios from "axios";
import { toast } from "sonner";

export default function delteCategories(apiEndpoint, setCategories) {
  const deletedcategoryhandle = (deletedcategoryId) => {
    setCategories((prevState) =>
      prevState.filter((category) => category._id !== deletedcategoryId)
    );
  };
  axios
    .delete(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      toast.success("Category Deleted Successfully");
      if (response.data.data._id) {
        deletedcategoryhandle(response.data.data._id);
      }
    })
    .catch(function (error) {
      if (error.response.data?.error !== undefined) {
        toast.error(error.response.data?.error[0], {
          description: error.message,
        });
      } else {
        toast.error(error.message);
      }
    });
}
