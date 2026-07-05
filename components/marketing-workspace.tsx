"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button, Card, Input, Select } from "@/components/ui";
import { track } from "@/lib/analytics";

export function MarketingWorkspace() {
  const [assets, setAssets] = useState<string[]>([]);

  function generate(formData: FormData) {
    const idea = String(formData.get("idea") || "your startup");
    const channel = String(formData.get("channel"));
    const next = [
      `Launch post: We are building ${idea} and looking for 10 operators to pressure-test the first workflow this week.`,
      `Cold outreach: I saw your work in this space and would value 12 minutes to test whether ${idea} solves a real operating pain.`,
      `Community seed: What is the most annoying manual step in your current startup build process? We are turning that into an execution workflow.`
    ];
    setAssets(next);
    track("Marketing Assets Generated", { channel, count: next.length });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Marketing Lead</h1>
        <form action={generate} className="mt-6 space-y-4">
          <Input name="idea" placeholder="Startup idea / offer" required />
          <Select name="channel">
            <option>Organic social</option>
            <option>Community seeding</option>
            <option>Cold outreach</option>
            <option>SEO basics</option>
            <option>Launch list building</option>
          </Select>
          <Button type="submit">Generate Free-Channel Playbook</Button>
        </form>
      </Card>
      <Card>
        <h2 className="font-display text-5xl tracking-normal">Ready-to-post assets</h2>
        <div className="mt-6 space-y-4">
          {assets.length ? assets.map((asset) => (
            <div key={asset} className="border-2 border-ink p-4">
              <p className="leading-7">{asset}</p>
              <Button className="mt-3" variant="outline" onClick={() => navigator.clipboard.writeText(asset)}><Copy className="h-4 w-4" /> Copy</Button>
            </div>
          )) : <p className="text-muted">Generated posts, launch copy, and outreach messages will appear here.</p>}
        </div>
      </Card>
    </div>
  );
}
