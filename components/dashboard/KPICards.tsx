import {
  PieChart, Radio, Clock4, Send, Clock, Share2, Repeat2, CalendarClock, AlertCircle, Inbox, Zap, Archive, FolderX,
} from "lucide-react";
import { kpiData } from "@/lib/data";

const icons = [PieChart, Radio, Clock4, Send, Clock, Share2, Repeat2, CalendarClock, AlertCircle, Inbox, Zap, Archive, FolderX];

const colorConfig = [
  { border: "border-t-purple-500", iconBg: "bg-purple-100",  iconTxt: "text-purple-600 dark:text-purple-400",  delta: "text-emerald-600 dark:text-emerald-400" },
  { border: "border-t-cyan-500",   iconBg: "bg-cyan-100",    iconTxt: "text-cyan-600 dark:text-cyan-400",      delta: "text-cyan-600 dark:text-cyan-400"       },
  { border: "border-t-orange-500", iconBg: "bg-orange-100",  iconTxt: "text-orange-600 dark:text-orange-400",  delta: "text-orange-600 dark:text-orange-400"   },
  { border: "border-t-blue-500",   iconBg: "bg-blue-100",    iconTxt: "text-blue-600 dark:text-blue-400",      delta: "text-blue-600 dark:text-blue-400"       },
  { border: "border-t-amber-500",  iconBg: "bg-amber-100",   iconTxt: "text-amber-600 dark:text-amber-400",    delta: "text-amber-600 dark:text-amber-400"     },
  { border: "border-t-indigo-500", iconBg: "bg-indigo-100",  iconTxt: "text-indigo-600 dark:text-indigo-400",  delta: "text-indigo-600 dark:text-indigo-400"   },
  { border: "border-t-violet-500", iconBg: "bg-violet-100",  iconTxt: "text-violet-600 dark:text-violet-400",  delta: "text-violet-600 dark:text-violet-400"   },
  { border: "border-t-teal-500",   iconBg: "bg-teal-100",    iconTxt: "text-teal-600 dark:text-teal-400",      delta: "text-teal-600 dark:text-teal-400"       },
  { border: "border-t-rose-500",   iconBg: "bg-rose-100",    iconTxt: "text-rose-600 dark:text-rose-400",      delta: "text-rose-600 dark:text-rose-400"       },
  { border: "border-t-emerald-500",iconBg: "bg-emerald-100", iconTxt: "text-emerald-600 dark:text-emerald-400",delta: "text-emerald-600 dark:text-emerald-400" },
  { border: "border-t-orange-500", iconBg: "bg-orange-100",  iconTxt: "text-orange-600 dark:text-orange-400",  delta: "text-orange-600 dark:text-orange-400"   },
  { border: "border-t-slate-400",  iconBg: "bg-slate-100",   iconTxt: "text-slate-500 dark:text-slate-400",    delta: "text-slate-500 dark:text-slate-400"     },
  { border: "border-t-red-500",    iconBg: "bg-red-100",     iconTxt: "text-red-600 dark:text-red-400",        delta: "text-red-600 dark:text-red-400"         },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3" style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}>
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
