import { CheckCircle2, Radio, Circle } from "lucide-react";

const steps = [
  { label: "Request Received",  date: "12 May",  state: "done"    },
  { label: "Acknowledged",      date: "13 May",  state: "done"    },
  { label: "Approval Pending",  date: "15 May",  state: "done"    },
  { label: "Poll Active",       date: "Current", state: "current" },
  { label: "Poll Closed",       date: "—",       state: "pending" },
  { label: "Results Shared",    date: "—",       state: "pending" },
  { label: "Action Taken",      date: "—",       state: "pending" },
  { label: "Feedback Closed",   date: "—",       state: "pending" },
];

export function LifecycleTracker() {
  const currentIdx = steps.findIndex((s) => s.state === "current");
  const pct = Math.round(((currentIdx + 1) / steps.length) * 100);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Lifecycle Tracker</h2>
          <p className="text-xs text-slate-500 mt-0.5">POLL-2026-007 · Training Satisfaction Survey</p>
        </div>
        <select
          className="text-xs rounded-lg px-3 py-1.5 focus:outline-none transition-colors
            bg-slate-100 border border-slate-200 text-slate-700
            dark:bg-white/5 dark:border-white/10 dark:text-slate-300"
        >
          <option>POLL-2026-007</option>
          <option>POLL-2026-006</option>
          <option>POLL-2026-005</option>
        </select>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {steps.map((step, i) => {
          const Icon = step.state === "done" ? CheckCircle2 : step.state === "current" ? Radio : Circle;
          const boxCls =
            step.state === "done"    ? "bg-emerald-50 border-emerald-400 dark:bg-emerald-500/15 dark:border-emerald-500/50" :
            step.state === "current" ? "bg-purple-50 border-purple-400 dark:bg-purple-500/20 dark:border-purple-500/60" :
            "bg-slate-50 border-slate-200 dark:bg-white/3 dark:border-white/8";
          const iconCls =
            step.state === "done"    ? "text-emerald-600 dark:text-emerald-400" :
            step.state === "current" ? "text-purple-600 dark:text-purple-400"   :
            "text-slate-300 dark:text-slate-600";
          const labelCls =
            step.state === "done"    ? "text-emerald-600 dark:text-emerald-400" :
            step.state === "current" ? "text-purple-700 dark:text-purple-300 font-semibold" :
            "text-slate-400 dark:text-slate-500";

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center relative ${boxCls}`}>
                <Icon className={`w-4 h-4 ${iconCls}`} />
                {step.state === "current" && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-500 live-dot" />
                )}
              </div>
              <div className="text-center">
                <p className={`text-[9px] sm:text-[10px] leading-tight ${labelCls}`}>{step.label}</p>
                <p className="text-[8px] text-slate-400 dark:text-slate-700 hidden sm:block mt-0.5">{step.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-1 rounded-full bg-slate-200 dark:bg-white/8">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7C3AED, #06B6D4)", transition: "width 1s ease" }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-slate-500">Step {currentIdx + 1} of {steps.length}</span>
        <span className="text-[10px] text-slate-500">{pct}% complete</span>
      </div>
    </div>
  );
}
