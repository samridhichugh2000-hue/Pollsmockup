import { PieChart, Repeat2 } from "lucide-react";
import { kpiData } from "@/lib/data";

const icons = [PieChart, Repeat2];

const colorConfig = [
  { border: "border-t-purple-500", iconBg: "bg-purple-100", iconTxt: "text-purple-600 dark:text-purple-400", delta: "text-emerald-600 dark:text-emerald-400" },
  { border: "border-t-violet-500", iconBg: "bg-violet-100", iconTxt: "text-violet-600 dark:text-violet-400", delta: "text-violet-600 dark:text-violet-400"   },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-w-xs">
      {kpiData.map((kpi, i) => {
        const Icon = icons[i];
        const col  = colorConfig[i];
        return (
          <div
            key={kpi.label}
            className={`glass glass-hover rounded-xl p-2.5 border-t-2 ${col.border} transition-all cursor-pointer fade-up`}
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-5 h-5 rounded-md ${col.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-2.5 h-2.5 ${col.iconTxt}`} />
              </div>
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">{kpi.value}</p>
            <p className="text-[8px] text-slate-500 dark:text-slate-500 mt-0.5 leading-tight">{kpi.label}</p>
            <p className={`text-[7px] font-medium mt-0.5 ${col.delta}`}>{kpi.delta}</p>
          </div>
        );
      })}
    </div>
  );
}
