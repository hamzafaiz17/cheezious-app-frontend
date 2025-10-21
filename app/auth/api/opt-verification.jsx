"use client";
import axios from "axios";
export default async function OTPVerificationAPI(otp, router) {
  if (typeof window === "undefined") {
    console.error("OTPVerificationAPI called on server");
    return;
  }

  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let APIEndpoint = baseURL + apiVersion + "auth/verify-otp";
  let email = null;
  try {
    email = localStorage.getItem("email");
  } catch (err) {
    console.error("localStorage not available", err);
  }
  if (!email) {
    console.error("Email Not Found");
    return;
  }

  axios
    .post(APIEndpoint, { email, otp })
    .then(function (response) {
      try {
        localStorage.setItem("user", JSON.stringify(response.data?.data.user));
        localStorage.setItem("token", response.data?.data.token);
        localStorage.removeItem("email");
      } catch (err) {
        console.error("Failed to set localStorage", err);
      }
      if (router && typeof router.push === "function") router.push("/menu");
    })
    .catch(function (error) {
      console.error(
        "❌ OTP Verification Failed:",
        error.response?.data || error
      );
    });
}
