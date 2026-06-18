"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ListChecks, MessageSquare,
  Users, Activity, Settings, BarChart3,
  ChevronsUpDown, CalendarClock,
} from "lucide-react";

const navItems = [
  { label: "Overview",      icon: LayoutDashboard, href: "/"               },
  { label: "Poll Requests", icon: ListChecks,      href: "/poll-requests"  },
  { label: "Feedback",      icon: MessageSquare,   href: "/feedback"       },
  { label: "Participation", icon: Users,           href: "/participation"  },
  { label: "Poll Cadence",  icon: CalendarClock,   href: "/cadence"        },
  { label: "Reports",       icon: Activity,        href: "/reports"        },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col fixed top-0 left-0 z-20 h-screen w-[220px] transition-colors"
      style={{ background: "var(--bg-sidebar)", borderRight: "1px solid var(--border-divider)" }}
    >
      {/* Logo */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">PollsHQ</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${active
                  ? "text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/12"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              style={active ? { borderLeft: "2px solid #7C3AED" } : {}}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}

        <div className="pt-4 pb-1">
          <p className="px-3 text-[10px] font-semibold text-slate-400 dark:text-slate-700 uppercase tracking-wider">Settings</p>
        </div>
        {(() => {
          const active = pathname === "/settings";
          return (
            <Link
              href="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${active
                  ? "text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/12"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              style={active ? { borderLeft: "2px solid #7C3AED" } : {}}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span>Settings</span>
            </Link>
          );
        })()}
      </nav>

      {/* User */}
      <div className="px-3 py-3" style={{ borderTop: "1px solid var(--border-divider)" }}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            SC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-900 dark:text-slate-200 truncate">Samridhi Chugh</p>
            <p className="text-[10px] text-slate-500 truncate">HR Admin</p>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
