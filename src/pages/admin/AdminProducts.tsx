import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/admin/PageHeader";
import { products } from "@/data/products";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Ürünler"
        description="Mağazanızdaki tüm ürünleri yönetin"
        actions={
          <Button asChild className="rounded-xl gradient-primary text-primary-foreground shadow-soft">
            <Link to="/admin/urunler/yeni"><Plus className="mr-1.5 h-4 w-4" /> Yeni Ürün Ekle</Link>
          </Button>
        }
      />

      <Card className="shadow-card border-border/60">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ürün ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl md:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="det">Deterjanlar</SelectItem>
              <SelectItem value="surface">Yüzey Temizleyiciler</SelectItem>
              <SelectItem value="ind">Endüstriyel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl"><Filter className="mr-1.5 h-4 w-4" /> Filtrele</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Ürün</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => {
                const stock = 5 + ((i * 13) % 95);
                const status = stock < 10 ? "Az Stok" : stock < 30 ? "Sınırlı" : "Stokta";
                const statusClass =
                  status === "Az Stok" ? "bg-destructive/10 text-destructive border-destructive/30" :
                  status === "Sınırlı" ? "bg-warning/15 text-warning border-warning/30" :
                  "bg-success/15 text-success border-success/30";
                return (
                  <TableRow key={p.id} className="transition-smooth">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover bg-muted" />
                        <div>
                          <p className="font-medium text-sm">{p.name}</p>
                          {p.badge && <Badge variant="outline" className="mt-1 text-[10px]">{p.badge}</Badge>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">₺{p.price.toFixed(2)}</p>
                      {p.oldPrice && <p className="text-xs text-muted-foreground line-through">₺{p.oldPrice.toFixed(2)}</p>}
                    </TableCell>
                    <TableCell className="font-medium">{stock}</TableCell>
                    <TableCell><Badge variant="outline" className={statusClass}>{status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" className="rounded-lg h-8 w-8">
                          <Link to={`/admin/urunler/${p.id}`}><Edit className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Ürünü silmek istediğinize emin misiniz?</AlertDialogTitle>
                              <AlertDialogDescription>"{p.name}" kalıcı olarak silinecek. Bu işlem geri alınamaz.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">İptal</AlertDialogCancel>
                              <AlertDialogAction className="rounded-xl bg-destructive hover:bg-destructive/90">Sil</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
