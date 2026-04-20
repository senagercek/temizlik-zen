import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders, type OrderStatus } from "@/data/mockData";

const statusVariant = (s: OrderStatus) =>
  s === "Teslim Edildi" ? "success" : s === "Kargoya Verildi" ? "info" : s === "Hazırlanıyor" ? "warning" : "destructive";

const Orders = () => {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = orders.filter((o) => {
    const matchQ = o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase());
    const matchT =
      tab === "all" ||
      (tab === "prep" && o.status === "Hazırlanıyor") ||
      (tab === "ship" && o.status === "Kargoya Verildi") ||
      (tab === "done" && o.status === "Teslim Edildi");
    return matchQ && matchT;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Siparişler" description={`${orders.length} sipariş yönetiliyor.`} />

      <div className="rounded-2xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="rounded-lg bg-muted p-1">
              <TabsTrigger value="all" className="rounded-md text-xs">Tümü</TabsTrigger>
              <TabsTrigger value="prep" className="rounded-md text-xs">Hazırlanıyor</TabsTrigger>
              <TabsTrigger value="ship" className="rounded-md text-xs">Kargoda</TabsTrigger>
              <TabsTrigger value="done" className="rounded-md text-xs">Teslim Edildi</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sipariş No veya müşteri..." className="h-10 rounded-xl pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sipariş No</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Müşteri</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tutar</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Adet</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tarih</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Durum</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id} className="border-border transition-base hover:bg-muted/40">
                  <TableCell className="font-mono text-sm font-semibold text-primary">#{o.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{o.customer}</span>
                      <span className="text-xs text-muted-foreground">{o.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold">₺{o.total.toFixed(2)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.items}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.date}</TableCell>
                  <TableCell><StatusBadge variant={statusVariant(o.status)}>{o.status}</StatusBadge></TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <Link to={`/siparisler/${o.id}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
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

export default Orders;
