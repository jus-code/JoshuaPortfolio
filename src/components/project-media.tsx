"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export function ProjectMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoverPreview = useRef(false);
  const startPreview = () => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    video.muted = true;
    isHoverPreview.current = true;
    void video.play().catch(() => {});
  };
  const stopPreview = () => { const video = videoRef.current; if (video && isHoverPreview.current) video.pause(); isHoverPreview.current = false; };
  const media = !project.placeholder ? project.media : undefined;

  return (
    <div className={`project-media media-${project.layout}${media ? " has-media" : ""}`} data-cursor={media ? (media.type === "video" ? "PLAY" : "VIEW") : "MEDIA SOON"} onPointerEnter={startPreview} onPointerLeave={stopPreview}>
      {media?.type === "image" ? <Image src={media.src} alt={media.alt} fill sizes={project.layout === "wide" ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 55vw"} className="project-image" /> :
        media?.type === "video" ? <video ref={videoRef} controls playsInline preload="none" poster={media.poster} aria-label={media.alt} className="project-video" onPointerDown={() => { isHoverPreview.current = false; }} onKeyDown={() => { isHoverPreview.current = false; }}><source src={media.src} />{media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" default />}<p>Your browser does not support video. <a href={media.src}>Download the video</a>.</p></video> :
          <div className="media-placeholder">
            <div className="placeholder-top metadata"><span>Portfolio slot</span><span>{project.layout === "vertical" ? "9:16" : project.layout === "design" ? "4:5" : "16:9"}</span></div>
            <div className="placeholder-composition" aria-hidden="true">
              {project.layout === "wide" ? <><span className="ghost-word">SCRIPT</span><span className="solid-word">SCREEN<span>↗</span></span><div className="composition-line" /></> :
                project.layout === "split" ? <><div className="cut-bars"><i /><i /><i /></div><span className="cut-word">THE<br />CUT.</span></> :
                  project.layout === "vertical" ? <><span className="vertical-word">STAY<br />FOR<br /><em>THE</em><br />EDIT.</span><div className="vertical-mark" /></> :
                    <><span className="design-word">TYPE<br />&<br />FORM</span><div className="design-square" /></>}
            </div>
            <div className="placeholder-bottom metadata"><span>[ {project.layout === "design" ? "ADD DESIGN" : "ADD VIDEO"} ]</span><span>Placeholder / not project work</span></div>
          </div>}
    </div>
  );
}
