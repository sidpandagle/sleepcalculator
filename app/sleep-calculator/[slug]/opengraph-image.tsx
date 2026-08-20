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
          background: "#080B16",
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
        <div style={{ fontSize: 20, color: "#9FB2FF", letterSpacing: "0.15em", marginBottom: 20, textTransform: "uppercase" }}>
          sleepschedule.in
        </div>
        <div style={{ fontSize: 36, color: "#9BA5C2", marginBottom: 16 }}>
          Wake up at {display}?
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, color: "#EDEFF7", textAlign: "center", lineHeight: 1.2, marginBottom: 32 }}>
          Go to bed at {recommended || "—"}
        </div>
        <div
          style={{
            background: "rgba(232,185,138,0.1)",
            border: "1px solid rgba(232,185,138,0.35)",
            borderRadius: "12px",
            padding: "16px 32px",
            color: "#E8B98A",
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
