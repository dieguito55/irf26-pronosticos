import { CheckCircle2, Clock3, TimerReset } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { RoundInfo } from "../types/tournament";
import { formatDate } from "../utils/format";

interface RoundsTimelineProps {
  rounds: RoundInfo[];
}

export const RoundsTimeline = ({ rounds }: RoundsTimelineProps) => (
  <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="Cronología" title="Tres rondas, 72 partidos" description="La información se lee desde tournament.json para mantener la interfaz desacoplada de las fechas." />
    <div className="grid gap-4 lg:grid-cols-3">
      {rounds.map((round) => {
        const percent = Math.round((round.processedMatches / round.totalMatches) * 100);
        const Icon = round.status === "completed" ? CheckCircle2 : round.status === "in_progress" ? TimerReset : Clock3;
        return (
          <article key={round.id} className="rounded-3xl border border-slate-200/80 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 text-amber-600">
                <Icon className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-slate-200/80 px-3 py-1 text-xs font-bold text-slate-600">{round.status.replace("_", " ")}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">{round.name}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{round.description}</p>
            <p className="mt-5 text-sm font-semibold text-slate-400">
              {formatDate(round.startsAt)} - {formatDate(round.endsAt)}
            </p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-irf-gold to-irf-info" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {round.processedMatches}/{round.totalMatches} partidos · {percent}%
            </p>
          </article>
        );
      })}
    </div>
  </section>
);
