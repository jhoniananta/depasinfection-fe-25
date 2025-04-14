"use client";

import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarAdmin";

export default withAuth(AdminDashboardPage, "ADMIN");
function AdminDashboardPage() {
  return (
    <>
      <Sidebar title="Dashboard">
        <section className="min-h-screen w-full">Test</section>
      </Sidebar>
    </>
  );
}
