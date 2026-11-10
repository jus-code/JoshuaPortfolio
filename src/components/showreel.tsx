"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SHOWREEL_SRC = "/work/showreel.mp4";
const SHOWREEL_POSTER = "/work/showreel-poster.jpg";

export function ShowreelPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      const video = videoRef.current;
      if (!video) return;
      if (media.matches) {
        video.pause();
        setPlaying(false);
        return;
      }
      video.muted = true;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="hero-preview" aria-label="Showreel of selected video work">
      <div className="preview-top metadata"><span>Showreel</span><span>00:16</span></div>
      <Image
        src={SHOWREEL_POSTER}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 61vw, 31vw"
        className={`preview-poster${playing ? " is-hidden" : ""}`}
      />
      <video
        ref={videoRef}
        className={`preview-video${playing ? " is-visible" : ""}`}
        src={SHOWREEL_SRC}
        poster={SHOWREEL_POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="preview-caption"><span className="metadata">Church · AI · UGC</span><span className="preview-play" aria-hidden="true">↗</span></div>
    </div>
  );
}
