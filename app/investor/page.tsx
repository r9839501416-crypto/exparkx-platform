import { InvestorPortal } from "@/components/investor-portal";
import { createClient } from "@/lib/supabase/server";

export default async function InvestorPage() {
  const supabase = await createClient();
  const { data: ideas } = await supabase.from("ideas").select("*, profiles(full_name,current_phase)").eq("visible_to_investors", true).limit(20);
  return <InvestorPortal ideas={ideas ?? []} />;
}
