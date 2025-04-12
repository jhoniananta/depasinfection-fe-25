"use client";

import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarAdmin";

function AdminDashboardPage() {
  return (
    <>
      <Sidebar title="Dashboard">
        <section className="min-h-screen w-full">Test</section>
      </Sidebar>
    </>
  );
}

export default withAuth(AdminDashboardPage, "all");
