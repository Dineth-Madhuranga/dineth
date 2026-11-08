import { ImageResponse } from "next/og";
export const alt =
  "Dineth Madhuranga — Software Engineer. I build what you see. And what makes it work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f5f2eb",
        color: "#1b211e",
        padding: "55px 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #d8d0c2",
          paddingBottom: 25,
        }}
      >
        <span style={{ fontSize: 50, fontWeight: 700, letterSpacing: -4 }}>dm.</span>
        <span style={{ fontSize: 15, letterSpacing: 3 }}>
          DINETH MADHURANGA / SOFTWARE ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 78,
          lineHeight: 1.1,
          letterSpacing: -3,
        }}
      >
        <span>I build what you see.</span>
        <span style={{ color: "#465b4b", fontStyle: "italic" }}>And what makes it work.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          borderTop: "1px solid #d8d0c2",
          paddingTop: 25,
        }}
      >
        <span>THOUGHTFUL INTERFACES. DEPENDABLE ENGINEERING.</span>
        <span style={{ color: "#a64e34" }}>BASED IN SRI LANKA ↗</span>
      </div>
    </div>,
    size,
  );
}
