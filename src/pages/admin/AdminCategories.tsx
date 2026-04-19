import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Droplet, SprayCan, Factory, Sparkles, Upload } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const categories = [
  { name: "Deterjanlar", count: 24, icon: Droplet, color: "bg-primary/10 text-primary" },
  { name: "Yüzey Temizleyiciler", count: 18, icon: SprayCan, color: "bg-secondary/15 text-secondary" },
  { name: "Endüstriyel Ürünler", count: 12, icon: Factory, color: "bg-warning/15 text-warning" },
  { name: "Banyo & Mutfak", count: 31, icon: Sparkles, color: "bg-success/15 text-success" },
];

function CategoryDialog({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-2xl">
        <DialogHeader><DialogTitle>Kategori Bilgileri</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Kategori Adı</Label>
            <Input placeholder="Örn: Deterjanlar" className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label>Görsel</Label>
            <button className="mt-1.5 w-full aspect-video rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-smooth">
              <Upload className="h-5 w-5" />
              <span className="text-xs font-medium">Görsel yükle</span>
            </button>
          </div>
        </div>
        <DialogFooter>
          <Button className="rounded-xl gradient-primary text-primary-foreground">Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminCategories() {
  return (
    <div>
      <PageHeader
        title="Kategoriler"
        description="Ürün kategorilerinizi düzenleyin"
        actions={
          <CategoryDialog
            trigger={
              <Button className="rounded-xl gradient-primary text-primary-foreground shadow-soft">
                <Plus className="mr-1.5 h-4 w-4" /> Yeni Kategori
              </Button>
            }
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <Card key={c.name} className="p-5 shadow-card border-border/60 transition-smooth hover:shadow-hover hover:-translate-y-0.5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">{c.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{c.count} ürün</p>
            <div className="mt-4 flex gap-2">
              <CategoryDialog
                trigger={
                  <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                    <Edit className="mr-1 h-3 w-3" /> Düzenle
                  </Button>
                }
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-lg text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Kategoriyi sil?</AlertDialogTitle>
                    <AlertDialogDescription>"{c.name}" kategorisi silinecek. Bu işlem geri alınamaz.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">İptal</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-destructive hover:bg-destructive/90">Sil</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
