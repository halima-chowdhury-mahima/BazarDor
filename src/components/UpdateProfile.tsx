"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

interface UpdateProfileProps {
  currentName: string;
}

export default function UpdateProfile({
  currentName,
}: UpdateProfileProps) {
  const [name, setName] =
    useState(currentName);

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  async function handleUpdate(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const result =
        await authClient.updateUser({
          name: name.trim(),
        });

      if (result.error) {
        toast.error(
          result.error.message ??
            "আপডেট ব্যর্থ হয়েছে"
        );
        return;
      }

      toast.success(
        "প্রোফাইল আপডেট হয়েছে"
      );

      router.push("/profile");
      router.refresh();
    } catch {
      toast.error(
        "তথ্য আপডেট করা যায়নি"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="rounded-2xl bg-white p-8 shadow-sm"
    >
      <label className="mb-2 block font-semibold">
        আপনার নাম
      </label>

      <input
        type="text"
        required
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        className="input mb-5 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn btn-success w-full text-white"
      >
        {loading
          ? "আপডেট হচ্ছে..."
          : "Update Information"}
      </button>
    </form>
  );
}
