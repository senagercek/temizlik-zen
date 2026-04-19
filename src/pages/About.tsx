import { Sparkles, ShieldCheck, Truck, HeartHandshake } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/contexts/CartContext";

const About = () => {
  const { count } = useCart();

  const values = [
    {
      icon: Sparkles,
      title: "Kalite Odaklı",
      description: "Her ürünümüz performans, güvenlik ve sürdürülebilirlik kriterleriyle seçilir.",
    },
    {
      icon: Truck,
      title: "Hızlı Teslimat",
      description: "Türkiye geneline hızlı ve güvenilir kargo ile siparişlerinizi ulaştırıyoruz.",
    },
    {
      icon: ShieldCheck,
      title: "Güvenli Alışveriş",
      description: "Güvenli ödeme altyapısı ve şeffaf süreçlerle rahat alışveriş deneyimi sunarız.",
    },
    {
      icon: HeartHandshake,
      title: "Müşteri Memnuniyeti",
      description: "Satış öncesi ve sonrası destek ekibimiz her adımda yanınızdadır.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />

      <main className="container py-12 flex-1">
        <section className="max-w-3xl mb-12">
          <p className="text-sm font-medium text-primary mb-2">Kurumsal</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-muted-foreground leading-relaxed">
            Aqualux, profesyonel ve günlük temizlik ihtiyaçları için güvenilir ürünleri bir araya getiren yeni nesil bir
            temizlik markasıdır. Amacımız; etkili, erişilebilir ve kullanıcı dostu çözümlerle temizlik deneyimini daha
            kolay ve verimli hale getirmektir.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-5">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
            >
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <value.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-2">{value.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
