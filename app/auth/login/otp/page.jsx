"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import OTPVerification from "@/app/auth/api/opt-verification.jsx";
import { useRouter } from "next/navigation";
export default function OTPLogin() {
  const router = useRouter();
  const handleVerify = (otp) => {
    OTPVerification(otp, router);
  };
  return (
    <div className="p-2 w-full flex items-center justify-end flex-col h-[50vh]">
      <h2 className="font-bold text-3xl">Enter The Code We Sent</h2>
      <p className="py-3 mb-5 text-lg font-light">To your email address </p>

      <InputOTP
        maxLength={6}
        onChange={(otp) => {
          if (otp.length === 6) {
            handleVerify(otp);
          }
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="mt-5">
        <p>
          Didn’t Receive OTP Code?{" "}
          <span className="text-red-400 font-bold cursor-pointer">Resend</span>
          <span className="bg-red-500 px-3 rounded-lg text-white ms-2 text-bold">
            00.00
          </span>
        </p>
      </div>
    </div>
  );
}
