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
  <main className="flex-1 flex flex-col min-h-screen">
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
          <p className="text-muted-foreground">{description}</p>
              )}
        </div>
      </div>
    </header>
    <div className="flex-1 p-6 bg-zinc-200">
          {children}
    </div>
  </main>
</>
  );
}
