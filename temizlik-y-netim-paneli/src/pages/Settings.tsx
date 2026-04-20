import { Upload, MessageCircle, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [whatsapp, setWhatsapp] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ayarlar"
        description="Mağaza yapılandırması ve genel ayarlar."
        actions={
          <Button className="gradient-primary rounded-xl text-primary-foreground shadow-glow" onClick={() => toast.success("Ayarlar kaydedildi")}>
            Değişiklikleri Kaydet
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Logo */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">Logo</h3>
          <p className="mt-1 text-xs text-muted-foreground">Site logonuzu güncelleyin.</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Sparkles className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <Button variant="outline" className="rounded-xl">
              <Upload className="mr-1.5 h-4 w-4" /> Yeni Logo Yükle
            </Button>
          </div>
        </section>

        {/* WhatsApp */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-base font-semibold">WhatsApp Destek</h3>
          <p className="mt-1 text-xs text-muted-foreground">Sitenin sağ alt köşesinde bir WhatsApp butonu gösterir.</p>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-success-soft p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success text-success-foreground">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">WhatsApp Butonu</p>
                <p className="text-xs text-muted-foreground">{whatsapp ? "Aktif" : "Devre dışı"}</p>
              </div>
            </div>
            <Switch checked={whatsapp} onCheckedChange={setWhatsapp} />
          </div>

          {whatsapp && (
            <div className="mt-4 space-y-2 animate-fade-in">
              <Label>WhatsApp Numarası</Label>
              <Input placeholder="+90 532 123 45 67" className="h-11 rounded-xl" defaultValue="+90 532 123 45 67" />
            </div>
          )}
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="text-base font-semibold">İletişim Bilgileri</h3>
          <p className="mt-1 text-xs text-muted-foreground">Footer ve iletişim sayfasında gösterilir.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Mağaza Adı</Label><Input defaultValue="Aqualux Temizlik" className="h-11 rounded-xl" /></div>
            <div className="space-y-2"><Label>E-posta</Label><Input type="email" defaultValue="info@aqualux.com" className="h-11 rounded-xl" /></div>
            <div className="space-y-2"><Label>Telefon</Label><Input defaultValue="+90 212 555 12 34" className="h-11 rounded-xl" /></div>
            <div className="space-y-2"><Label>Şehir</Label><Input defaultValue="İstanbul" className="h-11 rounded-xl" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Adres</Label><Textarea rows={3} defaultValue="Maslak Mah. Büyükdere Cd. No:255 Sarıyer / İstanbul" className="rounded-xl" /></div>
          </div>
        </section>

        {/* Homepage banner */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <h3 className="text-base font-semibold">Anasayfa Banner Yönetimi</h3>
          <p className="mt-1 text-xs text-muted-foreground">Anasayfa hero alanındaki banner.</p>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="space-y-2"><Label>Başlık</Label><Input defaultValue="Bahar Temizliği Başladı!" className="h-11 rounded-xl" /></div>
              <div className="space-y-2"><Label>Alt Başlık</Label><Input defaultValue="Tüm yüzey temizleyicilerde %20 indirim" className="h-11 rounded-xl" /></div>
              <div className="space-y-2"><Label>Buton Metni</Label><Input defaultValue="Hemen Alışveriş" className="h-11 rounded-xl" /></div>
            </div>
            <div>
              <Label className="mb-2 block">Banner Görseli</Label>
              <button className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-gradient-to-br from-primary-soft to-success-soft text-primary transition-base hover:border-primary">
                <Upload className="h-6 w-6" />
                <span className="text-sm font-medium">Görsel Yükle</span>
                <span className="text-xs text-muted-foreground">Önerilen: 1920x600px</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
