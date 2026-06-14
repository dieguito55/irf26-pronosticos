import { SectionHeading } from "../components/SectionHeading";
import type { EnrichedParticipantScore } from "../types/tournament";
import { initials } from "../utils/format";

interface ParticipantExplorerProps {
  ranking: EnrichedParticipantScore[];
  onSelect: (participant: EnrichedParticipantScore) => void;
}

export const ParticipantExplorer = ({ ranking, onSelect }: ParticipantExplorerProps) => (
  <section id="participantes" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
    <SectionHeading
      eyebrow="Pronósticos por participante"
      title="Cada selección cuenta"
      description="Abre el detalle para revisar los 12 grupos, el top 2 provisional y los puntos obtenidos por grupo."
    />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {ranking.map((entry) => (
        <button key={entry.participantId} type="button" onClick={() => onSelect(entry)} className="text-left">
          <article className="h-full rounded-3xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-1 hover:border-irf-gold/45">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 font-display text-lg font-bold text-amber-600">
              {initials(entry.participant.name)}
            </div>
            <p className="truncate text-lg font-bold text-slate-900">{entry.participant.name}</p>
            <p className="mt-1 text-sm text-slate-400">Posición {entry.position}.º</p>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-black text-amber-600">{entry.totalPoints}</p>
                <p className="text-xs text-slate-400">de 24 puntos</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{entry.perfectGroups} perfectos</span>
            </div>
          </article>
        </button>
      ))}
    </div>
  </section>
);
