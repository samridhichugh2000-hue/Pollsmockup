const colorMap: Record<string, { border: string; icon: string; badge: string }> = {
  purple:  { border: "border-t-purple-600",  icon: "text-purple-400 bg-purple-500/15",  badge: "text-emerald-400" },
  amber:   { border: "border-t-amber-500",   icon: "text-amber-400  bg-amber-500/15",   badge: "text-amber-400"   },
  cyan:    { border: "border-t-cyan-500",    icon: "text-cyan-400   bg-cyan-500/15",    badge: "text-cyan-400"    },
  red:     { border: "border-t-red-500",     icon: "text-red-400    bg-red-500/15",     badge: "text-red-400"     },
  orange:  { border: "border-t-orange-500",  icon: "text-orange-400 bg-orange-500/15",  badge: "text-emerald-400" },
  blue:    { border: "border-t-blue-500",    icon: "text-blue-400   bg-blue-500/15",    badge: "text-emerald-400" },
  slate:   { border: "border-t-slate-500",   icon: "text-slate-400  bg-slate-500/15",   badge: "text-slate-400"   },
};

interface KPICardProps {
  label: string;
  value: number;
  delta: string;
  color: string;
  icon: string;
}

export function KPICard({ label, value, delta, color }: KPICardProps) {
  const c = colorMap[color] ?? colorMap.slate;

  return (
    <div className={`glass glass-hover rounded-xl p-4 border-t-2 ${c.border} transition-all cursor-pointer fade-up`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.icon.split(" ")[1]}`}>
          <span className={`text-xs ${c.icon.split(" ")[0]}`}>●</span>
        </div>
        <span className={`text-[10px] font-semibold ${c.badge}`}>{delta}</span>
      </div>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{label}</p>
    </div>
  );
}
