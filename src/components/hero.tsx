import { Arrow } from "./arrow";

export function Hero() {
  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker metadata"><span>Independent creative · Bulacan, PH</span><span className="hero-edition">Video / AI / Design</span></div>
      <h1 id="hero-title" className="hero-name"><span className="name-mask"><span>JOSHUA</span></span><span className="name-mask second-name"><span>ANIBAN<span className="name-period">.</span></span></span></h1>
      <div className="hero-preview" aria-label="Showreel placeholder, media to be added">
        <div className="preview-top metadata"><span>Showreel slot</span><span>01 / 01</span></div>
        <div className="preview-art" aria-hidden="true"><div className="frame-outline" /><div className="frame-solid" /><span className="preview-cross">+</span></div>
        <div className="preview-caption"><span className="metadata">[ ADD SHOWREEL ]</span><span className="preview-play" aria-hidden="true">↗</span></div>
      </div>
      <div className="hero-bottom">
        <div className="hero-roles"><p>Creative video editor</p><p>AI video creator</p><p>Graphic designer</p></div>
        <div className="hero-intro"><p>I turn scripts into videos with a clear story, a deliberate pace, and visuals worth watching.</p><a href="#work" className="text-link" data-magnetic>Explore the work <Arrow /></a></div>
        <a className="scroll-cue metadata" href="#work">Scroll to explore<span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
