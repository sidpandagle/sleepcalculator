import { ImageResponse } from "next/og";
import { slugToHhmm } from "@/lib/programmatic";
import { display12h } from "@/lib/time-utils";
import { calculateBedtimes } from "@/lib/sleep-engine";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const hhmm = slugToHhmm(params.slug);
  const display = hhmm ? display12h(hhmm) : "";
  const bedtimes = hhmm ? calculateBedtimes(hhmm).filter((b) => b.recommended) : [];
  const recommended = bedtimes.map((b) => display12h(b.time)).join(" or ");

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
        <div style={{ fontSize: 20, color: "#6366f1", letterSpacing: "0.15em", marginBottom: 20, textTransform: "uppercase" }}>
          sleepschedule.in
        </div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginBottom: 16 }}>
          Wake up at {display}?
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, color: "#f1f5f9", textAlign: "center", lineHeight: 1.2, marginBottom: 32 }}>
          Go to bed at {recommended || "—"}
        </div>
        <div
          style={{
            background: "#1e1b4b",
            border: "1px solid #4338ca",
            borderRadius: "12px",
            padding: "16px 32px",
            color: "#a5b4fc",
            fontSize: 18,
          }}
        >
          Based on 90-minute sleep cycles · CDC recommended 7.5–9 hrs
        </div>
      </div>
    ),
    { ...size }
  );
}
