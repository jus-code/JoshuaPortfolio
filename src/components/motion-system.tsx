"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays visible without JavaScript. */
export function MotionSystem() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (motion.matches) return;
      const animations = new Set<Animation>();
      const visible = new WeakSet<Element>();
      const running = new WeakMap<HTMLElement, Animation>();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          // Rearm only after a full exit, avoiding jitter near the viewport edge.
          if (!entry.isIntersecting) {
            visible.delete(element);
            return;
          }
          if (entry.intersectionRatio < 0.08 || visible.has(element)) return;
          visible.add(element);
          // Keyboard focus should never be hidden by a scroll reveal.
          if (element.contains(document.activeElement)) return;
          const fromAbove = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          running.get(element)?.cancel();
          const animation = element.animate([
            { opacity: 0, transform: `translateY(${fromAbove ? -28 : 38}px)`, clipPath: fromAbove ? "inset(16% 0 0 0)" : "inset(0 0 16% 0)" },
            { opacity: 1, transform: "translateY(0)", clipPath: "inset(0)" },
          ], { duration: fromAbove ? 750 : 900, delay: Number(element.dataset.delay || 0), easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
          animations.add(animation);
          running.set(element, animation);
          const release = () => {
            animations.delete(animation);
            if (running.get(element) === animation) running.delete(element);
          };
          animation.finished.then(release, release);
        });
      }, { threshold: [0, 0.08] });
      document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
      // Filtering mounts new entries. Give those the same reveal language.
      const mutations = new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) observer.observe(node);
          node.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
        }));
      });
      const projectList = document.querySelector(".project-list");
      if (projectList) mutations.observe(projectList, { childList: true, subtree: true });

      let frame = 0;
      let x = 0;
      let y = 0;
      let target: HTMLElement | null = null;
      const cursor = cursorRef.current;
      const onPointer = (event: PointerEvent) => {
        if (!finePointer.matches || event.pointerType === "touch") return;
        x = event.clientX; y = event.clientY;
        target = (event.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
        const preview = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        if (cursor) { cursor.dataset.visible = preview ? "true" : "false"; cursor.textContent = preview?.dataset.cursor || ""; }
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (cursor) cursor.style.transform = `translate3d(${x + 18}px,${y + 18}px,0)`;
          document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
            if (element !== target) { element.style.translate = ""; return; }
            const bounds = element.getBoundingClientRect();
            element.style.translate = `${(x - bounds.left - bounds.width / 2) * .1}px ${(y - bounds.top - bounds.height / 2) * .15}px`;
          });
        });
      };
      const onLeave = () => {
        if (cursor) cursor.dataset.visible = "false";
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => { element.style.translate = ""; });
      };
      if (finePointer.matches) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("pointerleave", onLeave);
      }
      cleanup = () => {
        observer.disconnect(); mutations.disconnect(); animations.forEach((animation) => animation.cancel());
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onPointer); document.removeEventListener("pointerleave", onLeave);
        onLeave();
      };
    };
    setup();
    motion.addEventListener("change", setup);
    finePointer.addEventListener("change", setup);
    return () => { cleanup(); motion.removeEventListener("change", setup); finePointer.removeEventListener("change", setup); };
  }, []);
  return <div ref={cursorRef} className="project-cursor" aria-hidden="true" />;
}
