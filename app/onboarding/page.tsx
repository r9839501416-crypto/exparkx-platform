import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profile } = await supabase.from("profiles").select("role,onboarding_completed").eq("id", user.id).single();
  if (profile?.role === "Investor") redirect("/investor");
  if (profile?.onboarding_completed) redirect("/dashboard");

  return <OnboardingWizard userId={user.id} />;
}
