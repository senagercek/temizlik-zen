import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
  Legend,
} from "recharts";
import {
  ShoppingBag,
  Wallet,
  Users,
  Trophy,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  salesDaily,
  salesWeekly,
  salesMonthly,
  orders,
  categoryShare,
  type OrderStatus,
} from "@/data/mockData";

const statusVariant = (s: OrderStatus) =>
  s === "Teslim Edildi" ? "success" : s === "Kargoya Verildi" ? "info" : s === "Hazırlanıyor" ? "warning" : "destructive";

const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(217 89% 70%)", "hsl(158 60% 60%)", "hsl(215 16% 70%)"];

const Dashboard = () => {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily");
  const data = range === "daily" ? salesDaily : range === "weekly" ? salesWeekly : salesMonthly;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Mağazanızın güncel performansına genel bakış."
        actions={
          <Button className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
            Rapor İndir
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Toplam Sipariş" value="3.482" delta={12.4} icon={ShoppingBag} tone="primary" />
        <StatCard label="Toplam Gelir" value="₺248.920" delta={18.2} icon={Wallet} tone="success" />
        <StatCard label="Toplam Müşteri" value="1.249" delta={8.6} icon={Users} tone="violet" />
        <StatCard
          label="En Çok Satan Ürün"
          value="Yüzey 5L"
          hint="412 satış · ₺53.640 ciro"
          icon={Trophy}
          tone="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Sales chart */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">Satış Analitiği</h3>
              <p className="text-xs text-muted-foreground">Toplam ciro ve sipariş sayısı</p>
            </div>
            <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
              <TabsList className="rounded-lg bg-muted p-1">
                <TabsTrigger value="daily" className="rounded-md text-xs">Günlük</TabsTrigger>
                <TabsTrigger value="weekly" className="rounded-md text-xs">Haftalık</TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-md text-xs">Aylık</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-lg)",
                    fontSize: "12px",
                  }}
                  formatter={(v: number, n) => [n === "satis" ? `₺${v.toLocaleString("tr-TR")}` : v, n === "satis" ? "Ciro" : "Sipariş"]}
                />
                <Area type="monotone" dataKey="satis" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
                <Area type="monotone" dataKey="siparis" stroke="hsl(var(--success))" strokeWidth={2.5} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category share */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="text-base font-semibold text-foreground">Kategori Dağılımı</h3>
          <p className="mb-4 text-xs text-muted-foreground">Bu ay satış payı</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {categoryShare.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [`%${v}`, "Pay"]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="text-base font-semibold text-foreground">Son Siparişler</h3>
            <p className="text-xs text-muted-foreground">En son 6 sipariş</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            Tümünü Gör <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sipariş</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Müşteri</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tarih</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tutar</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 6).map((o) => (
                <TableRow key={o.id} className="border-border transition-base hover:bg-muted/40">
                  <TableCell className="font-mono text-sm font-medium">#{o.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{o.customer}</span>
                      <span className="text-xs text-muted-foreground">{o.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="text-sm font-semibold">₺{o.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge variant={statusVariant(o.status)}>{o.status}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
