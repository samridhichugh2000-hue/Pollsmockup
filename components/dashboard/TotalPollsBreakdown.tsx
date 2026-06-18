import { totalPollsBreakdown } from "@/lib/data";

const colorMap: Record<string, { bar: string; num: string; dot: string }> = {
  cyan:   { bar: "bg-cyan-500",   num: "text-cyan-600 dark:text-cyan-400",   dot: "bg-cyan-500"   },
  orange: { bar: "bg-orange-500", num: "text-orange-600 dark:text-orange-400",dot: "bg-orange-500" },
  blue:   { bar: "bg-blue-500",   num: "text-blue-600 dark:text-blue-400",   dot: "bg-blue-500"   },
  green:  { bar: "bg-emerald-500",num: "text-emerald-600 dark:text-emerald-400",dot:"bg-emerald-500"},
  amber:  { bar: "bg-amber-500",  num: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500"  },
  red:    { bar: "bg-red-500",    num: "text-red-600 dark:text-red-400",     dot: "bg-red-500"    },
};

const total = 32;

export function TotalPollsBreakdown() {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Total Polls Breakdown
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {totalPollsBreakdown.map((item) => {
          const c = colorMap[item.color] ?? colorMap.blue;
          const pct = Math.round((item.value / total) * 100);
          return (
            <div key={item.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${c.num}`}>{item.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[9px] text-slate-400">{pct}% of total</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
