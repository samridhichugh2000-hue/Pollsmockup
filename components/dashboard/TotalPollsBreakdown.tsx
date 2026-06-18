import { totalPollsBreakdown, kpiData } from "@/lib/data";

const total = kpiData.find((k) => k.label === "Total Polls")?.value ?? 32;

export function TotalPollsBreakdown() {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Total Polls Breakdown — <span className="text-slate-900 dark:text-slate-100">{total}</span>
      </p>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {totalPollsBreakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
