import { experience, services, skills } from "@/data/profile";
import { Arrow } from "./arrow";

export function Services() {
  return (
    <section className="services section-shell section-space" aria-labelledby="services-title">
      <div className="section-label metadata" data-reveal><span>04 / What I do</span><span>One brief. Multiple formats.</span></div>
      <div className="services-layout"><h2 id="services-title" className="display" data-reveal>THE<br />TOOLKIT<span className="accent-text">.</span></h2><div className="service-list">{services.map((service, index) => <details className="service" key={service.name} data-reveal><summary><span className="metadata">0{index + 1}</span><h3>{service.name}</h3><span className="service-plus" aria-hidden="true">+</span></summary><p>{service.note}</p></details>)}</div></div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="about section-shell section-space" aria-labelledby="about-title">
      <div className="section-label metadata" data-reveal><span>05 / Behind the edit</span><span>Joshua Aniban · Bulacan, Philippines</span></div>
      <div className="about-layout"><div className="about-title-wrap" data-reveal><h2 id="about-title" className="display">I THINK<br />IN <span className="accent-text">CUTS.</span></h2><div className="about-experience"><span className="display">3+</span><p>years in video<br />and graphic design</p></div></div><div className="about-copy" data-reveal><p className="about-lead">I’m Joshua, a creative video editor, AI video creator and graphic designer based in Bulacan.</p><p>I’ve worked on weekly church media, social content and marketing videos. I like shaping a script into something you can watch: finding the pace, choosing the shots and getting the sound right.</p><p>These days, I’m focused on AI video production and VSL/UGC ads. I combine generated footage with other visual assets and edit them into one coherent piece.</p><p>Alongside the creative work, I’ve spent a year cold calling, setting appointments and managing leads in GoHighLevel. That experience shapes how I communicate with clients and follow a brief through to delivery.</p><p className="education-note">I’m also studying BS Information Technology at PUP Santa Maria. It supports the technical side of my creative work.</p><a href="#contact" className="text-link" data-magnetic>Talk about a project <Arrow diagonal /></a></div></div>
      <div className="skills-index" data-reveal>{skills.map((group) => <div className="skill-row" key={group.category}><h3 className="metadata">{group.category}</h3><p>{group.items.map((item) => <span key={item}>{item}</span>)}</p></div>)}</div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="experience section-shell section-space" aria-labelledby="experience-title">
      <div className="section-label metadata" data-reveal><span>06 / The background</span><span>Practice, production & study</span></div>
      <h2 id="experience-title" className="display section-title" data-reveal>THE TIMELINE<span className="accent-text">.</span></h2>
      <div className="timeline">{experience.map((entry, index) => <details className="timeline-entry" key={entry.title} open={index === 0} data-reveal><summary><span className="timeline-date metadata"><i aria-hidden="true" />{entry.date}</span><span className="timeline-position"><span className="timeline-title">{entry.title}</span><span className="timeline-place">{entry.place}</span></span><span className="timeline-toggle" aria-hidden="true">+</span></summary><p>{entry.description}</p></details>)}</div>
    </section>
  );
}
