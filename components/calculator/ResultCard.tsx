interface ResultCardProps {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export default function ResultCard({ time, cycles, hours, recommended }: ResultCardProps) {
  return (
    <div
      className={`relative rounded-xl p-4 border transition-all ${
        recommended
          ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-3 text-xs font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
          Recommended
        </span>
      )}
      <div className="text-3xl font-bold text-white tabular-nums">{time}</div>
      <div className="text-sm text-slate-400 mt-1">
        {cycles} sleep {cycles === 1 ? "cycle" : "cycles"} · {hours}h
      </div>
    </div>
  );
}
