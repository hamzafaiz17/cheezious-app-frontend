"use client";
import CartpageSection from "../../components/cart/cart_page_section";
import MoreProducts from "../../components/cart/more_products";
import { useState } from "react";
import { useCart } from "@/app/components/cart/cartcontext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, increment, decrement } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (!token || !user || isJwtExpired(token)) {
      router.replace("/auth/login");
    } else {
      setCheckDone(true);
    }
  }, [router]);

  if (!checkDone) {
    return null;
  }
  if (cart.length === 0) {
    router.push("/menu");
    return null;
  }

  return (
    <>
      <CartpageSection
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        increment={increment}
        decrement={decrement}
        total={total}
      />

      <MoreProducts addToCart={addToCart} />
    </>
  );
}
