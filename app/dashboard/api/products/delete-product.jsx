import axios from "axios";
import { toast } from "sonner";
export default function deleteProduct(
  apiEndpoint,
  setProducts,
  products,
  productId
) {
  axios
    .delete(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      toast.success("Product Deleted");
      const removeProduct = products.filter((p) => p._id !== productId);
      setProducts(removeProduct);
      console.log(response);
    })
    .catch(function (error) {
      toast.error("Error: ", error);
    });
}
