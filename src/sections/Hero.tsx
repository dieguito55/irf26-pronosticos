import { motion } from "framer-motion";
import { ArrowRight, Layers, CalendarRange, Users } from "lucide-react";
import type { TournamentData } from "../types/tournament";
import { publicUrl } from "../utils/publicUrl";

interface HeroProps {
  tournament: TournamentData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const Hero = ({ tournament }: HeroProps) => {
  const matchPercent = Math.round((tournament.processedMatches / tournament.totalMatches) * 100);

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 min-h-[640px] flex items-center"
    >
      {/* ─── STADIUM BACKGROUND ─── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url("${publicUrl("assets/stadium_light.png")}")`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      
      {/* Subtle black overlay (just enough for readability) and lateral gradient to highlight the right side */}
      <div className="absolute inset-0 -z-10 bg-slate-950/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

      {/* Subtle football hex pattern */}
      <div
        className="absolute inset-0 -z-10 bg-[length:180px_180px] opacity-[0.02]"
        style={{ backgroundImage: `url("${publicUrl("assets/football-pattern.svg")}")` }}
      />

      {/* ─── CONTENT ─── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* ═══ LEFT COLUMN (Floating content, no modal border/bg) ═══ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start lg:col-span-7 z-10"
          >
            {/* Logo + Subtitle Group (Clean & integrated, no card wrap) */}
            <motion.div variants={fadeUp} className="flex flex-col items-start gap-4 mb-6">
              <img
                src={publicUrl("logo.png")}
                alt="IRF26 Logo Oficial"
                className="h-14 w-auto object-contain select-none"
              />
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400/90 font-sans">
                  Mundial 2026 · Fase de Grupos
                </p>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight"
            >
              Polla Mundialista <span className="text-yellow-400">IRF26</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 font-medium"
            >
              Compara pronósticos de <strong className="text-white font-semibold">{tournament.participants} participantes</strong> en <strong className="text-white font-semibold">{tournament.groups} grupos</strong> del mundial. Tabla de posiciones y líderes actualizados en tiempo real.
            </motion.p>

            {/* ─── STATS STRIP (Minimalist and clean glassmorphism) ─── */}
            <motion.div
              variants={fadeUp}
              className="mt-8 w-full max-w-xl"
            >
              <div className="grid grid-cols-3 gap-4">
                {/* Ronda */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ronda</p>
                    <Layers className="h-4 w-4 text-yellow-400/90" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white font-sans">{tournament.currentRound}</span>
                    <span className="text-xs font-medium text-slate-400">de {tournament.totalRounds}</span>
                  </div>
                </div>

                {/* Partidos */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Partidos</p>
                    <CalendarRange className="h-4 w-4 text-yellow-400/90" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white font-sans">{tournament.processedMatches}</span>
                    <span className="text-xs font-medium text-slate-400">/ {tournament.totalMatches}</span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${matchPercent}%` }}
                    />
                  </div>
                </div>

                {/* Compiten */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compiten</p>
                    <Users className="h-4 w-4 text-yellow-400/90" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white font-sans">{tournament.participants}</span>
                    <span className="text-xs font-medium text-slate-400 ml-1">jugadores</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ─── CTA BUTTONS ─── */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#ranking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 text-sm font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-yellow-350 active:scale-95 shadow-lg shadow-yellow-400/10"
              >
                Ver Ranking <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#grupos"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 active:scale-95 backdrop-blur-sm"
              >
                Ver Grupos
              </a>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN (Clean 3D Soccer Ball) ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
          >
            <div className="relative animate-float-ball w-full max-w-[320px] aspect-square flex items-center justify-center">
              {/* Soft, realistic shadow beneath the ball */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-6 bg-slate-950/70 rounded-[100%] blur-xl" />

              {/* Soccer Ball */}
              <img
                src={publicUrl("assets/ball.png")}
                alt="Balón Oficial Mundial 2026"
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
