import { Sparkles } from "lucide-react";

export const Logo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <div className="flex items-center gap-2.5 px-1">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
      <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
    </div>
    {!collapsed && (
      <div className="flex flex-col leading-tight">
        <span className="text-base font-bold tracking-tight text-foreground">Aqualux</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Admin Panel</span>
      </div>
    )}
  </div>
);
