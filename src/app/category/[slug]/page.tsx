import Link from "next/link";

import { notFound } from "next/navigation";

import {
  getCategory,
  getProductsByCategory,
} from "@/lib/api";

import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-4 py-12">
      <div className="mb-8 rounded-2xl border border-green-100 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-green-50 p-4 text-4xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরির সকল পণ্যের
              বাজারদর
            </p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <Link
            href="/"
            className="btn btn-success mt-5 text-white"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategoryProducts products={products} />
      )}
    </main>
  );
}