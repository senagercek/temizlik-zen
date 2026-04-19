import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import type { Product } from "@/components/ProductCard";

export const products: Product[] = [
  { id: "1", name: "Aqualux Yüzey Temizleyici Sprey 750ml", price: 89.90, oldPrice: 119.90, image: p1, rating: 4.8, badge: "İndirimde" },
  { id: "2", name: "Mint Sıvı Bulaşık Deterjanı 1000ml", price: 64.50, image: p2, rating: 4.9, badge: "Bugün Kargoda" },
  { id: "3", name: "Premium Cam ve Çok Amaçlı Temizleyici", price: 79.00, image: p3, rating: 4.7, badge: "Yeni" },
  { id: "4", name: "Endüstriyel Yağ Çözücü Konsantre 5L", price: 349.90, oldPrice: 429.00, image: p4, rating: 4.9, badge: "İndirimde" },
  { id: "5", name: "Aqualux Banyo Temizleyici 500ml", price: 59.90, image: p1, rating: 4.6 },
  { id: "6", name: "Mint Çamaşır Yumuşatıcı 2L", price: 129.00, image: p2, rating: 4.8, badge: "Bugün Kargoda" },
  { id: "7", name: "Premium Mutfak Yağ Çözücü", price: 94.50, image: p3, rating: 4.7 },
  { id: "8", name: "Endüstriyel Çok Amaçlı Temizleyici 10L", price: 549.00, image: p4, rating: 5.0, badge: "Yeni" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
