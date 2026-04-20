import { Bell, Search, Moon, Sun, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function TopBar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-muted" />

      <div className="relative ml-2 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Ürün, sipariş veya müşteri ara..."
          className="h-10 rounded-xl border-border bg-muted/50 pl-10 text-sm focus-visible:bg-background"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-flex">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
          <HelpCircle className="h-[18px] w-[18px]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Bildirimler</span>
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">3 yeni</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: "Yeni sipariş alındı", d: "#TZ-2849 — ₺349,90", c: "primary" },
              { t: "Stok azaldı", d: "Yüzey Temizleyici 5L — 4 adet kaldı", c: "warning" },
              { t: "Yeni yorum", d: "Mehmet K. ürünü değerlendirdi", c: "success" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-3">
                <span className="text-sm font-medium">{n.t}</span>
                <span className="text-xs text-muted-foreground">{n.d}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-xl p-1 transition-base hover:bg-muted">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
                  AY
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Ayşe Yılmaz</span>
                <span className="text-xs font-normal text-muted-foreground">ayse@aqualux.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profilim</DropdownMenuItem>
            <DropdownMenuItem>Hesap Ayarları</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Çıkış Yap</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
