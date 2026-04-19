import { Link } from "react-router-dom";
import { Trash2, ShieldCheck, Truck, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, remove, setQty, count, subtotal } = useCart();
  const shipping = subtotal > 250 ? 0 : 29.90;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Sepetim</h1>
        <p className="text-muted-foreground mb-8">{count} ürün sepetinizde</p>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border/60">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-primary-soft flex items-center justify-center mb-5">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Sepetiniz boş</h2>
            <p className="text-muted-foreground mb-6">Hemen alışverişe başlayın ve farkı yaşayın.</p>
            <Link to="/urunler"><Button size="lg" className="rounded-full">Ürünleri Keşfet</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border/60 shadow-soft">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover bg-muted" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-primary font-bold mb-2">₺{item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => setQty(item.id, item.quantity - 1)} className="h-8 w-8 hover:bg-muted rounded-l-full transition-smooth">−</button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => setQty(item.id, item.quantity + 1)} className="h-8 w-8 hover:bg-muted rounded-r-full transition-smooth">+</button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive transition-smooth p-2" aria-label="Kaldır">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card rounded-3xl border border-border/60 shadow-card p-6 space-y-5">
                <h2 className="font-bold text-lg">Sipariş Özeti</h2>
                <div className="flex gap-2">
                  <Input placeholder="İndirim kodu" className="rounded-full" />
                  <Button variant="outline" className="rounded-full">Uygula</Button>
                </div>
                <div className="space-y-2 text-sm pb-4 border-b border-border">
                  <div className="flex justify-between"><span className="text-muted-foreground">Ara toplam</span><span className="font-semibold">₺{subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Kargo</span><span className="font-semibold">{shipping === 0 ? <span className="text-success">Ücretsiz</span> : `₺${shipping.toFixed(2)}`}</span></div>
                  {subtotal < 250 && <p className="text-xs text-muted-foreground"><Tag className="inline h-3 w-3 mr-1" />₺{(250 - subtotal).toFixed(2)} daha ekle, kargo bedava!</p>}
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-semibold">Toplam</span>
                  <span className="text-2xl font-bold text-primary">₺{total.toFixed(2)}</span>
                </div>
                <Link to="/odeme" className="block">
                  <Button size="lg" className="w-full rounded-full h-12 shadow-soft hover:shadow-hover transition-smooth">
                    Ödemeye Geç <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" />Güvenli ödeme</div>
                  <div className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-success" />Hızlı teslimat</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default Cart;
