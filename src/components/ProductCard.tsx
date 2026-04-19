import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  badge?: "İndirimde" | "Bugün Kargoda" | "Yeni";
}

const ProductCard = ({ product, onAdd }: { product: Product; onAdd?: (p: Product) => void }) => {
  const badgeStyles = {
    "İndirimde": "bg-destructive text-destructive-foreground",
    "Bugün Kargoda": "bg-secondary text-secondary-foreground",
    "Yeni": "bg-primary text-primary-foreground",
  };

  return (
    <div className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1">
      {product.badge && (
        <span
          className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[11px] font-semibold ${badgeStyles[product.badge]}`}
        >
          {product.badge}
        </span>
      )}
      <Link to={`/urun/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating.toFixed(1)}</span>
        </div>
        <Link to={`/urun/${product.id}`}>
          <h3 className="font-semibold text-sm mb-3 line-clamp-2 hover:text-primary transition-smooth">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-end justify-between gap-2">
          <div>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through block">
                ₺{product.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">₺{product.price.toFixed(2)}</span>
          </div>
          <Button
            size="icon"
            onClick={() => onAdd?.(product)}
            className="rounded-full h-10 w-10 shadow-soft transition-bounce hover:scale-110"
            aria-label="Sepete ekle"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
