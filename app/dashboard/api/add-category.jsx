import axios from "axios";
import { toast } from "sonner";
export default function addCategory(
  apiEndpoint,
  category,
  { setLoading, setCategories, onSuccess }
) {
  setLoading(true);
  const formData = new FormData();
  formData.append("title", category.title);
  formData.append("description", category.description);
  formData.append("file", category.image);

  axios
    .post(apiEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setCategories((prevState) => {
        return [...prevState, response.data.data];
      });
      toast.success("Category Add Successfully");
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
