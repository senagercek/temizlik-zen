import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, DollarSign, Users, Crown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dataDaily = [
  { name: "Pzt", v: 1200 }, { name: "Sal", v: 1800 }, { name: "Çar", v: 1450 },
  { name: "Per", v: 2200 }, { name: "Cum", v: 2800 }, { name: "Cmt", v: 3400 }, { name: "Paz", v: 2600 },
];
const dataWeekly = [
  { name: "1.Hf", v: 9800 }, { name: "2.Hf", v: 12400 }, { name: "3.Hf", v: 11200 }, { name: "4.Hf", v: 14800 },
];
const dataMonthly = [
  { name: "Oca", v: 32000 }, { name: "Şub", v: 28000 }, { name: "Mar", v: 41000 }, { name: "Nis", v: 38000 },
  { name: "May", v: 49000 }, { name: "Haz", v: 54000 }, { name: "Tem", v: 61000 }, { name: "Ağu", v: 58000 },
];

const recentOrders = [
  { id: "#A1042", customer: "Elif Demir", total: "₺349,90", status: "Hazırlanıyor", date: "19 Nis 2026" },
  { id: "#A1041", customer: "Mehmet Kaya", total: "₺189,50", status: "Kargoya Verildi", date: "19 Nis 2026" },
  { id: "#A1040", customer: "Ayşe Yıldız", total: "₺549,00", status: "Teslim Edildi", date: "18 Nis 2026" },
  { id: "#A1039", customer: "Can Öztürk", total: "₺94,50", status: "Hazırlanıyor", date: "18 Nis 2026" },
  { id: "#A1038", customer: "Zeynep Arslan", total: "₺229,00", status: "Teslim Edildi", date: "17 Nis 2026" },
];

const statusColor: Record<string, string> = {
  "Hazırlanıyor": "bg-warning/15 text-warning border-warning/30",
  "Kargoya Verildi": "bg-primary/10 text-primary border-primary/30",
  "Teslim Edildi": "bg-success/15 text-success border-success/30",
};

export default function Dashboard() {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily");
  const data = range === "daily" ? dataDaily : range === "weekly" ? dataWeekly : dataMonthly;

  return (
    <div>
      <PageHeader title="Dashboard" description="Mağazanızın genel performansı" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Toplam Sipariş" value="1.284" change={12.5} icon={ShoppingBag} />
        <StatCard title="Toplam Gelir" value="₺248.530" change={8.2} icon={DollarSign} iconClass="bg-secondary/15 text-secondary" />
        <StatCard title="Toplam Müşteri" value="3.421" change={5.4} icon={Users} iconClass="bg-success/15 text-success" />
        <StatCard title="En Çok Satan" value="Yüzey Sprey" change={-2.1} icon={Crown} iconClass="bg-warning/15 text-warning" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-card lg:col-span-2 border-border/60">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold">Satış Analizi</h3>
              <p className="text-xs text-muted-foreground">Gelir trendinizi takip edin</p>
            </div>
            <Tabs value={range} onValueChange={(v) => setRange(v as any)}>
              <TabsList className="rounded-xl">
                <TabsTrigger value="daily" className="rounded-lg text-xs">Günlük</TabsTrigger>
                <TabsTrigger value="weekly" className="rounded-lg text-xs">Haftalık</TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-lg text-xs">Aylık</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -10, right: 5, top: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [`₺${v.toLocaleString("tr-TR")}`, "Gelir"]}
                />
                <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border/60">
          <h3 className="font-semibold">En Çok Satanlar</h3>
          <p className="text-xs text-muted-foreground">Bu hafta</p>
          <div className="mt-4 space-y-4">
            {[
              { name: "Yüzey Temizleyici Sprey", sold: 142, pct: 92 },
              { name: "Sıvı Bulaşık Deterjanı", sold: 118, pct: 76 },
              { name: "Cam Temizleyici", sold: 94, pct: 60 },
              { name: "Yağ Çözücü Konsantre", sold: 67, pct: 43 },
            ].map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground text-xs">{p.sold} adet</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary transition-smooth" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 shadow-card border-border/60">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="font-semibold">Son Siparişler</h3>
            <p className="text-xs text-muted-foreground">Mağazanıza gelen en son siparişler</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Sipariş No</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id} className="transition-smooth">
                  <TableCell className="font-mono text-xs font-semibold">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.customer}</TableCell>
                  <TableCell>{o.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor[o.status]}>{o.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{o.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
