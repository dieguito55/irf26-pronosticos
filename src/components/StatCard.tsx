import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  detail?: string;
}

export const StatCard = ({ icon: Icon, value, label, detail }: StatCardProps) => (
  <motion.article
    variants={{
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5 }}
    className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-sm transition-colors hover:border-irf-gold/40"
  >
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-amber-600">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
    <p className="font-display text-3xl font-bold text-slate-900">{value}</p>
    <p className="mt-1 text-sm font-semibold text-slate-600">{label}</p>
    {detail ? <p className="mt-3 text-xs leading-5 text-slate-400">{detail}</p> : null}
  </motion.article>
);
