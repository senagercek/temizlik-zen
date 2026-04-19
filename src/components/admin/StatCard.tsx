import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconClass?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconClass }: StatCardProps) {
  const positive = (change ?? 0) >= 0;
  return (
    <Card className="p-5 shadow-card transition-smooth hover:shadow-hover hover:-translate-y-0.5 border-border/60">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 text-xs font-medium", positive ? "text-success" : "text-destructive")}>
              {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{positive ? "+" : ""}{change}%</span>
              <span className="text-muted-foreground font-normal">geçen aya göre</span>
            </div>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", iconClass ?? "bg-primary/10 text-primary")}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
