import { Suspense } from "react";
import ResetPasswordPage from "../../_components/ResetPasswordClient";

export default function ResetPasswordLayout({
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
      <ResetPasswordPage token={token} />
    </Suspense>
  );
}
