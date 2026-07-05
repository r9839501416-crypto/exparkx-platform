import { Suspense } from "react";
import { AuthPanel } from "@/components/auth-panel";
import { CircuitTreeMark } from "@/components/logo";

export default function AuthPage() {
  return (
    <main className="grid min-h-screen bg-panel lg:grid-cols-[0.95fr_1.05fr]">
      <section className="grid-paper border-b-2 border-ink p-6 lg:border-b-0 lg:border-r-2">
        <CircuitTreeMark />
        <div className="flex min-h-[70vh] flex-col justify-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-muted">Founder and investor access</p>
          <h1 className="mt-5 max-w-xl font-display text-7xl leading-none tracking-normal md:text-8xl">Enter the execution layer.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-700">Create your startup operating profile or enter the investor portal for diligence-ready deal flow.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-5">
        <Suspense fallback={<div className="border-2 border-ink bg-white p-6 font-black uppercase tracking-[0.12em]">Loading access panel...</div>}>
          <AuthPanel />
        </Suspense>
      </section>
    </main>
  );
}
