import Layout from "@/layouts/Layout";

export default function LayoutSandbox() {
  return (
    <Layout withFooter withNavbar>
      <section className="h-screen bg-purple-700 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hero Section</h1>
      </section>
      <section className="h-screen bg-gray-300 flex items-center justify-center">
        <p>Some more content to scroll</p>
      </section>
    </Layout>
  );
}
