import { Building2, ShieldCheck, Truck, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/contexts/CartContext";

const About = () => {
  const { count } = useCart();

  const highlights = [
    {
      icon: Building2,
      title: "Kurumsal Çözümler",
      description: "Ev, ofis ve endüstriyel alanlar için ihtiyaç odaklı ürün seçkisi.",
    },
    {
      icon: ShieldCheck,
      title: "Kalite Güvencesi",
      description: "Tüm ürünlerimiz kalite kontrol süreçlerinden geçirilerek satışa sunulur.",
    },
    {
      icon: Truck,
      title: "Hızlı Teslimat",
      description: "Türkiye genelinde güvenli paketleme ve hızlı kargo desteği.",
    },
    {
      icon: Users,
      title: "Müşteri Memnuniyeti",
      description: "Satış öncesi ve sonrası destek ekibimiz her zaman yanınızda.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />

      <main className="container py-14 md:py-20 flex-1">
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-primary mb-3">Hakkımızda</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Aqualux ile temizlikte güvenilir çözüm ortağınız</h1>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Aqualux, profesyonel temizlik ürünlerini herkes için erişilebilir hale getirmek amacıyla kuruldu.
            Ürün portföyümüzde günlük kullanım için pratik çözümlerden, işletmeler için güçlü endüstriyel
            alternatiflere kadar geniş bir yelpaze sunuyoruz.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <div className="h-11 w-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
