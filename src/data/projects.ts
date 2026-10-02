export type Category = "AI video" | "Video" | "Graphic design" | "Social";
export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; captions?: string; alt: string };

export type Project = {
  id: string;
  title: string;
  category: Category;
  year?: string;
  description: string;
  role?: string;
  tools: string[];
  layout: "wide" | "split" | "vertical" | "design";
  placeholder: boolean;
  media?: ProjectMedia;
  url?: string;
};

// These are editorial slots, NOT completed projects or client work.
// Replace each slot with cleared work, add media, and set placeholder: false.
// Put local files in public/work and reference them as /work/filename.mp4.
export const projects: Project[] = [
  {
    id: "ai-video",
    title: "AI video production",
    category: "AI video",
    description: "A place for script-to-screen work using AI-generated footage and hands-on editing.",
    tools: [],
    layout: "wide",
    placeholder: true,
  },
  {
    id: "vsl-ugc",
    title: "VSL / UGC ads",
    category: "Video",
    description: "A place for ad edits built around the script, pacing and a clear message.",
    tools: [],
    layout: "split",
    placeholder: true,
  },
  {
    id: "short-form",
    title: "Short-form edits",
    category: "Social",
    description: "A place for vertical edits, captions and motion made for social feeds.",
    tools: [],
    layout: "vertical",
    placeholder: true,
  },
  {
    id: "graphic-design",
    title: "Graphic design",
    category: "Graphic design",
    description: "A place for posters, social graphics and event branding.",
    tools: [],
    layout: "design",
    placeholder: true,
  },
];
