import {
  Home,
  Package2,
  Truck
} from "lucide-react"
import { Link } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu Utama
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "List Pengiriman",
    url: "/dashboard/pengiriman",
    icon: Truck,
  },
]

// Menu Demo (Dari Header lama Anda)
// const demoItems = [
//   {
//     title: "Server Functions",
//     url: "/demo/start/server-funcs",
//     icon: Server,
//   },
//   {
//     title: "API Request",
//     url: "/demo/start/api-request",
//     icon: Network,
//   },
//   {
//     title: "SSR: SPA Mode",
//     url: "/demo/start/ssr/spa-mode",
//     icon: StickyNote,
//   },
//   {
//     title: "SSR: Full SSR",
//     url: "/demo/start/ssr/full-ssr",
//     icon: StickyNote,
//   },
//   {
//     title: "SSR: Data Only",
//     url: "/demo/start/ssr/data-only",
//     icon: StickyNote,
//   },
// ]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <Package2 className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">App Pengiriman Demo</span>
            <span className="truncate text-xs">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Grup Aplikasi Utama */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.url}
                      activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Demo TanStack*/}
        {/* <SidebarGroup>*/}
        {/*  <SidebarGroupLabel>Demos & Examples</SidebarGroupLabel>*/}
        {/*  <SidebarGroupContent>*/}
        {/*    <SidebarMenu>*/}
        {/*      {demoItems.map((item) => (*/}
        {/*        <SidebarMenuItem key={item.title}>*/}
        {/*          <SidebarMenuButton asChild tooltip={item.title}>*/}
        {/*            <Link*/}
        {/*              to={item.url}*/}
        {/*              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}*/}
        {/*            >*/}
        {/*              <item.icon />*/}
        {/*              <span>{item.title}</span>*/}
        {/*            </Link>*/}
        {/*          </SidebarMenuButton>*/}
        {/*        </SidebarMenuItem>*/}
        {/*      ))}*/}
        {/*    </SidebarMenu>*/}
        {/*  </SidebarGroupContent>*/}
        {/* </SidebarGroup>*/}
      </SidebarContent>

      {/* <SidebarFooter>*/}
      {/*  <SidebarMenu>*/}
      {/*    <SidebarMenuItem>*/}
      {/*      <SidebarMenuButton>*/}
      {/*        <Settings />*/}
      {/*        <span>Pengaturan</span>*/}
      {/*      </SidebarMenuButton>*/}
      {/*    </SidebarMenuItem>*/}
      {/*  </SidebarMenu>*/}
      {/* </SidebarFooter>*/}

      <SidebarRail />
    </Sidebar>
  )
}