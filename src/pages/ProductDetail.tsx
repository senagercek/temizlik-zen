import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Star, Truck, ShieldCheck, RefreshCw, Heart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products, getProduct } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProduct(id || "1") || products[0];
  const { add, count } = useCart();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0">
      <Header cartCount={count} />

      <div className="container py-6">
        <Link to="/urunler" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
          <ChevronLeft className="h-4 w-4" /> Tüm ürünler
        </Link>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/30 shadow-soft">
              {product.badge && (
                <span className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground">
                  {product.badge}
                </span>
              )}
              <img src={product.image} alt={product.name} width={800} height={800} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <button key={i} className={`aspect-square rounded-xl overflow-hidden border-2 transition-smooth ${i===0 ? 'border-primary' : 'border-border/60 hover:border-primary/50'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} • 247 değerlendirme</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Profesyonel formülü ile hijyenik temizlik sağlar. Tüm yüzeylerde güvenle kullanılabilir, hassas ciltlere uygundur ve ferah bir koku bırakır.
            </p>

            <div className="flex items-end gap-3 mb-8">
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">₺{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="text-4xl font-bold text-primary">₺{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                  %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} indirim
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 hover:bg-muted rounded-l-full transition-smooth">−</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-11 w-11 hover:bg-muted rounded-r-full transition-smooth">+</button>
              </div>
              <Button
                size="lg"
                onClick={() => { for(let i=0;i<qty;i++) add(product); }}
                className="flex-1 rounded-full h-12 shadow-soft hover:shadow-hover transition-smooth"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Sepete Ekle
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, t: "Hızlı Kargo" },
                { icon: ShieldCheck, t: "Güvenli Ödeme" },
                { icon: RefreshCw, t: "14 Gün İade" },
              ].map((b) => (
                <div key={b.t} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/40">
                  <b.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-center">{b.t}</span>
                </div>
              ))}
            </div>

            <Tabs defaultValue="desc" className="w-full">
              <TabsList className="w-full justify-start rounded-full bg-muted/50 h-11 p-1">
                <TabsTrigger value="desc" className="rounded-full">Ürün Açıklaması</TabsTrigger>
                <TabsTrigger value="features" className="rounded-full">Özellikler</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full">Yorumlar</TabsTrigger>
              </TabsList>
              <TabsContent value="desc" className="text-sm text-muted-foreground leading-relaxed pt-5">
                Aqualux profesyonel formülü ile günlük temizlik ihtiyaçlarınızı en üst seviyede karşılar. Yüzeylere zarar vermeden derinlemesine temizlik sağlar, %99.9 oranında bakteri ve mikropları yok eder. Doğal bileşenleri ile çevre dostu ve insan sağlığına zararsızdır.
              </TabsContent>
              <TabsContent value="features" className="pt-5">
                <ul className="space-y-2 text-sm">
                  {["Hacim: 750ml", "%99.9 antibakteriyel", "Tüm yüzeylerde kullanılabilir", "Ferah lavanta kokusu", "Türkiye'de üretilmiştir"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{f}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-5 space-y-4">
                {[
                  { n: "Elif T.", t: "Kokusu çok güzel, lekeler anında çıkıyor. Tavsiye ederim." },
                  { n: "Burak Y.", t: "Fiyat-performans olarak süper. Tekrar alacağım." },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-muted/40">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{r.n}</span>
                      <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} className="h-3 w-3 fill-warning text-warning" />)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.t}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related */}
        <section className="py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Bu ürünle birlikte alınanlar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}
          </div>
        </section>
      </div>

      {/* Mobile sticky add */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border p-4 flex items-center gap-3 shadow-hover">
        <div>
          <p className="text-xs text-muted-foreground">Toplam</p>
          <p className="text-lg font-bold text-primary">₺{(product.price * qty).toFixed(2)}</p>
        </div>
        <Button onClick={() => { for(let i=0;i<qty;i++) add(product); }} className="flex-1 rounded-full h-12 shadow-soft">
          <ShoppingCart className="mr-2 h-4 w-4" /> Sepete Ekle
        </Button>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
