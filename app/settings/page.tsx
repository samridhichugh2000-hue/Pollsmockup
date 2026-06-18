"use client";

import { useState } from "react";
import { Bell, Shield, Users, Link2, Palette, Save, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FORM_LINK }        from "@/lib/data";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--border-divider)" }}>
        <Icon className="w-4 h-4 text-purple-500" />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-sm text-slate-800 dark:text-slate-300 font-medium">{label}</p>
        {description && <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-purple-600" : "bg-slate-300 dark:bg-white/15"}`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

function Field({ label, defaultValue, mono = false }: { label: string; defaultValue: string; mono?: boolean }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div>
      <label className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">{label}</label>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={`w-full px-3 py-2 text-sm rounded-xl border transition-colors
          bg-slate-50 border-slate-200 text-slate-900
          dark:bg-white/5 dark:border-white/10 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-purple-500/40
          ${mono ? "font-mono text-xs" : ""}`}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <DashboardLayout title="Settings" subtitle="Dashboard configuration">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Notifications */}
        <Section title="Notifications" icon={Bell}>
          <Toggle label="Email digest"          description="Daily summary of poll activity"  defaultOn />
          <Toggle label="New poll request alert" description="Email when a new request arrives" defaultOn />
          <Toggle label="Overdue reminders"     description="Alert when feedback is overdue"  defaultOn />
          <Toggle label="Approval requests"     description="Notify when polls need approval" defaultOn />
          <Toggle label="Participant reminders" description="Auto-send reminders to non-voters" />
        </Section>

        {/* Approvals & Workflow */}
        <Section title="Approvals & Workflow" icon={Shield}>
          <Toggle label="Require approval for all polls" description="All polls need manual sign-off before release" defaultOn />
          <Toggle label="Auto-approve cadence polls"     description="Scheduled polls bypass approval queue"       defaultOn />
          <Toggle label="Allow draft by requester"       description="Requesters can save polls as draft"          defaultOn />
          <Toggle label="Two-level approval"             description="Require HOD and HR head sign-off"             />
          <Field label="Default approver" defaultValue="Priya Sharma" />
        </Section>

        {/* Shareable Form */}
        <Section title="Shareable Form Link" icon={Link2}>
          <div>
            <label className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">Current Form URL</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 text-xs rounded-xl border font-mono break-all
                bg-emerald-50 border-emerald-200 text-emerald-800
                dark:bg-emerald-500/8 dark:border-emerald-500/20 dark:text-emerald-300">
                {FORM_LINK}
              </code>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Share this link with employees to submit poll requests via the web form.</p>
          </div>
          <Toggle label="Form submissions enabled" defaultOn />
          <Toggle label="Require employee login"   description="Only authenticated employees can submit" defaultOn />
          <Field  label="Form closing message" defaultValue="Thank you! Your poll request has been received." />
        </Section>

        {/* Team & Access */}
        <Section title="Team & Access" icon={Users}>
          <div className="space-y-2">
            {[
              { name: "Priya Sharma",  role: "HR Head",       access: "Admin"   },
              { name: "Amit Verma",    role: "Admin Manager", access: "Editor"  },
              { name: "Rajiv Kumar",   role: "L&D Lead",      access: "Editor"  },
              { name: "Deepak Singh",  role: "Safety Officer",access: "Viewer"  },
              { name: "Sunita Rao",    role: "IT Manager",    access: "Viewer"  },
            ].map(({ name, role, access }) => (
              <div key={name} className="flex items-center justify-between text-xs px-3 py-2.5 rounded-xl
                bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-300">{name}</p>
                    <p className="text-[10px] text-slate-500">{role}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                  ${access === "Admin"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
                    : access === "Editor"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                      : "bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-400"
                  }`}>
                  {access}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-1 py-2 text-xs font-medium text-purple-600 dark:text-purple-400
            border border-dashed border-purple-300 dark:border-purple-500/30 rounded-xl
            hover:bg-purple-50 dark:hover:bg-purple-500/8 transition-colors">
            + Invite team member
          </button>
        </Section>

        {/* Appearance */}
        <Section title="Appearance" icon={Palette}>
          <div>
            <label className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block mb-2.5">Accent Color</label>
            <div className="flex gap-2">
              {["bg-purple-600", "bg-blue-600", "bg-emerald-600", "bg-rose-600", "bg-amber-500"].map((c) => (
                <button
                  key={c}
                  className={`w-7 h-7 rounded-full ${c} ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${c === "bg-purple-600" ? "ring-2 ring-purple-600" : ""}`}
                />
              ))}
            </div>
          </div>
          <Toggle label="Compact table rows"   description="Reduce row height in all tables" />
          <Toggle label="Show poll IDs"        description="Display POLL-XXXX identifiers in tables" defaultOn />
          <Toggle label="Animated KPI cards"   description="Subtle pulse on active KPI numbers" defaultOn />
          <Field  label="Dashboard title" defaultValue="Polls Dashboard" />
          <Field  label="Quarter label"   defaultValue="Q2 2026" />
        </Section>

      </div>

      {/* Save bar */}
      <div className="sticky bottom-5 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all
            ${saved
              ? "bg-emerald-600 text-white"
              : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
        >
          {saved ? <><Check className="w-4 h-4" />Saved</> : <><Save className="w-4 h-4" />Save Settings</>}
        </button>
      </div>

    </DashboardLayout>
  );
}
