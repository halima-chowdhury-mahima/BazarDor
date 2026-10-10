import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();

  // Top 6 price increases
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 price decreases
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f1f7f2]">

      {/* =========================
    HERO BANNER
========================= */}

<section className="mx-auto w-full max-w-[1050px] px-5 pt-5 pb-8">
  <div className="grid min-h-[250px] items-center gap-4 overflow-hidden rounded-[22px] border border-[#e0e9e1] bg-white px-5 py-5 sm:px-8 md:grid-cols-[1.4fr_1fr] md:px-10">

    {/* LEFT CONTENT */}

    <div className="relative z-10 text-center md:text-left">

      <span className="mb-3 inline-block rounded-full bg-[#e4f5e9] px-3 py-1 text-xs font-medium text-[#16803d]">
        {banglaDate()}
      </span>

      <h1 className="text-2xl font-extrabold leading-tight text-[#1c2920] sm:text-3xl lg:text-[34px]">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-gray-500 md:mx-0">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ
        এবং দামের পরিবর্তন এক জায়গায়।
      </p>

      <Link
        href="#সব-পণ্য"
        className="btn btn-success btn-sm mt-6 border-none bg-[#07833f] px-6 text-white hover:bg-[#066b34]"
      >
        সব পণ্য দেখুন
      </Link>

    </div>

    {/* RIGHT BANNER IMAGE */}

    <div className="relative flex h-[220px] items-center justify-center sm:h-[250px] md:h-[260px]">

      <Image
        src="/images/bazar-hero.png"
        alt="বাজার দর - ফল ও সবজির ঝুড়ি"
        width={700}
        height={600}
        priority
        sizes="(max-width: 768px) 90vw, 500px"
        className="h-[230px] w-auto max-w-none object-contain sm:h-[260px] md:h-[300px]"
      />

    </div>

  </div>
</section>

      {/* =========================
          TODAY PRICE INCREASE
      ========================== */}

      <section className="mx-auto w-full max-w-[1050px] px-5 py-9">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl bg-green-100 p-3 text-green-700">
            <TrendingUp size={22} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              আজ দাম বেড়েছে ▲
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আজকের সর্বোচ্চ মূল্যবৃদ্ধির ৬টি পণ্য
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {risers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

      {/* =========================
          TODAY PRICE DECREASE
      ========================== */}

      <section className="mx-auto w-full max-w-[1050px] px-5 py-9">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl bg-red-100 p-3 text-red-600">
            <TrendingDown size={22} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              আজ দাম কমেছে ▼
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আজকের সর্বোচ্চ মূল্যহ্রাসের ৬টি পণ্য
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {fallers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

      {/* =========================
          ALL PRODUCTS
      ========================== */}

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-6xl scroll-mt-10 px-4 pt-9 pb-16"
      >

        <div className="mb-7">

          <span className="text-xs font-semibold text-green-700">
            আমাদের পণ্যসমূহ
          </span>

          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">
            আপনার প্রয়োজনীয় নিত্যপ্রয়োজনীয় সকল
            পণ্যের আজকের বাজারদর এক জায়গায়।
            বিস্তারিত জানতে যেকোনো পণ্যে ক্লিক করুন।
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

      </section>

    </main>
  );
}