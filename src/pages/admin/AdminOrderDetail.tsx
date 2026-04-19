import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, User, Phone, Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orders, statusColor } from "./AdminOrders";
import { products } from "@/data/products";
import { toast } from "sonner";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const items = products.slice(0, 3);
  const subtotal = items.reduce((s, p) => s + p.price, 0);

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2 rounded-lg">
        <Link to="/admin/siparisler"><ArrowLeft className="mr-1 h-4 w-4" /> Siparişlere Dön</Link>
      </Button>

      <PageHeader
        title={`Sipariş #${order.id}`}
        description={`${order.date} tarihinde alındı`}
        actions={<Badge variant="outline" className={`${statusColor[order.status]} text-sm py-1.5 px-3`}>{order.status}</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Sipariş Edilen Ürünler</h3>
            <div className="space-y-3">
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-xl bg-muted/40 p-3">
                  <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover bg-card" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Adet: 1</p>
                  </div>
                  <p className="font-semibold">₺{p.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1 border-t pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Kargo</span><span>Ücretsiz</span></div>
              <div className="flex justify-between text-base font-bold pt-1"><span>Toplam</span><span>₺{order.total.toFixed(2)}</span></div>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Sipariş Durumu</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Durum Güncelle</Label>
                <Select defaultValue={order.status}>
                  <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hazırlanıyor">Hazırlanıyor</SelectItem>
                    <SelectItem value="Kargoya Verildi">Kargoya Verildi</SelectItem>
                    <SelectItem value="Teslim Edildi">Teslim Edildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Kargo Takip No</Label>
                <Input placeholder="Örn: 1234567890" className="mt-1.5 rounded-xl" />
              </div>
            </div>
            <Button
              className="mt-4 rounded-xl gradient-primary text-primary-foreground shadow-soft"
              onClick={() => toast.success("Sipariş güncellendi")}
            >
              Güncellemeyi Kaydet
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Müşteri</h3>
            <p className="font-medium">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> +90 532 123 45 67
            </div>
          </Card>

          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Teslimat Adresi</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {order.customer}<br />
              Levent Mah. Çarşı Sk. No: 12 D: 4<br />
              Beşiktaş / İstanbul<br />
              34330
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
