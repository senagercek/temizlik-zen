import { LayoutDashboard, Package, FolderTree, ShoppingBag, Users, Star, Megaphone, Settings, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Ürünler", url: "/admin/urunler", icon: Package },
  { title: "Kategoriler", url: "/admin/kategoriler", icon: FolderTree },
  { title: "Siparişler", url: "/admin/siparisler", icon: ShoppingBag },
  { title: "Müşteriler", url: "/admin/musteriler", icon: Users },
  { title: "Yorumlar", url: "/admin/yorumlar", icon: Star },
  { title: "Kampanyalar", url: "/admin/kampanyalar", icon: Megaphone },
  { title: "Ayarlar", url: "/admin/ayarlar", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-4">
        <NavLink to="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-soft">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">Aqualux</span>
              <span className="text-[10px] text-muted-foreground">Admin Panel</span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-wider">Menü</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10 rounded-xl">
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-smooth"
                      activeClassName="!bg-primary/10 !text-primary font-semibold"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t p-3">
          <div className="rounded-xl bg-gradient-to-br from-primary-soft to-secondary-soft p-3">
            <p className="text-xs font-semibold">Pro Sürüme Geç</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Gelişmiş raporlar ve sınırsız ürün</p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
