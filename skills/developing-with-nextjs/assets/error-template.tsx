"use client";

/**
 * Error Template
 *
 * Error boundaries must be Client Components.
 * This handles errors in the route segment.
 */

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-destructive">
        Something went wrong!
      </h2>

      <p className="mt-4 text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try again
        </button>

        <a
          href="/"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          Go home
        </a>
      </div>

      {/* Show error digest in development */}
      {process.env.NODE_ENV === "development" && error.digest && (
        <p className="mt-8 text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
    </main>
  );
}
