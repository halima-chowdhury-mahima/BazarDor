"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/types";

import ProductCard from "@/components/ProductCard";
import { sortProducts } from "@/lib/format";

type SortOption = "default" | "low" | "high";

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] =
    useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sort);
  }, [products, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          মোট{" "}
          {products.length.toLocaleString("bn-BD")} টি
          পণ্য
        </p>

        <label className="flex items-center gap-3">
          <span className="text-sm font-semibold">
            সাজান:
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as SortOption
              )
            }
            className="select bg-white"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low">
              দাম: কম থেকে বেশি
            </option>

            <option value="high">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}