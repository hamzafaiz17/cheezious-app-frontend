import axios from "axios";
import { toast } from "sonner";
export default function GetProducts(apiEndpoint, setUpdateProduct) {
  axios
    .get(apiEndpoint)
    .then(function (response) {
      setUpdateProduct(response.data.data);
    })
    .catch(function (error) {
      toast.error("Error");
    });
}
