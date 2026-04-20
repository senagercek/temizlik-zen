import { ArrowLeft, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";

const ProductEdit = () => {
  const [tags, setTags] = useState({ featured: true, sale: false });
  const [images, setImages] = useState<string[]>(["🧴", "✨", "💧"]);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/urunler"><ArrowLeft className="mr-1 h-4 w-4" /> Ürünlere Dön</Link>
      </Button>

      <PageHeader
        title="Yeni Ürün Ekle"
        description="Ürün bilgilerini eksiksiz doldurarak satışa hazır hale getirin."
        actions={
          <>
            <Button variant="outline" className="rounded-xl">Taslak Kaydet</Button>
            <Button
              className="gradient-primary rounded-xl text-primary-foreground shadow-glow hover:opacity-95"
              onClick={() => toast.success("Ürün başarıyla kaydedildi")}
            >
              Yayınla
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Genel Bilgiler</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ürün Adı</Label>
                <Input id="name" placeholder="Örn: Çok Amaçlı Yüzey Temizleyici 5L" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Açıklama</Label>
                <Textarea id="desc" placeholder="Ürün açıklamasını yazın..." rows={5} className="rounded-xl" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Görseller</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((img, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary-soft to-success-soft">
                  <div className="flex h-full w-full items-center justify-center text-5xl">{img}</div>
                  <button
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-destructive opacity-0 shadow-md transition-base group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-base hover:border-primary hover:bg-primary-soft hover:text-primary">
                <Upload className="h-5 w-5" />
                <span className="text-xs font-medium">Görsel Yükle</span>
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Fiyat & Stok</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Fiyat (₺)</Label>
                <Input type="number" placeholder="0,00" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>İndirim (%)</Label>
                <Input type="number" placeholder="0" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Stok</Label>
                <Input type="number" placeholder="0" className="h-11 rounded-xl" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Kategori</h3>
            <Select>
              <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Yüzey Temizleyici</SelectItem>
                <SelectItem value="2">Çamaşır Ürünleri</SelectItem>
                <SelectItem value="3">Bulaşık Ürünleri</SelectItem>
                <SelectItem value="4">Banyo & WC</SelectItem>
                <SelectItem value="5">Mutfak</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Etiketler</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Öne Çıkan</p>
                  <p className="text-xs text-muted-foreground">Ana sayfada gösterilir</p>
                </div>
                <Switch checked={tags.featured} onCheckedChange={(v) => setTags({ ...tags, featured: v })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">İndirimde</p>
                  <p className="text-xs text-muted-foreground">İndirim rozeti gösterir</p>
                </div>
                <Switch checked={tags.sale} onCheckedChange={(v) => setTags({ ...tags, sale: v })} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
