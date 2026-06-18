"use client";
import { useState } from "react";
import { ArrowRight, Link2, Mail, ClipboardCopy, Check, ExternalLink } from "lucide-react";
import { pollRequests, FORM_LINK } from "@/lib/data";
import { StatusBadge } from "@/components/ui/StatusBadge";

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(FORM_LINK).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
        bg-purple-100 border border-purple-200 text-purple-700 hover:bg-purple-200
        dark:bg-purple-500/15 dark:border-purple-500/30 dark:text-purple-300 dark:hover:bg-purple-500/25"
    >
      {copied ? <Check className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy Form Link"}
    </button>
  );
}

export function PollRequestsTable() {
  return (
    <div className="glass rounded-xl overflow-hidden h-full">
      {/* Shareable Form Banner */}
      <div
        className="px-5 py-3 flex flex-wrap items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-divider)", background: "rgba(124,58,237,0.04)" }}
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-purple-500" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Shareable Request Form</span>
          <span className="text-[10px] text-slate-500 font-mono truncate max-w-[200px] hidden md:block">{FORM_LINK}</span>
        </div>
        <div className="flex items-center gap-2">
          <CopyLinkButton />
          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              border border-slate-200 text-slate-600 hover:bg-slate-100
              dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
          >
            <ExternalLink className="w-3 h-3" /> Open
          </a>
        </div>
      </div>

      {/* Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border-divider)" }}
      >
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Poll Requests Received</h2>
          <p className="text-xs text-slate-500 mt-0.5">{pollRequests.length} total · Sources: Mailbox &amp; Form</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-divider)" }}>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Poll No.</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Request Title</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Requester</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Dept.</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Source</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {pollRequests.map((poll) => (
              <tr
                key={poll.id}
                className="trow cursor-pointer"
                style={{ borderTop: "1px solid var(--border-divider)" }}
              >
                <td className="px-5 py-3 font-mono text-purple-600 dark:text-purple-400 whitespace-nowrap">{poll.id}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-300 max-w-[160px] truncate">{poll.title}</td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-400 hidden md:table-cell">{poll.requester}</td>
                <td className="px-5 py-3 text-slate-500 hidden lg:table-cell">{poll.department}</td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border
                    ${poll.source === "Mailbox"
                      ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/25 dark:text-blue-300"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-300"
                    }`}
                  >
                    {poll.source === "Mailbox"
                      ? <><Mail className="w-2.5 h-2.5" /> Mailbox</>
                      : <><Link2 className="w-2.5 h-2.5" /> Form</>
                    }
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500 hidden md:table-cell whitespace-nowrap">{poll.date}</td>
                <td className="px-5 py-3">
                  <StatusBadge value={poll.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
