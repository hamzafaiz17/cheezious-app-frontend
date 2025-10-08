// import HomeHeader from "./components/headerHome";
import ImageSlider from "../components/imageSlider";
import ExploreMenuSlider from "../components/exploreMenuSlider";
import BlogsSection from "../components/blogssection";
import NewsletterSection from "../components/newsletter";
import OrderBTN from "../components/orderbutton";

export default function Home() {
  return (
    <>
      {/* <HomeHeader /> */}
      <ImageSlider />
      <ExploreMenuSlider />

      <div className="max-w-[1140px] mx-auto px-4 py-15">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <div className="w-full md:w-1/3">
            <img
              src={"/uploads/images/image7.jpg"}
              className="rounded-xl  w-full"
              alt=""
            />
            <h2 className="font-medium text-3xl pt-5">
              Delivering cheezy khushiyan
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src={"/uploads/images/image10.jpg"}
              className="rounded-xl  w-full"
              alt=""
            />
            <h2 className="font-medium text-3xl pt-5">
              Fastest Growing Brand of the Year
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src={"/uploads/images/image8.jpg"}
              className="rounded-xl w-full"
              alt=""
            />
            <h2 className="font-medium text-3xl pt-5">
              Made with fresh, local ingredients and love
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto md:bg-[url(/uploads/images/mobileapp.8251a7bd.svg)] md:bg-no-repeat md:bg-center md:bg-size-[auto_500px] py-5 md:py-25">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:px-4 md:pt-10  md:h-100">
          <div className="w-[100%] md:w-[40%]">
            <img
              src={"/uploads/images/mobile.028bdae8.svg"}
              className="w-full p-5 pe-10"
              alt=""
            />
          </div>
          <div className="w-[100%] md:w-[60%] md:pt-15 text-center md:text-left">
            <h2 className="font-bold text-xl md:text-2xl">
              Download Our Mobile App
            </h2>
            <p className="text-[16px] md:text-2xl pt-4">
              Elevate your experience by downloading our mobile app for Seamless
              ordering experience.
            </p>
            <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-start md:gap-15 gap-5 pt-10">
              <img
                src="/uploads/images/avatar.e940263a.svg"
                className="full md:w-[40%]"
                alt=""
              />
              <div className="flex justify-center md:justify-start gap-5">
                <img
                  src="/uploads/images/google.9b9b10ed.svg"
                  className="w-[40%]"
                  alt=""
                />
                <img
                  src="/uploads/images/apple.50cebbed.svg"
                  className="w-[40%]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlogsSection />

      <NewsletterSection />
      <OrderBTN />
    </>
  );
}
