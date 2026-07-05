"use client";

import { useState } from "react";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";

const founders = [
  { name: "Aarav Mehta", skill: "Engineering", industry: "Fintech", stage: "Building", location: "Bengaluru", mode: "Open to joining a team" },
  { name: "Mira Shah", skill: "Growth", industry: "Consumer", stage: "Have users", location: "Mumbai", mode: "Looking to hire" },
  { name: "Nikhil Rao", skill: "Product", industry: "AI tooling", stage: "Idea only", location: "Remote", mode: "Looking for a technical co-founder" }
];

export function CommunityWorkspace() {
  const [filter, setFilter] = useState("");
  const visible = founders.filter((f) => !filter || f.mode === filter);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Founder Community</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Input placeholder="Skill, industry, location" />
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All collaboration modes</option>
            <option>Open to joining a team</option>
            <option>Looking to hire</option>
            <option>Looking for a technical co-founder</option>
          </Select>
          <Button>Search Directory</Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {visible.map((founder) => (
            <div key={founder.name} className="border-2 border-ink p-4">
              <h2 className="font-display text-4xl tracking-normal">{founder.name}</h2>
              <p className="mt-2 text-sm font-bold">{founder.skill} | {founder.industry} | {founder.stage}</p>
              <p className="mt-2 text-sm text-muted">{founder.location}</p>
              <p className="mt-4 border border-line p-2 text-sm font-black uppercase tracking-[0.1em]">{founder.mode}</p>
              <Button className="mt-4" variant="outline">Request Connection</Button>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="font-display text-4xl tracking-normal">Discussion Thread</h2>
        <Textarea className="mt-4" placeholder="Post a build update, hiring need, or funding question..." />
        <Button className="mt-3">Publish Post</Button>
        {["Fundraising", "Tech stack", "Hiring"].map((group) => <div key={group} className="mt-3 border border-line p-3 font-bold">{group}</div>)}
      </Card>
    </div>
  );
}
