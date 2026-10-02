import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Workflow } from "@/components/workflow";
import { About, Experience, Services } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { MotionSystem } from "@/components/motion-system";

export default function Home() {
  return <><Navigation /><main id="main"><Hero /><div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>Good pacing. <i>Clear stories.</i> Intentional visuals. <b>↗</b> </span>)}</div></div><Work /><Workflow /><Services /><About /><Experience /><Contact /></main><Footer /><MotionSystem /></>;
}
