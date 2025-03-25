import { Suspense } from "react";
import ResetPasswordPage from "../_components/ResetPasswordClient";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <ResetPasswordPage searchParams={searchParams} />
    </Suspense>
  );
}
