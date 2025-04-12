"use client";

import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarUser";

function DashboardUserPage() {
  return (
    <>
      <Sidebar title="Dashboard">
        <section className="min-h-screen w-full">Test</section>
      </Sidebar>
    </>
  );
}

export default withAuth(DashboardUserPage, "all");
