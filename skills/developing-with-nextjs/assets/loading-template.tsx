/**
 * Loading Template
 *
 * This file is rendered immediately while the page content loads.
 * Use skeleton components that match your page layout.
 */

const Loading = () => {
  return (
    <main className="container mx-auto px-4 py-8 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 w-64 bg-muted rounded" />

      {/* Content skeleton */}
      <section className="mt-8 space-y-4">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </section>

      {/* Card grid skeleton */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg" />
        ))}
      </div>
    </main>
  );
};

export default Loading;
