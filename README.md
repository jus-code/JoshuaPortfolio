# Joshua Aniban — Creative Portfolio

A cinematic, responsive Next.js App Router portfolio. TypeScript, React, Tailwind CSS and native CSS/Web Animations. No animation package, CMS, database or backend required.

## Run locally

Requires Node.js 20.9+ (Node 24 recommended).

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck
npm run build
npm start
```

## Deploy on Vercel

1. Push the project to a Git repository.
2. Import that repository in Vercel.
3. Use the automatically detected **Next.js** preset and deploy. No custom build/output settings or infrastructure required.

Vercel's production domain is used for canonical metadata, robots and sitemap. For a custom domain, optionally set `NEXT_PUBLIC_SITE_URL` to your full URL, such as `https://your-domain.com`, and redeploy. Local development intentionally does not advertise an invented canonical domain.

## Add real projects

Edit `src/data/projects.ts`. All initial entries are **placeholder slots**, not fictional projects.

1. Place cleared images and video in `public/work/`.
2. Replace the slot's title and description with accurate project information.
3. Set `placeholder: false`.
4. Add the actual `year`, `role`, `tools`, and optional `url`.
5. Add `media`, for example:

```ts
media: {
  type: "video",
  src: "/work/my-video.mp4",
  poster: "/work/my-poster.webp",
  captions: "/work/my-captions.vtt", // Optional; add for videos with speech.
  alt: "Describe the actual video content here",
}
```

For images:

```ts
media: {
  type: "image",
  src: "/work/my-poster.webp",
  alt: "Describe the actual design here",
}
```

Supported categories: `AI video`, `Video`, `Graphic design`, `Social`. Layouts: `wide`, `split`, `vertical`, `design`. Local images use Next.js Image optimization with responsive sizes. Remote images require an explicit allowlisted host in `next.config.ts`; prefer local assets.

Keep videos compressed (H.264 MP4 is a safe default), add lightweight posters, and burn in captions or supply a proper WebVTT caption track where the video includes speech. Videos preload nothing, never autoplay on page load, and have native controls on desktop and touch. Desktop hover can play a muted preview unless reduced motion is enabled. Avoid large source footage in the repository; use a direct HTTPS media URL for large files.

The hero showreel is separately marked in `src/components/hero.tsx`. Replace its graphic placeholder only with approved media; it is not a fake playback button.

## Edit profile / contact

- `src/data/profile.ts`: services, skills and experience.
- `src/lib/site.ts`: contact information, metadata and domain handling.
- `src/components/about.tsx`: personal description.
- `src/app/globals.css`: tokens, responsive composition and motion.
- `DESIGN.md`: approved positioning and visual direction.

Availability reflects the interview. Update it in navigation and contact if that changes. All social links are omitted until provided.

## Accessibility and motion

Semantic landmarks, a skip link, visible focus, keyboard-operable filters, arrow-key workflow tabs, native disclosures, accessible labels, normal browser scrolling and reduced-motion support. Scroll reveals replay on downward and upward entry, rearming only after a full viewport exit. Focused content is not hidden by reveals. The contextual cursor supplements the normal cursor; it never replaces it. Content remains visible if scroll enhancement is unavailable.

## Browser QA

With the site running, use an **already installed** Chrome or Edge:

```bash
node scripts/qa.mjs http://localhost:3000
```

This dependency-free script tests 360, 390, 768, 1024, 1440 and 1920px widths, portfolio filters, keyboard workflow tabs, disclosures, anchor targets, contact links, reduced motion, metadata, generated assets and browser errors. It writes screenshots and a report to `.qa/` (gitignored). Set `BROWSER_PATH` if your browser is installed elsewhere. Nothing is downloaded.
