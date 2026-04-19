import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, count, subtotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const shipping = subtotal > 250 ? 0 : 29.90;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    toast.success("Siparişiniz alındı!", { description: "Onay e-postası gönderildi." });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ödeme</h1>
        <div className="flex items-center gap-2 mb-8 text-sm">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
            Teslimat
          </div>
          <div className="h-px w-10 bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
            Ödeme
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            {step === 1 ? (
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-6 md:p-8 space-y-5">
                <h2 className="font-bold text-lg flex items-center gap-2"><Truck className="h-5 w-5 text-primary" />Teslimat Bilgileri</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Ad</Label><Input required className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>Soyad</Label><Input required className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>E-posta</Label><Input type="email" required className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>Telefon</Label><Input type="tel" required className="rounded-xl h-11" /></div>
                  <div className="md:col-span-2 space-y-2"><Label>Adres</Label><Input required className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>Şehir</Label><Input required className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>Posta Kodu</Label><Input required className="rounded-xl h-11" /></div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-6 md:p-8 space-y-5">
                <h2 className="font-bold text-lg flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" />Ödeme Bilgileri</h2>
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Kart Numarası</Label><Input required placeholder="1234 5678 9012 3456" className="rounded-xl h-11" /></div>
                  <div className="space-y-2"><Label>Kart Üzerindeki İsim</Label><Input required className="rounded-xl h-11" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Son Kullanma</Label><Input required placeholder="AA/YY" className="rounded-xl h-11" /></div>
                    <div className="space-y-2"><Label>CVV</Label><Input required placeholder="123" className="rounded-xl h-11" /></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Lock className="h-3.5 w-3.5" /> Bilgileriniz 256-bit SSL ile şifrelenmektedir.
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, t: "Güvenli Ödeme" },
                { icon: Truck, t: "Hızlı Kargo" },
                { icon: CheckCircle2, t: "14 Gün İade" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-2 p-3 rounded-xl bg-muted/40">
                  <b.icon className="h-4 w-4 text-success shrink-0" />
                  <span className="text-xs font-medium">{b.t}</span>
                </div>
              ))}
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full h-12 shadow-soft hover:shadow-hover transition-smooth" disabled={items.length === 0}>
              {step === 1 ? "Ödemeye Geç" : `Siparişi Tamamla • ₺${total.toFixed(2)}`}
            </Button>
          </form>

          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card rounded-3xl border border-border/60 shadow-card p-6 space-y-4">
              <h2 className="font-bold text-lg">Sipariş Özeti</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={i.id} className="flex gap-3 text-sm">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{i.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-2 text-xs font-medium">{i.name}</p>
                      <p className="text-primary font-semibold text-sm">₺{(i.price * i.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-3 border-t border-border">
                <div className="flex justify-between"><span className="text-muted-foreground">Ara toplam</span><span>₺{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kargo</span><span>{shipping === 0 ? <span className="text-success">Ücretsiz</span> : `₺${shipping.toFixed(2)}`}</span></div>
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-border">
                <span className="font-semibold">Toplam</span>
                <span className="text-2xl font-bold text-primary">₺{total.toFixed(2)}</span>
              </div>
              <Link to="/sepet" className="block text-center text-xs text-muted-foreground hover:text-foreground transition-smooth">← Sepete dön</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default Checkout;
