"use client";
import { useState, useEffect } from "react";
import GetProducts from "@/app/api/get_products";
import CardDesign from "@/app/components/cardDesign";
export default function MoreProducts({ addToCart }) {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "products";
  let [product, setProducts] = useState([]);

  useEffect(() => {
    GetProducts(apiEndpoint, setProducts);
  }, []);

  return (
    <div className="w-[1420px] mx-auto mt-5 px-4 pt-10">
      <div className="flex items-center gap-3">
        <img src={"/uploads/images/voucher.svg"} width={50} alt="" />
        <span className="text-red-500 text-xl font-bold">Apply a voucher</span>
      </div>
      <div className="pt-5 pb-10">
        <h2 className="font-bold text-3xl pt-4">
          Did You Leave Anything Behind?
        </h2>
        <div>
          {product.length < 1 ? (
            <div>No Products Found</div>
          ) : (
            <div className="flex gap-5 pt-10">
              {product.slice(0, 5).map((item, i) => (
                <div key={i} className="w-1/5">
                  <CardDesign
                    image={item.image}
                    name={item.title}
                    description={item.description}
                    price={item.price}
                    addtocart={addToCart}
                    item={item}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
