import axios from "axios";

export default function FetchOrderApi(
  apiEndpoint,
  token,
  orderdata,
  setOrderdata
) {
  axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setOrderdata([...orderdata, response.data.data]);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}
