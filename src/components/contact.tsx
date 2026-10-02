"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Arrow } from "./arrow";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(site.email); setCopyStatus("Email copied."); }
    catch { setCopyStatus(`Copy manually: ${site.email}`); }
  }
  return (
    <section id="contact" className="contact section-space" aria-labelledby="contact-title"><div className="section-shell">
      <div className="section-label metadata" data-reveal><span>06 / Your next video</span><span><span className="status-dot" />Open to new opportunities</span></div>
      <h2 id="contact-title" className="display" data-reveal>HAVE A PROJECT<br />IN <span className="contact-outline">MIND?</span></h2>
      <div className="contact-bottom" data-reveal><div><p>Send me the brief, the script, or the role you have in mind.</p><p className="contact-availability">Freelance · Ongoing editing · Full-time</p></div><a className="email-cta" href={`mailto:${site.email}`} data-magnetic>Email me <Arrow diagonal /></a></div>
      <div className="contact-links"><a href={`mailto:${site.email}`}>{site.email}</a><button type="button" onClick={copyEmail}>Copy email <span aria-hidden="true">↗</span></button><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact Joshua on WhatsApp (opens in a new tab)">WhatsApp <Arrow diagonal /></a></div><p className="copy-status" role="status">{copyStatus}</p>
    </div></section>
  );
}

export function Footer() {
  return <footer className="footer section-shell"><a className="footer-name" href="#top">Joshua Aniban<span className="accent-text">.</span></a><span className="metadata">Bulacan, Philippines</span><span className="metadata">© {new Date().getFullYear()} Joshua Aniban</span><a href="#top" className="metadata">Back to top ↑</a></footer>;
}
