import { Resend } from "resend";

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendInvestorInterestEmail() {
  const resend = getResendClient();
  if (!resend) return { skipped: true };

  // Wire templates and sender domain once production email is approved.
  return { skipped: true };
}
