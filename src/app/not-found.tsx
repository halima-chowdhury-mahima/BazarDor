import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 text-7xl">
        🔎
      </div>

      <h1 className="text-7xl font-extrabold text-green-700">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-3 text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি নেই।
      </p>

      <Link
        href="/"
        className="btn btn-success mt-7 text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}