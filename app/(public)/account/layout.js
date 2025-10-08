"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AccountLayout({ children }) {
  const pathname = usePathname();
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
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (!token || !user || isJwtExpired(token)) {
      router.replace("/auth/login");
    } else {
      setCheckDone(true);
    }
  }, [router]);

  if (!checkDone) {
    return null;
  }

  return (
    <>
      <div className="w-[1400px] mx-auto mt-5 px-4 flex flex-col gap-6">
        <p className="text-3xl font-bold">My Account</p>
        <div className="flex justify-between text-center space-x-4 bg-white border-b ">
          <Link
            href="/account/edit-profile"
            className={`w-1/8 pb-2 uppercase hover:border-b-3 hover:border-black ${
              pathname === "/account/edit-profile"
                ? "border-b-3 border-black font-bold"
                : ""
            }`}
          >
            Edit Profile
          </Link>
          <Link
            href="/account/order-history"
            className={`w-1/8 pb-2 uppercase hover:border-b-3 hover:border-black ${
              pathname === "/account/order-history"
                ? "border-b-3 border-black font-bold"
                : ""
            }`}
          >
            Order history
          </Link>
          <Link
            href="/account/favourites"
            className={`w-1/8 pb-2 uppercase hover:border-b-3 hover:border-black ${
              pathname === "/account/favourites"
                ? "border-b-3 border-black font-bold"
                : ""
            }`}
          >
            Favourites
          </Link>
          <Link
            href="/account/saved-addresses"
            className={`w-1/8 pb-2 uppercase hover:border-b-3 hover:border-black ${
              pathname === "/account/saved-addresses"
                ? "border-b-3 border-black font-bold"
                : ""
            }`}
          >
            Saved Addresses
          </Link>
          <Link
            href="/account/promos"
            className={`w-1/8 pb-2 uppercase hover:border-b-3 hover:border-black ${
              pathname === "/account/promos"
                ? "border-b-3 border-black font-bold"
                : ""
            }`}
          >
            Promos
          </Link>
        </div>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </>
  );
}
