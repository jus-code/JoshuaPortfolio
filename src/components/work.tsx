"use client";

import { useState } from "react";
import { projects, type Category, type Project } from "@/data/projects";
import { Arrow } from "./arrow";
import { ProjectMedia } from "./project-media";

const filters: ("All" | Category)[] = ["All", "AI video", "Video", "Graphic design", "Social"];

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project project-${project.layout}`} data-reveal>
      <ProjectMedia project={project} />
      <div className="project-info">
        <div className="project-heading"><span className="project-number metadata">/{String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3>{project.url && !project.placeholder ? <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} (opens in a new tab)`}><Arrow diagonal /></a> : project.placeholder ? <span className="project-status metadata">Media coming</span> : null}</div>
        <div className="project-detail"><span className="metadata">{project.category}{project.year ? ` · ${project.year}` : ""}</span><p>{project.description}</p></div>
        {(project.role || project.tools.length > 0) && <dl className="project-credits">{project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}{project.tools.length > 0 && <div><dt>Tools</dt><dd>{project.tools.join(" / ")}</dd></div>}</dl>}
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const visible = projects.filter((project) => filter === "All" || project.category === filter);
  return (
    <section className="work section-shell section-space" id="work" aria-labelledby="work-title">
      <div className="section-label metadata" data-reveal><span>01 / The portfolio</span><span>Scripts. Cuts. Visuals.</span></div>
      <div className="work-intro" data-reveal><h2 id="work-title" className="display section-title">WORK IN<br /><span className="outline-type">FOCUS.</span></h2><div><p>AI-generated footage. Script-led ads.<br />Edits that keep the story moving.</p><p className="work-note">I’m preparing my featured work. These are clearly marked media slots, not published projects.</p></div></div>
      <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter portfolio by category">{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span aria-hidden="true">↗</span></button>)}</div><span className="metadata filter-count" role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "slot" : "slots"}</span></div>
      <div className={`project-list ${filter !== "All" ? "is-filtered" : ""}`}>{visible.map((project) => <ProjectEntry key={project.id} project={project} index={projects.indexOf(project)} />)}{visible.length === 0 && <p className="empty-work">No work in this category yet.</p>}</div>
    </section>
  );
}
