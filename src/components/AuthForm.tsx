
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "signin" | "signup";
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.1 5.1 0 0 1-2.2 3.34v2.77h3.57c2.09-1.92 3.27-4.75 3.27-8.12Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.29-2.63l-3.57-2.77c-.99.66-2.25 1.05-3.72 1.05-2.86 0-5.28-1.93-6.15-4.53H2.16v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.85 14.12a6.6 6.6 0 0 1 0-4.24V7.04H2.16a11 11 0 0 0 0 9.92l3.69-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.35c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 1.89 14.97.9 12 .9a11 11 0 0 0-9.84 6.14l3.69 2.84C6.72 7.28 9.14 5.35 12 5.35Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.08-1.24-5.08-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.09 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export default function AuthForm({ mode }: AuthFormProps) {
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
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
            result.error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
          );
          return;
        }

        toast.success("রেজিস্ট্রেশন সফল হয়েছে");
        await authClient.signOut();
        router.push("/signin");
        router.refresh();
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          toast.error(result.error.message ?? "লগইন ব্যর্থ হয়েছে");
          return;
        }

        toast.success("লগইন সফল হয়েছে");
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      toast.error("সার্ভারের সঙ্গে সংযোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  async function socialLogin(provider: "google" | "github") {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Social Login ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("Social Login চালু করা যায়নি");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <div className="mb-7 text-center">
        <div className="mb-4 text-5xl">🛒</div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          বাজার দর-এ আপনাকে স্বাগতম
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <label className="block text-sm font-semibold text-gray-700">
            আপনার নাম
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              className="input mt-2 w-full"
            />
          </label>
        )}

        <label className="block text-sm font-semibold text-gray-700">
          ইমেইল
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@gmail.com"
            className="input mt-2 w-full"
          />
        </label>

        <label className="block text-sm font-semibold text-gray-700">
          পাসওয়ার্ড
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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

      <div className="divider my-5 text-xs text-gray-400">অথবা</div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => socialLogin("google")}
          className="btn btn-outline border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => socialLogin("github")}
          className="btn btn-outline border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
        >
          <GitHubIcon />
          <span>GitHub</span>
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignup ? "আগেই অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link
          href={isSignup ? "/signin" : "/signup"}
          className="font-bold text-green-700 hover:underline"
        >
          {isSignup ? "সাইন ইন" : "সাইন আপ"}
        </Link>
      </p>
    </div>
  );
}
