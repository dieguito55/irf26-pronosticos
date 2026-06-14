import { ArrowDown, ArrowRight, ArrowUp, Crown, Minus } from "lucide-react";
import type { EnrichedParticipantScore } from "../types/tournament";
import { firstDisplayName, initials } from "../utils/format";
import { publicUrl } from "../utils/publicUrl";

interface PodiumProps {
  ranking: EnrichedParticipantScore[];
  onSelect: (participant: EnrichedParticipantScore) => void;
}

/* ─── Deterministic confetti particles ─── */
const CONFETTI = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${(i * 3.3) + Math.sin(i * 0.7) * 1.5}%`,
  delay: `${(i % 5) * 0.8}s`,
  duration: `${3 + (i % 3) * 0.8}s`,
  size: `${4 + (i % 3) * 2}px`,
  color: ["#facc15", "#3b82f6", "#ef4444", "#22c55e", "#ffffff"][i % 5],
}));

export const Podium = ({ ranking, onSelect }: PodiumProps) => {
  const leader = ranking[0];
  if (!leader) return null;

  const leaderPoints = leader.totalPoints;
  // Mostramos los primeros 4 participantes (Top 4) en la tabla rápida para compactar el espacio vertical
  const tableParticipants = ranking.slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden py-6 px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-[#0b0f19] to-slate-950">
      {/* Subtle soccer pattern overlay for texture */}
      <div
        className="absolute inset-0 -z-20 bg-[length:180px_180px] opacity-[0.015]"
        style={{ backgroundImage: `url("${publicUrl("assets/football-pattern.svg")}")` }}
      />

      {/* ─── ATMOSPHERIC EFFECTS ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {CONFETTI.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti rounded-sm opacity-0"
            style={{
              left: c.left,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              animationDelay: c.delay,
              animationDuration: c.duration,
              top: "-20px",
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-yellow-400/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          
          {/* ═══ LEFT COLUMN: LEADER SPOTLIGHT ═══ */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="text-center mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400/90 font-sans block">
                Líder Actual
              </span>
              <h2 className="font-sans text-2xl font-black tracking-tight text-white leading-tight">
                Cuadro de Honor
              </h2>
            </div>

            {/* Trophy 1st */}
            <div className="flex items-center justify-center w-full relative z-10 select-none pointer-events-none mb-2">
              <div className="absolute w-[120px] h-[120px] rounded-full bg-gradient-radial from-yellow-400/15 to-transparent blur-xl -z-10" />
              <img
                src={publicUrl("assets/podium_1st.png")}
                alt="Trofeo Primer Lugar"
                className="h-32 md:h-36 object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.5)]"
                style={{ mixBlendMode: "screen" }}
              />
            </div>

            {/* Leader Card */}
            <button
              type="button"
              onClick={() => onSelect(leader)}
              className="relative w-[85%] text-left z-20 focus:outline-none group/card"
            >
              <article className="card-sheen relative overflow-hidden rounded-2xl border border-yellow-400/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-3.5 shadow-[0_0_25px_rgba(234,179,8,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 animate-golden-shimmer opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-xs font-black bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 shadow-lg">
                      {initials(leader.participant.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-black tracking-tight truncate text-yellow-50">
                        {firstDisplayName(leader.participant.name)}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-yellow-400">
                        <Crown className="h-2 w-2" />
                        Líder Copa
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 block">Pos.</span>
                    <span className="font-black text-lg font-sans text-yellow-400 leading-none">1º</span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between gap-1 rounded-xl border border-white/[0.06] bg-white/[0.01] py-1.5 px-2.5">
                  <div className="text-center flex-1">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2 font-sans">Puntos</p>
                    <p className="font-black text-base font-sans text-yellow-400">{leader.totalPoints}</p>
                  </div>
                  <div className="h-4.5 w-[1px] bg-white/10" />
                  <div className="text-center flex-1">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2 font-sans">Aciertos</p>
                    <p className="font-black text-base font-sans text-slate-200">{leader.hits}</p>
                  </div>
                  <div className="h-4.5 w-[1px] bg-white/10" />
                  <div className="text-center flex-1">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2 font-sans">Dif.</p>
                    <p className="font-black text-base font-sans text-slate-200">—</p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                    <ArrowUp className="h-2.5 w-2.5 stroke-[2.5]" />+{leader.movement}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-yellow-400 opacity-75 group-hover/card:opacity-100 transition-opacity flex items-center gap-1">
                    Ver Pronósticos
                    <ArrowRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </article>
            </button>
          </div>

          {/* ═══ RIGHT COLUMN: QUICK POSITION LIST (ULTRA-PREMIUM DIRECT CARDS) ═══ */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/[0.08]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white font-sans">
                  Tabla de Posiciones Rápida
                </h3>
                <p className="text-[10px] text-slate-450 mt-0.2">Top 4 Participantes · En vivo</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-slate-400 px-3 py-0.5 rounded-full backdrop-blur-sm">
                Fase de Grupos
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {tableParticipants.map((entry) => {
                const isLeader = entry.position === 1;
                const diff = leaderPoints - entry.totalPoints;
                
                return (
                  <div
                    key={entry.participantId}
                    onClick={() => onSelect(entry)}
                    className={`group/row relative flex items-center justify-between py-2 px-3.5 rounded-xl border cursor-pointer transition-all duration-350 hover:-translate-x-1 ${
                      isLeader
                        ? "border-yellow-400/30 bg-gradient-to-r from-yellow-500/[0.03] to-transparent hover:border-yellow-400"
                        : entry.position === 2
                        ? "border-white/10 bg-white/[0.01] hover:border-slate-350 hover:bg-white/[0.03]"
                        : entry.position === 3
                        ? "border-white/10 bg-white/[0.01] hover:border-amber-600 hover:bg-white/[0.03]"
                        : "border-white/5 bg-white/[0.005] hover:border-white/15 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Left side: Position + Avatar + Name */}
                    <div className="flex items-center gap-2.5">
                      {/* Position Badge */}
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg font-sans text-xs font-black ${
                        isLeader
                          ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10"
                          : entry.position === 2
                          ? "bg-slate-300 text-slate-900"
                          : entry.position === 3
                          ? "bg-amber-750 text-white"
                          : "bg-white/5 text-slate-400"
                      }`}>
                        {entry.position}º
                      </span>

                      {/* Avatar */}
                      <div className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full font-sans text-[10px] font-black ${
                        isLeader
                          ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-yellow-400/5"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}>
                        {initials(entry.participant.name)}
                      </div>

                      {/* Name */}
                      <span className={`font-sans text-xs font-bold transition-colors ${
                        isLeader ? "text-yellow-400 font-extrabold" : "text-slate-200 group-hover/row:text-white"
                      }`}>
                        {firstDisplayName(entry.participant.name)}
                      </span>
                    </div>

                    {/* Right side: Stats (Puntos, Aciertos, Tendencia) */}
                    <div className="flex items-center gap-3 sm:gap-5">
                      {/* Stats values */}
                      <div className="flex items-center gap-3 text-center">
                        <div className="w-8">
                          <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2">Puntos</span>
                          <span className={`font-sans text-xs font-black transition-colors ${isLeader ? "text-yellow-400" : "text-white"}`}>
                            {entry.totalPoints}
                          </span>
                        </div>
                        <div className="h-5.5 w-[1px] bg-white/10" />
                        <div className="w-8">
                          <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2">Aciertos</span>
                          <span className="font-sans text-[11px] font-bold text-slate-200">
                            {entry.hits}
                          </span>
                        </div>
                        <div className="h-5.5 w-[1px] bg-white/10" />
                        <div className="w-14">
                          <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-500 mb-0.2">Diferencia</span>
                          <span className="font-sans text-[9px] font-semibold text-slate-450">
                            {isLeader ? "—" : `-${diff} pts`}
                          </span>
                        </div>
                      </div>

                      {/* Tendency pill */}
                      <div className="w-12 flex justify-end">
                        {entry.movement > 0 ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 text-[8px] font-black text-emerald-400">
                            <ArrowUp className="h-2 w-2" />{entry.movement}
                          </span>
                        ) : entry.movement < 0 ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-red-500/10 border border-red-500/20 px-1.5 py-0.2 text-[8px] font-black text-red-400">
                            <ArrowDown className="h-2 w-2" />{entry.movement}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-white/[0.02] border border-white/[0.05] px-1.5 py-0.2 text-[8px] font-semibold text-slate-500">
                            <Minus className="h-2 w-2" />
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex justify-end">
              <a 
                href="#ranking" 
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400 hover:text-yellow-350 transition-colors group/link"
              >
                Ver Ranking Completo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
