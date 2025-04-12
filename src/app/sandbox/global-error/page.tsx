"use client";

import GlobalError from "@/app/global-error";
import withAuth from "@/components/WithAuth";

function GlobalErrorSandbox() {
  const error = new Error("This is a test error");
  return <GlobalError error={error} />;
}

export default withAuth(GlobalErrorSandbox, "all");
