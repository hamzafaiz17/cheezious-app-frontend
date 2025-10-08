"use client";
import { useEffect, useState } from "react";
import FetchOrderByUserIdApi from "@/app/api/orders/order-fetch-by-userId";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function OrderHistory() {
  const [orderdata, setOrderdata] = useState([]);

  let apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    process.env.NEXT_PUBLIC_API_VERSION +
    "orders/user-oders/";

  useEffect(() => {
    FetchOrderByUserIdApi(apiEndpoint, orderdata, setOrderdata);
  }, []);

  return (
    <>
      {orderdata && orderdata.length > 0 ? (
        orderdata.map((item, index) => (
          <div
            className="bg-[#f8f8f8] px-5 py-3 rounded-md w-[600px] mx-auto mb-10"
            key={index}
          >
            <div className="top pb-4 pt-2">
              <h4 className="font-semibold text-lg">
                Cheezious
                <span
                  className={`ms-5 rounded-md ${
                    item.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : item.status === "completed"
                      ? "bg-green-500 text-white"
                      : item.status === "cancelled"
                      ? "bg-red-500 text-white"
                      : ""
                  }  px-2 py-1 text-xs font-medium  inset-ring inset-ring-gray-500/10`}
                >
                  {item.status.toUpperCase()}
                </span>
              </h4>
            </div>
            <hr />
            <div className="center py-4">
              {item.products.map((product, idx) => (
                <h5 className="font-semibold text-[15px]" key={idx}>
                  {product.quantity} {product.productid.title}
                </h5>
              ))}

              <p className="py-2 text-[14px]">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
                {", "}
                {new Date(item.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="font-semibold text-[15px]">Rs. {item.totalPrice}</p>
            </div>
            <hr />
            <div className="bottom pt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={"font-normal text-[13px] hover:no-underline"}
                  >
                    View Order Details ({item.orderid})
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <div className="ps-5 pb-4 pt-2">
                      <div className="mb-8">
                        <p className="text-[13px]">Order From</p>
                        <p className="text-[12px] font-semibold">
                          {item.deliveryAddress}
                        </p>
                      </div>
                      <div className="mb-4">
                        <p className="text-[13px]">Delivered To</p>
                        <p className="text-[12px] font-semibold">
                          {item.deliveryAddress}
                        </p>
                      </div>
                      {/* <div>
                        <p className="text-[12px] font-semibold">
                          Reason for cancelling order: Wrong Address
                        </p>
                      </div> */}
                    </div>
                    <hr />
                    <div className="flex flex-col gap-4">
                      {item.products.map((product, idx) => (
                        <div className="flex justify-between" key={idx}>
                          <p className="text-[13px]">
                            {product.quantity} {product.productid.title}
                          </p>
                          <p className="text-[13px]">
                            {product.productid.price * product.quantity}
                          </p>
                        </div>
                      ))}

                      <div className="flex justify-between">
                        <p className="text-[13px]">Total (Inc. VAT)</p>
                        <p className="text-[13px]">{item.totalPrice}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-start h-[100vh] mt-15">
          <img
            src="/uploads/images/cross.73762656.svg"
            alt="Order History Empty"
            width={"200px"}
          />
        </div>
      )}
    </>
  );
}
