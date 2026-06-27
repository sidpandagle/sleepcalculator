import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sleep Schedule — Free Science-Based Sleep Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 22, color: "#6366f1", letterSpacing: "0.15em", marginBottom: 24, textTransform: "uppercase" }}>
          sleepschedule.in
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "#f1f5f9", textAlign: "center", lineHeight: 1.2, marginBottom: 24 }}>
          Sleep Schedule
        </div>
        <div style={{ fontSize: 26, color: "#94a3b8", textAlign: "center", maxWidth: 800, lineHeight: 1.5 }}>
          Free sleep calculators based on 90-minute sleep cycles
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: "16px",
          }}
        >
          {["Sleep", "Nap", "REM", "Sleep Debt", "Duration", "Pregnancy", "Baby"].map((tool) => (
            <div
              key={tool}
              style={{
                background: "#1e1b4b",
                border: "1px solid #4338ca",
                borderRadius: "8px",
                padding: "8px 14px",
                color: "#a5b4fc",
                fontSize: 14,
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
