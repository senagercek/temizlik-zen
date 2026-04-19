import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Products from "./pages/Products.tsx";
import Categories from "./pages/Categories.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/urunler" element={<Products />} />
            <Route path="/kategoriler" element={<Categories />} />
            <Route path="/urun/:id" element={<ProductDetail />} />
            <Route path="/sepet" element={<Cart />} />
            <Route path="/odeme" element={<Checkout />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="urunler" element={<AdminProducts />} />
              <Route path="urunler/yeni" element={<AdminProductEdit />} />
              <Route path="urunler/:id" element={<AdminProductEdit />} />
              <Route path="kategoriler" element={<AdminCategories />} />
              <Route path="siparisler" element={<AdminOrders />} />
              <Route path="siparisler/:id" element={<AdminOrderDetail />} />
              <Route path="musteriler" element={<AdminCustomers />} />
              <Route path="yorumlar" element={<AdminReviews />} />
              <Route path="kampanyalar" element={<AdminCampaigns />} />
              <Route path="ayarlar" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
