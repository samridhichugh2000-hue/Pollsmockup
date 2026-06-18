import { AlertTriangle, FolderClock, ClockAlert, Send, UserX } from "lucide-react";
import { followUpData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  "folder-clock": FolderClock,
  "clock-alert":  ClockAlert,
  "send":         Send,
  "user-x":       UserX,
};

const cardStyle: Record<string, { light: string; dark: string; icon: string; title: string }> = {
  amber: { light: "bg-amber-50 border-amber-200",   dark: "dark:bg-amber-500/6 dark:border-amber-500/20",   icon: "text-amber-600 dark:text-amber-400",  title: "text-amber-800 dark:text-amber-300" },
  orange:{ light: "bg-orange-50 border-orange-200", dark: "dark:bg-orange-500/6 dark:border-orange-500/20", icon: "text-orange-600 dark:text-orange-400",title: "text-orange-800 dark:text-orange-300"},
  pink:  { light: "bg-pink-50 border-pink-200",     dark: "dark:bg-pink-500/6 dark:border-pink-500/20",     icon: "text-pink-600 dark:text-pink-400",    title: "text-pink-800 dark:text-pink-300"   },
  slate: { light: "bg-slate-100 border-slate-200",  dark: "dark:bg-slate-500/6 dark:border-slate-500/20",   icon: "text-slate-500 dark:text-slate-400",  title: "text-slate-700 dark:text-slate-300" },
};

const itemColor = (label: string) =>
  label === "Overdue"    ? "text-red-600 dark:text-red-400"    :
  label === "Due today"  ? "text-amber-600 dark:text-amber-400" :
  label.includes("days") ? "text-orange-600 dark:text-orange-400" :
  "text-slate-500";

export function FollowUpPanel() {
  const total = followUpData.reduce((s, d) => s + d.count, 0);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Ready for Follow-up</h2>
          <p className="text-xs text-slate-500 mt-0.5">Items requiring HR / Admin action</p>
        </div>
        <span className="ml-auto text-[10px] font-semibold px-2.5 py-0.5 rounded-full
          bg-red-100 text-red-700 border border-red-200
          dark:bg-red-500/12 dark:text-red-300 dark:border-red-500/22">
          {total} items
        </span>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {followUpData.map((card) => {
          const Icon = iconMap[card.icon];
          const style = cardStyle[card.color];
          return (
            <div key={card.category} className={`p-4 rounded-xl border ${style.light} ${style.dark}`}>
              <div className="flex items-start gap-2 mb-3">
                {Icon && <Icon className={`w-4 h-4 ${style.icon} flex-shrink-0 mt-0.5`} />}
                <p className={`text-xs font-semibold ${style.title} leading-tight`}>{card.category}</p>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{card.count}</p>
              <div className="space-y-1.5">
                {card.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] gap-2">
                    <span className="text-slate-500 truncate">{item.id}</span>
                    {item.label && (
                      <span className={`${itemColor(item.label)} flex-shrink-0`}>{item.label}</span>
                    )}
                  </div>
                ))}
                {card.category === "Non-participant Reminders" && (
                  <button className="text-[10px] text-purple-600 dark:text-purple-400 hover:underline mt-1">
                    Send reminder →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
