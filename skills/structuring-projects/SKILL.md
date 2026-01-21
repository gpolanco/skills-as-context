---
name: structuring-projects
description: >
  Scaffolds project structures and enforces architectural patterns.
  Trigger: When organizing project files, creating features, setting up imports, or refactoring codebase structure.
license: Apache-2.0
metadata:
  author: gpolanco
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Organizing project structure"
allowed-tools: Read
---

## When to Use

- Setting up a new project structure
- Creating new features or modules
- Refactoring existing codebase organization
- Defining import aliases and module boundaries
- Organizing shared components and utilities

## Critical Patterns

### ALWAYS

- Use `src/` as the single source root
- Keep `app/` routing-only (no business logic)
- Organize by features, not by file types
- Use single alias `@/*` → `src/*`
- Place all tests in `/tests` directory
- Keep features self-contained and isolated

### NEVER

- Import internals from other features (`@/features/auth/utils/privateHelper`)
- Mix tests inside `src/`
- Use deep relative imports (`../../../../utils`)
- Create global `utils/` folders without clear ownership
- Create giant `types.ts` files
- Put Server Actions in `src/app/actions` (Move them to the corresponding feature/actions)

### DEFAULTS

- Features communicate via public APIs only
- Shared code lives in `features/shared/`
- Naming: `kebab-case` for files/folders

## Base Project Structure

```text
src/
  app/                    # Routing only (Next.js App Router)
  features/              # Feature modules
    <feature-name>/
      components/        # Feature components
      hooks/            # Feature hooks
      actions/          # Server actions
      types/            # Feature types
      utils/            # Feature utilities
      routes.ts         # Feature routes
    shared/             # Cross-feature infrastructure
      ui/              # UI components (not business logic)
      components/      # Shared components
      hooks/          # Shared hooks
      types/          # Shared types
  styles/              # Global styles
  types/               # Global types only
  config/              # Configuration

tests/                 # All tests here
```

## Naming Conventions

| Type                | Convention         | Example                             |
| ------------------- | ------------------ | ----------------------------------- |
| Files/Folders       | `kebab-case`       | `user-profile.tsx`, `auth-service/` |
| Components/Classes  | `PascalCase`       | `UserProfile`, `AuthService`        |
| Variables/Functions | `camelCase`        | `userName`, `getUserData()`         |
| Constants           | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`                   |

## Feature Structure

Each feature is a self-contained module:

```text
features/<feature-name>/
├── components/         # UI components
├── hooks/             # Custom hooks
├── actions/           # Server actions
├── types/             # TypeScript types
├── utils/             # Feature-specific utilities
└── routes.ts          # Route definitions
```

### Feature Isolation

```typescript
// ✅ Public API exports
// features/auth/index.ts
export { LoginForm } from "./components/login-form";
export { useAuth } from "./hooks/use-auth";
export type { User, AuthState } from "./types";

// ✅ Other features import via public API
import { LoginForm, useAuth } from "@/features/auth";

// ❌ NEVER: Direct internal imports
import { LoginForm } from "@/features/auth/components/login-form";
import { hashPassword } from "@/features/auth/utils/crypto"; // Private!
```

## Shared Infrastructure

`features/shared/` contains reusable infrastructure, NOT business logic:

```text
features/shared/
├── ui/               # Design system components
├── components/       # Generic components (Layout, ErrorBoundary)
├── hooks/           # Generic hooks (useDebounce, useLocalStorage)
└── types/           # Shared type utilities
```

**Rules:**

```text
// ✅ Infrastructure (no business logic)
features / shared / ui / button.tsx;
features / shared / hooks / use - debounce.ts;

// ❌ Business logic (belongs in feature)
features / shared / utils / calculate - tax.ts; // Move to features/billing/
features / shared / hooks / use - user - profile.ts; // Move to features/auth/
```

## Import Aliases

### Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Usage

```typescript
// ✅ ALWAYS: Use alias for cross-module imports
import { Button } from "@/features/shared/ui/button";
import { useAuth } from "@/features/auth";

// ✅ OK: Relative imports within same feature
import { LoginForm } from "./components/login-form";

// ❌ NEVER: Deep relative imports
import { Button } from "../../../../features/shared/ui/button";
```

## Architectural Patterns

Choose the architecture based on project complexity:

### 1. Simple Feature-Based (Default)

Use the structure shown above. Suitable for most projects.

### 2. Domain-Driven Design (DDD)

For complex business logic with rich domain models:

**When to use:**

- Complex business rules and invariants
- Multiple bounded contexts
- Need for domain events
- Large team requiring clear boundaries

**Implementation:** See [reference/ddd-rules.md](reference/ddd-rules.md) for complete DDD structure, rules, and patterns.

## Anti-Patterns to Avoid

### 1. God Folders

```text
// ❌ Everything dumped in utils
src/utils/
  auth.ts
  billing.ts
  user.ts
  ...

// ✅ Feature-specific utilities
features/auth/utils/
features/billing/utils/
```

### 2. Type Soup

```text
// ❌ Giant type file
src/types.ts (500+ lines)

// ✅ Distributed types
features/auth/types.ts
features/billing/types.ts
```

### 3. Cross-Feature Coupling

```typescript
// ❌ Feature coupling
import { getUserEmail } from "@/features/auth/utils/user";

// ✅ Use public API
import { getUserEmail } from "@/features/auth";
```

### 4. Business Logic in App Router

```typescript
// ❌ Logic in app/
export default async function Dashboard() {
  const user = await prisma.user.findUnique(...);
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  return <div>{total}</div>;
}

// ✅ Logic in feature
export default async function Dashboard() {
  const total = await getPendingTotal(userId);
  return <div>{total}</div>;
}
```

## Migration Strategy

### Step 1: Audit

```bash
# Find scattered utilities
find src -name "utils" -type d

# Find deep imports
grep -r "import.*\.\./\.\./\.\." src/
```

### Step 2: Create Structure

```bash
# Create feature manually
mkdir -p src/features/<feature-name>/{components,hooks,actions,types,utils}
touch src/features/<feature-name>/index.ts
touch src/features/<feature-name>/routes.ts

# Or create shared infrastructure
mkdir -p src/features/shared/{ui,components,hooks,types}
```

### Step 3: Move Files

```bash
# Move feature code
mv src/components/login-form.tsx src/features/auth/components/
mv src/hooks/use-auth.ts src/features/auth/hooks/
```

### Step 4: Update Imports

```bash
# Update to use @/ alias
find src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's|../../..|@|g'
```

### Step 5: Create Public APIs

```typescript
// features/auth/index.ts
export { LoginForm } from "./components/login-form";
export { useAuth } from "./hooks/use-auth";
export type { User } from "./types";
```

## Commands

```bash
# Create new feature structure
mkdir -p src/features/<feature-name>/{components,hooks,actions,types,utils}
touch src/features/<feature-name>/index.ts
touch src/features/<feature-name>/routes.ts

# Create shared infrastructure
mkdir -p src/features/shared/{ui,components,hooks,types}

# Audit existing structure
find src -name "utils" -type d
grep -r "import.*\.\./\.\./\.\." src/

# Find cross-feature imports (audit)
grep -r "import.*@/features/.*/.*/" src/features/

# Find deep relative imports
grep -r "import.*\.\./\.\./\.\." src/
```

## Resources

- **DDD Architecture**: See [reference/ddd-rules.md](reference/ddd-rules.md) for Domain-Driven Design patterns
