"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <header className={`navigation ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="wordmark" aria-label="Joshua Aniban, back to top">JA<span className="wordmark-dot">.</span></a>
      <nav aria-label="Main navigation">
        {["work", "about", "experience", "contact"].map((item) => <a key={item} href={`#${item}`} aria-current={active === item ? "location" : undefined}>{item}</a>)}
      </nav>
      <a className="nav-availability" href="#contact"><span className="status-dot" />Open for work</a>
    </header>
  );
}
