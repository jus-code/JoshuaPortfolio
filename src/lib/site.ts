export const site = {
  name: "Joshua Aniban",
  email: "aniban.joshuas@gmail.com",
  whatsapp: "https://wa.me/639934103557",
  title: "Joshua Aniban — Video Editor, AI Video Creator & Graphic Designer",
  description:
    "Creative video editor, AI video creator and graphic designer in Bulacan, Philippines. AI video production, VSL/UGC ads and short-form editing. Open to freelance and full-time opportunities.",
};

// Never invent a production domain. Vercel supplies this on deployment.
const domain = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = domain ? new URL(domain) : undefined;
