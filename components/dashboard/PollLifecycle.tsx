"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { pollRequests } from "@/lib/data";

const STAGES = ["Draft", "Not Sent for Approval", "Awaiting Approval", "Active", "Pending Closure", "Closed"] as const;
type Stage = typeof STAGES[number];

const stageConfig: Record<Stage, { bg: string; ring: string; text: string; fill: string; badge: string }> = {
  "Draft":                  { bg: "bg-slate-300 dark:bg-slate-500",  ring: "ring-slate-300",   text: "text-slate-400",   fill: "bg-slate-300",   badge: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"           },
  "Not Sent for Approval":  { bg: "bg-rose-400",                     ring: "ring-rose-300",    text: "text-rose-600",    fill: "bg-rose-400",    badge: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"            },
  "Awaiting Approval":      { bg: "bg-amber-400",                    ring: "ring-amber-300",   text: "text-amber-600",   fill: "bg-amber-400",   badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"        },
  "Active":                 { bg: "bg-emerald-500",                  ring: "ring-emerald-300", text: "text-emerald-600", fill: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" },
  "Pending Closure":        { bg: "bg-orange-400",                   ring: "ring-orange-300",  text: "text-orange-600",  fill: "bg-orange-400",  badge: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"    },
  "Closed":                 { bg: "bg-blue-500",                     ring: "ring-blue-300",    text: "text-blue-600",    fill: "bg-blue-500",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"            },
};

function normalise(status: string): Stage {
  if (status === "Acknowledged") return "Awaiting Approval";
  if (status === "Draft") {
    // polls that are Draft but were never submitted show as "Not Sent for Approval"
    return "Not Sent for Approval";
  }
  if (STAGES.includes(status as Stage)) return status as Stage;
  return "Draft";
}

function Stepper({ current }: { current: Stage }) {
  const idx = STAGES.indexOf(current);
  return (
    <div className="flex items-center w-full">
      {STAGES.map((stage, i) => {
        const done    = i < idx;
        const active  = i === idx;
        const cfg     = stageConfig[stage];
        return (
          <div key={stage} className="flex items-center flex-1 last:flex-none min-w-0">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              {/* Circle */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all
                ${active  ? `${cfg.bg} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ${cfg.ring}` :
                  done    ? `${cfg.bg} opacity-80` :
                            "bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600"}`}>
                {done ? (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500" />
                )}
              </div>
              {/* Label */}
              <span className={`text-[7.5px] leading-tight text-center w-14 whitespace-normal
                ${active ? `font-bold ${cfg.text}` : done ? "text-slate-400 dark:text-slate-500" : "text-slate-300 dark:text-slate-600"}`}>
                {stage}
              </span>
            </div>
            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-[3px] mx-1 rounded-full transition-all
                ${i < idx ? `${stageConfig[STAGES[i]].fill} opacity-70` : "bg-slate-150 dark:bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PollLifecycle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">

      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Stage dots preview */}
          <div className="flex items-center gap-1">
            {STAGES.map((s) => (
              <span key={s} className={`w-2.5 h-2.5 rounded-full ${stageConfig[s].bg}`} />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Lifecycle Tracker</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {pollRequests.length} polls · click to {open ? "collapse" : "expand"} lifecycle view
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Summary counts */}
          <div className="hidden sm:flex items-center gap-2">
            {STAGES.map((s) => {
              const count = pollRequests.filter((p) => normalise(p.status) === s).length;
              if (!count) return null;
              return (
                <span key={s} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${stageConfig[s].badge}`}>
                  {s}: {count}
                </span>
              );
            })}
          </div>
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
            {open
              ? <ChevronUp  className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </div>
        </div>
      </button>

      {/* Expandable content */}
      {open && (
        <div style={{ borderTop: "1px solid var(--border-divider)" }}>
          {/* Column headers */}
          <div className="px-5 py-2 flex items-center gap-4 bg-slate-50 dark:bg-white/2">
            <span className="w-[200px] flex-shrink-0 text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Poll</span>
            <span className="flex-1 text-[9px] font-semibold text-slate-400 uppercase tracking-wider pl-2">Lifecycle Progress</span>
            <span className="w-[120px] flex-shrink-0 text-[9px] font-semibold text-slate-400 uppercase tracking-wider text-right">Current Stage</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {pollRequests.map((poll) => {
              const current = normalise(poll.status);
              const cfg = stageConfig[current];
              return (
                <div
                  key={poll.id}
                  className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/70 dark:hover:bg-white/2 transition-colors group"
                >
                  {/* Poll info */}
                  <div className="w-[200px] flex-shrink-0">
                    <p className="text-[9px] font-mono text-purple-500 dark:text-purple-400 tracking-wide">{poll.id}</p>
                    <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-snug mt-0.5 truncate max-w-[195px] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{poll.title}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{poll.requester} · {poll.department}</p>
                  </div>

                  {/* Stepper */}
                  <div className="flex-1 px-2">
                    <Stepper current={current} />
                  </div>

                  {/* Badge */}
                  <div className="w-[120px] flex-shrink-0 flex justify-end">
                    <span className={`text-[9px] font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                      {current}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
