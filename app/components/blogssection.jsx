import { ArrowRightCircleIcon, ChevronRight } from "lucide-react";
function BlogsSection() {
  return (
    <>
      <div className="max-w-[1140px] mx-auto px-4 py-15">
        <h2 className="font-semibold text-3xl mb-10">Blogs</h2>
        <div>
          <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-5">
            <div className="bg-[url(/uploads/images/image22.jpg)] min-h-[352px] w-full md:w-1/3 content-end cursor-pointer">
              <div className="bg-[#000000a3] py-5 px-3 mt-20">
                <h2 className="font-bold text-xl text-white">
                  Cheezious: The Awami Brand That's All About Local Love
                </h2>
                <div className="flex justify-between items-center pt-5">
                  <p className="text-white font-bold text-xs">Learn more</p>
                  <ChevronRight
                    size={20}
                    className="text-black bg-white rounded-[50%]"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[url(/uploads/images/image16.jpg)] min-h-[352px] w-full md:w-1/3 content-end cursor-pointer">
              <div className="bg-[#000000a3] py-5 px-3 mt-20">
                <h2 className="font-bold text-xl text-white">
                  Cheezious and Chill: The Perfect Movie Night Pairings
                </h2>
                <div className="flex justify-between items-center pt-5">
                  <p className="text-white font-bold text-xs">Learn more</p>
                  <ChevronRight
                    size={20}
                    className="text-black bg-white rounded-[50%]"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[url(/uploads/images/image25.jpg)] min-h-[352px] w-full md:w-1/3 content-end cursor-pointer">
              <div className="bg-[#000000a3] py-5 px-3 mt-20">
                <h2 className="font-bold text-xl text-white">
                  How to Host the Ultimate Pizza Party with Cheezious
                </h2>
                <div className="flex justify-between items-center pt-5">
                  <p className="text-white font-bold text-xs">Learn more</p>
                  <ChevronRight
                    size={20}
                    className="text-black bg-white rounded-[50%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogsSection;
