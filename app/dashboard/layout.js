"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  let [checkDone, setCheckDone] = useState(false);

  function isJwtExpired(token) {
    if (!token) return true; // Token missing

    try {
      const payloadBase64 = token.split(".")[1]; // JWT ka 2nd part (payload)
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Base64 decode

      const expiryTime = decodedPayload.exp; // expiry in seconds
      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

      return expiryTime < currentTime;
    } catch (error) {
      console.error("Token decode error:", error);
      return true; // If error, assume token is invalid
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (!token || !user || isJwtExpired(token)) {
      router.replace("/admin/login");
    } else if (user) {
      user = JSON.parse(user);
      if (user.role !== "admin") {
        router.replace("/menu");
      } else {
        setCheckDone(true);
      }
    } else {
      setCheckDone(true);
    }
  }, [router]);

  if (!checkDone) {
    return null;
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
