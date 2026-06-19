import { Zap, Lightbulb, HelpCircle, CheckCircle2, Clock, XCircle, BarChart2 } from "lucide-react";
import { DashboardLayout }  from "@/components/dashboard/DashboardLayout";
import { FeedbackTable }    from "@/components/dashboard/FeedbackTable";
import { ActionReport }     from "@/components/dashboard/ActionReport";
import { FeedbackClosure }  from "@/components/dashboard/FeedbackClosure";
import { StatusBadge }      from "@/components/ui/StatusBadge";
import { feedbackItems, pollRequests }    from "@/lib/data";

// ── Derived stats ─────────────────────────────────
const total        = feedbackItems.length;
const actionable   = feedbackItems.filter((f) => f.type === "Actionable").length;
const suggestions  = feedbackItems.filter((f) => f.type === "Suggestion").length;
const queries      = feedbackItems.filter((f) => f.type === "Query").length;
const openItems    = feedbackItems.filter((f) => f.status === "Open").length;
const inProgress   = feedbackItems.filter((f) => f.status === "In Progress").length;
const closedItems  = feedbackItems.filter((f) => f.status === "Closed").length;
const overdue      = feedbackItems.filter((f) => f.overdue).length;

const statCards = [
  { label: "Total Feedback",     value: total,       icon: BarChart2,    cls: "border-t-purple-500", iconCls: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"   },
  { label: "Actionable",         value: actionable,  icon: Zap,          cls: "border-t-orange-500", iconCls: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400"  },
  { label: "Suggestions",        value: suggestions, icon: Lightbulb,    cls: "border-t-blue-500",   iconCls: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"          },
  { label: "Queries",            value: queries,     icon: HelpCircle,   cls: "border-t-cyan-500",   iconCls: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400"          },
  { label: "Open",               value: openItems,   icon: Clock,        cls: "border-t-red-500",    iconCls: "bg-red-100 text-red-600 dark:bg-red-500/12 dark:text-red-400"              },
  { label: "In Progress",        value: inProgress,  icon: CheckCircle2, cls: "border-t-amber-500",  iconCls: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"     },
  { label: "Closed",             value: closedItems, icon: XCircle,      cls: "border-t-emerald-500",iconCls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"},
  { label: "Overdue",            value: overdue,     icon: Clock,        cls: "border-t-red-600",    iconCls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"              },
];

// ── Polls with no feedback received ──────────────
const pollIdsWithFeedback = new Set(feedbackItems.map((f) => f.pollId));
const pollsWithoutFeedback = pollRequests.filter(
  (p) => (p.status === "Active" || p.status === "Closed" || p.status === "Pending Closure") && !pollIdsWithFeedback.has(p.id)
);

// ── Department breakdown ──────────────────────────
const deptMap: Record<string, number> = {};
feedbackItems.forEach((f) => { deptMap[f.department] = (deptMap[f.department] ?? 0) + 1; });
const deptBreakdown = Object.entries(deptMap).sort((a, b) => b[1] - a[1]);

export default function FeedbackPage() {
  return (
    <DashboardLayout title="Feedback" subtitle={`${total} items across ${feedbackItems.map(f => f.pollId).filter((v,i,a) => a.indexOf(v) === i).length} polls`}>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
        {statCards.map(({ label, value, icon: Icon, cls, iconCls }) => (
          <div key={label} className={`glass rounded-xl p-4 border-t-2 ${cls}`}>
            <div className={`w-7 h-7 rounded-lg ${iconCls} flex items-center justify-center mb-3`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Type breakdown + Department breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Feedback by type visual */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Breakdown by Type</h2>
          <div className="space-y-3">
            {[
              { type: "Actionable" as const, count: actionable, total, color: "bg-orange-500", light: "bg-orange-100", textLight: "text-orange-700", textDark: "dark:text-orange-400" },
              { type: "Suggestion" as const, count: suggestions, total, color: "bg-blue-500", light: "bg-blue-100", textLight: "text-blue-700", textDark: "dark:text-blue-400" },
              { type: "Query"      as const, count: queries,    total, color: "bg-cyan-500",  light: "bg-cyan-100",  textLight: "text-cyan-700",  textDark: "dark:text-cyan-400"  },
            ].map(({ type, count, color, textLight, textDark }) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge value={type} />
                    </div>
                    <span className={`text-xs font-semibold ${textLight} ${textDark}`}>{count} · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border-divider)" }}>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">By Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Open",             count: openItems,   cls: "text-red-600 dark:text-red-400"      },
                { label: "In Progress",      count: inProgress,  cls: "text-amber-600 dark:text-amber-400"  },
                { label: "Closed",           count: closedItems, cls: "text-emerald-600 dark:text-emerald-400"},
                { label: "Query Replied",    count: feedbackItems.filter(f=>f.status==="Query Replied").length, cls: "text-cyan-600 dark:text-cyan-400" },
                { label: "No Action Req.",   count: feedbackItems.filter(f=>f.status==="No Action Required").length, cls: "text-slate-500" },
                { label: "Overdue",          count: overdue,     cls: "text-red-700 dark:text-red-400 font-semibold" },
              ].map(({ label, count, cls }) => (
                <div key={label} className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/3">
                  <span className="text-slate-600 dark:text-slate-400">{label}</span>
                  <span className={`font-semibold ${cls}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department breakdown */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Feedback by Department</h2>
          <div className="space-y-3">
            {deptBreakdown.map(([dept, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={dept} className="flex items-center gap-3 text-xs">
                  <span className="text-slate-600 dark:text-slate-400 w-20 flex-shrink-0">{dept}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-slate-500 w-6 text-right">{count}</span>
                  <span className="text-slate-400 w-8 text-right text-[10px]">{pct}%</span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border-divider)" }}>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Polls with No Feedback Received
              <span className="ml-2 text-[10px] font-normal text-red-500">{pollsWithoutFeedback.length} poll{pollsWithoutFeedback.length !== 1 ? "s" : ""}</span>
            </h3>
            {pollsWithoutFeedback.length === 0 ? (
              <p className="text-xs text-slate-400">All active/closed polls have feedback.</p>
            ) : (
              <div className="space-y-2">
                {pollsWithoutFeedback.map((poll) => (
                  <div key={poll.id} className="flex items-start justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <p className="text-slate-700 dark:text-slate-300 truncate max-w-[220px]">{poll.title}</p>
                      <p className="text-slate-400 text-[10px]">{poll.id} · {poll.requester} · {poll.department}</p>
                    </div>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex-shrink-0">{poll.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full feedback table */}
      <FeedbackTable />

      {/* Action report + Closure */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ActionReport />
        <FeedbackClosure />
      </div>

    </DashboardLayout>
  );
}
