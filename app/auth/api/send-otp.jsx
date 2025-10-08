import axios from "axios";

export default async function SendOTP(
  apiEndpoint,
  data,
  router,
  { setLoading }
) {
  setLoading(true);
  return axios
    .post(apiEndpoint, data)
    .then(function (response) {
      localStorage.setItem("email", data.email);
      router.push("/auth/login/otp/");
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    })
    .finally(function () {
      setLoading(false);
    });
}
