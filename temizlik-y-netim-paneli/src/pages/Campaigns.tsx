import { useState } from "react";
import { Plus, Copy, Calendar, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { campaigns } from "@/data/mockData";
import { toast } from "sonner";

const Campaigns = () => {
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kampanyalar"
        description="İndirim kodları ve banner kampanyaları."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
                <Plus className="mr-1.5 h-4 w-4" /> Yeni Kampanya
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader><DialogTitle>Yeni İndirim Kodu</DialogTitle></DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2"><Label>Kampanya Adı</Label><Input placeholder="Örn: Bahar Temizliği" className="h-11 rounded-xl" /></div>
                <div className="space-y-2"><Label>İndirim Kodu</Label><Input placeholder="TEMIZ20" className="h-11 rounded-xl font-mono uppercase" /></div>
                <div className="space-y-2">
                  <Label>İndirim Tipi</Label>
                  <Tabs value={type} onValueChange={(v) => setType(v as typeof type)}>
                    <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
                      <TabsTrigger value="percent" className="rounded-md">Yüzde (%)</TabsTrigger>
                      <TabsTrigger value="fixed" className="rounded-md">Sabit (₺)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Değer</Label><Input type="number" placeholder="0" className="h-11 rounded-xl" /></div>
                  <div className="space-y-2"><Label>Kullanım Limiti</Label><Input type="number" placeholder="100" className="h-11 rounded-xl" /></div>
                </div>
                <div className="space-y-2"><Label>Bitiş Tarihi</Label><Input type="date" className="h-11 rounded-xl" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>İptal</Button>
                <Button className="gradient-primary rounded-xl text-primary-foreground" onClick={() => { toast.success("Kampanya oluşturuldu"); setOpen(false); }}>Oluştur</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Banner mock */}
      <div className="relative overflow-hidden rounded-2xl border border-border gradient-soft p-6 shadow-card">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Megaphone className="h-3 w-3" /> Aktif Banner
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">Bahar Temizliği Başladı! 🌸</h3>
          <p className="mt-1 text-sm text-muted-foreground">Tüm yüzey temizleyicilerde %20 indirim. Kod: TEMIZ20</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="rounded-xl bg-background/80 backdrop-blur">Banner Düzenle</Button>
          </div>
        </div>
        <div className="absolute -right-4 -top-4 text-9xl opacity-20">🧴</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {campaigns.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-base hover:shadow-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">{c.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <code className="rounded-lg bg-muted px-2.5 py-1 font-mono text-sm font-semibold text-primary">{c.code}</code>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => { navigator.clipboard.writeText(c.code); toast.success("Kod kopyalandı"); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <StatusBadge variant={c.status === "Aktif" ? "success" : "muted"}>{c.status}</StatusBadge>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground">İndirim</p>
                <p className="text-lg font-bold text-success">{c.type === "Yüzde" ? `%${c.value}` : `₺${c.value}`}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Bitiş: {c.endDate}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted-foreground">Kullanım</span>
                <span className="font-medium">{c.used} / {c.limit}</span>
              </div>
              <Progress value={(c.used / c.limit) * 100} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
