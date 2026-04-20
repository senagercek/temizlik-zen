import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "destructive" | "info" | "muted";

const styles: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  destructive: "bg-destructive-soft text-destructive",
  info: "bg-primary-soft text-primary",
  muted: "bg-muted text-muted-foreground",
};

export function StatusBadge({
  variant = "default",
  children,
  className,
  dot = true,
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  const dotColor: Record<Variant, string> = {
    default: "bg-foreground/40",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    info: "bg-primary",
    muted: "bg-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[variant])} />}
      {children}
    </span>
  );
}
