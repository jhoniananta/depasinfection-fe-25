"use client";

import GlobalError from "@/app/global-error";

function GlobalErrorSandbox() {
  const error = new Error("This is a test error");
  return <GlobalError error={error} />;
}

export default GlobalErrorSandbox;
