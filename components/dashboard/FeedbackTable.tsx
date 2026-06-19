"use client";
import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { feedbackItems } from "@/lib/data";

type ReviewCategory = "RMS Task Raised" | "Action Yet to Start" | "Annexure Pending from Sir";

interface PendingReviewItem {
  id: string;
  pollId: string;
  pollTitle: string;
  summary: string;
  owner: string;
  category: ReviewCategory;
  submittedDate: string;
  detail: string;
  department: string;
  rmsTaskId?: string;
  rmsTaskPending?: boolean;
  rmsFollowUpDone?: boolean;
}

const categoryColor: Record<ReviewCategory, string> = {
  "RMS Task Raised":            "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/25 dark:text-orange-300",
  "Action Yet to Start":        "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-300",
  "Annexure Pending from Sir":  "bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/25 dark:text-red-300",
};

// Static RMS task details for "RMS Task Raised" items (index i % 3 === 0)
const rmsTaskData = [
  { rmsTaskId: "RMS-2026-041", rmsTaskPending: false, rmsFollowUpDone: true  },
  { rmsTaskId: "RMS-2026-057", rmsTaskPending: true,  rmsFollowUpDone: false },
  { rmsTaskId: "RMS-2026-063", rmsTaskPending: true,  rmsFollowUpDone: true  },
  { rmsTaskId: "RMS-2026-078", rmsTaskPending: false, rmsFollowUpDone: true  },
];

// Derive pending-review items from existing feedback data
let rmsIdx = 0;
const pendingReviewItems: PendingReviewItem[] = feedbackItems
  .filter((fb) => fb.status === "Open" || fb.status === "In Progress" || fb.status === "Pending")
  .map((fb, i) => {
    const categories: ReviewCategory[] = ["RMS Task Raised", "Action Yet to Start", "Annexure Pending from Sir"];
    const category = categories[i % 3];
    const rms = category === "RMS Task Raised" ? rmsTaskData[rmsIdx++ % rmsTaskData.length] : {};
    return {
      id: fb.id,
      pollId: fb.pollId,
      pollTitle: fb.pollTitle,
      summary: fb.summary,
      owner: fb.owner,
      category,
      submittedDate: fb.submittedDate,
      detail: fb.detail,
      department: fb.department,
      ...rms,
    };
  });

export function FeedbackTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div
        className="px-5 py-4 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-divider)" }}
      >
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Feedback Pending for Review</h2>
          <p className="text-xs text-slate-500 mt-0.5">{pendingReviewItems.length} items · click a row to expand details</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          {(["RMS Task Raised", "Action Yet to Start", "Annexure Pending from Sir"] as ReviewCategory[]).map((cat) => (
            <span key={cat} className={`px-2 py-0.5 rounded-full border text-[9px] font-medium ${categoryColor[cat]}`}>
              {cat} · {pendingReviewItems.filter((r) => r.category === cat).length}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-4" />
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Poll</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Summary</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Owner</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Review Category</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {pendingReviewItems.map((item) => {
              const isOpen = expanded === item.id;
              return (
                <Fragment key={item.id}>
                  <tr
                    className="trow cursor-pointer"
                    style={{ borderTop: "1px solid var(--border-divider)" }}
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                  >
                    <td className="px-3 py-3 text-slate-400">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </td>
                    <td className="px-3 py-3 font-mono text-purple-600 dark:text-purple-400 whitespace-nowrap">{item.pollId}</td>
                    <td className="px-3 py-3 text-slate-800 dark:text-slate-300 max-w-[220px] truncate">{item.summary}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400 hidden md:table-cell">{item.owner}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full border text-[9px] font-medium ${categoryColor[item.category]}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-500 hidden lg:table-cell whitespace-nowrap">{item.submittedDate}</td>
                  </tr>
                  {isOpen && (
                    <tr style={{ borderTop: "none" }}>
                      <td />
                      <td colSpan={5} className="px-5 pb-4 pt-1">
                        <div className="rounded-xl p-4 text-xs space-y-2 bg-slate-50 border border-slate-200 dark:bg-white/3 dark:border-white/6">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{item.pollTitle}</p>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.detail}</p>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-[10px] text-slate-500">
                            <span>Department: <span className="text-slate-700 dark:text-slate-400">{item.department}</span></span>
                            <span>Owner: <span className="text-slate-700 dark:text-slate-400">{item.owner}</span></span>
                            <span>Category: <span className="text-slate-700 dark:text-slate-400">{item.category}</span></span>
                          </div>
                          {item.category === "RMS Task Raised" && item.rmsTaskId && (
                            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/8 flex flex-wrap gap-3">
                              <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/25 rounded-lg px-3 py-1.5">
                                <span className="text-[10px] text-slate-500">RMS Task ID</span>
                                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 font-mono">{item.rmsTaskId}</span>
                              </div>
                              <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 border text-[10px] font-semibold ${item.rmsTaskPending ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/25 dark:text-red-400" : "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-400"}`}>
                                Task Pending: {item.rmsTaskPending ? "Yes" : "No"}
                              </div>
                              <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 border text-[10px] font-semibold ${item.rmsFollowUpDone ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-400" : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-400"}`}>
                                Follow-up Done: {item.rmsFollowUpDone ? "Yes" : "Pending"}
                              </div>
                            </div>
                          )}
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
