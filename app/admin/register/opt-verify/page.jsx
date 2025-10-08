import { OTPVerification } from "@/components/otp-verification-from";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPVerification />
      </div>
    </div>
  );
}
