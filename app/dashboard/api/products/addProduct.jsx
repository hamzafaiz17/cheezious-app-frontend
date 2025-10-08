import axios from "axios";
import { toast } from "sonner";
export default function AddProductAPI(
  apiEndpoint,
  Product,
  { setLoading, setProducts, onSuccess }
) {
  setLoading(true);
  const formData = new FormData();
  formData.append("title", Product.title);
  formData.append("description", Product.description);
  formData.append("price", Product.price);
  formData.append("file", Product.image);
  formData.append("category", Product.category);
  axios
    .post(apiEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      console.log(response.data.data);
      setProducts((prevState) => {
        return [...prevState, response.data.data];
      });

      toast.success("Product Add Successfully");

      onSuccess();
    })
    .catch(function (error) {
      console.log(error);
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
