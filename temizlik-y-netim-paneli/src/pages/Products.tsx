import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { products, type ProductStatus } from "@/data/mockData";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const statusVariant = (s: ProductStatus) =>
  s === "Aktif" ? "success" : s === "Pasif" ? "muted" : "destructive";

const Products = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [delId, setDelId] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase())),
  );

  const cats = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ürünler"
        description={`Toplam ${products.length} ürün listeleniyor.`}
        actions={
          <Button asChild className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
            <Link to="/urunler/yeni">
              <Plus className="mr-1.5 h-4 w-4" /> Yeni Ürün Ekle
            </Link>
          </Button>
        }
      />

      <div className="rounded-2xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ürün adı veya SKU ara..."
              className="h-10 rounded-xl pl-9"
            />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="h-10 w-full rounded-xl sm:w-52">
              <Filter className="mr-1.5 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {cats.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ürün</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kategori</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fiyat</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stok</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Durum</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="border-border transition-base hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-soft to-success-soft text-2xl">
                        {p.emoji}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{p.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-sm font-semibold">₺{p.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        "text-sm font-medium " +
                        (p.stock === 0 ? "text-destructive" : p.stock < 10 ? "text-warning" : "text-foreground")
                      }
                    >
                      {p.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant={statusVariant(p.status)}>{p.status}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Görüntüle</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/urunler/yeni"><Pencil className="mr-2 h-4 w-4" /> Düzenle</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => setDelId(p.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!delId} onOpenChange={(o) => !o && setDelId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Ürünü silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Ürün kalıcı olarak silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive hover:bg-destructive/90"
              onClick={() => {
                toast.success("Ürün silindi");
                setDelId(null);
              }}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
