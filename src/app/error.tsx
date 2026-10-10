"use client";

import { useEffect } from "react";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl">
        ⚠️
      </div>

      <h1 className="mt-4 text-2xl font-bold">
        কিছু সমস্যা হয়েছে
      </h1>

      <p className="mt-3 text-gray-500">
        আবার চেষ্টা করুন।
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="btn btn-success text-white"
        >
          আবার চেষ্টা করুন
        </button>

        <Link
          href="/"
          className="btn btn-outline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}