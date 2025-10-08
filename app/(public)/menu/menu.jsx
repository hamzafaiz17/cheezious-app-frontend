"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import getCategories from "../../api/get_categories";

export default function MenuCategories({ categories }) {
  // let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  // let ApiEndpoint = baseURL + apiVersion + "categories";
  // const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const scrollContainer = useRef(null);

  // Scroll to section on button click
  const scrollToCategory = (category) => {
    const section = document.getElementById(category);
    if (section) {
      const yOffset = -160; // Offset for header + menu height (adjust if needed)
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveCategory(category);
    }
  };

  // Scroll menu buttons left/right
  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    // getCategories(ApiEndpoint, setCategories);
    const handleScroll = () => {
      let closestSection = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      categories.forEach((category) => {
        const section = document.getElementById(category.title);
        if (section) {
          const rectTop = section.getBoundingClientRect().top;
          const offset = Math.abs(rectTop - 180); // adjust 170 based on your sticky offset

          if (offset < closestDistance) {
            closestDistance = offset;
            closestSection = category.title;
          }
        }
      });

      if (closestSection && closestSection !== activeCategory) {
        setActiveCategory(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  return (
    <div className=" w-[1320px] flex items-center rounded-md relative bg-[#f8f8f8] ">
      {/* Left Arrow */}
      <button
        className="bg-transparent border-0 -ml-4 mr-2"
        onClick={scrollLeft}
      >
        <ArrowLeftCircle size={35} className="text-red-600" />
      </button>

      {/* Scrollable Category Buttons */}
      <div
        className="flex flex-nowrap overflow-auto gap-2 py-2 custom-scrollbar"
        ref={scrollContainer}
      >
        {categories.map((c, i) => (
          <button
            key={i}
            onClick={() => scrollToCategory(c.title)}
            className={`py-3 px-3 mr-4 no-underline rounded-md font-bold border-0 scrollable-button button-categories transition-colors duration-300 ${
              activeCategory === c.title
                ? "bg-yellow-400 text-black"
                : "bg-white text-black"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="bg-transparent border-0 ml-2 -mr-4"
        onClick={scrollRight}
      >
        <ArrowRightCircle size={35} className="text-red-600" />
      </button>
    </div>
  );
}
