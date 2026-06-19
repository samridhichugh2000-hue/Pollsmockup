"use client";
import { CalendarClock, CheckCircle2, Clock, AlertCircle, Zap, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PollCadence }     from "@/components/dashboard/PollCadence";
import { cadencePolls }    from "@/lib/data";

// ── Stats ─────────────────────────────────────────
const total       = cadencePolls.length;
const scheduled   = cadencePolls.filter((c) => c.status === "Scheduled").length;
const released    = cadencePolls.filter((c) => c.status === "Released").length;
const overdue     = cadencePolls.filter((c) => c.status === "Overdue").length;
const autoApprove = cadencePolls.filter((c) => c.autoApprove).length;

// ── Cadence type breakdown ────────────────────────
const cadenceMap: Record<string, number> = {};
cadencePolls.forEach((c) => { cadenceMap[c.cadence] = (cadenceMap[c.cadence] ?? 0) + 1; });

const cadenceDef = {
  Monthly:   { color: "bg-purple-500",  text: "text-purple-600 dark:text-purple-400",  badge: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300" },
  Quarterly: { color: "bg-blue-500",    text: "text-blue-600 dark:text-blue-400",      badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"       },
  "Bi-Annual":{ color: "bg-cyan-500",   text: "text-cyan-600 dark:text-cyan-400",      badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300"       },
  Annual:    { color: "bg-indigo-500",  text: "text-indigo-600 dark:text-indigo-400",  badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"},
};

const statusIcon = (s: string) => {
  if (s === "Released")  return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (s === "Overdue")   return <AlertCircle  className="w-4 h-4 text-red-500" />;
  if (s === "Scheduled") return <Clock        className="w-4 h-4 text-amber-500" />;
  return <Clock className="w-4 h-4 text-slate-400" />;
};

export default function CadencePage() {
  return (
    <DashboardLayout title="Poll Cadence" subtitle={`${total} scheduled polls · auto-approve ${autoApprove}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total Cadence Polls", value: total,       cls: "border-t-purple-500", iconCls: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",   Icon: CalendarClock },
          { label: "Scheduled",           value: scheduled,   cls: "border-t-amber-500",  iconCls: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",       Icon: Clock         },
          { label: "Released",            value: released,    cls: "border-t-emerald-500",iconCls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",Icon: CheckCircle2  },
          { label: "Overdue",             value: overdue,     cls: "border-t-red-500",    iconCls: "bg-red-100 text-red-600 dark:bg-red-500/12 dark:text-red-400",               Icon: AlertCircle   },
          { label: "Auto-Approve",        value: autoApprove, cls: "border-t-cyan-500",   iconCls: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",           Icon: Zap           },
        ].map(({ label, value, cls, iconCls, Icon }) => (
          <div
            key={label}
            className={`glass rounded-xl p-4 border-t-2 ${cls} cursor-pointer hover:opacity-75 transition-opacity`}
            onClick={() => document.getElementById("cadence-table")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className={`w-7 h-7 rounded-lg ${iconCls} flex items-center justify-center mb-3`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Cadence type breakdown + upcoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Type breakdown */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">By Cadence Type</h2>
          <div className="space-y-3">
            {Object.entries(cadenceDef).map(([type, def]) => {
              const count = cadenceMap[type] ?? 0;
              const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${def.badge}`}>{type}</span>
                    <span className={`font-semibold ${def.text}`}>{count} polls · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className={`h-full rounded-full ${def.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 grid grid-cols-2 gap-2" style={{ borderTop: "1px solid var(--border-divider)" }}>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3 h-3 text-cyan-500" />
                <p className="text-[10px] text-slate-500">Auto-Approve</p>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{autoApprove}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3 text-purple-500" />
                <p className="text-[10px] text-slate-500">Total Audience</p>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                {cadencePolls.reduce((sum, c) => sum + c.audience, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming releases */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Upcoming Releases</h2>
          <div className="space-y-2">
            {cadencePolls
              .filter((c) => c.status === "Scheduled")
              .sort((a, b) => a.nextRelease.localeCompare(b.nextRelease))
              .map((poll) => {
                const def = cadenceDef[poll.cadence];
                return (
                  <div
                    key={poll.id}
                    className="flex items-center justify-between p-3 rounded-xl
                      bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-300 truncate">{poll.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${def.badge}`}>{poll.cadence}</span>
                        <span className="text-[10px] text-slate-500">{poll.owner}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-3 flex-shrink-0">
                      <div className="flex items-center gap-1">{statusIcon(poll.status)}</div>
                      <span className="text-[10px] text-slate-500 mt-0.5">{poll.nextRelease}</span>
                    </div>
                  </div>
                );
              })}

            {cadencePolls.filter((c) => c.status === "Overdue").length > 0 && (
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border-divider)" }}>
                <p className="text-[10px] text-red-500 font-semibold mb-2">Overdue</p>
                {cadencePolls.filter((c) => c.status === "Overdue").map((poll) => (
                  <div key={poll.id} className="flex items-center justify-between p-3 rounded-xl
                    bg-red-50 dark:bg-red-500/8 border border-red-200 dark:border-red-500/20 mb-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-300 truncate">{poll.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{poll.owner}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] text-red-500 font-semibold">{poll.nextRelease}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full cadence table */}
      <section id="cadence-table"><PollCadence /></section>

    </DashboardLayout>
  );
}
