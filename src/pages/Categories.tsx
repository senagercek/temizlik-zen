import { Link } from "react-router-dom";
import { Sparkles, Zap, Award, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/contexts/CartContext";

const Categories = () => {
  const { count } = useCart();
  const cats = [
    { icon: Sparkles, title: "Deterjanlar", desc: "Çamaşır, bulaşık ve genel temizlik deterjanları", n: "120+", color: "from-blue-400 to-cyan-400" },
    { icon: Zap, title: "Yüzey Temizleyiciler", desc: "Cam, mutfak, banyo ve çok amaçlı temizleyiciler", n: "85+", color: "from-emerald-400 to-teal-400" },
    { icon: Award, title: "Endüstriyel Ürünler", desc: "İşletmeler için profesyonel temizlik çözümleri", n: "60+", color: "from-sky-400 to-blue-500" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />
      <div className="container py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary mb-2">Keşfet</p>
          <h1 className="text-3xl md:text-4xl font-bold">Kategoriler</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cats.map((c) => (
            <Link key={c.title} to="/urunler" className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 p-8 shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1">
              <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${c.color} opacity-10 group-hover:opacity-20 transition-smooth`} />
              <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-6 shadow-soft`}>
                <c.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary-soft text-primary font-semibold">{c.n} ürün</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-smooth" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default Categories;
