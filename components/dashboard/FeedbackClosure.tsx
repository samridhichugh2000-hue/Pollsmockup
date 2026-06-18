import { Send } from "lucide-react";
import { closureItems } from "@/lib/data";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function FeedbackClosure() {
  return (
    <div className="glass rounded-xl overflow-hidden h-full">
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Feedback Closure Status</h2>
          <p className="text-xs text-slate-500 mt-0.5">Similar to PIR closure email flow</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
          <Send className="w-3 h-3" /> Send closures
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Poll No.</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">FB ID</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Summary</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Email Sent</th>
              <th className="px-5 py-3 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Happy</th>
            </tr>
          </thead>
          <tbody>
            {closureItems.map((item, i) => (
              <tr key={i} className="trow cursor-pointer" style={{ borderTop: "1px solid var(--border-divider)" }}>
                <td className="px-5 py-3 font-mono text-purple-600 dark:text-purple-400">{item.pollId}</td>
                <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{item.feedbackId}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-300 max-w-[140px] truncate">{item.summary}</td>
                <td className="px-5 py-3"><StatusBadge value={item.status} /></td>
                <td className="px-5 py-3 text-center hidden md:table-cell">
                  <span className={item.emailSent ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-600"}>
                    {item.emailSent ? "✓ Yes" : "✗ No"}
                  </span>
                </td>
                <td className="px-5 py-3 text-center hidden md:table-cell">
                  <span className={
                    item.happyWithSolution === "Yes" ? "text-emerald-600 dark:text-emerald-400" :
                    item.happyWithSolution === "No"  ? "text-red-600 dark:text-red-400" :
                    "text-amber-600 dark:text-amber-400"
                  }>
                    {item.happyWithSolution === "Yes" ? "✓ Yes" :
                     item.happyWithSolution === "No"  ? "✗ No"  : "~ Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
