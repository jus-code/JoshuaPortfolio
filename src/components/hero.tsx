import { Arrow } from "./arrow";
import { ShowreelPreview } from "./showreel";

export function Hero() {
  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker metadata"><span>Independent creative · Bulacan, PH</span><span className="hero-edition">Video / AI / Design</span></div>
      <h1 id="hero-title" className="hero-name"><span className="name-mask"><span>JOSHUA</span></span><span className="name-mask second-name"><span>ANIBAN<span className="name-period">.</span></span></span></h1>
      <ShowreelPreview />
      <div className="hero-bottom">
        <div className="hero-roles"><p>Creative video editor</p><p>AI video creator</p><p>Graphic designer</p></div>
        <div className="hero-intro"><p>I turn scripts into videos with a clear story, a deliberate pace, and visuals worth watching.</p><a href="#work" className="text-link" data-magnetic>Explore the work <Arrow /></a></div>
        <a className="scroll-cue metadata" href="#work">Scroll to explore<span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
