import { motion } from "framer-motion";
import { Crown, Award, CheckCircle2, XCircle, Star, ArrowRight } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import type { EnrichedParticipantScore } from "../types/tournament";

interface RankingSectionProps {
  ranking: EnrichedParticipantScore[];
  onSelect: (participant: EnrichedParticipantScore) => void;
}

const tableContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export const RankingSection = ({ ranking, onSelect }: RankingSectionProps) => {
  return (
    <section id="ranking" className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Líderes de Pronósticos"
        title="Tabla de Posiciones"
      />

      {/* Desktop View */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200/80 bg-white lg:block shadow-md p-3">
        <table className="w-full border-collapse text-left text-xs">
          <caption className="sr-only">Ranking de participantes</caption>
          <thead className="bg-slate-900 text-white rounded-2xl text-[9px] uppercase tracking-wider font-bold">
            <tr>
              <th className="px-4 py-3.5 rounded-l-xl font-extrabold">Posición</th>
              <th className="px-4 py-3.5 font-extrabold">Participante</th>
              <th className="px-4 py-3.5 font-extrabold">Puntaje</th>
              <th className="px-4 py-3.5 font-extrabold">Aciertos</th>
              <th className="px-4 py-3.5 font-extrabold">Fallidos</th>
              <th className="px-4 py-3.5 font-extrabold">Grupos Perfectos</th>
              <th className="px-4 py-3.5 rounded-r-xl font-extrabold text-right">Acción</th>
            </tr>
          </thead>
          <motion.tbody
            variants={tableContainer}
            initial="hidden"
            animate="show"
            className="divide-y divide-slate-100"
          >
            {ranking.map((entry) => {
              const isFirst = entry.position === 1;
              const isSecond = entry.position === 2;
              const isThird = entry.position === 3;
              
              return (
                <motion.tr
                  key={entry.participantId}
                  variants={rowVariant}
                  whileHover={{ 
                    backgroundColor: "rgba(248, 250, 252, 0.95)", 
                    y: -1.5,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className={`transition-shadow duration-100 ${entry.isTied ? "bg-amber-500/[0.02]" : ""}`}
                >
                  {/* Position cell */}
                  <td className="px-4 py-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      {isFirst ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-800 font-extrabold text-[10px]">
                          <Crown className="h-3 w-3 text-amber-600 shrink-0" />
                          01
                        </span>
                      ) : isSecond ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-700 font-extrabold text-[10px]">
                          02
                        </span>
                      ) : isThird ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange-100 border border-orange-300 text-orange-800 font-extrabold text-[10px]">
                          03
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/60 text-slate-800 font-bold text-[10px]">
                          {String(entry.position).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Participant Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{entry.participant.name}</span>
                      {entry.isTied && (
                        <span className="inline-block text-[8px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded tracking-wider uppercase">
                          Empate
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Points Badge */}
                  <td className="px-4 py-3 font-mono">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 font-extrabold text-xs">
                      <Award className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                      {entry.totalPoints} pts
                    </div>
                  </td>
                  
                  {/* Hits */}
                  <td className="px-4 py-3 font-mono text-slate-800 font-semibold text-xs">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{entry.hits} <span className="text-[10px] text-slate-500 font-normal">aciertos</span></span>
                    </div>
                  </td>
                  
                  {/* Missed */}
                  <td className="px-4 py-3 font-mono text-slate-700 font-semibold text-xs">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>{24 - entry.hits} <span className="text-[10px] text-slate-500 font-normal">fallados</span></span>
                    </div>
                  </td>
                  
                  {/* Perfect Groups */}
                  <td className="px-4 py-3 font-mono text-slate-800 font-semibold text-xs">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-500 shrink-0 fill-amber-500/20" />
                      <span>{entry.perfectGroups} <span className="text-[10px] text-slate-500 font-normal">{entry.perfectGroups === 1 ? "grupo perf." : "grupos perf."}</span></span>
                    </div>
                  </td>
                  
                  {/* Action Button */}
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSelect(entry)}
                      className="group inline-flex items-center justify-center gap-1 rounded-full border border-slate-900 bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white transition duration-150 hover:bg-amber-600 hover:border-amber-600 active:scale-95"
                    >
                      <span>Detalle</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile View */}
      <motion.div
        variants={tableContainer}
        initial="hidden"
        animate="show"
        className="divide-y divide-slate-100 lg:hidden border-t border-b border-slate-100"
      >
        {ranking.map((entry) => (
          <motion.button
            key={entry.participantId}
            variants={rowVariant}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={() => onSelect(entry)}
            className="w-full text-left py-3 px-2 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs transition-colors duration-100"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 font-mono text-xs font-extrabold">
                {entry.position === 1 ? (
                  <span className="text-amber-600">01</span>
                ) : (
                  <span>{String(entry.position).padStart(2, "0")}</span>
                )}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900 flex items-center gap-1">
                  {entry.position === 1 && <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 inline" />}
                  {entry.participant.name}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {entry.hits} ac. · {24 - entry.hits} fal. · {entry.perfectGroups} gp.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="font-extrabold text-slate-900 text-sm">{entry.totalPoints} pts</p>
              </div>
              <span className="text-slate-400 text-sm font-semibold select-none">→</span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};
