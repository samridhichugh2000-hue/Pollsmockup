"use client";
import { ArrowRight, FileEdit, Clock, CheckCircle2, XCircle, AlertCircle, Send, Users } from "lucide-react";
import { pollRequests } from "@/lib/data";

const stages = [
  {
    key: "Draft",
    label: "Draft",
    sublabel: "Not submitted",
    icon: FileEdit,
    bg: "bg-slate-100 dark:bg-slate-700",
    iconBg: "bg-slate-200 dark:bg-slate-600",
    iconTxt: "text-slate-600 dark:text-slate-300",
    numTxt: "text-slate-700 dark:text-slate-200",
    border: "border-slate-300 dark:border-slate-600",
    dot: "bg-slate-400",
  },
  {
    key: "Awaiting Approval",
    label: "Awaiting Approval",
    sublabel: "Pending sign-off",
    icon: Clock,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconTxt: "text-amber-600 dark:text-amber-400",
    numTxt: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-400",
  },
  {
    key: "Active",
    label: "Active",
    sublabel: "Collecting responses",
    icon: Users,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconTxt: "text-emerald-600 dark:text-emerald-400",
    numTxt: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  {
    key: "Pending Closure",
    label: "Pending Closure",
    sublabel: "Results under review",
    icon: AlertCircle,
    bg: "bg-orange-50 dark:bg-orange-500/10",
    iconBg: "bg-orange-100 dark:bg-orange-500/20",
    iconTxt: "text-orange-600 dark:text-orange-400",
    numTxt: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-500/30",
    dot: "bg-orange-400",
  },
  {
    key: "Closed",
    label: "Closed",
    sublabel: "Poll completed",
    icon: CheckCircle2,
    bg: "bg-blue-50 dark:bg-blue-500/10",
    iconBg: "bg-blue-100 dark:bg-blue-500/20",
    iconTxt: "text-blue-600 dark:text-blue-400",
    numTxt: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-500/30",
    dot: "bg-blue-500",
  },
];

// Count polls per stage
const counts: Record<string, number> = {};
pollRequests.forEach((p) => {
  counts[p.status] = (counts[p.status] ?? 0) + 1;
});
// "Acknowledged" maps to Awaiting Approval visually
counts["Awaiting Approval"] = (counts["Awaiting Approval"] ?? 0) + (counts["Acknowledged"] ?? 0);

const total = pollRequests.length;

export function PollLifecycle() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border-divider)" }}
      >
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Lifecycle</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">{total} polls tracked this quarter</p>
        </div>
        <span className="text-[10px] text-slate-400">Draft → Approval → Active → Closure → Closed</span>
      </div>

      {/* Stage flow */}
      <div className="px-5 py-4 flex items-stretch gap-1 overflow-x-auto">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const count = counts[stage.key] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const polls = pollRequests.filter(
            (p) =>
              p.status === stage.key ||
              (stage.key === "Awaiting Approval" && p.status === "Acknowledged")
          );

          return (
            <div key={stage.key} className="flex items-center gap-1 flex-1 min-w-[120px]">
              {/* Stage card */}
              <div className={`flex-1 rounded-xl border ${stage.bg} ${stage.border} p-3`}>
                <div className={`w-7 h-7 rounded-lg ${stage.iconBg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-3.5 h-3.5 ${stage.iconTxt}`} />
                </div>
                <p className={`text-xl font-bold leading-none ${stage.numTxt}`}>{count}</p>
                <p className="text-[9px] font-semibold text-slate-700 dark:text-slate-300 mt-1 leading-tight">{stage.label}</p>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{stage.sublabel}</p>

                {/* Mini progress bar */}
                <div className="mt-2 h-1 rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full ${stage.dot}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[8px] text-slate-400 mt-0.5">{pct}% of total</p>

                {/* Poll list (up to 3) */}
                {polls.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {polls.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center gap-1">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${stage.dot}`} />
                        <p className="text-[8px] text-slate-500 dark:text-slate-400 truncate leading-tight">{p.title}</p>
                      </div>
                    ))}
                    {polls.length > 3 && (
                      <p className="text-[8px] text-slate-400">+{polls.length - 3} more</p>
                    )}
                  </div>
                )}
              </div>

              {/* Arrow between stages */}
              {idx < stages.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend row */}
      <div
        className="px-5 py-2.5 flex flex-wrap gap-4"
        style={{ borderTop: "1px solid var(--border-divider)" }}
      >
        {stages.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-[9px] text-slate-500">{s.label}: <strong className="text-slate-700 dark:text-slate-300">{counts[s.key] ?? 0}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
}
