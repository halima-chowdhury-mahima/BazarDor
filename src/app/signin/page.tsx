import { Suspense } from "react";

import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-14">
      <Suspense
        fallback={
          <div className="skeleton h-96 w-full max-w-md" />
        }
      >
        <AuthForm mode="signin" />
      </Suspense>
    </main>
  );
}
