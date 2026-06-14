interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
    {eyebrow ? (
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-600">{eyebrow}</p>
    ) : null}
    <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
    {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
  </div>
);
