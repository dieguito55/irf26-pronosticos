import { AnimatePresence, motion } from "framer-motion";
import { X as CloseIcon, Trophy, CheckCircle, XCircle, AlertCircle, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import type { EnrichedParticipantScore } from "../types/tournament";
import { publicUrl } from "../utils/publicUrl";

interface ParticipantDrawerProps {
  participant: EnrichedParticipantScore | null;
  onClose: () => void;
}

export const ParticipantDrawer = ({ participant, onClose }: ParticipantDrawerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!participant) return undefined;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, participant]);

  return (
    <AnimatePresence>
      {participant ? (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="participant-title">
          {/* Completely transparent backdrop so it does NOT dim the rest of the screen */}
          <motion.button
            type="button"
            aria-label="Cerrar detalle"
            className="absolute inset-0 cursor-default bg-transparent"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-slate-800/80 bg-slate-950 shadow-[-15px_0_40px_-5px_rgba(0,0,0,0.7)] sm:rounded-l-3xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            {/* Subtle stadium background overlay */}
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-15 mix-blend-luminosity"
              style={{ backgroundImage: `url("${publicUrl("assets/dark_stadium_bg.png")}")` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-20 bg-slate-950"
              aria-hidden="true"
            />

            {/* Drawer Header */}
            <div className="border-b border-slate-800/60 bg-slate-900/20 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-amber-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-400">
                      Ficha de Rendimiento
                    </p>
                  </div>
                  <h3 id="participant-title" className="truncate font-sans text-2xl font-black text-white mt-1">
                    {participant.participant.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Posición <span className="text-amber-400 font-bold">{participant.position}.º</span> en el ranking general
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Cerrar"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Progress bar to target */}
              <div className="mt-5" aria-label={`${participant.totalPoints} de 24 puntos`}>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  <span>Puntaje obtenido</span>
                  <span className="text-amber-400">{participant.totalPoints} / 24 PTS</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(participant.totalPoints / 24) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Stats Widgets Grid */}
              <div className="mt-5 grid grid-cols-5 gap-2">
                {[
                  { label: "Puntaje", value: `${participant.totalPoints} pts`, badgeClass: "bg-gradient-to-b from-amber-500/10 to-amber-500/5 text-amber-400 border-amber-500/20", Icon: Trophy },
                  { label: "Aciertos", value: `${participant.hits} tot`, badgeClass: "bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 text-emerald-400 border-emerald-500/20", Icon: CheckCircle },
                  { label: "2 pts (GP)", value: `${participant.perfectGroups} gp`, badgeClass: "bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 text-cyan-400 border-cyan-500/20", Icon: Award },
                  { label: "1 pt (GP)", value: `${participant.groupsWithOneHit} gp`, badgeClass: "bg-gradient-to-b from-purple-500/10 to-purple-500/5 text-purple-400 border-purple-500/20", Icon: AlertCircle },
                  { label: "0 pts (GP)", value: `${participant.groupsWithZeroHits} gp`, badgeClass: "bg-slate-900 text-slate-400 border-slate-800/80", Icon: XCircle }
                ].map(({ label, value, badgeClass, Icon }) => (
                  <div key={label} className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all duration-300 hover:scale-102 ${badgeClass}`}>
                    <Icon className="h-3.5 w-3.5 opacity-80 mb-1" />
                    <span className="text-[7.5px] font-extrabold uppercase tracking-wider opacity-85 leading-tight">{label}</span>
                    <span className="text-xs font-black mt-0.5">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Body - Card Grid */}
            <div className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6 scrollbar-soft">
              <div className="grid gap-3 sm:grid-cols-2">
                {participant.groupScores.map((group) => {
                  // Determine points color
                  const ptsColor = 
                    group.points === 2
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : group.points === 1
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-rose-500/10 text-rose-500 border-rose-500/20";
                        
                  return (
                    <div
                      key={group.groupId}
                      className="group/card flex flex-col justify-between rounded-2xl border border-slate-800/60 bg-slate-900/35 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/60 hover:border-slate-700/60 hover:-translate-y-0.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/40 pb-2.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">
                          Grupo {group.groupId}
                        </span>
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest border ${ptsColor}`}>
                          {group.points} PT{group.points !== 1 ? "S" : ""}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {/* Prediction Column */}
                        <div>
                          <p className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Pronóstico</p>
                          <div className="flex flex-col gap-1">
                            {group.predicted.map((team) => {
                              const hit = group.topTwo.includes(team);
                              return (
                                <div
                                  key={team}
                                  className={`flex items-center justify-between px-2 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                                    hit
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5"
                                      : "bg-slate-950/40 text-slate-500 border-slate-850"
                                  }`}
                                >
                                  <span className="truncate">{team}</span>
                                  {hit ? (
                                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0 ml-1" />
                                  ) : (
                                    <XCircle className="h-3 w-3 text-rose-500/40 shrink-0 ml-1" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Top 2 Provisional Column */}
                        <div>
                          <p className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Top 2 Real</p>
                          <div className="flex flex-col gap-1">
                            {group.topTwo.length > 0 ? (
                              group.topTwo.map((team, idx) => (
                                <div
                                  key={team}
                                  className="flex items-center gap-1.5 bg-slate-950/20 border border-slate-900/50 px-2 py-1 rounded-lg text-[10px] font-bold"
                                >
                                  <span className="text-[8px] font-black text-amber-400 shrink-0">{idx + 1}º</span>
                                  <span className="text-slate-300 truncate">{team}</span>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-[50px] bg-slate-950/10 border border-slate-900/40 rounded-lg text-[9px] text-slate-600 font-bold tracking-wider uppercase">
                                Pendiente
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
