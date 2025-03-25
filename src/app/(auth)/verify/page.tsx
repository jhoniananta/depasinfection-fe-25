import { Suspense } from "react";
import VerifyEmailPage from "../_components/VerifyEmailClient";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <VerifyEmailPage token={token} />
    </Suspense>
  );
}
