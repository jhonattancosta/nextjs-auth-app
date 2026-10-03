export default function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold tracking-wide whitespace-nowrap uppercase ${className}`}>
      {label}
    </span>
  );
}
