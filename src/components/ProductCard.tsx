import Link from "next/link";
import type { Product } from "@/types";

import {
  bn,
  unitLabel,
  changeText,
} from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const changeBadge =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block min-h-[112px] rounded-xl border border-[#e1e9e2] bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >
      {/* PRODUCT TOP */}

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#202c22]">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* PRODUCT PRICE */}

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-lg font-extrabold text-[#1e2921]">
            {bn(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full bg-[#f3f7f3] px-2.5 py-1 text-[11px] font-semibold ${changeBadge}`}
        >
          {changeText(product)}
        </span>
      </div>
    </Link>
  );
}