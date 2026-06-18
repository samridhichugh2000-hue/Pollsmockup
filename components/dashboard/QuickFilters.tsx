"use client";
import { useState } from "react";

const filters = [
  { id: "all",                label: "All Polls"          },
  { id: "active",             label: "Active"             },
  { id: "awaiting",           label: "Awaiting Approval"  },
  { id: "pending_closure",    label: "Pending Closure"    },
  { id: "results_not_shared", label: "Results Not Shared" },
  { id: "non_participation",  label: "Non-Participation"  },
];

export function QuickFilters() {
  const [active, setActive] = useState("all");
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setActive(f.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
            ${active === f.id
              ? "bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-500/20 dark:border-purple-500/50 dark:text-purple-300"
              : "border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:border-white/10 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-purple-500/30"
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
