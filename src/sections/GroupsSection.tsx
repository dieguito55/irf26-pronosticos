import type { GroupStanding } from "../types/tournament";
import { publicUrl } from "../utils/publicUrl";

interface GroupsSectionProps {
  groups: GroupStanding[];
}

export const GroupsSection = ({ groups }: GroupsSectionProps) => {
  return (
    <section id="grupos" className="relative isolate overflow-hidden bg-slate-950 py-12 border-y border-slate-900">
      {/* Stadium Background Image with Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage: `url("${publicUrl("assets/dark_stadium_bg.png")}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-20 bg-slate-950"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-slate-950/50"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Custom Dark Theme Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-500">Fase de Grupos</p>
          <h2 className="font-sans text-3xl font-extrabold text-white sm:text-4xl">Posiciones del Torneo</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {groups.map((group) => (
            <article
              key={group.id}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-lg backdrop-blur-md hover:border-white/20 transition duration-100 flex flex-col justify-between"
            >
              <div>
                {/* Group Title Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                  <h3 className="font-sans text-xs font-bold text-white">
                    {group.name}
                  </h3>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                    Top 2: {group.topTwo.join(" · ")}
                  </span>
                </div>

                {/* Compact Standings Table */}
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold border-b border-white/5">
                      <th className="py-1 font-bold w-6">Pos</th>
                      <th className="py-1 font-bold">Selección</th>
                      <th className="py-1 font-bold text-center w-6">PJ</th>
                      <th className="py-1 font-bold text-center w-8">DG</th>
                      <th className="py-1 font-bold text-right w-8">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {group.table.map((row) => {
                      const isTopTwo = row.position <= 2;
                      return (
                        <tr
                          key={row.team}
                          className={`transition-colors duration-75 hover:bg-white/[0.02] ${
                            isTopTwo ? "bg-white/[0.015]" : ""
                          }`}
                        >
                          <td className="py-1 font-mono">
                            <span className={isTopTwo ? "text-amber-500 font-bold" : "text-slate-500"}>
                              {row.position}
                            </span>
                          </td>
                          <td className="py-1 font-medium text-slate-300">
                            <span className={isTopTwo ? "font-semibold text-white" : "text-slate-400"}>
                              {row.team}
                            </span>
                          </td>
                          <td className="py-1 text-center text-slate-400 font-mono">{row.played}</td>
                          <td className="py-1 text-center font-mono">
                            {row.goalDifference > 0 ? (
                              <span className="text-emerald-400 font-medium">+{row.goalDifference}</span>
                            ) : row.goalDifference < 0 ? (
                              <span className="text-rose-400 font-medium">{row.goalDifference}</span>
                            ) : (
                              <span className="text-slate-500 font-medium">0</span>
                            )}
                          </td>
                          <td className={`py-1 text-right font-mono font-bold ${isTopTwo ? "text-white" : "text-slate-300"}`}>
                            {row.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};


