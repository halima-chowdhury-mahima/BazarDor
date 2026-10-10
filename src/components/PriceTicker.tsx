import Link from "next/link";
import type { Product } from "@/types";
import {
  bn,
  changeText,
  unitLabel,
} from "@/lib/format";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="ticker-container border-b border-green-100 bg-white">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="ticker-group"
            aria-hidden={copy === 1}
          >
            {products.map((product) => (
              <Link
                key={`${copy}-${product.id}`}
                href={`/product/${product.slug}`}
                tabIndex={copy === 1 ? -1 : 0}
                className="ticker-item"
              >
                <span className="text-base">
                  {product.image}
                </span>

                <span className="font-medium text-gray-700">
                  {product.nameBn}
                </span>

                <span className="text-gray-500">
                  {bn(product.today)} টাকা/
                  {unitLabel(product.unit)}
                </span>

                <span
                  className={
                    product.change.dir === "up"
                      ? "font-bold text-red-600"
                      : product.change.dir === "down"
                        ? "font-bold text-green-700"
                        : "text-gray-500"
                  }
                >
                  {changeText(product)}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}