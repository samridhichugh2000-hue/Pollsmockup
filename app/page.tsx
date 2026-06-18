import { Sidebar }             from "@/components/dashboard/Sidebar";
import { Header }               from "@/components/dashboard/Header";
import { QuickFilters }         from "@/components/dashboard/QuickFilters";
import { KPICards }             from "@/components/dashboard/KPICards";
import { LifecycleTracker }     from "@/components/dashboard/LifecycleTracker";
import { PollRequestsTable }    from "@/components/dashboard/PollRequestsTable";
import { FeedbackTable }        from "@/components/dashboard/FeedbackTable";
import { ActionReport }         from "@/components/dashboard/ActionReport";
import { FeedbackClosure }      from "@/components/dashboard/FeedbackClosure";
import { ParticipationSection } from "@/components/dashboard/ParticipationSection";
import { FollowUpPanel }        from "@/components/dashboard/FollowUpPanel";
import { PollCadence }          from "@/components/dashboard/PollCadence";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-[220px] min-h-screen">
        <Header />

        <div className="p-5 space-y-5">

          {/* Quick Filters */}
          <QuickFilters />

          {/* 1. KPI Cards */}
          <section aria-label="KPI Overview">
            <KPICards />
          </section>

          {/* 2. Lifecycle Tracker */}
          <section aria-label="Lifecycle Tracker">
            <LifecycleTracker />
          </section>

          {/* 3. Poll Requests (full width — includes source + form link) */}
          <section aria-label="Poll Requests">
            <PollRequestsTable />
          </section>

          {/* 4. Poll Cadence */}
          <section aria-label="Poll Cadence">
            <PollCadence />
          </section>

          {/* 5. Feedback (expandable rows) */}
          <section aria-label="Feedback and Suggestions">
            <FeedbackTable />
          </section>

          {/* 6 & 7. Action Report + Feedback Closure */}
          <section
            aria-label="Action Report and Feedback Closure"
            className="grid grid-cols-1 xl:grid-cols-2 gap-5"
          >
            <ActionReport />
            <FeedbackClosure />
          </section>

          {/* 8. Participation — employee list with hover tooltip */}
          <section aria-label="Audience and Participation">
            <ParticipationSection />
          </section>

          {/* 9. Follow-up Panel */}
          <section aria-label="Follow-up Panel">
            <FollowUpPanel />
          </section>

          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}
