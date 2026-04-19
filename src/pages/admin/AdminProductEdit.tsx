import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/PageHeader";
import { getProduct } from "@/data/products";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = id ? getProduct(id) : undefined;
  const [tags, setTags] = useState<string[]>(product?.badge ? [product.badge] : []);

  const allTags = ["Öne Çıkan", "İndirimde", "Yeni", "Bugün Kargoda"];

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2 rounded-lg">
        <Link to="/admin/urunler"><ArrowLeft className="mr-1 h-4 w-4" /> Ürünlere Dön</Link>
      </Button>

      <PageHeader
        title={product ? "Ürünü Düzenle" : "Yeni Ürün"}
        description={product ? product.name : "Mağazanıza yeni bir ürün ekleyin"}
        actions={
          <>
            <Button variant="outline" className="rounded-xl" onClick={() => nav("/admin/urunler")}>İptal</Button>
            <Button
              className="rounded-xl gradient-primary text-primary-foreground shadow-soft"
              onClick={() => { toast.success("Ürün kaydedildi"); nav("/admin/urunler"); }}
            >
              Kaydet
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Ürün Bilgileri</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ürün Adı</Label>
                <Input id="name" defaultValue={product?.name} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="desc">Açıklama</Label>
                <Textarea id="desc" rows={5} placeholder="Ürün açıklaması..." className="mt-1.5 rounded-xl" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="price">Fiyat (₺)</Label>
                  <Input id="price" type="number" defaultValue={product?.price} className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="discount">İndirim (%)</Label>
                  <Input id="discount" type="number" placeholder="0" className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="stock">Stok</Label>
                  <Input id="stock" type="number" defaultValue={42} className="mt-1.5 rounded-xl" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Görseller</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product && (
                <div className="relative aspect-square rounded-xl overflow-hidden border bg-muted">
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                  <button className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 text-destructive shadow-soft">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <button className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-smooth">
                <Upload className="h-5 w-5" />
                <span className="text-xs font-medium">Yükle</span>
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Kategori</h3>
            <Select defaultValue="surface">
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="det">Deterjanlar</SelectItem>
                <SelectItem value="surface">Yüzey Temizleyiciler</SelectItem>
                <SelectItem value="ind">Endüstriyel Ürünler</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => {
                const active = tags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => setTags(active ? tags.filter((x) => x !== t) : [...tags, t])}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-smooth border ${
                      active ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-transparent hover:border-primary/40"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Yayın Durumu</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Aktif</p>
                <p className="text-xs text-muted-foreground">Ürün mağazada görünsün</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
