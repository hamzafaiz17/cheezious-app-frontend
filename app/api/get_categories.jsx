import axios from "axios";
import { toast } from "sonner";
export default function getCategories(apiEndpoint, setCategories) {
  axios
    .get(apiEndpoint)
    .then(function (response) {
      toast.success("Products Fetch Successfully");
      setCategories(response.data.data);
    })
    .catch(function (error) {
      toast.error("Error");
      console.log(error);
    });
}
