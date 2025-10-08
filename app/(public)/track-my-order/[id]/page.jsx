"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import FetchOrderApi from "@/app/api/orders/fetch-order";
import { getUserIdFromToken } from "@/hooks/fetch-userid-token";

export default function Invoice() {
  let [invoicedata, setInvoicedata] = useState([
    {
      orderid: "#323212-231321",
      status: "Placed",
      address: "Safa Gold Mall, F 7 Markaz, F 7, Islamabad",
      paymentMethod: "Cash on Delivery",
      products: [
        { name: "1 Peri Peri Chicken Pizza", price: 1200 },
        { name: "1 Coke", price: 400 },
      ],
      total: 1600,
    },
  ]);

  let [orderdata, setOrderdata] = useState([]);

  let [checkDone, setCheckDone] = useState(false);
  let [progress, setProgress] = useState(50);
  let router = useRouter();
  const params = useParams();
  const id = params.id;
  let apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "orders/" +
    id;

  function isJwtExpired(token) {
    if (!token) return true;

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
  let token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  let userid = getUserIdFromToken(token);
  console.log(orderdata);

  useEffect(() => {
    if (!token || !user || isJwtExpired(token)) {
      router.replace("/auth/login");
    } else {
      setCheckDone(true);
    }
    FetchOrderApi(apiEndpoint, token, orderdata, setOrderdata);
  }, [token]);

  if (!checkDone) {
    return null;
  }

  return (
    <>
      {orderdata.map((item, index) => (
        <div className="w-[1000px] mx-auto mt-5 mb-5 px-4" key={index}>
          <div>Track My Order ({item.orderid})</div>
          <div className="flex justify-between items-center py-5">
            <div className="w-[50%]">
              <div className="bg-[#f8f8f8] w-[100%] p-5 rounded mb-3">
                <p className="mb-2 font-bold text-[18px]">45 mins</p>
                <p>Estimated Arrival</p>
                <div className="flex gap-2 my-4">
                  <Progress
                    value={progress}
                    className={"w-[33%] bg-[#fac2ab] h-3"}
                    indicatorClassName="bg-[#e55e30]"
                  />
                  <Progress
                    value={0}
                    className={"w-[33%] bg-[#fac2ab] h-3"}
                    indicatorClassName="bg-[#e55e30]"
                  />
                  <Progress
                    value={0}
                    className={"w-[33%] bg-[#fac2ab] h-3"}
                    indicatorClassName="bg-[#e55e30]"
                  />
                </div>
                <p className="font-semibold uppercase">Placed</p>
              </div>
              <div className="bg-[#f8f8f8] w-[100%] p-5 rounded mb-3">
                <p className="mb-2 font-bold text-[16px]">Deliver To Testing</p>
                <p className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-normal text-gray-5     00">
                    {item.deliveryAddress}
                  </p>
                  <Check
                    className="text-white border-3 border-greee-500 rounded-full bg-green-500 p-2 inline-block"
                    width={40}
                    height={38}
                  />
                </p>
              </div>
              <div className="bg-[#f8f8f8] w-[100%] p-5 rounded mb-3">
                <p className="mb-2 font-bold text-[16px]">Payment Method</p>
                <p className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-normal text-gray-500">
                    {item.paymentMethod === "cash_on_delivery"
                      ? "Cash on Delivery"
                      : ""}
                  </p>
                  <Check
                    className="text-white border-3 border-greee-500 rounded-full bg-green-500 p-2 inline-block"
                    width={40}
                    height={38}
                  />
                </p>
              </div>

              <div className="bg-[#f8f8f8] w-[100%] p-5 rounded mb-3">
                <p className="mb-2 font-bold text-[16px]">Bill Summary</p>

                {/* items */}

                {item.products.map((prod, idx) => (
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[14px] font-normal text-gray-500">
                      Rs. {prod.productid.title} (x{prod.quantity})
                    </div>
                    <div>
                      <span className=" font-bold text-black">
                        Rs. {prod.productid.price * prod.quantity}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="text-[14px] font-normal text-gray-500">
                    <b className="text-black">Total</b> (incl. VAT)
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-red-500 ">
                      Rs. {item.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[50%] align-start">
              <img src="/uploads/images/MAP.png" className="ps-4" alt="" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
