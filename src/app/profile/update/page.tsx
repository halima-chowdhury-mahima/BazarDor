import { headers } from "next/headers";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import UpdateProfile from "@/components/UpdateProfile";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      "/signin?redirect=/profile/update"
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold">
        তথ্য আপডেট করুন
      </h1>

      <UpdateProfile
        currentName={session.user.name}
      />
    </main>
  );
}