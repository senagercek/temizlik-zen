import { useState } from "react";
import { Search, Mail, Eye } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { customers, orders } from "@/data/mockData";

const Customers = () => {
  const [q, setQ] = useState("");
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Müşteriler" description={`${customers.length} kayıtlı müşteri.`} />

      <div className="rounded-2xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ad veya e-posta ara..." className="h-10 rounded-xl pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Müşteri</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Şehir</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sipariş</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Toplam Harcama</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Üyelik</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="border-border transition-base hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                        {c.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.city}</TableCell>
                  <TableCell className="text-sm font-medium">{c.orders}</TableCell>
                  <TableCell className="text-sm font-semibold text-success">₺{c.spent.toLocaleString("tr-TR")}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.joined}</TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Eye className="h-4 w-4" /></Button>
                      </SheetTrigger>
                      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                        <SheetHeader>
                          <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-base font-semibold text-primary-foreground">
                              {c.initials}
                            </div>
                            <div className="text-left">
                              <SheetTitle>{c.name}</SheetTitle>
                              <SheetDescription>{c.email}</SheetDescription>
                            </div>
                          </div>
                        </SheetHeader>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                          <div className="rounded-xl bg-primary-soft p-3">
                            <p className="text-xs text-muted-foreground">Sipariş</p>
                            <p className="text-lg font-bold text-primary">{c.orders}</p>
                          </div>
                          <div className="rounded-xl bg-success-soft p-3">
                            <p className="text-xs text-muted-foreground">Harcama</p>
                            <p className="text-lg font-bold text-success">₺{(c.spent / 1000).toFixed(1)}K</p>
                          </div>
                          <div className="rounded-xl bg-warning-soft p-3">
                            <p className="text-xs text-muted-foreground">Şehir</p>
                            <p className="text-lg font-bold text-warning">{c.city}</p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="mb-3 text-sm font-semibold">Sipariş Geçmişi</h4>
                          <div className="space-y-2">
                            {orders.slice(0, 4).map((o) => (
                              <div key={o.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                                <div>
                                  <p className="font-mono text-xs font-semibold text-primary">#{o.id}</p>
                                  <p className="text-xs text-muted-foreground">{o.date}</p>
                                </div>
                                <p className="text-sm font-semibold">₺{o.total.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="mt-6 w-full gradient-primary rounded-xl text-primary-foreground">
                          <Mail className="mr-1.5 h-4 w-4" /> Müşteriye Mail Gönder
                        </Button>
                      </SheetContent>
                    </Sheet>
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

export default Customers;
