import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function NewsletterSection() {
  return (
    <>
      <div className="md:bg-[url(/uploads/images/offer.1a1809b0.svg)] md:bg-no-repeat md:bg-top-right ">
        <div className="">
          <div className="flex px-10 md:h-[90vh] ">
            <div className="w-[10%] hidden md:block"></div>
            <div className="w-full md:w-[40%] flex flex-col justify-end  text-left pb-15">
              <h4 className="font-semibold text-4xl text-red-500">
                Special Offers & <br /> News
              </h4>
              <p className="text-2xl font-normal pt-5 pb-8">
                Subscribe now for news, promotions and more <br /> delivered
                right to your inbox
              </p>
              <form>
                <Input
                  placeholder="Enter Your Email"
                  className="py-8 px-5 border-[1px] border-black"
                  style={{ fontSize: "20px" }}
                />
                <Button className="bg-linear-to-r from-yellow-400 to-yellow-500 uppercase py-5 px-8 mt-5 cursor-pointer hover:bg-gray-500 text-semiBold">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="w-[50%] hidden md:block"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewsletterSection;
