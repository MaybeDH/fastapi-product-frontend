import { SidebarNavigation } from "@/components/sidebar-navigation";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <SidebarNavigation />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
