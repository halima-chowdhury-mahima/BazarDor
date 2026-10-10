import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/"
            className="text-xl font-bold text-green-800"
          >
            🛒 বাজার দর
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-md text-sm leading-7 text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর
          নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}