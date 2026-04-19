import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Image as ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { toast } from "sonner";

export default function AdminSettings() {
  return (
    <div>
      <PageHeader
        title="Ayarlar"
        description="Mağaza ve site ayarlarınızı yönetin"
        actions={
          <Button className="rounded-xl gradient-primary text-primary-foreground shadow-soft" onClick={() => toast.success("Ayarlar kaydedildi")}>
            Tüm Değişiklikleri Kaydet
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card border-border/60">
          <h3 className="font-semibold">Marka & Logo</h3>
          <p className="text-xs text-muted-foreground">Mağazanızın logo ve marka ayarları</p>

          <div className="mt-4 space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-xl gradient-primary shadow-soft text-primary-foreground font-bold">A</div>
                <Button variant="outline" className="rounded-xl"><Upload className="mr-1.5 h-4 w-4" /> Logo Yükle</Button>
              </div>
            </div>
            <div>
              <Label>Mağaza Adı</Label>
              <Input defaultValue="Aqualux" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label>Slogan</Label>
              <Input defaultValue="Temizlikte Yeni Nesil Çözüm" className="mt-1.5 rounded-xl" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border/60">
          <h3 className="font-semibold">İletişim Bilgileri</h3>
          <p className="text-xs text-muted-foreground">Müşterilerinize görünen iletişim bilgileri</p>

          <div className="mt-4 space-y-4">
            <div>
              <Label>E-posta</Label>
              <Input type="email" defaultValue="destek@aqualux.com" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input defaultValue="+90 850 123 45 67" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label>Adres</Label>
              <Textarea defaultValue="Levent Mah. Çarşı Sk. No: 12, Beşiktaş / İstanbul" rows={2} className="mt-1.5 rounded-xl" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border/60 lg:col-span-2">
          <h3 className="font-semibold">Anasayfa Banner Yönetimi</h3>
          <p className="text-xs text-muted-foreground">Anasayfada gösterilen ana banner'ı düzenleyin</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <button className="aspect-video rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-smooth">
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm font-medium">Banner görseli yükle</span>
              <span className="text-xs">1920×800 önerilir</span>
            </button>
            <div className="space-y-3">
              <div>
                <Label>Banner Başlığı</Label>
                <Input defaultValue="Temizlikte Yeni Nesil Çözüm" className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label>Alt Başlık</Label>
                <Input defaultValue="Profesyonel temizlik ürünleri, hızlı teslimat" className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label>Buton Metni</Label>
                <Input defaultValue="Ürünleri Keşfet" className="mt-1.5 rounded-xl" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border/60 lg:col-span-2">
          <h3 className="font-semibold">Genel Ayarlar</h3>
          <div className="mt-4 divide-y">
            {[
              { t: "WhatsApp Destek Butonu", d: "Sitede sağ alt köşede WhatsApp butonu göster", v: true },
              { t: "Stok Bildirimleri", d: "Stok azaldığında e-posta bildirim gönder", v: true },
              { t: "Yeni Sipariş Bildirimi", d: "Yeni sipariş geldiğinde anlık bildirim al", v: true },
              { t: "Bakım Modu", d: "Site bakım modunda görüntülensin", v: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{s.t}</p>
                  <p className="text-xs text-muted-foreground">{s.d}</p>
                </div>
                <Switch defaultChecked={s.v} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
