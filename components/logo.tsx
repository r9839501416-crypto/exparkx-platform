import Link from "next/link";

export function CircuitTreeMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3">
      <span className={compact ? "block h-14 w-14 bg-ink" : "block h-16 w-16 bg-ink sm:h-20 sm:w-20"}>
        <img
          src="/exparkx-logo.png"
          alt="Exparkx"
          className="h-full w-full object-contain"
          width={1024}
          height={1024}
        />
      </span>
      {!compact && (
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Evolving the Way of Execution</span>
        </span>
      )}
    </Link>
  );
}
