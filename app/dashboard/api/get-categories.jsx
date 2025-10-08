import axios from "axios";
import { toast } from "sonner";

export default function getCategories(categoryApiEndpoint, setCategories) {
  axios
    .get(categoryApiEndpoint)
    .then(function (response) {
      toast.success("Categories fetch Successfully");
      setCategories(response.data.data);
    })
    .catch(function (error) {
      toast.error(error.message);
    });
}
