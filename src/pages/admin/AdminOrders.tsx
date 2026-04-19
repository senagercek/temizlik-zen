import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/admin/PageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const orders = [
  { id: "A1042", customer: "Elif Demir", email: "elif@example.com", total: 349.90, status: "Hazırlanıyor", date: "19 Nis 2026" },
  { id: "A1041", customer: "Mehmet Kaya", email: "mehmet@example.com", total: 189.50, status: "Kargoya Verildi", date: "19 Nis 2026" },
  { id: "A1040", customer: "Ayşe Yıldız", email: "ayse@example.com", total: 549.00, status: "Teslim Edildi", date: "18 Nis 2026" },
  { id: "A1039", customer: "Can Öztürk", email: "can@example.com", total: 94.50, status: "Hazırlanıyor", date: "18 Nis 2026" },
  { id: "A1038", customer: "Zeynep Arslan", email: "zeynep@example.com", total: 229.00, status: "Teslim Edildi", date: "17 Nis 2026" },
  { id: "A1037", customer: "Burak Şahin", email: "burak@example.com", total: 412.30, status: "Kargoya Verildi", date: "17 Nis 2026" },
  { id: "A1036", customer: "Selin Korkmaz", email: "selin@example.com", total: 128.00, status: "Teslim Edildi", date: "16 Nis 2026" },
];

export const statusColor: Record<string, string> = {
  "Hazırlanıyor": "bg-warning/15 text-warning border-warning/30",
  "Kargoya Verildi": "bg-primary/10 text-primary border-primary/30",
  "Teslim Edildi": "bg-success/15 text-success border-success/30",
};

export default function AdminOrders() {
  return (
    <div>
      <PageHeader title="Siparişler" description="Tüm siparişleri görüntüleyin ve yönetin" />

      <Card className="shadow-card border-border/60">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Sipariş no veya müşteri ara..." className="rounded-xl pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="rounded-xl md:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="prep">Hazırlanıyor</SelectItem>
              <SelectItem value="ship">Kargoya Verildi</SelectItem>
              <SelectItem value="done">Teslim Edildi</SelectItem>
            </SelectContent>
          </Select>
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
                <TableHead className="text-right">Detay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="transition-smooth">
                  <TableCell className="font-mono text-xs font-semibold">#{o.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </TableCell>
                  <TableCell className="font-semibold">₺{o.total.toFixed(2)}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColor[o.status]}>{o.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{o.date}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon" className="rounded-lg h-8 w-8">
                      <Link to={`/admin/siparisler/${o.id}`}><Eye className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
