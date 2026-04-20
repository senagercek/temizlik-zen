import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

type Tone = "primary" | "success" | "warning" | "violet";

const tones: Record<Tone, { bg: string; icon: string }> = {
  primary: { bg: "bg-primary-soft", icon: "text-primary" },
  success: { bg: "bg-success-soft", icon: "text-success" },
  warning: { bg: "bg-warning-soft", icon: "text-warning" },
  violet: { bg: "bg-accent", icon: "text-accent-foreground" },
};

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  hint,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-base hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{value}</p>
          {hint && <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", tones[tone].bg)}>
          <Icon className={cn("h-5 w-5", tones[tone].icon)} strokeWidth={2.2} />
        </div>
      </div>

      {typeof delta === "number" && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
              positive ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
          <span className="text-xs text-muted-foreground">geçen aya göre</span>
        </div>
      )}
    </div>
  );
}
