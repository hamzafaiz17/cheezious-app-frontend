import axios from "axios";
import { toast } from "sonner";

export default function UpdateProduct(
  apiEndpoint,
  updateProduct,
  { setLoading, setUpdateProduct, products, setProducts, productId, onSuccess }
) {
  setLoading(true);
  const formData = new FormData();
  formData.append("title", updateProduct.title);
  formData.append("description", updateProduct.description);
  formData.append("price", updateProduct.price);
  formData.append("category", updateProduct.category?._id);

  if (updateProduct.image && typeof updateProduct.image !== "string") {
    formData.append("file", updateProduct.image);
  }

  axios
    .put(apiEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Note: DON'T manually set 'Content-Type'
      },
    })
    .then((response) => {
      toast.success("Product Updated");
      setUpdateProduct(response.data.data);
      const updatedList = products.map((p) =>
        p._id === productId ? response.data.data : p
      );
      setProducts(updatedList);
      onSuccess();
    })
    .catch((error) => {
      console.error(error);
      toast.error("Error updating product");
    })
    .finally(() => {
      setLoading(false);
    });
}
