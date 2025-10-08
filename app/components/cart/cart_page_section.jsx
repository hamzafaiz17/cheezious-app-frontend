"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2, MoveLeft } from "lucide-react";

export default function Cartpage({
  cart,
  addToCart,
  removeFromCart,
  increment,
  decrement,
  total,
}) {
  return (
    <>
      <div className="w-[1420px] mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-full lg:w-[60%]">
            <h2 className="flex items-center gap-3 text-[30px] font-bold">
              {" "}
              <Link href={"/menu"}>
                {" "}
                <MoveLeft size={40} />
              </Link>{" "}
              Cart
            </h2>
            <div>
              <div className="mt-3 max-h-[450px] overflow-y-scroll me-6">
                {cart.length < 1 ? (
                  <div className="empty-cart text-center">
                    <img
                      src="https://cheezious.com/_next/static/media/emptycart.e7858caa.svg"
                      className="mx-auto"
                      alt="Empty Cart"
                    />
                    <h3 className="text-lg font-semibold mt-6">
                      YOUR CART IS EMPTY
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Go ahead and explore top categories.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className=" flex-1 mb-4">
                      {cart.map((item, i) => (
                        <div
                          key={i}
                          className="bg-[#f8f8f8] mb-3 p-5 rounded-sm"
                        >
                          <div className="flex w-full">
                            <div className="w-[80%] flex ">
                              <img src={item.image} width={"80"} alt="" />
                              <div className="ps-5">
                                <h2 className="text-left text-[18px] font-bold">
                                  {item.title}
                                </h2>
                                <p className="font-semibold text-[#8c8caa]">
                                  {item.category?.title}
                                </p>
                                <p className="pt-1 font-bold text-orange-600">
                                  Rs. {item.price}
                                </p>
                              </div>
                            </div>
                            <div className="w-[20%] ">
                              <div className="pt-4">
                                <div className="flex justify-end">
                                  {item.quantity > 1 ? (
                                    <button
                                      className="p-1 bg-yellow-500 rounded-[50%]"
                                      onClick={() => decrement(item._id)}
                                    >
                                      <MinusIcon size={19} />
                                    </button>
                                  ) : (
                                    <button
                                      className="p-1 bg-red-500 rounded-[50%]"
                                      onClick={() => removeFromCart(item._id)}
                                    >
                                      <Trash2
                                        size={19}
                                        className="text-white"
                                        fill="transparent"
                                      />
                                    </button>
                                  )}

                                  <p className="px-2 font-[800] text-[19px]">
                                    {item.quantity}
                                  </p>
                                  <button
                                    className="p-1  bg-yellow-500  rounded-[50%]"
                                    onClick={() => increment(item._id)}
                                  >
                                    <PlusIcon size={19} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
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
              <div className="mt-5">
                <Link href={"/checkout"}>
                  {" "}
                  <button className="bg-yellow-400 w-full py-4 rounded text-xl uppercase font-semibold cursor-pointer">
                    {" "}
                    Review Payment And Address
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
