"use client";

const counters = [
  { label: "Action Taken",    value: 11, light: "bg-emerald-50 border-emerald-200 text-emerald-700", dark: "dark:bg-emerald-500/8 dark:border-emerald-500/20 dark:text-emerald-400", scrollTo: null },
  { label: "Policy Improved", value: 4,  light: "bg-blue-50 border-blue-200 text-blue-700",         dark: "dark:bg-blue-500/8 dark:border-blue-500/20 dark:text-blue-400",         scrollTo: null },
  { label: "Query Replied",   value: 8,  light: "bg-cyan-50 border-cyan-200 text-cyan-700",         dark: "dark:bg-cyan-500/8 dark:border-cyan-500/20 dark:text-cyan-400",         scrollTo: null },
  { label: "No Action Req.",  value: 6,  light: "bg-slate-100 border-slate-200 text-slate-600",     dark: "dark:bg-slate-500/8 dark:border-slate-500/20 dark:text-slate-400",      scrollTo: null },
  { label: "Pending Review",  value: 23, light: "bg-amber-50 border-amber-200 text-amber-700",      dark: "dark:bg-amber-500/8 dark:border-amber-500/20 dark:text-amber-400",      scrollTo: "feedback-pending" },
  { label: "Total Items",     value: 34, light: "bg-purple-50 border-purple-200 text-purple-700",   dark: "dark:bg-purple-500/8 dark:border-purple-500/20 dark:text-purple-400",   scrollTo: null },
];

const recentActions = [
  { summary: "Mental health support program launched",           poll: "POLL-2026-001", date: "15 May 26", dot: "bg-emerald-500" },
  { summary: "WFH policy updated — Section 3.2 revised",        poll: "POLL-2026-002", date: "01 May 26", dot: "bg-blue-500"    },
  { summary: "Performance review comms — pending HR sign-off",  poll: "POLL-2026-004", date: "Due 10 Jun", dot: "bg-amber-500"  },
  { summary: "Safety induction module updated with new protocol",poll: "POLL-2026-003", date: "20 Apr 26", dot: "bg-emerald-500" },
];

export function ActionReport() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="glass rounded-xl overflow-hidden h-full">
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Report on Action Taken &amp; Policy Improvement</h2>
        <p className="text-xs text-slate-500 mt-0.5">Based on closed polls Q1–Q2 2026</p>
      </div>

      <div className="p-4 grid grid-cols-3 gap-2.5">
        {counters.map((c) => (
          <div
            key={c.label}
            onClick={c.scrollTo ? () => scrollTo(c.scrollTo!) : undefined}
            className={`p-3 rounded-xl border text-center cursor-pointer hover:opacity-75 transition-opacity ${c.light} ${c.dark}`}
          >
            <p className="text-xl font-bold">{c.value}</p>
            <p className="text-[10px] mt-0.5 opacity-80 leading-tight">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 space-y-2.5">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Recent Actions</p>
        {recentActions.map((a, i) => (
          <div key={i} className="flex items-start gap-3 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 flex-shrink-0`} />
            <div className="min-w-0">
              <p className="text-slate-800 dark:text-slate-300 leading-snug">{a.summary}</p>
              <p className="text-slate-400 dark:text-slate-600 mt-0.5">{a.poll} · {a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
