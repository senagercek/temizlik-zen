import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = ({ cartCount = 0 }: { cartCount?: number }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Anasayfa" },
    { to: "/kategoriler", label: "Kategoriler" },
    { to: "/urunler", label: "Ürünler" },
    { to: "/hakkimizda", label: "Hakkımızda" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-soft transition-bounce group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">Aqualux</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                pathname === l.to
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/sepet">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/50 bg-background animate-fade-in">
          <div className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                  pathname === l.to ? "bg-primary-soft text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
