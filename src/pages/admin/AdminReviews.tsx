import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/admin/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const reviews = [
  { id: 1, user: "Elif D.", product: "Aqualux Yüzey Temizleyici Sprey 750ml", rating: 5, comment: "Harika bir ürün, kokusu çok güzel ve etkili. Kesinlikle tekrar alacağım.", date: "18 Nis", status: "pending" },
  { id: 2, user: "Mehmet K.", product: "Premium Cam ve Çok Amaçlı Temizleyici", rating: 4, comment: "Cam temizliğinde çok başarılı. Sadece kapağı biraz daha sağlam olabilirdi.", date: "17 Nis", status: "pending" },
  { id: 3, user: "Ayşe Y.", product: "Mint Sıvı Bulaşık Deterjanı 1000ml", rating: 5, comment: "Köpüğü harika, az miktarda bile çok bulaşık yıkıyor. Tavsiye ederim.", date: "16 Nis", status: "approved" },
  { id: 4, user: "Can Ö.", product: "Endüstriyel Yağ Çözücü Konsantre 5L", rating: 5, comment: "Restoranımda kullanıyorum, mükemmel sonuç veriyor.", date: "15 Nis", status: "approved" },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-warning text-warning" : "text-muted"}`} />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  return (
    <div>
      <PageHeader title="Yorumlar" description="Müşteri yorumlarını onaylayın veya reddedin" />

      <Tabs defaultValue="pending">
        <TabsList className="rounded-xl mb-4">
          <TabsTrigger value="pending" className="rounded-lg">Bekleyenler ({reviews.filter(r => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="all" className="rounded-lg">Tümü ({reviews.length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {reviews.map((r) => (
          <Card key={r.id} className="p-5 shadow-card border-border/60 transition-smooth hover:shadow-hover">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3 flex-1 min-w-0">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{r.user.split(" ").map(p => p[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sm">{r.user}</p>
                    <Stars n={r.rating} />
                    <span className="text-xs text-muted-foreground">• {r.date}</span>
                    {r.status === "approved" && <Badge variant="outline" className="bg-success/15 text-success border-success/30 text-[10px]">Onaylı</Badge>}
                    {r.status === "pending" && <Badge variant="outline" className="bg-warning/15 text-warning border-warning/30 text-[10px]">Bekliyor</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.product}</p>
                  <p className="text-sm mt-2 leading-relaxed">{r.comment}</p>
                </div>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-2 sm:flex-col">
                  <Button
                    size="sm"
                    className="rounded-lg bg-success/15 text-success hover:bg-success hover:text-white border border-success/30"
                    onClick={() => toast.success("Yorum onaylandı")}
                  >
                    <Check className="h-3.5 w-3.5 sm:mr-1" /><span className="hidden sm:inline">Onayla</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => toast.error("Yorum reddedildi")}
                  >
                    <X className="h-3.5 w-3.5 sm:mr-1" /><span className="hidden sm:inline">Reddet</span>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
