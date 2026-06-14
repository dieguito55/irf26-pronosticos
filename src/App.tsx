import { useState } from "react";
import { ErrorState } from "./components/ErrorState";
import { Header } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { ParticipantDrawer } from "./components/ParticipantDrawer";
import { Footer } from "./sections/Footer";
import { GroupsSection } from "./sections/GroupsSection";
import { Hero } from "./sections/Hero";
import { Podium } from "./sections/Podium";
import { RankingSection } from "./sections/RankingSection";
import { ScoringInfo } from "./sections/ScoringInfo";
import { useTournamentData } from "./hooks/useTournamentData";
import type { EnrichedParticipantScore } from "./types/tournament";

const App = () => {
  const { data, ranking, loading, error } = useTournamentData();
  const [selectedParticipant, setSelectedParticipant] = useState<EnrichedParticipantScore | null>(null);

  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error ?? "No hay datos confirmados"} />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>
        <Hero tournament={data.tournament} />
        <Podium ranking={ranking} onSelect={setSelectedParticipant} />
        <RankingSection ranking={ranking} onSelect={setSelectedParticipant} />
        <GroupsSection groups={data.standings.groups} />
        <ScoringInfo />
      </main>
      <Footer />
      <ParticipantDrawer participant={selectedParticipant} onClose={() => setSelectedParticipant(null)} />
    </div>
  );
};

export default App;
