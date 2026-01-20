# {Project Name} - AI Agent Ruleset

> **Skills Reference**: For detailed patterns, use these skills:
>
> - [`structuring-projects`](skills/structuring-projects/SKILL.md) - Feature-based architecture, DDD
> - [`react-19`](skills/react-19/SKILL.md) - No useMemo/useCallback, React Compiler
> - [`nextjs`](skills/nextjs/SKILL.md) - App Router, caching, middleware
> - [`tailwind-4`](skills/tailwind-4/SKILL.md) - cn() utility, no var() in className
> - [`typescript`](skills/typescript/SKILL.md) - Const types, flat interfaces
> - [`zod-4`](skills/zod-4/SKILL.md) - Runtime validation patterns
> - [`{project-skill}`](skills/{project-skill}/SKILL.md) - Project-specific patterns

---

## Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action                              | Skill                  |
| ----------------------------------- | ---------------------- |
| App Router / Server Actions         | `nextjs`               |
| Creating Zod schemas                | `zod-4`                |
| Organizing project structure        | `structuring-projects` |
| Styling with Tailwind               | `tailwind-4`           |
| Writing React components            | `react-19`             |
| Writing TypeScript types/interfaces | `typescript`           |
| Working on {project} components     | `{project-skill}`      |

---

## CRITICAL RULES - NON-NEGOTIABLE

### React

- ALWAYS: `import { useState, useEffect } from "react"`
- NEVER: `import React`, `import * as React`
- NEVER: `useMemo`, `useCallback` (React Compiler handles optimization)

### Types

- ALWAYS: `const X = { A: "a", B: "b" } as const; type T = typeof X[keyof typeof X]`
- NEVER: `type T = "a" | "b"` (direct union types)

### Interfaces

- ALWAYS: One level depth only; object property → dedicated interface
- ALWAYS: Reuse via `extends`
- NEVER: Inline nested objects

### Styling

- Single class: `className="bg-slate-800 text-white"`
- Merge multiple: `className={cn(BASE_STYLES, variant && "variant-class")}`
- Dynamic values: `style={{ width: "50%" }}`
- NEVER: `var()` in className, hex colors in className

### Scope Rule

- Used 2+ places → shared folder (`lib/`, `types/`, `hooks/`, `components/shared/`)
- Used 1 place → keep local in feature directory

---

## DECISION TREES

### Component Placement

```
New component? → shadcn/ui + Tailwind first
Used 1 feature? → features/{feature}/components/
Used 2+ features? → features/shared/components/
Needs state/hooks? → "use client"
Server component? → No directive (default)
```

### Code Location

```
Server action       → features/{feature}/actions/
Data transform      → features/{feature}/lib/
Types (shared 2+)   → features/shared/types/
Types (local 1)     → features/{feature}/types/
Utils (shared 2+)   → features/shared/lib/
Utils (local 1)     → features/{feature}/lib/
Hooks (shared 2+)   → features/shared/hooks/
Hooks (local 1)     → features/{feature}/hooks/
```

---

## PATTERNS

### Server Component (Default)

```typescript
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}
```

### Server Action

```typescript
"use server";

import { revalidatePath } from "next/cache";

export async function updateItem(formData: FormData) {
  const validated = schema.parse(Object.fromEntries(formData));
  await updateDB(validated);
  revalidatePath("/items");
}
```

### Form + Validation

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const form = useForm({ resolver: zodResolver(schema) });
```

---

## TECH STACK

```
Next.js {version} | React 19 | TypeScript {version}
Tailwind 4 | shadcn/ui | Zod 4
{Add project-specific dependencies}
```

---

## PROJECT STRUCTURE

```
src/
├── app/                 # Next.js App Router (routing only)
├── features/            # Feature modules
│   ├── {feature}/
│   │   ├── components/
│   │   ├── actions/
│   │   ├── hooks/
│   │   └── types/
│   └── shared/          # Cross-feature infrastructure
│       ├── ui/
│       ├── components/
│       ├── hooks/
│       └── types/
├── config/              # App configuration
└── styles/              # Global CSS

tests/                   # Test files
```

---

## COMMANDS

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm lint:fix
pnpm test
```

---

## QA CHECKLIST BEFORE COMMIT

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint:fix` passes
- [ ] All UI states handled (loading, error, empty)
- [ ] No secrets in code (use `.env.local`)
- [ ] Server-side validation present
- [ ] Relevant tests pass
