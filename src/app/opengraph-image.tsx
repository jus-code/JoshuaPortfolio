import { ImageResponse } from "next/og";

export const alt = "Joshua Aniban — Creative Video Editor, AI Video Creator & Graphic Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#171815", color: "#f0eee6", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 68px", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}><span>BULACAN, PHILIPPINES</span><span style={{ color: "#d5ed5b" }}>OPEN FOR WORK ↗</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 1.05, letterSpacing: -6 }}><span>JOSHUA</span><span>ANIBAN<span style={{ color: "#d5ed5b" }}>.</span></span></div><div style={{ display: "flex", fontSize: 23 }}>VIDEO EDITOR / AI VIDEO CREATOR / GRAPHIC DESIGNER</div></div>, size);
}
