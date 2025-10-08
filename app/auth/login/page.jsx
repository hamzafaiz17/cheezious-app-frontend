import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneCall, IdCard } from "lucide-react";
export default function LoginPage() {
  return (
    <div className="p-2 w-full flex items-center justify-end flex-col h-[50vh]">
      <h2 className="font-bold text-3xl">Hey there, feeling hungry?</h2>
      <p className="py-3 mb-5 text-lg font-light">
        Let’s enjoy your food with cheezious!
      </p>

      <Link
        href={"/auth/login/email-address"}
        className="w-[350] py-3 mb-4 text-lg font-medium uppercase text-center text-black cursor-pointer flex gap-4 items-center justify-center bg-yellow-500 rounded-md"
      >
        <PhoneCall size={22} className="fill-black text-black" />
        Continue With Email
      </Link>
      <Link
        href={"#"}
        className="w-[350] py-3 mb-4 text-lg font-medium uppercase text-center text-black cursor-pointer flex gap-4 items-center justify-center bg-yellow-500 rounded-md"
      >
        <IdCard size={23} className="text-black" />
        Continue as a Guest
      </Link>
    </div>
  );
}
