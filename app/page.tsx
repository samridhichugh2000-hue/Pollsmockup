import { DashboardLayout }      from "@/components/dashboard/DashboardLayout";
import { QuickFilters }          from "@/components/dashboard/QuickFilters";
import { KPICards }              from "@/components/dashboard/KPICards";
import { LifecycleTracker }      from "@/components/dashboard/LifecycleTracker";
import { PollRequestsTable }     from "@/components/dashboard/PollRequestsTable";
import { FeedbackTable }         from "@/components/dashboard/FeedbackTable";
import { ActionReport }          from "@/components/dashboard/ActionReport";
import { FeedbackClosure }       from "@/components/dashboard/FeedbackClosure";
import { ParticipationSection }  from "@/components/dashboard/ParticipationSection";
import { FollowUpPanel }         from "@/components/dashboard/FollowUpPanel";
import { PollCadence }           from "@/components/dashboard/PollCadence";

export default function OverviewPage() {
  return (
    <DashboardLayout title="Polls Dashboard" subtitle="Overview · Q2 2026">
      <QuickFilters />

      <section aria-label="KPI Overview"><KPICards /></section>
      <section aria-label="Lifecycle Tracker"><LifecycleTracker /></section>
      <section aria-label="Poll Requests"><PollRequestsTable /></section>
      <section aria-label="Poll Cadence"><PollCadence /></section>
      <section aria-label="Feedback"><FeedbackTable /></section>

      <section aria-label="Action Report and Closure" className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ActionReport />
        <FeedbackClosure />
      </section>

      <section aria-label="Participation"><ParticipationSection /></section>
      <section aria-label="Follow-up"><FollowUpPanel /></section>
    </DashboardLayout>
  );
}
