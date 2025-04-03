"use client";

import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarUser";

function DashboardProfilePage() {
  return (
    <>
      <Sidebar title="Dashboard">Test</Sidebar>
    </>
  );
}

export default withAuth(DashboardProfilePage, "all");
