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
import OTPVerificationAPI from "@/app/auth/api/opt-verification";
export default function OTPVerificationForm() {
  const handleVerify = (value) => {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let APIEndpoint = baseURL + apiVersion + "auth/verify-otp";
    let storedEmail = null;
    if (typeof window !== "undefined" && window.localStorage) {
      storedEmail = localStorage.getItem("email");
    }

    const user = {
      otp: value,
      email: storedEmail,
    };

    try {
      OTPVerificationAPI(APIEndpoint, user);
    } catch (err) {
      // swallow to avoid module evaluation errors during build
      console.error("OTP verification failed:", err);
    }
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
