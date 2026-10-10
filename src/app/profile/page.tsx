import Link from "next/link";

import { headers } from "next/headers";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?redirect=/profile");
  }

  const user = session.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="mb-8 text-center text-3xl font-bold">
        আমার প্রোফাইল
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            👤
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          নাম
        </p>

        <p className="mb-5 font-bold">
          {user.name}
        </p>

        <p className="text-sm text-gray-500">
          ইমেইল
        </p>

        <p className="font-bold">
          {user.email}
        </p>

        <Link
          href="/profile/update"
          className="btn btn-success mt-8 w-full text-white"
        >
          Update Information
        </Link>
      </div>
    </main>
  );
}