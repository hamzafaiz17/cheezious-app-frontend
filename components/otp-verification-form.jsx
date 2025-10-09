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
export default function OTPVerification() {
  const handleVerify = (value) => {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let APIEndpoint = baseURL + apiVersion + "auth/verify-otp";
    let user = {
      otp: value,
      email: localStorage.getItem(email),
    };
    console.log(user);
    OTPVerificationAPI(APIEndpoint, user);
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
            value={otp}
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
