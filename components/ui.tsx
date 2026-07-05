import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
};

export function Button({ className, variant = "solid", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 border-2 px-5 py-2 text-sm font-black uppercase tracking-[0.12em] transition",
        variant === "solid" && "border-ink bg-ink text-white hover:bg-white hover:text-ink",
        variant === "outline" && "border-ink bg-white text-ink hover:bg-ink hover:text-white",
        variant === "ghost" && "border-transparent bg-transparent text-ink hover:border-ink",
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  children,
  variant = "solid",
  className
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 border-2 px-5 py-2 text-sm font-black uppercase tracking-[0.12em] transition",
        variant === "solid" && "border-ink bg-ink text-white hover:bg-white hover:text-ink",
        variant === "outline" && "border-ink bg-white text-ink hover:bg-ink hover:text-white",
        variant === "ghost" && "border-transparent bg-transparent text-ink hover:border-ink",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("border-2 border-ink bg-white p-5", className)}>{children}</div>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "locked" | "success" }) {
  return (
    <span
      className={cn(
        "inline-flex border px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em]",
        tone === "neutral" && "border-ink bg-white text-ink",
        tone === "locked" && "border-line bg-panel text-muted",
        tone === "success" && "border-success bg-white text-success"
      )}
    >
      {children}
    </span>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="focus-ring w-full border-2 border-ink bg-white px-3 py-3 text-sm" {...props} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="focus-ring min-h-28 w-full border-2 border-ink bg-white px-3 py-3 text-sm" {...props} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="focus-ring w-full border-2 border-ink bg-white px-3 py-3 text-sm" {...props} />;
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-muted">{eyebrow}</p>}
      <h2 className="font-display text-5xl leading-none tracking-normal md:text-7xl">{title}</h2>
      {copy && <p className="mt-4 text-lg leading-8 text-neutral-700">{copy}</p>}
    </div>
  );
}
