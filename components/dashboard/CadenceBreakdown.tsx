const cadenceBreakdown = [
  { label: "Total Cadence Polls",      value: 12 },
  { label: "Monthly",                  value: 5  },
  { label: "Quarterly",                value: 4  },
  { label: "Scheduled & Released",     value: 3  },
  { label: "Overdue Cadence Polls",    value: 3  },
];

export function CadenceBreakdown() {
  return (
    <div className="glass rounded-xl p-4 max-w-sm">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Cadence Breakdown — <span className="text-slate-900 dark:text-slate-100">12</span>
      </p>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {cadenceBreakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
