import type { Product } from "@/types";

export function bn(num: number, decimals?: number) {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 2,
  }).format(num);
}




export function unitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit] ?? `প্রতি ${unit}`;
}

export function changeText(product: Product) {
  const arrow =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return `${arrow} ${bn(Math.abs(product.change.pct), 1)}%`;
}

export function changeColor(product: Product) {
  if (product.change.dir === "up") {
    return "bg-green-50 text-green-700";
  }

  if (product.change.dir === "down") {
    return "bg-red-50 text-red-600";
  }

  return "bg-gray-100 text-gray-600";
}

export function banglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export function sortProducts(
  products: Product[],
  sort: "default" | "low" | "high"
) {
  const items = [...products];

  if (sort === "low") {
    return items.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    return items.sort((a, b) => b.today - a.today);
  }

  return items;
}