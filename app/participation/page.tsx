import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import { DashboardLayout }      from "@/components/dashboard/DashboardLayout";
import { ParticipationSection } from "@/components/dashboard/ParticipationSection";
import { employees, pollRequests } from "@/lib/data";

// ── Stats ─────────────────────────────────────────
const totalEmployees  = employees.length;
const totalVoters     = employees.filter((e) => e.participatedIn.length > 0).length;
const neverVoted      = employees.filter((e) => e.participatedIn.length === 0).length;
const activeVoters    = employees.filter((e) => e.participatedIn.length >= 2).length;
const avgParticipation = Math.round((totalVoters / totalEmployees) * 100);

// ── Department breakdown ──────────────────────────
const deptMap: Record<string, { total: number; voted: number }> = {};
employees.forEach((e) => {
  if (!deptMap[e.department]) deptMap[e.department] = { total: 0, voted: 0 };
  deptMap[e.department].total += 1;
  if (e.participatedIn.length > 0) deptMap[e.department].voted += 1;
});

const deptRows = Object.entries(deptMap)
  .map(([dept, { total, voted }]) => ({ dept, total, voted, pct: Math.round((voted / total) * 100) }))
  .sort((a, b) => b.pct - a.pct);

// ── Poll-wise participation ───────────────────────
const pollParticipation = pollRequests.slice(0, 8).map((poll) => ({
  id: poll.id,
  title: poll.title,
  voters: employees.filter((e) => e.participatedIn.includes(poll.id)).length,
  status: poll.status,
}));

const barColor = (pct: number) =>
  pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : pct >= 40 ? "bg-orange-500" : "bg-red-400";
const textColor = (pct: number) =>
  pct >= 80 ? "text-emerald-600 dark:text-emerald-400" : pct >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";

export default function ParticipationPage() {
  return (
    <DashboardLayout title="Participation" subtitle={`${totalEmployees} employees · ${totalVoters} active voters`}>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Employees",   value: totalEmployees,   icon: Users,       cls: "border-t-purple-500", iconCls: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"   },
          { label: "Total Voters",      value: totalVoters,      icon: UserCheck,   cls: "border-t-emerald-500",iconCls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"},
          { label: "Never Voted",       value: neverVoted,       icon: UserX,       cls: "border-t-red-500",    iconCls: "bg-red-100 text-red-600 dark:bg-red-500/12 dark:text-red-400"              },
          { label: "Avg Participation", value: `${avgParticipation}%`, icon: TrendingUp, cls: "border-t-cyan-500", iconCls: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400" },
        ].map(({ label, value, icon: Icon, cls, iconCls }) => (
          <div key={label} className={`glass rounded-xl p-4 border-t-2 ${cls}`}>
            <div className={`w-7 h-7 rounded-lg ${iconCls} flex items-center justify-center mb-3`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Department + Poll breakdown side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Department-wise */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Department-wise Participation</h2>
          <div className="space-y-3">
            {deptRows.map(({ dept, total, voted, pct }) => (
              <div key={dept}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{dept}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{voted}/{total}</span>
                    <span className={`font-semibold ${textColor(pct)}`}>{pct}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/8">
                  <div className={`h-full rounded-full ${barColor(pct)}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Poll-wise voter count */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Votes per Poll</h2>
          <div className="space-y-2.5">
            {pollParticipation.map(({ id, title, voters }) => {
              const pct = Math.round((voters / totalEmployees) * 100);
              return (
                <div key={id}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <div className="min-w-0 pr-2">
                      <p className="text-slate-700 dark:text-slate-300 truncate font-medium">{title}</p>
                      <p className="text-slate-400 text-[10px]">{id}</p>
                    </div>
                    <span className={`font-semibold flex-shrink-0 ${textColor(pct)}`}>{voters}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/8">
                    <div className={`h-full rounded-full ${barColor(pct)}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Never voted employees */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-divider)" }}>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Employees Who Have Never Voted</h2>
            <p className="text-xs text-slate-500 mt-0.5">{neverVoted} employees · consider sending reminder</p>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
            bg-red-50 border border-red-200 text-red-700 hover:bg-red-100
            dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/15">
            Send Reminder to All
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {employees.filter((e) => e.participatedIn.length === 0).map((emp) => (
            <div key={emp.id} className="flex items-center gap-3 p-3 rounded-xl
              bg-slate-50 border border-slate-200
              dark:bg-white/3 dark:border-white/6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
                {emp.initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-300 truncate">{emp.name}</p>
                <p className="text-[10px] text-slate-500">{emp.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full participation table */}
      <ParticipationSection />

    </DashboardLayout>
  );
}
