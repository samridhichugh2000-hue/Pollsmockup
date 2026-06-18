import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-[220px] min-h-screen">
        <Header title={title} subtitle={subtitle} />
        <div className="p-5 space-y-5">
          {children}
          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}
