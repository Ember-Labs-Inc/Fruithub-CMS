import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "../components/ui/sidebar";

interface CMSLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function CMSLayout({ children, title, description }: CMSLayoutProps) {
  return (
    <>
      <AppSidebar />

      <main className="flex-1 flex flex-col min-h-screen bg-zinc-200">
        {/* Topbar */}
        <header className="border-b bg-card px-6 py-4 mb-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-10 w-20" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 px-4 md:px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="max-w-7xl mx-auto space-y-6 pb-10">{children}</div>
        </div>
      </main>
    </>
  );
}
