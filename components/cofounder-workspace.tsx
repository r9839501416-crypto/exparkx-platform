"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

export function CofounderWorkspace() {
  const [messages, setMessages] = useState([
    { role: "cofounder", text: "I am tracking your phase, idea context, and execution proof. Bring me the blocker; I will push toward the next concrete step." }
  ]);

  function ask(formData: FormData) {
    const question = String(formData.get("question"));
    setMessages((current) => [
      ...current,
      { role: "founder", text: question },
      { role: "cofounder", text: "Decision path: define the riskiest assumption, run one proof action in 48 hours, then log the result in Execution System. Avoid broad planning until that signal exists." }
    ]);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Virtual Co-Founder</h1>
        <div className="mt-6 h-[520px] overflow-y-auto border-2 border-ink bg-panel p-4">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`max-w-[82%] border-2 border-ink p-4 ${message.role === "founder" ? "ml-auto bg-ink text-white" : "bg-white"}`}>
                <p className="text-xs font-black uppercase tracking-[0.16em]">{message.role}</p>
                <p className="mt-2 leading-7">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <form action={ask} className="mt-4 flex gap-3">
          <Input name="question" placeholder="Ask for the next execution decision..." required />
          <Button type="submit"><Bot className="h-4 w-4" /> Send</Button>
        </form>
      </Card>
      <Card>
        <h2 className="font-display text-4xl tracking-normal">Memory Panel</h2>
        {["Idea summary from onboarding", "Current phase and unlocked surface", "Last 3 decisions logged", "Recent validation score"].map((item) => (
          <div key={item} className="mt-3 border border-line p-3 text-sm font-bold">{item}</div>
        ))}
      </Card>
    </div>
  );
}
