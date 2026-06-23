"use client";
import { pollRequests } from "@/lib/data";

const STAGES = ["Draft", "Awaiting Approval", "Active", "Pending Closure", "Closed"] as const;
type Stage = typeof STAGES[number];

const stageColor: Record<Stage, { active: string; dot: string; text: string }> = {
  "Draft":             { active: "bg-slate-400",   dot: "bg-slate-400",   text: "text-slate-500"  },
  "Awaiting Approval": { active: "bg-amber-400",   dot: "bg-amber-400",   text: "text-amber-600"  },
  "Active":            { active: "bg-emerald-500", dot: "bg-emerald-500", text: "text-emerald-600" },
  "Pending Closure":   { active: "bg-orange-400",  dot: "bg-orange-400",  text: "text-orange-600" },
  "Closed":            { active: "bg-blue-500",    dot: "bg-blue-500",    text: "text-blue-600"   },
};

// Map Acknowledged → Awaiting Approval for display
function normalise(status: string): Stage {
  if (status === "Acknowledged") return "Awaiting Approval";
  if (STAGES.includes(status as Stage)) return status as Stage;
  return "Draft";
}

export function PollLifecycle() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Lifecycle Tracker</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Current stage for each poll — {pollRequests.length} polls this quarter</p>
        </div>
        {/* Stage legend */}
        <div className="hidden lg:flex items-center gap-3">
          {STAGES.map((s) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${stageColor[s].dot}`} />
              <span className="text-[9px] text-slate-500">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Poll rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {pollRequests.map((poll) => {
          const current = normalise(poll.status);
          const currentIdx = STAGES.indexOf(current);

          return (
            <div key={poll.id} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
              {/* Poll info */}
              <div className="w-[220px] flex-shrink-0">
                <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400">{poll.id}</p>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[210px]">{poll.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{poll.requester} · {poll.department}</p>
              </div>

              {/* Lifecycle stepper */}
              <div className="flex-1 flex items-center">
                {STAGES.map((stage, idx) => {
                  const isDone    = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  const col       = stageColor[stage];

                  return (
                    <div key={stage} className="flex items-center flex-1 last:flex-none">
                      {/* Step node */}
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all
                            ${isCurrent
                              ? `${col.active} ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-800 ring-current`
                              : isDone
                                ? `${col.active} opacity-70`
                                : "bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                            }`}
                          style={isCurrent ? { ringColor: col.active } : {}}
                        >
                          {isDone ? (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : isCurrent ? (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-500" />
                          )}
                        </div>
                        <span
                          className={`text-[8px] leading-tight text-center w-14 ${
                            isCurrent
                              ? `font-semibold ${col.text}`
                              : isDone
                                ? "text-slate-400"
                                : "text-slate-300 dark:text-slate-600"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>

                      {/* Connector line */}
                      {idx < STAGES.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 rounded-full ${idx < currentIdx ? col.active + " opacity-60" : "bg-slate-150 dark:bg-slate-700"}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Current stage badge */}
              <div className="flex-shrink-0 w-[110px] text-right">
                <span className={`inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full
                  ${current === "Active"            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" :
                    current === "Awaiting Approval" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" :
                    current === "Closed"            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" :
                    current === "Pending Closure"   ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400" :
                                                      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"}`}>
                  {current}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
