import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function Addresses({
  setdiliveryNotes,
  PlaceOrder,
  loading,
  setdeliveryAddress,
  isPlaceOrderDisabled,
}) {
  return (
    <>
      <div className="mb-15">
        {/* <div className="text-end font-bold text-red-400 uppercase text-lg cursor-pointer mb-2">
          Change
        </div> */}
        {/* <div className="bg-[#f8f8f8] p-5 py-7 rounded-md">
          <p className="font-semibold text-lg pb-2">testing </p>
          <p className="text-base">
            Safa Gold Mall, F 7 Markaz, F 7, Islamabad, Islamabad Capital
            Territory
          </p>
        </div>
        <div className=" font-bold text-red-400 uppercase text-base cursor-pointer mt-3">
          + ADD NEW ADDRESS
        </div> */}
        <div className="flex flex-col mt-15">
          <label htmlFor="" className="mb-3 font-semibold">
            Delivery Address
          </label>
          <input
            placeholder="Enter Your  Delivery Address"
            className="mt-2 border-none bg-[#f8f8f8] text-lg py-4 px-2"
            onChange={(e) => setdeliveryAddress(e.target.value)}
          />
        </div>
        <div className="h-[150px]"></div>
        <div>
          <label htmlFor="" className="mb-3 font-semibold">
            Delivery Notes:
          </label>
          <Textarea
            placeholder="Enter Your  Delivery Notes"
            className="mt-2 border-none bg-[#f8f8f8] text-lg"
            onChange={(e) => setdiliveryNotes(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <h2 className="font-bold text-4xl py-3">Payment Method</h2>
          <p className="text-lg text-gray-500 font-medium">
            By selecting your method of payment, you will agree to transfer
            refunds for the order you are going to make.
          </p>
        </div>
        <div className="mt-5">
          <div className="flex justify-between bg-[#f8f8f8] py-4 px-3 rounded-md px-8">
            <p className="text-xl">Cash On Delivery</p>
            <img src={"/uploads/images/cash.svg"} alt="" />
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              PlaceOrder();
            }}
            className={`w-full py-4 ${
              isPlaceOrderDisabled === true ? "bg-gray-400" : "bg-yellow-400"
            }  rounded-md font-semibold text-lg uppercase cursor-pointer`}
            disabled={isPlaceOrderDisabled}
          >
            {loading ? (
              <>
                <span className="flex gap-2 items-center justify-center">
                  <Loader2 className="animate-spin" />
                  Please wait
                </span>
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
