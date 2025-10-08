import axios from "axios";
import { toast } from "sonner";
export default function GetProducts(apiEndpoint, setProducts) {
  axios
    .get(apiEndpoint)
    .then(function (response) {
      toast.success("Products Fetch Successfully");
      setProducts(response.data.data);
    })
    .catch(function (error) {
      toast.error("Error");
      console.log(error);
    });
}
