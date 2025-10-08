import axios from "axios";

function FetchOrderByUserIdApi(apiEndpoint, orderdata, setOrderdata) {
  axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      setOrderdata(response.data.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export default FetchOrderByUserIdApi;
