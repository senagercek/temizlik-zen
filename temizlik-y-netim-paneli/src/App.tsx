import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductEdit from "./pages/ProductEdit";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Customers from "./pages/Customers";
import Reviews from "./pages/Reviews";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/urunler" element={<Products />} />
            <Route path="/urunler/yeni" element={<ProductEdit />} />
            <Route path="/kategoriler" element={<Categories />} />
            <Route path="/siparisler" element={<Orders />} />
            <Route path="/siparisler/:id" element={<OrderDetail />} />
            <Route path="/musteriler" element={<Customers />} />
            <Route path="/yorumlar" element={<Reviews />} />
            <Route path="/kampanyalar" element={<Campaigns />} />
            <Route path="/ayarlar" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
