"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Book,
  SquareChartGantt,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    profilepic: "",
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setCurrentUser(parsed);
      }
    } catch (err) {
      console.error("Failed to read user from localStorage", err);
    }
  }, []);

  const data = React.useMemo(
    () => ({
      user: {
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        avatar: currentUser?.profilepic || "",
      },
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard/",
          icon: LayoutDashboard,
          items: [
            {
              title: "Home",
              url: "/dashboard/",
            },
          ],
        },
        {
          title: "Products",
          url: "/dashboard/products",
          icon: BriefcaseBusiness,
          items: [
            {
              title: "All Products",
              url: "/dashboard/products",
            },
          ],
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: SquareChartGantt,
          items: [
            {
              title: "All Categories",
              url: "/dashboard/categories",
            },
          ],
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: Book,
          items: [
            {
              title: "All Orders",
              url: "/dashboard/orders",
            },
          ],
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: User,
          items: [
            {
              title: "All Users",
              url: "/dashboard/users",
            },
          ],
        },
      ],
    }),
    [currentUser]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} router={props.router} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
