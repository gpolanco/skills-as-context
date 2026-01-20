---
name: developing-with-nextjs
description: >
  Enforces Next.js App Router patterns: routing, caching, middleware, and metadata.
  Trigger: Use when creating routes, configuring caching, setting up middleware, or handling Next.js-specific APIs.
license: Apache-2.0
metadata:
  author: devcontext
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Writing Next.js code"
allowed-tools: Read
---

# Developing with Next.js (App Router)

## When to Use

Use this skill for **Next.js-specific** patterns:

- App Router routing conventions
- Caching and revalidation
- Middleware configuration
- Metadata API
- Route Handlers (webhooks, public APIs)
- Loading and error boundaries

**Cross-references:**

- For React patterns (hooks, Server Actions) → See `react-19` skill
- For project structure (features/, imports) → See `structuring-projects` skill

---

## Critical Patterns

### ALWAYS

- **Use App Router** - Never use Pages Router for new projects
- **Implement `loading.tsx`** for every major route segment
- **Implement `error.tsx`** for graceful error handling
- **Use `generateMetadata()`** for dynamic SEO
- **Use `next/image`** with width/height to prevent CLS
- **Use `next/font`** for optimized font loading
- **Validate env vars at build time** with Zod schema
- **Use Route Handlers only for** webhooks and public APIs

### NEVER

- **Never use Pages Router patterns** (`getServerSideProps`, `getStaticProps`)
- **Never create Route Handlers for internal mutations** → Use Server Actions (react-19)
- **Never use `router.push()` for form submissions** → Use Server Actions with `redirect()`
- **Never import `next/router`** → Use `next/navigation` in App Router

### DEFAULTS

- `loading.tsx` and `error.tsx` at route segment level
- Metadata via `generateMetadata()` function
- Static generation by default, opt-in to dynamic with `cache: 'no-store'`

---

## Decision Tree

```
Creating a new page?        → page.tsx (default export async function)
Need loading state?         → Add loading.tsx in same folder
Need error handling?        → Add error.tsx ('use client') in same folder
Sharing layout?             → Use layout.tsx
Need metadata?              → Export generateMetadata()
Public API / webhook?       → Use route.ts (Route Handler)
Internal mutation?          → Use Server Action (see react-19 skill)
Need middleware?            → middleware.ts at project root
```

---

## App Router File Conventions

```text
app/
├── layout.tsx              # Root layout (required)
├── page.tsx                # Home page (/)
├── loading.tsx             # Loading UI for /
├── error.tsx               # Error UI for / ('use client')
├── not-found.tsx           # 404 page
├── (auth)/                 # Route group (no URL segment)
│   ├── login/page.tsx      # /login
│   └── register/page.tsx   # /register
├── dashboard/
│   ├── layout.tsx          # Nested layout
│   ├── page.tsx            # /dashboard
│   ├── loading.tsx
│   ├── error.tsx
│   └── [id]/               # Dynamic segment
│       └── page.tsx        # /dashboard/123
├── api/                    # Route Handlers (public APIs only)
│   └── webhooks/
│       └── stripe/route.ts
└── [...slug]/              # Catch-all segment
    └── page.tsx
```

---

## Metadata API

```typescript
// Static metadata
export const metadata = {
  title: "Dashboard",
  description: "User dashboard",
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      images: [product.image],
    },
  };
}
```

---

## Caching & Revalidation

```typescript
// Static (cached indefinitely) - DEFAULT
const data = await fetch("https://api.example.com/data");

// Time-based revalidation (ISR)
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 }, // Revalidate every 60s
});

// No cache (always fresh)
const data = await fetch("https://api.example.com/data", {
  cache: "no-store",
});

// On-demand revalidation (in Server Action)
import { revalidatePath, revalidateTag } from "next/cache";

revalidatePath("/products"); // Revalidate path
revalidateTag("products"); // Revalidate by tag
```

---

## Route Handlers (Webhooks/Public APIs)

**Only use for:**

- External webhooks (Stripe, GitHub)
- Public APIs consumed by third parties

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  // Verify and process webhook
  const event = await verifyStripeWebhook(body, signature);

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutComplete(event.data.object);
      break;
  }

  return Response.json({ received: true });
}
```

---

## Middleware

```typescript
// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Auth check example
  const token = request.cookies.get("session");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

---

## Loading & Error States

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Environment Variables

```typescript
// lib/env.ts - Validate at build time
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

**Naming:**

- `NEXT_PUBLIC_*` → Available in browser
- Others → Server-only (secrets)

---

## Commands

```bash
# Create new Next.js project
pnpm create next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Development
pnpm dev

# Build & type check
pnpm build
pnpm tsc --noEmit
```

---

## Resources

- **Architecture Deep Dive**: [reference/architecture.md](reference/architecture.md)
- **Templates**: [assets/](assets/) (page, loading, error)
- **React Patterns**: See `react-19` skill
- **Project Structure**: See `structuring-projects` skill
- **Official Docs**: [Next.js Documentation](https://nextjs.org/docs)
