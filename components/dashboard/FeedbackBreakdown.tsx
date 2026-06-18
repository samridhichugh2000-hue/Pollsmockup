const feedbackBreakdown = [
  { label: "Total Feedbacks Received on Polls", value: 87 },
  { label: "Total Actionable Feedback",         value: 24 },
  { label: "Total Non-Actionable Feedback",     value: 31 },
  { label: "Total Feedback Pending for Action", value: 18 },
  { label: "Policy Announced After Feedback",   value: 9  },
  { label: "Process Improved After Feedback",   value: 7  },
];

export function FeedbackBreakdown() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
      <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Feedback Breakdown — <span className="text-slate-900 dark:text-slate-100">87</span>
      </p>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {feedbackBreakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-1">
            <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
