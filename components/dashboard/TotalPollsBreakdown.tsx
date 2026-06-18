import { totalPollsBreakdown, kpiData } from "@/lib/data";

const total = kpiData.find((k) => k.label === "Total Polls")?.value ?? 32;

export function TotalPollsBreakdown() {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Total Polls Breakdown — <span className="text-slate-900 dark:text-slate-100">{total}</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-2">
        {totalPollsBreakdown.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5 py-1 border-b border-slate-100 dark:border-white/5">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.label}</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
