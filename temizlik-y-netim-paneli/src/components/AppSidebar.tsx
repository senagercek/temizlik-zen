import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Star,
  Megaphone,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Ürünler", url: "/urunler", icon: Package },
  { title: "Kategoriler", url: "/kategoriler", icon: FolderTree },
  { title: "Siparişler", url: "/siparisler", icon: ShoppingCart, badge: "12" },
  { title: "Müşteriler", url: "/musteriler", icon: Users },
  { title: "Yorumlar", url: "/yorumlar", icon: Star, badge: "3" },
  { title: "Kampanyalar", url: "/kampanyalar", icon: Megaphone },
];

const bottomItems = [{ title: "Ayarlar", url: "/ayarlar", icon: Settings }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navCls = (path: string) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-base ${
      isActive(path)
        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
        : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border py-4">
        <Logo collapsed={collapsed} />
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Genel
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
                    <NavLink to={item.url} end={item.url === "/"} className={navCls(item.url)}>
                      <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && (
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sistem
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
                    <NavLink to={item.url} className={navCls(item.url)}>
                      <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/40 p-2.5">
            <Avatar className="h-9 w-9 ring-2 ring-background">
              <AvatarImage src="" />
              <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
                AY
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold text-foreground">Ayşe Yılmaz</span>
              <span className="truncate text-xs text-muted-foreground">Yönetici</span>
            </div>
          </div>
        ) : (
          <Avatar className="mx-auto h-9 w-9">
            <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
              AY
            </AvatarFallback>
          </Avatar>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
