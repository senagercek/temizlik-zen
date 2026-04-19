import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/components/ProductCard";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...p, quantity: 1 }];
    });
    toast.success("Sepete eklendi", { description: p.name });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const setQty = (id: string, q: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, q) } : i)));

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
