import axios from "axios";
export default async function OTPVerificationAPI(otp, router) {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let APIEndpoint = baseURL + apiVersion + "auth/verify-otp";
  let email = localStorage.getItem("email");
  if (!email) {
    console.error("Email Not Found");
    return;
  }

  axios
    .post(APIEndpoint, { email, otp })
    .then(function (response) {
      localStorage.setItem("user", JSON.stringify(response.data?.data.user));
      localStorage.setItem("token", response.data?.data.token);
      localStorage.removeItem("email");
      router.push("/menu");
    })
    .catch(function (error) {
      console.error(
        "❌ OTP Verification Failed:",
        error.response?.data || error
      );
    });
}
