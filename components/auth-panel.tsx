"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Mail } from "lucide-react";
import { Button, Card, Input, Select } from "@/components/ui";
import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";

export function AuthPanel() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function submit(formData: FormData) {
    if (!configured) {
      setStatus("Supabase is not configured yet. Add .env.local values from your Supabase project to enable auth.");
      return;
    }
    const supabase = createClient();
    setStatus("Working...");
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const name = String(formData.get("name") ?? "");
    const role = String(formData.get("role") ?? "Founder");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } }
      });
      if (error) return setStatus(error.message);

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: name,
          role,
          onboarding_completed: false,
          current_phase: role === "Investor" ? null : 1
        });
      }

      track("Signup Completed", { role });
      router.push(role === "Investor" ? "/investor" : "/onboarding");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setStatus(error.message);

    const metadataRole = data.user?.user_metadata?.role;
    const { data: profile } = await supabase.from("profiles").select("role,onboarding_completed").eq("id", data.user.id).single();
    const finalRole = profile?.role ?? metadataRole ?? "Founder";
    track("Login Completed", { role: finalRole });

    if (finalRole === "Investor") {
      router.push("/investor");
      return;
    }

    const redirect = searchParams.get("redirect");
    router.push(profile?.onboarding_completed ? redirect ?? "/dashboard" : "/onboarding");
  }

  async function google() {
    if (!configured) {
      setStatus("Supabase is not configured yet. Add .env.local values from your Supabase project to enable Google OAuth.");
      return;
    }
    const supabase = createClient();
    const role = (document.querySelector("[name='role']") as HTMLSelectElement | null)?.value ?? "Founder";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}${role === "Investor" ? "/investor" : "/onboarding"}`,
        queryParams: { access_type: "offline", prompt: "consent" }
      }
    });
  }

  return (
    <Card className="w-full max-w-xl shadow-hard">
      <div className="grid grid-cols-2 border-2 border-ink">
        {(["signup", "login"] as const).map((item) => (
          <button
            key={item}
            className={`px-4 py-3 text-sm font-black uppercase tracking-[0.16em] ${mode === item ? "bg-ink text-white" : "bg-white text-ink"}`}
            onClick={() => setMode(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <form action={submit} className="mt-6 space-y-4">
        {mode === "signup" && <Input name="name" placeholder="Full name" required />}
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required minLength={6} />
        {mode === "signup" && (
          <Select name="role" defaultValue="Founder">
            <option>Founder</option>
            <option>Investor</option>
          </Select>
        )}
        <Button className="w-full" type="submit"><Mail className="h-4 w-4" /> {mode === "signup" ? "Create Profile" : "Enter Platform"}</Button>
      </form>
      <Button type="button" variant="outline" className="mt-3 w-full" onClick={google}><Github className="h-4 w-4" /> Continue with Google</Button>
      {status && <p className="mt-4 border border-line bg-panel p-3 text-sm">{status}</p>}
    </Card>
  );
}
