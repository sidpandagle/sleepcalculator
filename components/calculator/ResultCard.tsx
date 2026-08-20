import SleepWave from "@/components/ui/SleepWave";

function formatAmPm(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

interface ResultCardProps {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export default function ResultCard({ time, cycles, hours, recommended }: ResultCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl px-4 py-3.5 transition-all ${
        recommended
          ? "bg-ember/10 border border-ember/40 pt-8"
          : "bg-dusk border border-moon/9 hover:border-moon/20"
      }`}
    >
      {recommended && (
        <span className="absolute top-2 right-2.5 text-[11px] tracking-wide uppercase font-semibold bg-ember text-ink px-2 py-[3px] rounded-full">
          Recommended
        </span>
      )}
      <div className="font-serif text-[28px] leading-none tracking-tight text-linen">{formatAmPm(time)}</div>
      <div className="text-[12.5px] text-mist/80 mt-2">
        {cycles} sleep {cycles === 1 ? "cycle" : "cycles"} · {hours}h
      </div>
      <SleepWave
        cycles={cycles}
        color={recommended ? "ember" : "moon"}
        amplitude={5}
        periodWidth={14}
        strokeWidth={2}
        className="absolute right-2 bottom-1.5 opacity-40 pointer-events-none"
      />
    </div>
  );
}
