import axios from "axios";
import { toast } from "sonner";

export default function registerfunction(
  apiEndpoint,
  data,
  router,
  { setLoading }
) {
  setLoading(true);
  axios
    .post(apiEndpoint, data)
    .then(function (response) {
      toast.success(response.data.message);

      router.push("/auth/login");
    })
    .catch(function (error) {
      if (error.response.data.error !== undefined) {
        toast.error(error.response.data?.error[0], {
          description: error.response.data.message,
        });
      } else {
        toast.error(error.response.data);
      }
    })
    .finally(() => {
      setLoading(false);
    });
}
