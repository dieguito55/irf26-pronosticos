import { motion } from "framer-motion";
import { CircleGauge, Flag, Trophy, UsersRound, Zap } from "lucide-react";
import { StatCard } from "../components/StatCard";
import type { TournamentData } from "../types/tournament";

interface SummaryCardsProps {
  tournament: TournamentData;
}

export const SummaryCards = ({ tournament }: SummaryCardsProps) => (
  <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      <StatCard icon={UsersRound} value={`${tournament.participants}`} label="Participantes" detail="Nombres públicos, sin datos sensibles." />
      <StatCard icon={Flag} value={`${tournament.groups}`} label="Grupos" detail="Clasificación provisional A-L." />
      <StatCard icon={CircleGauge} value={`${tournament.totalMatches}`} label="Partidos" detail="Solo fase de grupos." />
      <StatCard icon={Trophy} value={`${tournament.maxPoints}`} label="Puntos máximos" detail="2 puntos por grupo." />
      <StatCard icon={Zap} value={`R${tournament.currentRound}`} label="Ronda actual" detail={`${tournament.processedMatches} partidos procesados.`} />
    </motion.div>
  </section>
);
