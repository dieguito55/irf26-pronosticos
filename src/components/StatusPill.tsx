import { CheckCircle2, Radio, Trophy, WifiOff } from "lucide-react";
import type { TournamentData } from "../types/tournament";

interface StatusPillProps {
  status: TournamentData["updateStatus"];
  compact?: boolean;
}

export const StatusPill = ({ status, compact = false }: StatusPillProps) => {
  const config = {
    live: { icon: Radio, label: "En vivo", className: "border-blue-200 text-blue-600" },
    updated: { icon: CheckCircle2, label: "Actualizado", className: "border-emerald-200 text-emerald-600" },
    finalized: { icon: Trophy, label: "Finalizado", className: "border-amber-200 text-amber-600" },
    error: { icon: WifiOff, label: "Últimos datos", className: "border-red-200 text-red-600" }
  } satisfies Record<TournamentData["updateStatus"], { icon: typeof CheckCircle2; label: string; className: string }>;

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border bg-slate-50 ${
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      } font-semibold ${item.className}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {item.label}
    </span>
  );
};
