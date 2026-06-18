import { BarChart2, TrendingUp, Users, MessageSquare, CheckCircle2, Clock, Download, Zap } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { pollRequests, feedbackItems, employees, cadencePolls } from "@/lib/data";

// ── Aggregate stats ────────────────────────────────
const totalPolls     = pollRequests.length;
const activePolls    = pollRequests.filter((p) => p.status === "Active").length;
const closedPolls    = pollRequests.filter((p) => p.status === "Closed").length;
const totalFeedback  = feedbackItems.length;
const actionable     = feedbackItems.filter((f) => f.type === "Actionable").length;
const closedFeedback = feedbackItems.filter((f) => f.status === "Closed").length;
const totalVoters    = employees.filter((e) => e.participatedIn.length > 0).length;
const neverVoted     = employees.filter((e) => e.participatedIn.length === 0).length;
const participationRate = Math.round((totalVoters / employees.length) * 100);

// ── Poll activity by month (mock) ─────────────────
const monthlyActivity = [
  { month: "Jan", polls: 3, feedback: 12 },
  { month: "Feb", polls: 2, feedback: 8  },
  { month: "Mar", polls: 4, feedback: 18 },
  { month: "Apr", polls: 1, feedback: 5  },
  { month: "May", polls: 3, feedback: 15 },
  { month: "Jun", polls: 2, feedback: 10 },
];
const maxPolls    = Math.max(...monthlyActivity.map((m) => m.polls));
const maxFeedback = Math.max(...monthlyActivity.map((m) => m.feedback));

// ── Department poll coverage ───────────────────────
const deptCoverage: Record<string, Set<string>> = {};
pollRequests.forEach((p) => {
  if (!deptCoverage[p.department]) deptCoverage[p.department] = new Set();
  deptCoverage[p.department].add(p.id);
});
const deptRows = Object.entries(deptCoverage)
  .map(([dept, ids]) => ({ dept, count: ids.size }))
  .sort((a, b) => b.count - a.count);

// ── Owner workload ─────────────────────────────────
const ownerMap: Record<string, { total: number; open: number }> = {};
feedbackItems.forEach((f) => {
  if (!ownerMap[f.owner]) ownerMap[f.owner] = { total: 0, open: 0 };
  ownerMap[f.owner].total += 1;
  if (f.status === "Open" || f.status === "In Progress") ownerMap[f.owner].open += 1;
});
const ownerRows = Object.entries(ownerMap)
  .map(([owner, d]) => ({ owner, ...d }))
  .sort((a, b) => b.total - a.total);

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports" subtitle="Q2 2026 · Analytics Overview">

      {/* Top metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Polls",        value: totalPolls,         cls: "border-t-purple-500", iconCls: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",   Icon: BarChart2     },
          { label: "Total Feedback",     value: totalFeedback,      cls: "border-t-blue-500",   iconCls: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",           Icon: MessageSquare },
          { label: "Participation Rate", value: `${participationRate}%`,cls:"border-t-cyan-500",iconCls: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",           Icon: Users         },
          { label: "Actionable Items",   value: actionable,         cls: "border-t-orange-500", iconCls: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",   Icon: Zap           },
        ].map(({ label, value, cls, iconCls, Icon }) => (
          <div key={label} className={`glass rounded-xl p-4 border-t-2 ${cls}`}>
            <div className={`w-7 h-7 rounded-lg ${iconCls} flex items-center justify-center mb-3`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Monthly activity chart */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Monthly Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">Poll launches and feedback received per month</p>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-purple-500" /><span className="text-slate-500">Polls</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-400" /><span className="text-slate-500">Feedback</span></div>
          </div>
        </div>
        <div className="flex items-end gap-3 h-32">
          {monthlyActivity.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-1" style={{ height: "96px" }}>
                <div
                  className="w-5 rounded-t bg-purple-500 opacity-90"
                  style={{ height: `${(m.polls / maxPolls) * 90}%` }}
                  title={`${m.polls} polls`}
                />
                <div
                  className="w-5 rounded-t bg-blue-400 opacity-80"
                  style={{ height: `${(m.feedback / maxFeedback) * 90}%` }}
                  title={`${m.feedback} feedback`}
                />
              </div>
              <span className="text-[10px] text-slate-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns: department coverage + owner workload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Department coverage */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Polls by Department</h2>
          <div className="space-y-3">
            {deptRows.map(({ dept, count }) => {
              const pct = Math.round((count / totalPolls) * 100);
              return (
                <div key={dept}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{dept}</span>
                    <span className="text-slate-500">{count} polls · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Owner workload */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Feedback Owner Workload</h2>
          <div className="space-y-2">
            {ownerRows.map(({ owner, total, open }) => (
              <div key={owner} className="flex items-center justify-between text-xs px-3 py-2.5 rounded-xl
                bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                    {owner.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{owner}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{total} total</span>
                  {open > 0 ? (
                    <span className="font-semibold text-amber-600 dark:text-amber-400">{open} open</span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> done
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-divider)" }}>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Quarter Summary</h2>
            <p className="text-xs text-slate-500 mt-0.5">Q2 2026 at a glance</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
            bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100
            dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400 dark:hover:bg-purple-500/15">
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
                {["Metric", "Value", "Target", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: "Polls Launched",       value: totalPolls,          target: 12,   status: totalPolls >= 12 ? "On Track" : "Behind"   },
                { metric: "Polls Closed",          value: closedPolls,         target: 8,    status: closedPolls >= 8 ? "On Track" : "Behind"    },
                { metric: "Active Polls",          value: activePolls,         target: 5,    status: "Active"                                   },
                { metric: "Feedback Received",     value: totalFeedback,       target: 50,   status: totalFeedback >= 50 ? "Exceeded" : "Behind" },
                { metric: "Feedback Closed",       value: closedFeedback,      target: 8,    status: closedFeedback >= 8 ? "On Track" : "Behind" },
                { metric: "Participation Rate",    value: `${participationRate}%`, target: "70%", status: participationRate >= 70 ? "On Track" : "Below Target" },
                { metric: "Never Voted",           value: neverVoted,          target: "<5", status: neverVoted < 5 ? "Good" : "Action Needed"  },
                { metric: "Cadence Polls Running", value: cadencePolls.length, target: 6,    status: cadencePolls.length >= 6 ? "On Track" : "Behind" },
              ].map(({ metric, value, target, status }) => {
                const isGood = status === "On Track" || status === "Exceeded" || status === "Good" || status === "Active";
                const statusCls = isGood
                  ? "text-emerald-600 dark:text-emerald-400"
                  : status === "Below Target" || status === "Action Needed"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400";
                return (
                  <tr key={metric} className="trow" style={{ borderBottom: "1px solid var(--border-divider)" }}>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-300 font-medium">{metric}</td>
                    <td className="px-5 py-3 text-slate-900 dark:text-slate-100 font-bold">{value}</td>
                    <td className="px-5 py-3 text-slate-500">{target}</td>
                    <td className={`px-5 py-3 font-semibold ${statusCls}`}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </DashboardLayout>
  );
}
