export const LoadingState = () => (
  <div className="min-h-screen bg-white px-4 pt-32 text-slate-900">
    <div className="mx-auto max-w-[1440px]">
      <div className="h-8 w-56 animate-pulse rounded-full bg-slate-100" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-3xl border border-slate-200/80 bg-slate-50" />
        ))}
      </div>
      <p className="mt-6 text-slate-600">Cargando datos públicos del tablero...</p>
    </div>
  </div>
);
