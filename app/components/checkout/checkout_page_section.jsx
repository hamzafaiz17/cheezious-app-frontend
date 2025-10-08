"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2, MoveLeft } from "lucide-react";
import Addresses from "../AddressMap";
import OrderAPi from "@/app/api/orders/order";
import { useState } from "react";
export default function Checkout({ cart, total, router }) {
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [diliveryNotes, setdiliveryNotes] = useState("");
  let [checkoutItems, setCheckoutItems] = useState(
    cart.map((item) => ({
      productid: item._id,
      quantity: item.quantity,
    }))
  );
  // Function to check if Place Order button should be disabled
  const isPlaceOrderDisabled = deliveryAddress.trim() === "";
  // Token decode function
  const getUserIdFromToken = (token) => {
    try {
      // Token ka payload hamesha 2nd part hota hai
      const base64Payload = token.split(".")[1];

      // Decode base64 -> string
      const payload = JSON.parse(atob(base64Payload));

      // Ab ID nikal lo (depends on JWT structure)
      return payload.id;
    } catch (error) {
      console.error("Token decode error:", error.message);
      return null;
    }
  };
  let token = localStorage.getItem("token");
  const userid = getUserIdFromToken(token);
  function PlaceOrder() {
    let apiEndpoint =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      process.env.NEXT_PUBLIC_API_VERSION +
      "orders";
    OrderAPi(
      apiEndpoint,
      checkoutItems,
      total,
      setLoading,
      token,
      userid,
      deliveryAddress,
      diliveryNotes,
      router
    );
  }
  return (
    <>
      <div className="w-[1420px] mx-auto mt-5 mb-5 px-4">
        <form>
          <div className="flex gap-5">
            <div className="w-full lg:w-[60%]">
              <h2 className="flex items-center gap-3 text-[30px] font-bold">
                {" "}
                <Link href={"/cart"}>
                  {" "}
                  <MoveLeft size={40} />
                </Link>{" "}
                Checkout
              </h2>

              <div>
                <div className="mt-3 ">
                  <Addresses
                    checkoutItems={checkoutItems}
                    setCheckoutItems={setCheckoutItems}
                    setdiliveryNotes={setdiliveryNotes}
                    PlaceOrder={PlaceOrder}
                    loading={loading}
                    setdeliveryAddress={setdeliveryAddress}
                    isPlaceOrderDisabled={isPlaceOrderDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[40%] ps-5">
              <h2 className="flex items-center gap-3 text-[30px] font-bold">
                Total
              </h2>
              <p className="text-[18px] font-medium text-[#8c8c8c] pt-3">
                Estimated Delivery Time 45min Mins
              </p>
              <div className="pt-4">
                {cart.map((item, i) => (
                  <div key={i} className="pb-2">
                    <div className="flex justify-between">
                      <div className="text-[16px] text-[#8c8c8c] flex gap-2">
                        <span>{item.quantity}</span> X <span>{item.name}</span>
                      </div>
                      <p className="text-[#8c8c8c]">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-3">
                  <p className="text-[16px]">Discount</p>
                  <p className="text-[#8c8c8c]">- Rs. 0</p>
                </div>
                <div className="border-b-[2px] mt-4"></div>

                <div className="mt-5 flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">Due Payment</h3>
                  <p className="text-2xl font-semibold">Rs. {total}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
