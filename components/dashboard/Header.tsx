import { Search, Calendar, Bell, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between gap-4 transition-colors"
      style={{
        background: "var(--bg-header)",
        borderBottom: "1px solid var(--border-divider)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div>
        <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">Polls Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Overview · Q2 2026</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search polls..."
            className="rounded-lg pl-9 pr-4 py-2 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors
              bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400
              dark:bg-white/5 dark:border-white/8 dark:text-slate-300 dark:placeholder-slate-600"
          />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors
          bg-slate-100 border border-slate-200 hover:bg-slate-200
          dark:bg-white/5 dark:border-white/8 dark:hover:bg-white/8"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-700 dark:text-slate-300 hidden sm:inline">Jan – Jun 2026</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>

        {/* Notifications */}
        <div className="relative w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors
          bg-slate-100 border border-slate-200 hover:bg-slate-200
          dark:bg-white/5 dark:border-white/8 dark:hover:bg-white/8"
        >
          <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
