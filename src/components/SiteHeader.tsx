import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

import {
  getCategories,
  getProducts,
} from "@/lib/api";

import { banglaDate } from "@/lib/format";

export default async function SiteHeader() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <>
      <Navbar
        categories={categories}
        date={banglaDate()}
      />

      <PriceTicker products={products} />
    </>
  );
}