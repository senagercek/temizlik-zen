import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Package, Truck, CheckCircle2, Printer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders } from "@/data/mockData";
import { toast } from "sonner";
import { useState } from "react";

const orderItems = [
  { name: "Çok Amaçlı Yüzey Temizleyici 5L", emoji: "🧴", qty: 2, price: 129.9 },
  { name: "Cam Temizleyici Sprey 500ml", emoji: "🪟", qty: 1, price: 39.9 },
  { name: "Mikrofiber Bez Set", emoji: "🧽", qty: 1, price: 50.2 },
];

const OrderDetail = () => {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const [status, setStatus] = useState(order.status);
  const [tracking, setTracking] = useState("");

  const subtotal = orderItems.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = 30;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/siparisler"><ArrowLeft className="mr-1 h-4 w-4" /> Siparişlere Dön</Link>
      </Button>

      <PageHeader
        title={`Sipariş #${order.id}`}
        description={`${order.date} tarihinde oluşturuldu`}
        actions={
          <>
            <Button variant="outline" className="rounded-xl"><Printer className="mr-1.5 h-4 w-4" /> Fatura Yazdır</Button>
            <StatusBadge variant={status === "Teslim Edildi" ? "success" : status === "Kargoya Verildi" ? "info" : "warning"}>
              {status}
            </StatusBadge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Items */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Sipariş Ürünleri</h3>
            <div className="space-y-3">
              {orderItems.map((it, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-soft to-success-soft text-2xl">
                    {it.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{it.name}</p>
                    <p className="text-xs text-muted-foreground">₺{it.price.toFixed(2)} × {it.qty}</p>
                  </div>
                  <p className="text-sm font-semibold">₺{(it.price * it.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Kargo</span><span>₺{shipping.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><span>Toplam</span><span>₺{(subtotal + shipping).toFixed(2)}</span></div>
            </div>
          </section>

          {/* Status update */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Sipariş Durumu</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Durum Güncelle</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hazırlanıyor">🟡 Hazırlanıyor</SelectItem>
                    <SelectItem value="Kargoya Verildi">🔵 Kargoya Verildi</SelectItem>
                    <SelectItem value="Teslim Edildi">🟢 Teslim Edildi</SelectItem>
                    <SelectItem value="İptal Edildi">🔴 İptal Edildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kargo Takip No</Label>
                <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Örn: 1234567890" className="h-11 rounded-xl" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="gradient-primary rounded-xl text-primary-foreground shadow-glow" onClick={() => toast.success("Sipariş güncellendi")}>
                Güncelle
              </Button>
            </div>

            {/* Timeline */}
            <div className="mt-6 space-y-3 border-t border-border pt-5">
              {[
                { i: Package, label: "Sipariş Alındı", time: "19 Nis 2026, 14:32", done: true },
                { i: Package, label: "Hazırlanıyor", time: "19 Nis 2026, 15:10", done: true },
                { i: Truck, label: "Kargoya Verildi", time: "—", done: status === "Kargoya Verildi" || status === "Teslim Edildi" },
                { i: CheckCircle2, label: "Teslim Edildi", time: "—", done: status === "Teslim Edildi" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={"flex h-9 w-9 items-center justify-center rounded-full " + (s.done ? "bg-success-soft text-success" : "bg-muted text-muted-foreground")}>
                    <s.i className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-base font-semibold">Müşteri Bilgileri</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                {order.customer.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{order.customer}</p>
                <p className="text-xs text-muted-foreground">14 sipariş geçmişi</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {order.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +90 532 123 45 67</div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold"><MapPin className="h-4 w-4 text-primary" /> Teslimat Adresi</h3>
            <p className="text-sm text-foreground">Atatürk Mah. Çiçek Sok. No:12 D:5</p>
            <p className="text-sm text-muted-foreground">Kadıköy / İstanbul, 34710</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
