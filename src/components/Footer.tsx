import { Sparkles, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-24">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Aqualux</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Profesyonel temizlik çözümlerinde Türkiye'nin yeni nesil markası.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Alışveriş</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-smooth cursor-pointer">Tüm Ürünler</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">Kategoriler</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">Kampanyalar</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">Yeni Gelenler</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Yardım</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-smooth cursor-pointer">Sıkça Sorulanlar</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">Kargo & Teslimat</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">İade Politikası</li>
              <li className="hover:text-foreground transition-smooth cursor-pointer">İletişim</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Bizi Takip Edin</h4>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth"
                  aria-label="Sosyal medya"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-muted-foreground">
          <p>© 2025 Aqualux. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-smooth">Gizlilik</a>
            <a href="#" className="hover:text-foreground transition-smooth">Şartlar</a>
            <a href="#" className="hover:text-foreground transition-smooth">KVKK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
