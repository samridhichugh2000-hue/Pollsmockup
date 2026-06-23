import { DashboardLayout }      from "@/components/dashboard/DashboardLayout";
import { KPICards }              from "@/components/dashboard/KPICards";
import { TotalPollsBreakdown }   from "@/components/dashboard/TotalPollsBreakdown";
import { CadenceBreakdown }      from "@/components/dashboard/CadenceBreakdown";
import { FeedbackBreakdown }     from "@/components/dashboard/FeedbackBreakdown";
import { PollRequestsTable }     from "@/components/dashboard/PollRequestsTable";
import { FeedbackTable }         from "@/components/dashboard/FeedbackTable";
import { ActionReport }          from "@/components/dashboard/ActionReport";
import { FeedbackClosure }       from "@/components/dashboard/FeedbackClosure";
import { ParticipationSection }  from "@/components/dashboard/ParticipationSection";
import { FollowUpPanel }         from "@/components/dashboard/FollowUpPanel";

export default function OverviewPage() {
  return (
    <DashboardLayout title="Polls Dashboard" subtitle="Overview · Q2 2026">
<section aria-label="KPI Overview"><KPICards /></section>
      <section aria-label="Breakdowns" className="grid grid-cols-3 gap-4">
        <TotalPollsBreakdown />
        <CadenceBreakdown />
        <FeedbackBreakdown />
      </section>
      <section aria-label="Poll Requests"><PollRequestsTable /></section>
      <section id="feedback-pending" aria-label="Feedback"><FeedbackTable /></section>

      <section aria-label="Action Report and Closure" className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ActionReport />
        <FeedbackClosure />
      </section>

      <section aria-label="Participation"><ParticipationSection /></section>
      <section aria-label="Follow-up"><FollowUpPanel /></section>
    </DashboardLayout>
  );
}
