import { PieChart, Clock, Inbox, Megaphone, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { kpiData } from "@/lib/data";

const icons = [PieChart, Clock, Inbox, Megaphone, TrendingUp, CheckCircle2, AlertCircle];

const colorConfig = [
  { border: "border-t-purple-500",  iconBg: "bg-purple-100",  iconTxt: "text-purple-600 dark:text-purple-400",  delta: "text-emerald-600 dark:text-emerald-400" },
  { border: "border-t-violet-500",  iconBg: "bg-violet-100",  iconTxt: "text-violet-600 dark:text-violet-400",  delta: "text-violet-600 dark:text-violet-400"   },
  { border: "border-t-emerald-500", iconBg: "bg-emerald-100", iconTxt: "text-emerald-600 dark:text-emerald-400",delta: "text-emerald-600 dark:text-emerald-400" },
  { border: "border-t-blue-500",    iconBg: "bg-blue-100",    iconTxt: "text-blue-600 dark:text-blue-400",      delta: "text-blue-600 dark:text-blue-400"       },
  { border: "border-t-orange-500",  iconBg: "bg-orange-100",  iconTxt: "text-orange-600 dark:text-orange-400",  delta: "text-orange-600 dark:text-orange-400"   },
  { border: "border-t-teal-500",    iconBg: "bg-teal-100",    iconTxt: "text-teal-600 dark:text-teal-400",      delta: "text-teal-600 dark:text-teal-400"       },
  { border: "border-t-red-500",     iconBg: "bg-red-100",     iconTxt: "text-red-600 dark:text-red-400",        delta: "text-red-600 dark:text-red-400"         },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-7 gap-2">
      {kpiData.map((kpi, i) => {
        const Icon = icons[i];
        const col  = colorConfig[i];
        const card = (
          <div
            className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 border-t-2 ${col.border} transition-all cursor-pointer fade-up`}
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <div className={`w-5 h-5 rounded-md ${col.iconBg} flex items-center justify-center mb-2`}>
              <Icon className={`w-2.5 h-2.5 ${col.iconTxt}`} />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">{kpi.value}</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{kpi.label}</p>
            <p className={`text-[8px] font-medium mt-0.5 ${col.delta}`}>{kpi.delta}</p>
            {i === 6 && (
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-0.5">
                <div className="flex justify-between">
                  <span className="text-[7px] text-slate-400 leading-tight">RMS Task Raised</span>
                  <span className="text-[7px] font-semibold text-slate-600 dark:text-slate-300">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[7px] text-slate-400 leading-tight">Action Yet to Start</span>
                  <span className="text-[7px] font-semibold text-slate-600 dark:text-slate-300">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[7px] text-slate-400 leading-tight">Approval Pending</span>
                  <span className="text-[7px] font-semibold text-slate-600 dark:text-slate-300">5</span>
                </div>
              </div>
            )}
          </div>
        );
        return kpi.href
          ? <Link key={kpi.label} href={kpi.href}>{card}</Link>
          : <div key={kpi.label}>{card}</div>;
      })}
    </div>
  );
}
