"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="mt-5 mb-2">Main Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="mb-3">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  <Link href={item.url} className="flex gap-2 py-3">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>

                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {/* <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub> */}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {/* {items.map((item) => (
          <Link href={item.url} className="p-2 flex gap-2">
            {item.icon && <item.icon />}
            {item.title}
          </Link>
        ))} */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
