import axios from "axios";
import { toast } from "sonner";
export default function updateCategory(
  apiEndpoint,
  category,
  { setLoading, setCategories, onSuccess }
) {
  setLoading(true);
  const formData = new FormData();
  formData.append("title", category.title);
  formData.append("description", category.description);
  if (category.image) {
    formData.append("file", category.image);
  }

  axios
    .put(apiEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setCategories((prevState) =>
        prevState.map((cat) =>
          cat._id === response.data.data._id ? response.data.data : cat
        )
      );
      toast.success("Category Updated Successfully");
      onSuccess();
    })
    .catch(function (error) {
      if (error.response?.data?.error !== undefined) {
        toast.error(error.response?.data?.error[0], {
          description: error.message,
        });
        setLoading(false);
      } else {
        toast.error(error.message);
        setLoading(false);
      }
    })
    .finally(() => {
      setLoading(false);
    });
}
