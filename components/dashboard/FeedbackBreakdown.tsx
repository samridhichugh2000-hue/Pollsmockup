// Actionable sub-items must sum to totalActionable
const totalActionable = 24;
const pendingForAction = 8;
const processImproved = 9;
const policyAnnounced = totalActionable - pendingForAction - processImproved; // = 7

const feedbackBreakdown = [
  { label: "Total Feedbacks Received on Polls", value: 87,              indent: false },
  { label: "Total Actionable Feedback",         value: totalActionable, indent: false },
  { label: "↳ Total Feedback Pending for Action",value: pendingForAction,indent: true },
  { label: "↳ Process Improved After Feedback", value: processImproved, indent: true },
  { label: "↳ Policy Announced After Feedback", value: policyAnnounced, indent: true },
  { label: "Total Non-Actionable Feedback",     value: 31,              indent: false },
];

export function FeedbackBreakdown() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
      <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Feedback Breakdown — <span className="text-slate-900 dark:text-slate-100">87</span>
      </p>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {feedbackBreakdown.map((item) => (
          <div key={item.label} className={`flex items-center justify-between py-1 ${item.indent ? "pl-3" : ""}`}>
            <span className={`text-xs leading-tight ${item.indent ? "text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-400"}`}>{item.label}</span>
            <span className={`text-sm font-bold ${item.indent ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-slate-100"}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
