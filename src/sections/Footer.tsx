import { publicUrl } from "../utils/publicUrl";

export const Footer = () => (
  <footer
    id="footer"
    className="relative isolate overflow-hidden bg-slate-950 px-4 py-12 text-slate-300 sm:px-6 lg:px-8 border-t border-slate-900"
  >
    {/* Stadium Background Image with Overlay */}
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 mix-blend-luminosity"
      style={{ backgroundImage: `url("${publicUrl("assets/dark_stadium_bg.png")}")` }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 -z-20 bg-slate-950"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"
      aria-hidden="true"
    />

    <div className="relative mx-auto max-w-[1440px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <img src={publicUrl("logo.png")} alt="IRF26" className="h-11 w-auto object-contain select-none" />
        <p className="mt-4 font-display font-bold text-white text-lg">Impact Regional Fellowship 2026</p>
        <p className="mt-2 text-xs text-slate-400 max-w-md">
          Tablero informativo premium para el seguimiento de pronósticos de la fase de grupos. La asignación definitiva de puntos se consolidará oficialmente al finalizar la fase el 28 de junio de 2026.
        </p>
      </div>

      <div className="text-[10px] text-slate-500 border-t border-slate-900/60 pt-6 md:border-0 md:pt-0 md:text-right">
        <p>© {new Date().getFullYear()} Impact Regional Fellowship 2026.</p>
        <p className="mt-1">Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);


