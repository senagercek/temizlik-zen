import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const Products = () => {
  const { add, count } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={count} />
      <div className="container py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary mb-2">Mağaza</p>
          <h1 className="text-3xl md:text-4xl font-bold">Tüm Ürünler</h1>
          <p className="text-muted-foreground mt-2">{products.length} ürün listeleniyor</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default Products;
