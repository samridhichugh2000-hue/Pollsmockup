import type { PollStatus, FeedbackStatus, FeedbackType, ClosureStatus } from "@/lib/data";

type BadgeVariant = PollStatus | FeedbackStatus | FeedbackType | ClosureStatus | "Sent" | "Not Sent";

const variantStyles: Record<string, string> = {
  "Draft":              "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-500/15 dark:text-slate-400 dark:border-slate-500/25",
  "Acknowledged":       "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/25",
  "Awaiting Approval":  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",
  "Active":             "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/25",
  "Closed":             "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
  "Pending Closure":    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/25",
  "Open":               "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
  "In Progress":        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",
  "Query Replied":      "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/25",
  "No Action Required": "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-500/12 dark:text-slate-400 dark:border-slate-500/20",
  "No Action":          "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-500/12 dark:text-slate-400 dark:border-slate-500/20",
  "Actionable":         "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/25",
  "Suggestion":         "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/25",
  "Query":              "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/25",
  "Sent":               "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/25",
  "Not Sent":           "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
};

export function StatusBadge({ value }: { value: BadgeVariant }) {
  const base = "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap";
  const cls  = variantStyles[value] ?? variantStyles["Draft"];
  return (
    <span className={`${base} ${cls}`}>
      {value === "Active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot inline-block flex-shrink-0" />
      )}
      {value}
    </span>
  );
}
