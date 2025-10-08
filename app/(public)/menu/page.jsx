"use client";
import { useEffect, useState } from "react";
import MenuC from "./menu";
import CardDesign from "../../components/cardDesign";
import Link from "next/link";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { useCart } from "@/app/components/cart/cartcontext";
import GetProducts from "../../api/get_products";
import getCategories from "../../api/get_categories";

export default function MenuMain() {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let ApiEndpoint = baseURL + apiVersion + "products";
  let CategoryApiEndpoint = baseURL + apiVersion + "categories";
  let [products, setProducts] = useState([]);
  let [categories, setCategories] = useState([]);
  const { cart, addToCart, removeFromCart, increment, decrement } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const GroupedProducts = products.reduce((acc, curr) => {
    let categoryTitle = curr.category?.title || "Uncategorized";
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = [];
    }
    acc[categoryTitle].push(curr);
    return acc;
  }, {});

  useEffect(() => {
    GetProducts(ApiEndpoint, setProducts);
    getCategories(CategoryApiEndpoint, setCategories);
  }, []);

  return (
    <>
      {/* Category Bar */}
      <div className="w-full bg-white py-2 sticky top-[85px] z-40">
        <div className="w-[1320px] mx-auto px-4">
          <MenuC categories={categories} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[1320px] mx-auto mt-5 px-4 ">
        <div className="flex flex-col lg:flex-row">
          {/* Menu Items Section */}
          <div className="w-full lg:w-2/2">
            {Object.entries(GroupedProducts).map(([category, p], i) => (
              <div className="mt-5" id={category} key={i}>
                <p className="text-xl font-bold mb-4">{category}</p>
                <div className="flex flex-wrap -mx-2">
                  {p.map((product, i) => (
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4" key={i}>
                      <CardDesign
                        image={product.image}
                        name={product.title}
                        description={product.description}
                        price={product.price}
                        addtocart={addToCart}
                        item={product}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          <div className="w-full lg:w-2/5  ms-5">
            <div className="p-5 rounded border rounded-md bg-gray-50 text-center sticky top-[185px] max-h-[calc(100vh-185px-30px)] min-h-[calc(100vh-185px-30px)] flex flex-col">
              {cart.length < 1 ? (
                <div className="empty-cart">
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
                  <div className="top">
                    <div className="flex justify-between pb-5">
                      <span className="font-bold text-red-500">Total</span>
                      <span className="font-bold text-red-500">
                        Rs. {total}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-1 mb-4">
                    {cart.map((item, i) => (
                      <div key={i} className="bg-white mb-3 p-5 rounded">
                        <div className="flex w-full">
                          <div className="w-[25%]">
                            <img src={item.image} width={"80"} alt="" />
                          </div>
                          <div className="w-[80%] ps-4 pt-5">
                            <h2 className="text-left text-[18px] font-semiBold">
                              {item.title}
                            </h2>
                            <div className=" flex justify-between pt-4">
                              <p className="font-semibold text-[#8c8caa]">
                                {item.category?.title}
                              </p>
                              <p className="font-semibold text-[#8c8caa]">
                                Rs. {item.price}
                              </p>
                            </div>
                            <p className="text-end pt-3 font-bold text-orange-600">
                              Rs. {item.price}
                            </p>
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

                                <p className="px-2">{item.quantity}</p>
                                <button
                                  className="p-1 bg-yellow-500 rounded-[50%]"
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

                  <div className="bottom">
                    <div>
                      <Link href={"/cart"}>
                        {" "}
                        <button className="uppercase bg-yellow-400 w-full p-3 font-semibold text-[18px] rounded cursor-pointer">
                          Checkout
                        </button>{" "}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-10"></div>
    </>
  );
}
