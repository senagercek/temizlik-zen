import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/admin/PageHeader";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { statusColor } from "./AdminOrders";

const customers = [
  { id: 1, name: "Elif Demir", email: "elif@example.com", phone: "+90 532 100 11 22", orders: 12, spent: 2849.50, city: "İstanbul" },
  { id: 2, name: "Mehmet Kaya", email: "mehmet@example.com", phone: "+90 533 200 22 33", orders: 8, spent: 1589.00, city: "Ankara" },
  { id: 3, name: "Ayşe Yıldız", email: "ayse@example.com", phone: "+90 534 300 33 44", orders: 24, spent: 6549.30, city: "İzmir" },
  { id: 4, name: "Can Öztürk", email: "can@example.com", phone: "+90 535 400 44 55", orders: 3, spent: 384.50, city: "Bursa" },
  { id: 5, name: "Zeynep Arslan", email: "zeynep@example.com", phone: "+90 536 500 55 66", orders: 17, spent: 4129.80, city: "Antalya" },
];

const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

export default function AdminCustomers() {
  const [open, setOpen] = useState<typeof customers[0] | null>(null);

  return (
    <div>
      <PageHeader title="Müşteriler" description="Tüm müşterilerinizi görüntüleyin" />

      <Card className="shadow-card border-border/60">
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Müşteri ara..." className="rounded-xl pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Müşteri</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Şehir</TableHead>
                <TableHead>Sipariş</TableHead>
                <TableHead>Toplam Harcama</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id} className="transition-smooth">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials(c.name)}</AvatarFallback></Avatar>
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{c.email}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </TableCell>
                  <TableCell className="text-sm">{c.city}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{c.orders}</Badge></TableCell>
                  <TableCell className="font-semibold">₺{c.spent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => setOpen(c)}>Detay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle>Müşteri Detayı</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials(open.name)}</AvatarFallback></Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{open.name}</h3>
                    <p className="text-xs text-muted-foreground">Müşteri No: #{open.id.toString().padStart(5, "0")}</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl bg-muted/40 p-4 text-sm">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {open.email}</div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {open.phone}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> {open.city}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4 border-border/60">
                    <p className="text-xs text-muted-foreground">Toplam Sipariş</p>
                    <p className="text-2xl font-bold">{open.orders}</p>
                  </Card>
                  <Card className="p-4 border-border/60">
                    <p className="text-xs text-muted-foreground">Toplam Harcama</p>
                    <p className="text-2xl font-bold">₺{open.spent.toFixed(0)}</p>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Son Siparişler</h4>
                  <div className="space-y-2">
                    {[
                      { id: "A1042", t: "₺349,90", s: "Hazırlanıyor" },
                      { id: "A1031", t: "₺189,50", s: "Teslim Edildi" },
                      { id: "A1019", t: "₺549,00", s: "Teslim Edildi" },
                    ].map((o) => (
                      <div key={o.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                        <span className="font-mono font-semibold">#{o.id}</span>
                        <Badge variant="outline" className={statusColor[o.s]}>{o.s}</Badge>
                        <span className="font-semibold">{o.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
