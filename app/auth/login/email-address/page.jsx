"use client";
import { Input } from "@/components/ui/input";
import { MessageSquareMore } from "lucide-react";
import SendOTP from "../../api/send-otp";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function EmailAddressLogin() {
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let apiEndpoint = baseURL + apiVersion + "auth/send-otp/";
    SendOTP(apiEndpoint, data, router, { setLoading });
  };

  return (
    <div className="p-2 w-full flex items-center justify-end flex-col h-[50vh]">
      <h2 className="font-bold text-3xl">Enter Your Email address</h2>
      <p className="py-3 mb-5 text-lg font-light">
        We will send you the code to confirm it.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          className={"w-[350] mb-10 h-11 text-[18px]"}
          placeholder="email@example.com"
          {...register("email", { required: true })}
        />
        {errors.email && errors.email.type === "required" && (
          <span className="text-red-500">This field is required</span>
        )}
        <button
          type="submit"
          className="w-[350] py-3 mb-4 text-lg font-medium uppercase text-center text-black cursor-pointer flex gap-4 items-center justify-center bg-yellow-500 rounded-md"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <MessageSquareMore size={23} className="text-black" />
              "Send OTP"
            </>
          )}
        </button>
      </form>
    </div>
  );
}
