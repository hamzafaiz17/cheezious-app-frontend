"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import OTPVerificationAPI from "@/app/auth/api/opt-verification.jsx";
import { useRouter } from "next/navigation";
function OTPVerificationForm() {
  const router = useRouter();
  const handleVerify = (value) => {
    // OTPVerificationAPI expects (otp, router)
    OTPVerificationAPI(value, router);
  };

  return (
    <div>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Verify your account</CardTitle>
          <CardDescription>
            Check your email and Enter OTP below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            maxLength={6}
            onChange={(value) => {
              if (value.length === 6) {
                handleVerify(value);
              }
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
      </Card>
    </div>
  );
}

// export both default and named so imports in different styles work (fixes Vercel/Next build issues)
export default OTPVerificationForm;
export { OTPVerificationForm };
