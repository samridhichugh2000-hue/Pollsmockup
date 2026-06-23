import { Mail, Link2, Clock, CheckCircle2, XCircle, FileText, Send } from "lucide-react";
import { DashboardLayout }   from "@/components/dashboard/DashboardLayout";
import { PollRequestsTable } from "@/components/dashboard/PollRequestsTable";
import { PollLifecycle }     from "@/components/dashboard/PollLifecycle";
import { StatusBadge }       from "@/components/ui/StatusBadge";
import { pollRequests, FORM_LINK } from "@/lib/data";

// ── Derived stats ─────────────────────────────────
const total          = pollRequests.length;
const fromMailbox    = pollRequests.filter((r) => r.source === "Mailbox").length;
const fromForm       = pollRequests.filter((r) => r.source === "Form").length;
const awaiting       = pollRequests.filter((r) => r.status === "Awaiting Approval" || r.status === "Acknowledged").length;
const active         = pollRequests.filter((r) => r.status === "Active").length;
const closed         = pollRequests.filter((r) => r.status === "Closed").length;
const draft          = pollRequests.filter((r) => r.status === "Draft").length;
const pendingClosure = pollRequests.filter((r) => r.status === "Pending Closure").length;

// ── Lifecycle stage counts ─────────────────────────
const lifecycleStages = [
  { label: "Draft",                 count: draft,          dot: "bg-slate-400",   bar: "bg-slate-400",   text: "text-slate-600 dark:text-slate-400"   },
  { label: "Not Sent for Approval", count: draft,          dot: "bg-rose-400",    bar: "bg-rose-400",    text: "text-rose-600 dark:text-rose-400"     },
  { label: "Awaiting Approval",     count: awaiting,       dot: "bg-amber-400",   bar: "bg-amber-400",   text: "text-amber-600 dark:text-amber-400"   },
  { label: "Active",                count: active,         dot: "bg-emerald-500", bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400"},
  { label: "Pending Closure",       count: pendingClosure, dot: "bg-orange-400",  bar: "bg-orange-400",  text: "text-orange-600 dark:text-orange-400" },
  { label: "Closed",                count: closed,         dot: "bg-blue-500",    bar: "bg-blue-500",    text: "text-blue-600 dark:text-blue-400"     },
];

const statCards = [
  { label: "Total Requests",        value: total,       icon: FileText,     cls: "border-t-purple-500",  iconCls: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"  },
  { label: "From Mailbox",          value: fromMailbox, icon: Mail,         cls: "border-t-blue-500",    iconCls: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"          },
  { label: "From Form",             value: fromForm,    icon: Link2,        cls: "border-t-emerald-500", iconCls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"},
  { label: "Not Sent for Approval", value: draft,       icon: Send,         cls: "border-t-slate-400",   iconCls: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400"      },
  { label: "Awaiting Approval",     value: awaiting,    icon: Clock,        cls: "border-t-amber-500",   iconCls: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"      },
  { label: "Active",                value: active,      icon: CheckCircle2, cls: "border-t-cyan-500",    iconCls: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400"          },
  { label: "Closed",                value: closed,      icon: XCircle,      cls: "border-t-red-400",     iconCls: "bg-red-100 text-red-600 dark:bg-red-500/12 dark:text-red-400"              },
];

// ── Status breakdown per source ───────────────────
const breakdown = (["Mailbox", "Form"] as const).map((src) => {
  const items = pollRequests.filter((r) => r.source === src);
  return {
    source: src,
    items,
    counts: {
      Active:           items.filter((r) => r.status === "Active").length,
      "Awaiting Approval": items.filter((r) => r.status === "Awaiting Approval").length,
      Draft:            items.filter((r) => r.status === "Draft").length,
      Closed:           items.filter((r) => r.status === "Closed").length,
    },
  };
});

export default function PollRequestsPage() {
  return (
    <DashboardLayout title="Poll Requests" subtitle={`${total} requests received · Q2 2026`}>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
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

      {/* Lifecycle stage summary */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Polls by Lifecycle Stage</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {lifecycleStages.map(({ label, count, dot, bar, text }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">{label}</span>
                </div>
                <span className={`text-sm font-bold ${text}`}>{count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/8">
                <div
                  className={`h-full rounded-full ${bar} transition-all`}
                  style={{ width: total > 0 ? `${Math.round((count / total) * 100)}%` : "0%" }}
                />
              </div>
              <span className="text-[8px] text-slate-400">{total > 0 ? Math.round((count / total) * 100) : 0}% of total</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {breakdown.map(({ source, items, counts }) => (
          <div key={source} className="glass rounded-xl overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border-divider)" }}>
              {source === "Mailbox"
                ? <Mail className="w-4 h-4 text-blue-500" />
                : <Link2 className="w-4 h-4 text-emerald-500" />}
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {source === "Form" ? "Shareable Form Requests" : "Mailbox Requests"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{items.length} requests via {source === "Form" ? "the generated form link" : "email / mailbox"}</p>
              </div>
            </div>

            {source === "Form" && (
              <div className="px-5 py-3 text-xs" style={{ borderBottom: "1px solid var(--border-divider)", background: "rgba(16,185,129,0.04)" }}>
                <p className="text-slate-500 mb-1">Form link</p>
                <p className="font-mono text-emerald-700 dark:text-emerald-400 break-all">{FORM_LINK}</p>
              </div>
            )}

            <div className="p-4 grid grid-cols-4 gap-2">
              {Object.entries(counts).map(([status, count]) => (
                <div key={status} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{count}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{status}</p>
                </div>
              ))}
            </div>

            <div className="px-4 pb-4 space-y-1.5">
              {items.slice(0, 5).map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between text-xs py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/3 transition-colors"
                  style={{ borderBottom: "1px solid var(--border-divider)" }}
                >
                  <div className="min-w-0">
                    <span className="font-mono text-purple-600 dark:text-purple-400 text-[10px]">{req.id}</span>
                    <p className="text-slate-700 dark:text-slate-300 truncate max-w-[180px]">{req.title}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-slate-400 text-[10px] hidden sm:inline">{req.requester}</span>
                    <StatusBadge value={req.status} />
                  </div>
                </div>
              ))}
              {items.length > 5 && (
                <p className="text-[10px] text-slate-400 text-center pt-1">+{items.length - 5} more requests</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Poll Lifecycle Tracker */}
      <section aria-label="Poll Lifecycle"><PollLifecycle /></section>

      {/* Full table */}
      <PollRequestsTable showBanner />

    </DashboardLayout>
  );
}
