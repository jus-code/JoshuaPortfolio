export type Category = "AI video" | "Video" | "VSL" | "Graphic design" | "Social";
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

// Media lives in public/work. Compression and posters were generated from the
// files supplied in the portfolio folder; confirm clearance before publishing.
export const projects: Project[] = [
  {
    id: "church-anniversary",
    title: "2nd Anniversary Trailer",
    category: "Video",
    description: "A short anniversary trailer cut from church service and event footage, shaped with paced highlights and title moments.",
    role: "Editor",
    tools: ["CapCut"],
    layout: "wide",
    placeholder: false,
    media: {
      type: "video",
      src: "/work/church-anniversary.mp4",
      poster: "/work/church-anniversary-poster.jpg",
      alt: "2nd Anniversary Trailer for Grace Upon Grace Church",
    },
  },
  {
    id: "ai-animation-microplastic",
    title: "Microplastic — AI Animation",
    category: "AI video",
    description: "An AI-generated short film on plastic pollution, built from generated footage and cut to a measured, documentary pace.",
    role: "AI video creator & editor",
    tools: ["Google Flow", "CapCut"],
    layout: "vertical",
    placeholder: false,
    media: {
      type: "video",
      src: "/work/ai-animation-microplastic.mp4",
      poster: "/work/ai-animation-microplastic-poster.jpg",
      alt: "Microplastic AI animation short film",
    },
  },
  {
    id: "vsl-apnea",
    title: "APNEA — VSL",
    category: "VSL",
    description: "A video sales letter edit built to move viewers from the problem to the offer and the call to action without losing attention.",
    role: "Editor",
    tools: ["CapCut"],
    layout: "split",
    placeholder: false,
    media: {
      type: "video",
      src: "/work/vsl-apnea.mp4",
      poster: "/work/vsl-apnea-poster.jpg",
      alt: "APNEA video sales letter",
    },
  },
  {
    id: "ai-ugc-russian-sleep",
    title: "Russian Sleep — AI UGC",
    category: "AI video",
    description: "An AI UGC-style ad built from a script, generated avatar footage and B-roll, then edited for a vertical feed.",
    role: "Editor & AI video",
    tools: ["CapCut", "Higgsfield", "Google Flow"],
    layout: "vertical",
    placeholder: false,
    media: {
      type: "video",
      src: "/work/ai-ugc-russian-sleep.mp4",
      poster: "/work/ai-ugc-russian-sleep-poster.jpg",
      alt: "Russian Sleep AI UGC ad",
    },
  },
  {
    id: "short-form-instagram",
    title: "Instagram Short-form",
    category: "Social",
    description: "A short vertical edit for Instagram, shaped for the feed with quick pacing and a clear opening.",
    role: "Editor",
    tools: ["CapCut"],
    layout: "vertical",
    placeholder: false,
    media: {
      type: "video",
      src: "/work/short-form-instagram.mp4",
      poster: "/work/short-form-instagram-poster.jpg",
      alt: "Short-form Instagram video edit",
    },
  },
  {
    id: "church-poster-series",
    title: "Church Poster Series",
    category: "Graphic design",
    description: "A set of square posters and social graphics for church events, keeping typography, colour and the church's visual identity consistent.",
    role: "Graphic designer",
    tools: ["Canva", "Adobe Photoshop"],
    layout: "design",
    placeholder: false,
    media: {
      type: "image",
      src: "/work/church-poster-series.jpg",
      alt: "Selection of church event posters",
    },
  },
  {
    id: "pup-isite-polo",
    title: "PUP ISITE Officer Polo",
    category: "Graphic design",
    description: "An officer polo shirt mockup prepared in Photoshop for the PUP ISITE student organization.",
    role: "Graphic designer",
    tools: ["Adobe Photoshop"],
    layout: "design",
    placeholder: false,
    media: {
      type: "image",
      src: "/work/photoshop-polo-mockup.jpg",
      alt: "PUP ISITE officer polo shirt mockup",
    },
  },
];
