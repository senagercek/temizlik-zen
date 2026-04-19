import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Award, Headphones, Sparkles, Zap, Heart, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import heroImage from "@/assets/hero-products.jpg";

const Index = () => {
  const { add, count } = useCart();

  const trustBadges = [
    { icon: Truck, title: "Hızlı Kargo", desc: "Aynı gün gönderim" },
    { icon: ShieldCheck, title: "Güvenli Ödeme", desc: "256-bit SSL koruma" },
    { icon: Award, title: "Orijinal Ürün", desc: "%100 garanti" },
    { icon: Headphones, title: "7/24 Destek", desc: "Anlık yardım" },
  ];

  const categories = [
    { icon: Sparkles, title: "Deterjanlar", desc: "120+ ürün", color: "from-blue-400 to-cyan-400" },
    { icon: Zap, title: "Yüzey Temizleyiciler", desc: "85+ ürün", color: "from-emerald-400 to-teal-400" },
    { icon: Award, title: "Endüstriyel Ürünler", desc: "60+ ürün", color: "from-sky-400 to-blue-500" },
  ];

  const reasons = [
    { icon: Award, title: "Kaliteli Ürünler", desc: "Sadece test edilmiş, sertifikalı markalar." },
    { icon: Truck, title: "Hızlı Teslimat", desc: "Türkiye'nin her yerine 24 saat içinde." },
    { icon: Heart, title: "Güvenilir Alışveriş", desc: "10.000+ mutlu müşteri bizi tercih ediyor." },
  ];

  const reviews = [
    { name: "Ayşe K.", text: "Ürünler tam beklediğim gibi geldi. Kargo çok hızlıydı, tekrar sipariş vereceğim.", rating: 5 },
    { name: "Mehmet D.", text: "Endüstriyel ürünleri işyerimde kullanıyorum. Kalite mükemmel, fiyatlar uygun.", rating: 5 },
    { name: "Zeynep A.", text: "Müşteri hizmetleri çok ilgili. Soru sorduğumda hemen dönüş yaptılar.", rating: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(hsl(var(--primary)/0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container relative py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border/50 text-xs font-medium text-primary mb-6 shadow-soft">
                <Sparkles className="h-3.5 w-3.5" />
                Türkiye'nin yeni nesil temizlik markası
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight">
                Temizlikte{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Yeni Nesil
                </span>{" "}
                Çözüm
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Profesyonel temizlik ürünleri, hızlı teslimat ve güvenli alışveriş. Eviniz ve işletmeniz için en iyiyi seçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/urunler">
                  <Button size="lg" className="rounded-full h-12 px-7 shadow-soft hover:shadow-hover transition-smooth group">
                    Ürünleri Keşfet
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </Link>
                <Link to="/kategoriler">
                  <Button size="lg" variant="outline" className="rounded-full h-12 px-7 bg-background/80 backdrop-blur">
                    Kategorilere Göz At
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br ${['from-blue-300 to-blue-500','from-emerald-300 to-teal-500','from-sky-300 to-cyan-500','from-teal-300 to-emerald-500'][i-1]}`} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                    <span className="font-semibold ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-muted-foreground">10.000+ mutlu müşteri</p>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute -inset-8 gradient-primary opacity-20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-hover bg-background/50 backdrop-blur">
                <img
                  src={heroImage}
                  alt="Premium temizlik ürünleri koleksiyonu"
                  width={1280}
                  height={1280}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 animate-float">
                <div className="h-10 w-10 rounded-full gradient-mint flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bugün sipariş ver</p>
                  <p className="text-sm font-semibold">Yarın kapında</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 shadow-soft hover:shadow-card transition-smooth">
              <div className="h-11 w-11 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Kategoriler</p>
            <h2 className="text-3xl md:text-4xl font-bold">İhtiyacınıza özel ürünler</h2>
          </div>
          <Link to="/kategoriler" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-smooth">
            Tümünü gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.title}
              to="/kategoriler"
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 p-8 shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1"
            >
              <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${c.color} opacity-10 group-hover:opacity-20 transition-smooth`} />
              <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-6 shadow-soft`}>
                <c.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                Keşfet <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Öne çıkanlar</p>
            <h2 className="text-3xl md:text-4xl font-bold">Çok satan ürünler</h2>
          </div>
          <Link to="/urunler" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-smooth">
            Tümünü gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={add} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-gradient-to-b from-background via-primary-soft/30 to-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-medium text-primary mb-2">Neden biz?</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aqualux farkını yaşayın</h2>
            <p className="text-muted-foreground">Her ürünümüzde kaliteyi, her siparişte güveni hissedin.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card rounded-3xl p-8 text-center border border-border/60 shadow-soft hover:shadow-card transition-smooth">
                <div className="h-16 w-16 rounded-2xl gradient-primary mx-auto mb-5 flex items-center justify-center shadow-soft">
                  <r.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-primary mb-2">Müşteri yorumları</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Binlerce mutlu müşteri</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card rounded-3xl p-7 border border-border/60 shadow-soft hover:shadow-card transition-smooth relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-soft" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="h-10 w-10 rounded-full gradient-mint flex items-center justify-center text-white font-semibold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">Doğrulanmış alıcı</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 md:p-16 text-center shadow-hover">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              İlk siparişinize özel %15 indirim
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-md mx-auto">
              Bültenimize abone olun, kampanyalardan ilk siz haberdar olun.
            </p>
            <Link to="/urunler">
              <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 bg-background text-foreground hover:bg-background/90">
                Alışverişe Başla
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
