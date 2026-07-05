"use client";

import { useState } from "react";
import { Button, Card, Textarea } from "@/components/ui";

export function MockPitchWorkspace() {
  const [seconds, setSeconds] = useState(120);
  const [feedback, setFeedback] = useState<string[] | null>(null);

  function startTimer() {
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function score() {
    setFeedback([
      "Problem and customer are understandable in the first 20 seconds.",
      "Market sizing needs a sharper bottom-up path.",
      "Ask clarity is present but should include use of funds.",
      "Example opening: We help early-stage founders replace scattered advice with a tracked execution system that moves an idea into a fundable company."
    ]);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <h1 className="font-display text-6xl tracking-normal">Mock Pitch</h1>
        <Textarea className="mt-6" placeholder="Paste your pitch script or transcript..." />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={score}>Score Pitch</Button>
          <Button variant="outline">Upload Audio / Video</Button>
        </div>
        {feedback && <div className="mt-6 space-y-3">{feedback.map((item) => <div key={item} className="border border-line p-3">{item}</div>)}</div>}
      </Card>
      <Card>
        <h2 className="font-display text-4xl tracking-normal">Practice Clock</h2>
        <p className="mt-5 font-display text-7xl">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</p>
        <Button className="mt-5" onClick={startTimer}>Start Pitch Clock</Button>
      </Card>
    </div>
  );
}
