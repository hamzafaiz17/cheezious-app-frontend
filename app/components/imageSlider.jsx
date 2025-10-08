"use client";
import { useState } from "react";

function ImageSlider() {
  let [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "/uploads/images/slide1.jpg", alt: "" },
    { src: "/uploads/images/slide2.webp", alt: "" },
    { src: "/uploads/images/slide3.webp", alt: "" },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="w-full">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="object-cover transition-all duration-500 w-full md:h-120 relative"
        />
      </div>
      <div className="text-center mt-3 ">
        <button
          onClick={prevSlide}
          className="uppercase me-4 border-1 hover:bg-red-500  text-black font-bold px-5 py-2 rounded-sm  gap-2 cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="uppercase border-1 hover:bg-red-500  text-black font-bold px-5 py-2 rounded-sm  gap-2 cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
}
export default ImageSlider;
