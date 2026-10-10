import Link from "next/link";

import { headers } from "next/headers";

import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

import {
  bn,
  changeText,
  unitLabel,
} from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?redirect=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  const markets = product.markets;

  const minimum = Math.min(
    ...markets.map((market) => market.min)
  );

  const maximum = Math.max(
    ...markets.map((market) => market.max)
  );

  const average =
    markets.reduce(
      (total, market) =>
        total + (market.min + market.max) / 2,
      0
    ) / markets.length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/"
        className="text-sm text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      {/* PRODUCT SUMMARY */}

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-green-50 p-6 text-6xl">
            {product.image}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-gray-500">
              {product.categoryNameBn} •{" "}
              {unitLabel(product.unit)}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              বিভিন্ন বাজারে{" "}
              {product.nameBn}-এর সর্বশেষ
              মূল্য ও বাজারভিত্তিক তুলনা।
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-5">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-extrabold text-green-800">
              {bn(product.today)} ৳
            </p>

            <p className="mt-1 text-sm">
              {changeText(product)}
            </p>
          </div>
        </div>
      </div>

      {/* PRICE SUMMARY */}

      <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            name: "সর্বনিম্ন দাম",
            value: minimum,
          },
          {
            name: "সর্বোচ্চ দাম",
            value: maximum,
          },
          {
            name: "গড় দাম",
            value: average,
          },
        ].map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {item.name}
            </p>

            <p className="mt-3 text-2xl font-extrabold text-green-700">
              {bn(
                item.value,
                item.name === "গড় দাম" ? 2 : 0
              )}{" "}
              ৳
            </p>
          </div>
        ))}
      </div>

      {/* MARKET PRICES */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            প্রতিটি বাজারের সর্বনিম্ন,
            সর্বোচ্চ ও মধ্যবর্তী দাম
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-green-50">
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
                <th>মধ্যবর্তী দাম</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => (
                <tr key={index}>
                  <td>{market.market}</td>

                  <td>{market.division}</td>

                  <td className="text-green-700">
                    {bn(market.min)} ৳
                  </td>

                  <td className="text-red-600">
                    {bn(market.max)} ৳
                  </td>

                  <td>
                    {bn(
                      (market.min + market.max) / 2,
                      2
                    )}{" "}
                    ৳
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}