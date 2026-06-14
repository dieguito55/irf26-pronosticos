interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <main className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900">
    <section className="max-w-xl rounded-3xl border border-red-200 bg-white p-8 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">Error de actualización</p>
      <h1 className="mt-3 font-display text-3xl font-bold">No se pudo obtener una nueva actualización.</h1>
      <p className="mt-4 leading-7 text-slate-600">{message}. Se muestran los últimos datos confirmados cuando estén disponibles.</p>
    </section>
  </main>
);
