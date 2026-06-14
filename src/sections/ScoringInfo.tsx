import { ClipboardList, Award, CheckSquare, Target } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";

export const ScoringInfo = () => (
  <section id="como-funciona" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
    <SectionHeading eyebrow="Sistema de puntuación" title="¿Cómo se calcula el puntaje?" />
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div className="rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm flex items-center">
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 w-full">
          {[
            {
              title: "Selección por Grupo",
              text: "Dos selecciones registradas por cada uno de los 12 grupos de la fase inicial.",
              icon: ClipboardList
            },
            {
              title: "Cálculo de Aciertos",
              text: "1 punto por cada selección en el primer o segundo puesto del grupo.",
              icon: Award
            },
            {
              title: "Sin Importar el Orden",
              text: "El orden exacto de clasificación (1.° o 2.°) no afecta el puntaje.",
              icon: CheckSquare
            },
            {
              title: "Límite de Puntos",
              text: "Máximo de 2 puntos por grupo. Total acumulado de hasta 24 puntos.",
              icon: Target
            }
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <item.icon className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">{item.title}</h4>
                <p className="text-[11px] leading-relaxed text-slate-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <article className="rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white shadow-md flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse"></span>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Ejemplo de Simulación</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Mi Pronóstico</p>
            <p className="text-xs font-semibold text-slate-200">México + R. de Corea</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Top 2 Provisional</p>
            <p className="text-xs font-semibold text-slate-200">México + Sudáfrica</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Resultado</p>
            <p className="font-display text-base font-black text-amber-500">
              1 punto <span className="text-[10px] font-normal text-slate-400">de 2</span>
            </p>
          </div>
          <p className="text-[9px] text-slate-500 text-right leading-tight max-w-[140px]">
            *México acertó (1 pt). R. de Corea falló (0 pt).
          </p>
        </div>
      </article>
    </div>

    {/* Nota aclaratoria sobre el cierre de puntuación */}
    <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-500/5 p-4 flex items-start gap-3">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-700">
        <span className="text-xs font-black">!</span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900">Cierre de Puntajes y Fase de Grupos</p>
        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
          La asignación oficial y definitiva de los puntos se realizará basándose en las posiciones de la fase de grupos consolidadas al finalizar todos los encuentros el <strong className="text-slate-900 font-bold">28 de junio de 2026</strong>. Las tablas e indicadores actuales tienen un carácter provisional en tiempo real.
        </p>
      </div>
    </div>
  </section>
);


