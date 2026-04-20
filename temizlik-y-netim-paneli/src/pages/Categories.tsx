import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { categories } from "@/data/mockData";
import { toast } from "sonner";

const Categories = () => {
  const [delId, setDelId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategoriler"
        description="Ürün kategorilerini yönetin."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
                <Plus className="mr-1.5 h-4 w-4" /> Yeni Kategori
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader><DialogTitle>Yeni Kategori Ekle</DialogTitle></DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2"><Label>Kategori Adı</Label><Input placeholder="Örn: Mutfak Temizliği" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>URL Slug</Label><Input placeholder="mutfak-temizligi" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>İkon (Emoji)</Label><Input placeholder="👨‍🍳" className="h-11 rounded-xl" /></div>
                <div className="space-y-2">
                  <Label>Görsel</Label>
                  <button className="flex h-24 w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-base hover:border-primary hover:bg-primary-soft hover:text-primary">
                    Görsel Yükle
                  </button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>İptal</Button>
                <Button className="gradient-primary rounded-xl text-primary-foreground" onClick={() => { toast.success("Kategori eklendi"); setOpen(false); }}>Kaydet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-base hover:-translate-y-0.5 hover:shadow-card-hover">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-success-soft text-3xl">
                {c.emoji}
              </div>
              <div className="flex gap-1 opacity-0 transition-base group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive-soft" onClick={() => setDelId(c.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className="mt-4 text-base font-semibold">{c.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">/{c.slug}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Ürün Sayısı</span>
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{c.products}</span>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!delId} onOpenChange={(o) => !o && setDelId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyi sil?</AlertDialogTitle>
            <AlertDialogDescription>Bu kategoriye bağlı ürünler kategorisiz kalacak.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Vazgeç</AlertDialogCancel>
            <AlertDialogAction className="rounded-xl bg-destructive hover:bg-destructive/90" onClick={() => { toast.success("Kategori silindi"); setDelId(null); }}>Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categories;
