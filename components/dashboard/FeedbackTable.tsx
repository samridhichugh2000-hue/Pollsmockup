"use client";
import { Fragment, useState } from "react";
import { Filter, ChevronDown, ChevronUp, Download } from "lucide-react";
import { feedbackItems } from "@/lib/data";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function FeedbackTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div
        className="px-5 py-4 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-divider)" }}
      >
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Actionable Feedback &amp; Suggestions</h2>
          <p className="text-xs text-slate-500 mt-0.5">{feedbackItems.length} items · click a row to expand details</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 transition-colors
            bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200
            dark:bg-white/5 dark:border-white/8 dark:text-slate-400 dark:hover:bg-white/8">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            Export <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-4" />
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Poll</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Summary</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Owner</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Due</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {feedbackItems.map((fb) => {
              const isOpen = expanded === fb.id;
              return (
                <Fragment key={fb.id}>
                  <tr
                    className="trow cursor-pointer"
                    style={{ borderTop: "1px solid var(--border-divider)" }}
                    onClick={() => setExpanded(isOpen ? null : fb.id)}
                  >
                    {/* Expand toggle */}
                    <td className="px-3 py-3 text-slate-400">
                      {isOpen
                        ? <ChevronUp className="w-3.5 h-3.5" />
                        : <ChevronDown className="w-3.5 h-3.5" />
                      }
                    </td>
                    <td className="px-3 py-3 font-mono text-purple-600 dark:text-purple-400 whitespace-nowrap">{fb.pollId}</td>
                    <td className="px-3 py-3">
                      <StatusBadge value={fb.type} />
                    </td>
                    <td className="px-3 py-3 text-slate-800 dark:text-slate-300 max-w-[200px] truncate">{fb.summary}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400 hidden md:table-cell">{fb.owner}</td>
                    <td className="px-3 py-3">
                      <StatusBadge value={fb.status} />
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell whitespace-nowrap">
                      {fb.dueDate ? (
                        <span className={fb.overdue ? "text-red-500 dark:text-red-400 font-medium" : "text-slate-500"}>
                          {fb.dueDate}{fb.overdue && " ⚠"}
                        </span>
                      ) : <span className="text-slate-400 dark:text-slate-600">—</span>}
                    </td>
                    <td className="px-3 py-3 text-slate-500 hidden xl:table-cell whitespace-nowrap">{fb.submittedDate}</td>
                  </tr>

                  {/* Expanded detail row */}
                  {isOpen && (
                    <tr style={{ borderTop: "none" }}>
                      <td />
                      <td colSpan={7} className="px-5 pb-4 pt-1">
                        <div className="rounded-xl p-4 text-xs space-y-2
                          bg-slate-50 border border-slate-200
                          dark:bg-white/3 dark:border-white/6">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{fb.pollTitle}</p>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{fb.detail}</p>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-[10px] text-slate-500">
                            <span>Submitted by: <span className="text-slate-700 dark:text-slate-400">{fb.submittedBy}</span></span>
                            <span>Department: <span className="text-slate-700 dark:text-slate-400">{fb.department}</span></span>
                            <span>Owner: <span className="text-slate-700 dark:text-slate-400">{fb.owner}</span></span>
                            {fb.dueDate && <span>Due: <span className={fb.overdue ? "text-red-500 font-semibold" : "text-slate-700 dark:text-slate-400"}>{fb.dueDate}</span></span>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
