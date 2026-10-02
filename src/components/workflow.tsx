"use client";

import { useState } from "react";

const steps = [
  { name: "Script", detail: "I start with the message, the audience and the structure of the video.", tools: "ChatGPT / Claude AI" },
  { name: "Prompt", detail: "I write prompts for the shots, movement and visual direction the script needs.", tools: "Higgsfield / Google Flow" },
  { name: "Generate", detail: "I create avatar footage and B-roll, then choose the takes that fit the story.", tools: "Higgsfield / Google Flow / HeyGen" },
  { name: "Edit", detail: "I bring footage together in CapCut, shaping the pacing, captions, sound and motion.", tools: "CapCut" },
  { name: "Final", detail: "I check the message, visual consistency and format before the finished video goes out.", tools: "Review / export" },
];

export function Workflow() {
  const [active, setActive] = useState(0);
  return (
    <section className="workflow section-space" aria-labelledby="workflow-title">
      <div className="section-shell">
        <div className="section-label metadata" data-reveal><span>02 / The process</span><span>Human direction. AI in the workflow.</span></div>
        <div className="workflow-heading" data-reveal><h2 id="workflow-title" className="display section-title">FROM SCRIPT.<br />TO SCREEN<span className="accent-text">.</span></h2><p>I use AI to build the footage a script needs. Then I edit it into a video with intention, from the first frame to the final cut.</p></div>
        <div className="process-layout" data-reveal>
          <div className="process-steps" role="tablist" aria-label="AI video production workflow">{steps.map((step, index) => <button key={step.name} id={`step-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="process-detail" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
            const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % steps.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + steps.length) % steps.length : event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : null;
            if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`step-${next}`)?.focus(); }
          }}><span className="metadata">0{index + 1}</span><span className="step-name">{step.name}</span><span className="step-arrow" aria-hidden="true">↗</span></button>)}</div>
          <div className="process-detail" id="process-detail" role="tabpanel" aria-labelledby={`step-${active}`} tabIndex={0}><div className="process-viewfinder" aria-hidden="true"><span className="process-digit" key={active}>{String(active + 1).padStart(2, "0")}</span><span className="process-registration">+</span></div><div key={`detail-${active}`} className="process-copy"><span className="metadata">{steps[active].tools}</span><p>{steps[active].detail}</p></div></div>
        </div>
        <div className="tool-line metadata"><span>My AI toolkit</span><p>Higgsfield <b>/</b> Google Flow <b>/</b> HeyGen <b>/</b> ChatGPT <b>/</b> Claude AI</p></div>
      </div>
    </section>
  );
}
