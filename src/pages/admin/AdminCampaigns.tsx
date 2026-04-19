import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Percent, Calendar, Image as ImageIcon, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const codes = [
  { code: "BAHAR20", type: "Yüzde", value: "20%", uses: 142, limit: 500, status: "Aktif", expires: "30 Nis 2026" },
  { code: "ILKALISVERIS", type: "Sabit", value: "₺50", uses: 89, limit: 1000, status: "Aktif", expires: "Süresiz" },
  { code: "TEMIZLIK10", type: "Yüzde", value: "10%", uses: 312, limit: 500, status: "Aktif", expires: "15 May 2026" },
  { code: "KISKAMP", type: "Yüzde", value: "30%", uses: 487, limit: 500, status: "Süresi Doldu", expires: "01 Mar 2026" },
];

const banners = [
  { title: "Bahar İndirimleri", subtitle: "Tüm temizlik ürünlerinde %20'ye varan indirim", status: "Aktif" },
  { title: "Ücretsiz Kargo", subtitle: "₺250 üzeri siparişlerde ücretsiz kargo", status: "Aktif" },
];

export default function AdminCampaigns() {
  return (
    <div>
      <PageHeader title="Kampanyalar" description="İndirim kodları ve kampanya banner'larınızı yönetin" />

      <Tabs defaultValue="codes">
        <TabsList className="rounded-xl mb-4">
          <TabsTrigger value="codes" className="rounded-lg">İndirim Kodları</TabsTrigger>
          <TabsTrigger value="banners" className="rounded-lg">Banner'lar</TabsTrigger>
        </TabsList>

        <TabsContent value="codes">
          <Card className="shadow-card border-border/60">
            <div className="flex items-center justify-between border-b p-4">
              <p className="text-sm text-muted-foreground">{codes.length} indirim kodu</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-xl gradient-primary text-primary-foreground shadow-soft">
                    <Plus className="mr-1.5 h-4 w-4" /> Yeni Kod Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader><DialogTitle>Yeni İndirim Kodu</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Kod</Label>
                      <Input placeholder="ÖRN: YAZ25" className="mt-1.5 rounded-xl uppercase" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Tip</Label>
                        <Select defaultValue="pct">
                          <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pct">Yüzde (%)</SelectItem>
                            <SelectItem value="fix">Sabit (₺)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Değer</Label>
                        <Input type="number" placeholder="20" className="mt-1.5 rounded-xl" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Kullanım Limiti</Label>
                        <Input type="number" placeholder="500" className="mt-1.5 rounded-xl" />
                      </div>
                      <div>
                        <Label>Bitiş Tarihi</Label>
                        <Input type="date" className="mt-1.5 rounded-xl" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toast.success("Kod oluşturuldu")} className="rounded-xl gradient-primary text-primary-foreground">
                      Kod Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {codes.map((c) => (
                <div key={c.code} className="rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-primary-soft/40 to-secondary-soft/40 p-4 transition-smooth hover:shadow-soft">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {c.type === "Yüzde" ? <Percent className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                        {c.type} İndirim
                      </div>
                      <p className="font-mono text-lg font-bold mt-1">{c.code}</p>
                      <p className="text-2xl font-bold text-primary mt-1">{c.value}</p>
                    </div>
                    <Badge variant="outline" className={c.status === "Aktif" ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground"}>
                      {c.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{c.uses} / {c.limit} kullanıldı</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {c.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="banners">
          <Card className="shadow-card border-border/60 p-4">
            <div className="grid gap-4">
              {banners.map((b, i) => (
                <div key={i} className="flex flex-col gap-4 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center">
                  <div className="grid h-20 w-full sm:w-32 place-items-center rounded-lg gradient-hero shrink-0">
                    <ImageIcon className="h-6 w-6 text-primary/60" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-success/15 text-success border-success/30">{b.status}</Badge>
                    <Button variant="ghost" size="icon" className="rounded-lg text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="rounded-xl border-dashed h-20">
                <Plus className="mr-1.5 h-4 w-4" /> Yeni Banner Ekle
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
