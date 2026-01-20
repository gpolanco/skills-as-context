---
name: supabase
description: >
  Supabase patterns for Next.js: SSR auth, RLS, and data access.
  Trigger: Use when working with Supabase (auth, database, RLS policies).
license: Apache-2.0
metadata:
  author: gpolanco
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Working with Supabase"
allowed-tools: Read
---

# Supabase with Next.js

## When to Use

- Setting up Supabase auth
- Querying data from Server Components
- Creating RLS policies

**Cross-references:**

- For Next.js patterns → See `nextjs` skill
- For React patterns → See `react-19` skill

---

## ALWAYS

- **Use Server Client** for ALL data operations
- **Use Browser Client** ONLY for auth UI (login/logout)
- **Use `getClaims()`** to validate tokens (not `getSession()`)
- **Enable RLS** on ALL tables
- **Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`** (not legacy `ANON_KEY`)
- **Validate via RLS policies**, not application code

## NEVER

- Never query data from Client Components
- Never use `getSession()` in server code
- Never expose `service_role` key in client
- Never use `@supabase/auth-helpers-nextjs` (deprecated)

## DEFAULTS

- Data access: Server Components + Server Actions
- Auth UI: Client Components
- Session refresh: proxy.ts / middleware.ts
- prefer server client over browser client for data operations

---

## Quick Reference

### Install

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

### Environment

```env
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<key>
```

### Data Pattern

```typescript
// ✅ Server Component - use server client
import { createClient } from "@/lib/supabase/server";

export const UserList: React.FC = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("users").select();
  return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
};

// ❌ Client Component - NEVER query data
"use client";
const supabase = createClient();
supabase.from("users").select(); // WRONG!
```

### Auth Check

```typescript
// Protected layout
const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) redirect("/login");
```

### RLS Quick Pattern

```sql
-- Users read own data
CREATE POLICY "read_own" ON profiles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);
```

---

## Resources

- **Full Auth Setup**: [reference/auth-nextjs.md](reference/auth-nextjs.md) - Complete workflow
- **RLS Patterns**: [reference/rls-patterns.md](reference/rls-patterns.md) - Policy examples
- **Official Docs**: [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
