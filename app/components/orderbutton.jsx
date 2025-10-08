import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderBTN() {
  return (
    <>
      <div className="fixed bottom-[50] right-[50]">
        <Button className="bg-[#f15b25] hover:bg-[#f15b25] text-white text-[16px] px-3 py-3">
          {" "}
          <Link href={"/menu"} className="uppercase">
            Order Now
          </Link>
        </Button>
      </div>
    </>
  );
}
