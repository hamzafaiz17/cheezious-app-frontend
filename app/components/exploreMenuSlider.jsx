"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getCategories from "../api/get_categories";

// let menu = [
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
//   {
//     title: "Turn up the heat",
//     image: "/uploads/images/Turn up the heat.jpg",
//   },
// ];

function ExploreMenuSlider() {
  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let ApiEndpoint = baseURL + apiVersion + "categories";
  let [categories, setCategories] = useState([
    {
      _id: "",
      title: "",
      description: "",
      image: null,
    },
  ]);
  useEffect(() => {
    getCategories(ApiEndpoint, setCategories);
  }, []);

  return (
    <>
      <div className="max-w-[1140px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-3xl">Explore Menu</h2>
          <Link href={"/menu"} className="text-red-500 uppercase font-bold">
            View All
          </Link>
        </div>
        <div className="mt-15">
          <div className="w-full">
            <Swiper
              style={{ width: "100%" }}
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              // pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {categories.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="text-center border-1 p-4 rounded-md border-yellow-400">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-50 mx-auto h-40 object-cover -mt-4"
                    />
                    <h2 className="text-sm font-medium pt-3 uppercase">
                      {item.title}
                    </h2>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <style jsx global>{`
              .swiper-button-next,
              .swiper-button-prev {
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                color: #000;
                background: #f3f3f3;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100;
                box-shadow: 0 0 10px 0 #00000021;
              }

              .swiper-button-next::after,
              .swiper-button-prev::after {
                font-size: 16px;
              }

              .swiper-pagination {
                display: none !important;
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExploreMenuSlider;
