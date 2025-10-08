"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function DashboardLayout({ children }) {
  const router = useRouter();
  let [checkDone, setCheckDone] = useState(false);
  function isJwtExpired(token) {
    if (!token) return true; // Token missing

    try {
      const payloadBase64 = token.split(".")[1]; // JWT ka 2nd part (payload)
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Base64 decode

      const expiryTime = decodedPayload.exp; // expiry in seconds
      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

      return expiryTime < currentTime;
    } catch (error) {
      console.error("Token decode error:", error);
      return true; // If error, assume token is invalid
    }
  }
  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    token = isJwtExpired(token);
    if (token === false && user) {
      router.replace("/account/edit-profile");
    }
  }, [router]);

  if (checkDone) {
    return null;
  }
  return (
    <div>
      <div className="w-full flex">
        <div className="w-1/2">
          <div className="p-5">
            <Link href={"/"}>
              <img
                src={"/uploads/images/mainLogo.webp"}
                className="w-[150px]"
                alt=""
              />
            </Link>
          </div>

          <div>{children}</div>
        </div>
        <div className="w-1/2">
          <img
            src={"/uploads/images/deliveryMan.jpg"}
            className="w-full h-[100vh]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
