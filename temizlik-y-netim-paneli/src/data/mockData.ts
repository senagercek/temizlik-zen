export const salesDaily = [
  { name: "Pzt", satis: 4200, siparis: 24 },
  { name: "Sal", satis: 5100, siparis: 32 },
  { name: "Çar", satis: 4800, siparis: 28 },
  { name: "Per", satis: 6300, siparis: 41 },
  { name: "Cum", satis: 7200, siparis: 48 },
  { name: "Cmt", satis: 8400, siparis: 56 },
  { name: "Paz", satis: 6900, siparis: 44 },
];

export const salesWeekly = [
  { name: "1. Hafta", satis: 32000, siparis: 210 },
  { name: "2. Hafta", satis: 38500, siparis: 245 },
  { name: "3. Hafta", satis: 41200, siparis: 268 },
  { name: "4. Hafta", satis: 47800, siparis: 312 },
];

export const salesMonthly = [
  { name: "Oca", satis: 124000, siparis: 820 },
  { name: "Şub", satis: 138000, siparis: 910 },
  { name: "Mar", satis: 152000, siparis: 998 },
  { name: "Nis", satis: 168000, siparis: 1120 },
  { name: "May", satis: 184000, siparis: 1240 },
  { name: "Haz", satis: 201000, siparis: 1380 },
  { name: "Tem", satis: 218000, siparis: 1450 },
  { name: "Ağu", satis: 232000, siparis: 1580 },
];

export const categoryShare = [
  { name: "Yüzey", value: 38 },
  { name: "Çamaşır", value: 26 },
  { name: "Bulaşık", value: 18 },
  { name: "Banyo", value: 12 },
  { name: "Diğer", value: 6 },
];

export type OrderStatus = "Hazırlanıyor" | "Kargoya Verildi" | "Teslim Edildi" | "İptal Edildi";

export const orders: Array<{
  id: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
}> = [
  { id: "TZ-2849", customer: "Mehmet Kaya", email: "mehmet@mail.com", total: 349.9, status: "Hazırlanıyor", date: "19 Nis 2026", items: 4 },
  { id: "TZ-2848", customer: "Zeynep Demir", email: "zeynep@mail.com", total: 189.5, status: "Kargoya Verildi", date: "19 Nis 2026", items: 2 },
  { id: "TZ-2847", customer: "Ahmet Yıldız", email: "ahmet@mail.com", total: 524.0, status: "Teslim Edildi", date: "18 Nis 2026", items: 6 },
  { id: "TZ-2846", customer: "Elif Arslan", email: "elif@mail.com", total: 99.9, status: "Teslim Edildi", date: "18 Nis 2026", items: 1 },
  { id: "TZ-2845", customer: "Burak Şahin", email: "burak@mail.com", total: 712.4, status: "Hazırlanıyor", date: "17 Nis 2026", items: 8 },
  { id: "TZ-2844", customer: "Selin Aksoy", email: "selin@mail.com", total: 264.8, status: "İptal Edildi", date: "17 Nis 2026", items: 3 },
  { id: "TZ-2843", customer: "Can Öztürk", email: "can@mail.com", total: 432.1, status: "Kargoya Verildi", date: "16 Nis 2026", items: 5 },
  { id: "TZ-2842", customer: "Deniz Aydın", email: "deniz@mail.com", total: 158.0, status: "Teslim Edildi", date: "16 Nis 2026", items: 2 },
];

export type ProductStatus = "Aktif" | "Pasif" | "Stok Yok";

export const products: Array<{
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  emoji: string;
}> = [
  { id: "1", name: "Çok Amaçlı Yüzey Temizleyici 5L", sku: "TZ-YT-5L", category: "Yüzey Temizleyici", price: 129.9, stock: 248, status: "Aktif", emoji: "🧴" },
  { id: "2", name: "Çamaşır Suyu Limon Kokulu 4L", sku: "TZ-CS-4L", category: "Çamaşır", price: 89.5, stock: 412, status: "Aktif", emoji: "🧺" },
  { id: "3", name: "Bulaşık Deterjanı Konsantre 1.5L", sku: "TZ-BD-1.5L", category: "Bulaşık", price: 69.9, stock: 4, status: "Aktif", emoji: "🍽️" },
  { id: "4", name: "Banyo & Kireç Sökücü 750ml", sku: "TZ-BK-750", category: "Banyo", price: 54.0, stock: 0, status: "Stok Yok", emoji: "🛁" },
  { id: "5", name: "Cam Temizleyici Sprey 500ml", sku: "TZ-CT-500", category: "Yüzey Temizleyici", price: 39.9, stock: 186, status: "Aktif", emoji: "🪟" },
  { id: "6", name: "Yumuşatıcı Lavanta 3L", sku: "TZ-YM-3L", category: "Çamaşır", price: 99.0, stock: 92, status: "Aktif", emoji: "💜" },
  { id: "7", name: "Mikrofiber Bez Set (5'li)", sku: "TZ-MB-5", category: "Aksesuar", price: 45.5, stock: 320, status: "Pasif", emoji: "🧽" },
  { id: "8", name: "WC Jel Okaliptüs 750ml", sku: "TZ-WC-750", category: "Banyo", price: 32.9, stock: 158, status: "Aktif", emoji: "🚽" },
];

export const customers = [
  { id: "1", name: "Mehmet Kaya", email: "mehmet@mail.com", city: "İstanbul", orders: 24, spent: 5840, joined: "Mar 2025", initials: "MK" },
  { id: "2", name: "Zeynep Demir", email: "zeynep@mail.com", city: "Ankara", orders: 18, spent: 4120, joined: "May 2025", initials: "ZD" },
  { id: "3", name: "Ahmet Yıldız", email: "ahmet@mail.com", city: "İzmir", orders: 32, spent: 8950, joined: "Şub 2024", initials: "AY" },
  { id: "4", name: "Elif Arslan", email: "elif@mail.com", city: "Bursa", orders: 8, spent: 1240, joined: "Eyl 2025", initials: "EA" },
  { id: "5", name: "Burak Şahin", email: "burak@mail.com", city: "Antalya", orders: 41, spent: 12480, joined: "Oca 2024", initials: "BŞ" },
  { id: "6", name: "Selin Aksoy", email: "selin@mail.com", city: "Konya", orders: 6, spent: 980, joined: "Kas 2025", initials: "SA" },
  { id: "7", name: "Can Öztürk", email: "can@mail.com", city: "İstanbul", orders: 14, spent: 3210, joined: "Tem 2025", initials: "CÖ" },
];

export const categories = [
  { id: "1", name: "Yüzey Temizleyici", slug: "yuzey-temizleyici", products: 28, emoji: "🧴", color: "primary" },
  { id: "2", name: "Çamaşır Ürünleri", slug: "camasir", products: 19, emoji: "🧺", color: "success" },
  { id: "3", name: "Bulaşık Ürünleri", slug: "bulasik", products: 14, emoji: "🍽️", color: "warning" },
  { id: "4", name: "Banyo & WC", slug: "banyo-wc", products: 22, emoji: "🛁", color: "info" },
  { id: "5", name: "Mutfak", slug: "mutfak", products: 11, emoji: "👨‍🍳", color: "primary" },
  { id: "6", name: "Aksesuar", slug: "aksesuar", products: 17, emoji: "🧽", color: "muted" },
];

export const reviews = [
  { id: "1", customer: "Mehmet K.", initials: "MK", product: "Çok Amaçlı Yüzey Temizleyici 5L", rating: 5, comment: "Harika bir ürün! Çok memnunum, kokusu da çok güzel. Tekrar alacağım kesinlikle.", date: "19 Nis 2026", status: "Onay Bekliyor" as const },
  { id: "2", customer: "Zeynep D.", initials: "ZD", product: "Çamaşır Suyu Limon Kokulu", rating: 4, comment: "Lekeleri iyi çıkarıyor, fiyatı da uygun.", date: "18 Nis 2026", status: "Onaylandı" as const },
  { id: "3", customer: "Ahmet Y.", initials: "AY", product: "Bulaşık Deterjanı Konsantre", rating: 5, comment: "Az miktarla bile çok iyi köpürüyor. Kesinlikle tavsiye ederim.", date: "17 Nis 2026", status: "Onaylandı" as const },
  { id: "4", customer: "Elif A.", initials: "EA", product: "Banyo & Kireç Sökücü", rating: 2, comment: "Beklediğim performansı vermedi, kireç tam çıkmadı.", date: "17 Nis 2026", status: "Onay Bekliyor" as const },
  { id: "5", customer: "Burak Ş.", initials: "BŞ", product: "Cam Temizleyici Sprey", rating: 5, comment: "Pırıl pırıl yapıyor, iz bırakmıyor!", date: "16 Nis 2026", status: "Onaylandı" as const },
];

export const campaigns = [
  { id: "1", code: "TEMIZ20", name: "Bahar Temizliği", type: "Yüzde", value: 20, used: 142, limit: 500, status: "Aktif", endDate: "30 Nis 2026" },
  { id: "2", code: "KARGOFREE", name: "Ücretsiz Kargo", type: "Sabit", value: 30, used: 89, limit: 1000, status: "Aktif", endDate: "15 May 2026" },
  { id: "3", code: "YENIYIL", name: "Yeni Yıl Kampanyası", type: "Yüzde", value: 15, used: 320, limit: 320, status: "Bitti", endDate: "31 Oca 2026" },
  { id: "4", code: "VIP50", name: "VIP Müşteri İndirimi", type: "Sabit", value: 50, used: 24, limit: 100, status: "Aktif", endDate: "31 Ara 2026" },
];
