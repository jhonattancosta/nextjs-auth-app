type BoxProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Use "dark" para caixas da barra lateral (fundo madeira em vez de pergaminho). */
  variant?: "parchment" | "dark";
};

/** Moldura padrão do site (cabeçalho dourado + corpo pergaminho). */
export default function Box({ title, children, className = "", variant = "parchment" }: BoxProps) {
  return (
    <section className={`overflow-hidden rounded-md border border-gold/40 bg-wood shadow-lg shadow-black/50 ${className}`}>
      <h2 className="border-b border-gold/40 bg-linear-to-b from-wood-light to-wood px-4 py-2 font-display text-sm font-bold tracking-wider text-gold-light uppercase">
        {title}
      </h2>
      <div className={variant === "parchment" ? "bg-parchment p-4 text-stone-900" : "p-4 text-parchment"}>
        {children}
      </div>
    </section>
  );
}
