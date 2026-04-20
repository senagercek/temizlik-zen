import { Star, Check, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/mockData";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={"h-3.5 w-3.5 " + (i <= n ? "fill-warning text-warning" : "fill-muted text-muted")} />
    ))}
  </div>
);

const Reviews = () => {
  const [tab, setTab] = useState("all");
  const filtered = reviews.filter((r) =>
    tab === "all" ? true : tab === "pending" ? r.status === "Onay Bekliyor" : r.status === "Onaylandı",
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Yorumlar" description="Müşteri yorumlarını inceleyin ve yönetin." />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-lg bg-muted p-1">
          <TabsTrigger value="all" className="rounded-md text-xs">Tümü ({reviews.length})</TabsTrigger>
          <TabsTrigger value="pending" className="rounded-md text-xs">Onay Bekleyen</TabsTrigger>
          <TabsTrigger value="approved" className="rounded-md text-xs">Onaylanan</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-base hover:shadow-card-hover">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                {r.initials}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{r.customer}</p>
                    <p className="text-xs text-muted-foreground">{r.product} · {r.date}</p>
                  </div>
                  <StatusBadge variant={r.status === "Onaylandı" ? "success" : "warning"}>{r.status}</StatusBadge>
                </div>
                <div className="mt-2"><Stars n={r.rating} /></div>
                <p className="mt-3 text-sm text-foreground">{r.comment}</p>

                {r.status === "Onay Bekliyor" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" className="rounded-xl bg-success text-success-foreground hover:bg-success/90" onClick={() => toast.success("Yorum onaylandı")}>
                      <Check className="mr-1 h-4 w-4" /> Onayla
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-destructive hover:bg-destructive-soft" onClick={() => toast("Yorum reddedildi")}>
                      <X className="mr-1 h-4 w-4" /> Reddet
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
