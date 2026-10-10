"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import type { Category } from "@/types";
import { authClient } from "@/lib/auth-client";

interface NavbarProps {
  categories: Category[];
  date: string;
}

export default function Navbar({
  categories,
  date,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(
          result.error.message || "সাইন আউট করা যায়নি"
        );
        return;
      }

      setProfileOpen(false);
      setMenuOpen(false);

      toast.success("সাইন আউট সফল হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  }

  return (
    <header className="relative z-50 w-full border-b border-[#e6ebe7] bg-white">

      {/* ================= TOP NAVBAR ================= */}

      <div className="mx-auto flex w-full max-w-[1050px] items-center justify-between gap-4 px-5 py-3">

        {/* LEFT SIDE — LOGO */}

        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#07883D] text-[26px] sm:h-[60px] sm:w-[60px] sm:text-[32px]">
            🛒
          </div>

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-[23px] font-extrabold leading-tight text-[#173323] sm:text-[30px]">
              বাজার দর
            </h1>

            <p className="mt-1 text-[10px] font-medium text-gray-500 sm:text-[12px]">
              {date}
            </p>
          </div>
        </Link>

        {/* RIGHT SIDE — AUTH */}

        <div className="flex shrink-0 items-center gap-2">

          {isPending ? (
            <div className="skeleton h-9 w-24 rounded-lg" />
          ) : user ? (

            /* LOGGED IN USER */

            <div
              ref={dropdownRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-[#f0f7f2]"
              >

                {/* AVATAR */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e3f3e8]">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={19}
                      className="text-[#07883D]"
                    />
                  )}
                </div>

                {/* USER NAME */}

                <span className="hidden max-w-[120px] truncate text-[13px] font-medium text-[#26372b] sm:block">
                  {user.name}
                </span>

                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[100] mt-2 w-[255px] max-w-[calc(100vw-24px)] rounded-2xl border border-[#e8eeea] bg-white p-3 shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
                >

                  {/* USER INFO */}

                  <div className="border-b border-gray-100 px-2 pb-3">
                    <p className="truncate text-[13px] font-bold text-gray-900">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {/* PROFILE LINK */}

                  <div className="pt-2">
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[12px] text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <UserRound size={16} />
                      আমার প্রোফাইল
                    </Link>

                    {/* SIGN OUT */}

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[12px] text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : (

            /* NOT LOGGED IN */

            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-[12px] font-semibold text-[#26372b] transition hover:bg-green-50 hover:text-green-700 sm:px-4 sm:text-[13px]"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#07883D] px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-[#067333] sm:px-4 sm:text-[13px]"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-green-50 md:hidden"
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* ================= CATEGORY NAVBAR ================= */}

      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className={`border-t border-[#edf0ed] ${
          menuOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="mx-auto flex w-full max-w-[1050px] flex-wrap items-center justify-center gap-1.5 px-5 py-2">

          {/* ALL PRODUCTS */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors ${
              pathname === "/"
                ? "bg-[#e8f6ec] text-[#07883D]"
                : "text-[#3c4b40] hover:bg-[#f0f8f2] hover:text-[#07883D]"
            }`}
          >
            সব পণ্য
          </Link>

          {/* CATEGORY ITEMS */}

          {categories.map((category) => {
            const active =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-[#e8f6ec] text-[#07883D]"
                    : "text-[#3c4b40] hover:bg-[#f0f8f2] hover:text-[#07883D]"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}