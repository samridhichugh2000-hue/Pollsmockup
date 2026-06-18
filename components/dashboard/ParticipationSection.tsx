"use client";
import { useState } from "react";
import { employees, pollTitleMap } from "@/lib/data";

// ── Tooltip on hover ──────────────────────────────
function PollCountCell({ pollIds }: { pollIds: string[] }) {
  const [open, setOpen] = useState(false);

  if (pollIds.length === 0) {
    return <span className="text-slate-400 dark:text-slate-600">0</span>;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors
        bg-purple-100 text-purple-700 border border-purple-200
        dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30
        hover:bg-purple-200 dark:hover:bg-purple-500/30">
        {pollIds.length}
      </span>

      {open && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl p-3 text-xs shadow-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
        >
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Participated in {pollIds.length} poll{pollIds.length > 1 ? "s" : ""}
          </p>
          <div className="space-y-1.5">
            {pollIds.map((id) => (
              <div key={id} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-800 dark:text-slate-200 leading-tight font-medium">{pollTitleMap[id] ?? id}</p>
                  <p className="text-slate-500 text-[10px]">{id}</p>
                </div>
              </div>
            ))}
          </div>
          {/* caret */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid var(--border-card)" }}
          />
        </div>
      )}
    </div>
  );
}

// ── Department badge ─────────────────────────────
function DeptBadge({ dept }: { dept: string }) {
  const colors: Record<string, string> = {
    "HR":      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/12 dark:text-purple-300 dark:border-purple-500/25",
    "IT":      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/12 dark:text-blue-300 dark:border-blue-500/25",
    "L&D":     "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/12 dark:text-cyan-300 dark:border-cyan-500/25",
    "Finance": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/12 dark:text-emerald-300 dark:border-emerald-500/25",
    "Sales":   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/12 dark:text-amber-300 dark:border-amber-500/25",
    "Ops":     "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/12 dark:text-orange-300 dark:border-orange-500/25",
    "Admin":   "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/12 dark:text-slate-300 dark:border-slate-500/25",
    "Safety":  "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/12 dark:text-red-300 dark:border-red-500/25",
  };
  const cls = colors[dept] ?? colors["Admin"];
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${cls}`}>
      {dept}
    </span>
  );
}

// ── Main component ───────────────────────────────
export function ParticipationSection() {
  const totalVoters     = employees.filter((e) => e.participatedIn.length > 0).length;
  const neverVoted      = employees.filter((e) => e.participatedIn.length === 0).length;
  const activeVoters    = employees.filter((e) => e.participatedIn.length >= 2).length;

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Audience &amp; Participation</h2>
        <p className="text-xs text-slate-500 mt-0.5">All employees · hover on poll count to see details</p>
      </div>

      {/* Summary KPIs */}
      <div className="px-5 pt-4 pb-2 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl text-center border
          bg-purple-50 border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/20">
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalVoters}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Total Voters</p>
          <p className="text-[9px] text-slate-400">(voted in ≥1 poll)</p>
        </div>
        <div className="p-3 rounded-xl text-center border
          bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{neverVoted}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Never Voted</p>
          <p className="text-[9px] text-slate-400">(0 polls)</p>
        </div>
        <div className="p-3 rounded-xl text-center border
          bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeVoters}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Active Voters</p>
          <p className="text-[9px] text-slate-400">(voted in ≥2 polls)</p>
        </div>
      </div>

      {/* Employee table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Employee</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Department</th>
              <th className="px-5 py-3 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Polls Participated
                <span className="ml-1 text-[9px] text-slate-400 normal-case font-normal">(hover for details)</span>
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const pct = Math.round((emp.participatedIn.length / 10) * 100);
              return (
                <tr
                  key={emp.id}
                  className="trow"
                  style={{ borderTop: "1px solid var(--border-divider)" }}
                >
                  {/* Name + avatar */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0">
                        {emp.initials}
                      </div>
                      <span className="text-slate-800 dark:text-slate-300 font-medium">{emp.name}</span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-5 py-3 hidden md:table-cell">
                    <DeptBadge dept={emp.department} />
                  </td>

                  {/* Poll count with tooltip */}
                  <td className="px-5 py-3 text-center">
                    <PollCountCell pollIds={emp.participatedIn} />
                  </td>

                  {/* Progress bar */}
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-white/8">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct >= 70 ? "bg-emerald-500" :
                            pct >= 30 ? "bg-amber-500"   :
                            pct > 0   ? "bg-orange-500"  :
                            "bg-slate-300 dark:bg-slate-600"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 w-7">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
