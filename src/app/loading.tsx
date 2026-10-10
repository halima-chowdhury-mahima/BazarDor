export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="skeleton mb-10 h-60 w-full rounded-2xl" />

      <div className="skeleton mb-6 h-8 w-60" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-5"
          >
            <div className="skeleton mb-4 h-14 w-14" />

            <div className="skeleton mb-3 h-5 w-3/4" />

            <div className="skeleton mb-4 h-4 w-1/2" />

            <div className="skeleton h-8 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  );
}