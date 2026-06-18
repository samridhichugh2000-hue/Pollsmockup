import { CalendarClock, CheckCircle2, AlertCircle, Clock, FileEdit, Play, RefreshCw } from "lucide-react";
import { cadencePolls, type CadenceType, type CadenceStatus } from "@/lib/data";

const cadenceColor: Record<CadenceType, string> = {
  "Monthly":   "bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-500/12 dark:border-cyan-500/25 dark:text-cyan-300",
  "Quarterly": "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-500/12 dark:border-purple-500/25 dark:text-purple-300",
  "Bi-Annual": "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/12 dark:border-indigo-500/25 dark:text-indigo-300",
  "Annual":    "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/12 dark:border-amber-500/25 dark:text-amber-300",
};

const statusConfig: Record<CadenceStatus, { icon: typeof CheckCircle2; text: string; cls: string }> = {
  "Scheduled": { icon: Clock,         text: "Scheduled", cls: "text-blue-600 dark:text-blue-400"   },
  "Released":  { icon: CheckCircle2,  text: "Released",  cls: "text-emerald-600 dark:text-emerald-400" },
  "Overdue":   { icon: AlertCircle,   text: "Overdue",   cls: "text-red-600 dark:text-red-400"     },
  "Draft":     { icon: FileEdit,      text: "Draft",     cls: "text-slate-500 dark:text-slate-400" },
};

const scheduled = cadencePolls.filter((p) => p.status !== "Draft").length;
const overdue   = cadencePolls.filter((p) => p.status === "Overdue").length;

export function PollCadence() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-divider)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-500/15">
            <CalendarClock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Cadence</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pre-approved recurring polls · {scheduled} scheduled · {overdue > 0 && <span className="text-red-500">{overdue} overdue</span>}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
          bg-purple-100 border border-purple-200 text-purple-700 hover:bg-purple-200
          dark:bg-purple-500/15 dark:border-purple-500/30 dark:text-purple-300 dark:hover:bg-purple-500/25">
          <Play className="w-3 h-3" /> Add Cadence Poll
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Poll Name</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cadence</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Next Release</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Last Released</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Owner</th>
              <th className="px-5 py-3 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Auto-Approve</th>
              <th className="px-5 py-3 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">Audience</th>
            </tr>
          </thead>
          <tbody>
            {cadencePolls.map((poll) => {
              const sc = statusConfig[poll.status];
              const StatusIcon = sc.icon;
              return (
                <tr
                  key={poll.id}
                  className="trow cursor-pointer"
                  style={{ borderTop: "1px solid var(--border-divider)" }}
                >
                  <td className="px-5 py-3">
                    <p className="text-slate-800 dark:text-slate-300 font-medium max-w-[200px] truncate">{poll.title}</p>
                    <p className="text-slate-400 dark:text-slate-600 text-[10px] font-mono">{poll.id}</p>
                  </td>

                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cadenceColor[poll.cadence]}`}>
                      <RefreshCw className="w-2.5 h-2.5" />
                      {poll.cadence}
                    </span>
                  </td>

                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium ${poll.status === "Overdue" ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}>
                      {poll.nextRelease}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-slate-500 dark:text-slate-500 hidden md:table-cell">
                    {poll.lastReleased ?? <span className="text-slate-400 dark:text-slate-600">—</span>}
                  </td>

                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${sc.cls}`}>
                      <StatusIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      {sc.text}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-slate-600 dark:text-slate-400 hidden lg:table-cell">{poll.owner}</td>

                  <td className="px-5 py-3 text-center hidden lg:table-cell">
                    {poll.autoApprove
                      ? <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">Auto</span>
                      : <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 px-2 py-0.5 rounded-full">Manual</span>
                    }
                  </td>

                  <td className="px-5 py-3 text-center text-slate-600 dark:text-slate-400 hidden xl:table-cell">{poll.audience}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer legend */}
      <div
        className="px-5 py-3 flex flex-wrap gap-4"
        style={{ borderTop: "1px solid var(--border-divider)" }}
      >
        {(Object.entries(statusConfig) as [CadenceStatus, typeof statusConfig[CadenceStatus]][]).map(([key, val]) => {
          const Icon = val.icon;
          return (
            <span key={key} className={`flex items-center gap-1.5 text-[10px] ${val.cls}`}>
              <Icon className="w-3 h-3" />{val.text}
            </span>
          );
        })}
        <span className="ml-auto text-[10px] text-slate-400">
          Auto-approve skips manual sign-off and releases on schedule
        </span>
      </div>
    </div>
  );
}
