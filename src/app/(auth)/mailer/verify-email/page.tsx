import { Suspense } from "react";
import VerifyEmailPage from "../../_components/VerifyEmailClient";

export default function VerifyEmailLayout({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full text-neutral-900">Verifying...</div>
      }
    >
      <VerifyEmailPage token={token} />
    </Suspense>
  );
}
