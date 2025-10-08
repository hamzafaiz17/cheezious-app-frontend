"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useForm } from "react-hook-form";
import registerfunction from "@/app/auth/api/register";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignUp({ className, ...props }) {
  const router = useRouter();
  let [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    let apiEndpoint = baseURL + apiVersion + "auth/register";
    registerfunction(apiEndpoint, data, router, { setLoading });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>
            Enter your email below to SignUp to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="hello@cheezious.com"
                  {...register("email", { required: true })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <span className="text-red-500">This field is required</span>
                  )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/admin/login"
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
