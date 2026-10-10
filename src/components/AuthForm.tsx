"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({
  mode,
}: AuthFormProps) {
  const isSignup = mode === "signup";

  const router = useRouter();
  const searchParams = useSearchParams();

  const target = searchParams.get("redirect") ?? "/";

  const redirectTo =
    target.startsWith("/") &&
    !target.startsWith("//") &&
    !target.startsWith("/\\")
      ? target
      : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
      );
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email,
          password,
        });

       if (result.error) {
  console.error("Signup error:", {
    code: result.error.code,
    status: result.error.status,
    message: result.error.message,
  });

  toast.error(
    result.error.message ||
      result.error.code ||
      "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
  );

  return;
}

        toast.success(
          "রেজিস্ট্রেশন সফল হয়েছে"
        );

        await authClient.signOut();

        router.push("/signin");
        router.refresh();
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          toast.error(
            result.error.message ??
              "লগইন ব্যর্থ হয়েছে"
          );
          return;
        }

        toast.success("লগইন সফল হয়েছে");

        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      toast.error(
        "সার্ভারের সঙ্গে সংযোগ করা যায়নি"
      );
    } finally {
      setLoading(false);
    }
  }

  async function socialLogin(
    provider: "google" | "github"
  ) {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
      });

      if (result.error) {
        toast.error(
          result.error.message ??
            "Social Login ব্যর্থ হয়েছে"
        );
      }
    } catch {
      toast.error(
        "Social Login চালু করা যায়নি"
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-7 text-center">
        <div className="mb-4 text-5xl">
          🛒
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          {isSignup
            ? "অ্যাকাউন্ট তৈরি করুন"
            : "সাইন ইন করুন"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          বাজার দর-এ আপনাকে স্বাগতম
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {isSignup && (
          <label className="block text-sm font-semibold">
            আপনার নাম

            <input
              type="text"
              required
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="আপনার পূর্ণ নাম"
              className="input mt-2 w-full"
            />
          </label>
        )}

        <label className="block text-sm font-semibold">
          ইমেইল

          <input
            type="email"
            required
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="example@gmail.com"
            className="input mt-2 w-full"
          />
        </label>

        <label className="block text-sm font-semibold">
          পাসওয়ার্ড

          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input mt-2 w-full"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success mt-2 w-full text-white"
        >
          {loading
            ? "অপেক্ষা করুন..."
            : isSignup
              ? "রেজিস্টার করুন"
              : "লগইন করুন"}
        </button>
      </form>

      <div className="divider text-xs">
        অথবা
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() =>
            socialLogin("google")
          }
          className="btn btn-outline"
        >
          Google
        </button>

        <button
          type="button"
          onClick={() =>
            socialLogin("github")
          }
          className="btn btn-outline"
        >
          GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignup
          ? "আগেই অ্যাকাউন্ট আছে? "
          : "অ্যাকাউন্ট নেই? "}

        <Link
          href={
            isSignup ? "/signin" : "/signup"
          }
          className="font-bold text-green-700 hover:underline"
        >
          {isSignup
            ? "সাইন ইন"
            : "সাইন আপ"}
        </Link>
      </p>
    </div>
  );
}