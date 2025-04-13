"use client";

import withAuth from "@/components/WithAuth";
import Layout from "@/layouts/Layout";

export default withAuth(LayoutSandbox, "all");
function LayoutSandbox() {
  return (
    <Layout withFooter withNavbar>
      <section className="flex h-screen items-center justify-center bg-purple-700">
        <h1 className="text-4xl font-bold">Hero Section</h1>
      </section>
      <section className="flex h-screen items-center justify-center bg-gray-300">
        <p>Some more content to scroll</p>
      </section>
    </Layout>
  );
}
