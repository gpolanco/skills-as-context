# DDD Project Structure

This reference defines **WHERE** to place DDD components, not HOW to implement them.

## When to Use DDD Structure

Use DDD organization when:

- Complex business rules with invariants
- Multiple bounded contexts
- Rich domain models (not simple CRUD)
- Large teams requiring clear boundaries
- Need domain events

**Don't use** for simple CRUD apps, prototypes, or small projects.

---

## Structure Decision

```text
Single Project (1 app)          → src/features/core/
Monorepo (multiple apps)        → packages/@scope/domain + @scope/infrastructure
```

---

## Single Repo Structure

Use when you have **one application** with complex domain logic.

```text
src/
  features/
    core/
      app/                    # Application layer (use cases)
        services/
          *.service.ts       # Use case implementations

      domain/                 # Domain layer (business logic)
        constants/
          *.ts
        errors/
          *.error.ts         # Domain exceptions
        models/
          *.ts               # Entities (User, Order, etc.)
        repositories/
          *.repository.ts    # Repository interfaces ONLY
        services/
          *.service.ts       # Domain services
        value-objects/
          *.ts               # Value objects (Email, UserId, etc.)

      infra/                  # Infrastructure layer
        db/
          schema.ts          # Database schema
          client.ts
        mappers/
          *.mapper.ts        # Domain ↔ Persistence
        repositories/
          *.repository.ts    # Repository implementations
```

### Layer Rules (Single Repo)

```text
app/     → domain/  (orchestrates use cases)
         ← infra/   (uses repositories)

domain/  → NOTHING  (pure business logic, no external deps)

infra/   → domain/  (implements domain interfaces)
```

### Import Examples (Single Repo)

```typescript
// ✅ App layer
import { UserRepository } from "@/features/core/domain/repositories/user-repository";
import { User } from "@/features/core/domain/models/user";

// ✅ Infra layer
import { UserRepository } from "@/features/core/domain/repositories/user-repository";
import { User } from "@/features/core/domain/models/user";

// ✅ Domain layer
import { Email } from "./value-objects/email";
import { UserId } from "./value-objects/user-id";

// ❌ Domain importing infra
import { PrismaClient } from "@/features/core/infra/db/client"; // NEVER
```

---

## Monorepo Structure

Use when you have **multiple applications** sharing domain logic.

```text
packages/
  @myapp/domain/              # Pure domain logic (shared)
    src/
      user/                   # Bounded context
        constants/
        errors/
          *.error.ts
        models/
          user.ts            # Entity
        repositories/
          user-repository.ts # Interface
        services/
          *.service.ts
        value-objects/
          email.ts
          user-id.ts

      billing/                # Another bounded context
        models/
        repositories/
        ...

      shared/                 # Cross-context shared
        types/
        errors/

    package.json
    tsconfig.json

  @myapp/infrastructure/      # Technical implementations
    src/
      persistence/
        prisma/
          schema.prisma
        mappers/
          user-mapper.ts
        repositories/
          prisma-user-repository.ts

      http/
        clients/

      messaging/
        queues/

    package.json
    tsconfig.json

apps/
  web/                        # Next.js app
    src/
      app/                    # App router
      features/
        auth/
          components/
          actions/           # Uses @myapp/domain + @myapp/infrastructure
    package.json

  api/                        # Express/Fastify API
    src/
      modules/
        users/
          controllers/
          use-cases/         # Uses @myapp/domain + @myapp/infrastructure
    package.json
```

### Layer Rules (Monorepo)

```text
@myapp/domain         → NOTHING  (zero external deps)
@myapp/infrastructure → @myapp/domain
apps/*                → @myapp/domain + @myapp/infrastructure
```

### Package Dependencies (Monorepo)

```json
// packages/@myapp/domain/package.json
{
  "name": "@myapp/domain",
  "dependencies": {}  // NO dependencies!
}

// packages/@myapp/infrastructure/package.json
{
  "name": "@myapp/infrastructure",
  "dependencies": {
    "@myapp/domain": "workspace:*",
    "prisma": "^5.0.0"
  }
}

// apps/web/package.json
{
  "dependencies": {
    "@myapp/domain": "workspace:*",
    "@myapp/infrastructure": "workspace:*"
  }
}
```

### Import Examples (Monorepo)

```typescript
// ✅ Infrastructure package
import { User } from "@myapp/domain/user/models/user";
import { UserRepository } from "@myapp/domain/user/repositories/user-repository";

// ✅ App (web/api)
import { User } from "@myapp/domain/user/models/user";
import { PrismaUserRepository } from "@myapp/infrastructure/persistence/repositories/prisma-user-repository";

// ❌ Domain importing infrastructure
import { PrismaClient } from "@myapp/infrastructure/persistence/prisma/client"; // NEVER
```

---

## File Naming Conventions

| Type                      | Naming                        | Example                     |
| ------------------------- | ----------------------------- | --------------------------- |
| Entities                  | `{name}.ts`                   | `user.ts`, `order.ts`       |
| Value Objects             | `{name}.ts`                   | `email.ts`, `user-id.ts`    |
| Repository Interface      | `{name}-repository.ts`        | `user-repository.ts`        |
| Repository Implementation | `{tech}-{name}-repository.ts` | `prisma-user-repository.ts` |
| Domain Service            | `{name}-service.ts`           | `user-domain-service.ts`    |
| App Service (Use Case)    | `{action}-{name}-service.ts`  | `create-user-service.ts`    |
| Mapper                    | `{name}-mapper.ts`            | `user-mapper.ts`            |
| Domain Error              | `{name}-error.ts`             | `user-errors.ts`            |

---

## What Goes Where

### `domain/models/`

- Entities (objects with identity)
- Aggregates (cluster of entities)
- **Files**: `user.ts`, `order.ts`, `product.ts`

### `domain/value-objects/`

- Immutable objects without identity
- Defined by their attributes
- **Files**: `email.ts`, `user-id.ts`, `money.ts`, `address.ts`

### `domain/repositories/`

- Repository **interfaces** only
- No implementations
- **Files**: `user-repository.ts`, `order-repository.ts`

### `domain/services/`

- Business logic not belonging to a single entity
- Orchestrates multiple entities
- **Files**: `user-domain-service.ts`, `pricing-service.ts`

### `domain/errors/`

- Domain-specific exceptions
- **Files**: `user-errors.ts`, `order-errors.ts`

### `app/services/`

- Use cases / application services
- Orchestrates domain + infra
- **Files**: `create-user-service.ts`, `update-order-service.ts`

### `infra/db/`

- Database schema
- Database client/connection
- **Files**: `schema.prisma`, `client.ts`, `migrations/`

### `infra/mappers/`

- Translate domain ↔ persistence
- **Files**: `user-mapper.ts`, `order-mapper.ts`

### `infra/repositories/`

- Repository **implementations**
- Concrete persistence logic
- **Files**: `prisma-user-repository.ts`, `mongo-order-repository.ts`

---

## Bounded Contexts (Monorepo)

Organize by business domain:

```text
packages/@myapp/domain/src/
  user/              # Identity & Access context
    models/
    repositories/
    services/
    value-objects/

  billing/           # Billing context
    models/
    repositories/
    ...

  catalog/           # Product catalog context
    models/
    repositories/
    ...
```

**Rules:**

- Each context is self-contained
- Cross-context communication via domain events (not direct imports)
- Shared kernel in `shared/`

---

## Migration from Simple Structure

### Step 1: Create DDD folders

```bash
# Single repo
mkdir -p src/features/core/{app/services,domain/{models,repositories,services,value-objects,errors},infra/{db,mappers,repositories}}

# Monorepo
mkdir -p packages/@myapp/domain/src/{user,billing}
mkdir -p packages/@myapp/infrastructure/src/{persistence,http,messaging}
```

### Step 2: Move existing code

```bash
# Move models
mv src/features/auth/types/user.ts src/features/core/domain/models/user.ts

# Move repository interfaces
mv src/features/auth/repositories/user-repository.ts src/features/core/domain/repositories/

# Move implementations
mv src/features/auth/repositories/prisma-user-repository.ts src/features/core/infra/repositories/
```

### Step 3: Update imports

Follow the layer dependency rules above.

---

## Key Principles

1. **Domain is pure**: No external dependencies, no framework code
2. **Infra implements domain**: Concrete implementations of domain interfaces
3. **App orchestrates**: Use cases coordinate domain + infra
4. **One-way dependencies**: Domain → Nothing, Infra → Domain, App → Domain + Infra
5. **Repository pattern**: Interfaces in domain, implementations in infra
6. **Bounded contexts**: Clear boundaries between business domains (monorepo)

---

## Anti-Patterns

### ❌ Domain importing Infrastructure

```typescript
// domain/models/user.ts
import { prisma } from "@/features/core/infra/db/client"; // NEVER
```

### ❌ Mixing layers in same file

```typescript
// Bad: domain + infra in one file
export class User {
  /* entity */
}
export class PrismaUserRepository {
  /* infra */
}
```

### ❌ Repository implementation in domain

```text
domain/
  repositories/
    prisma-user-repository.ts  # ❌ This is infrastructure!
```

### ❌ Framework code in domain

```typescript
// domain/models/user.ts
import { NextRequest } from "next/server"; // ❌ Framework in domain
```

---

## Resources

For DDD **implementation** patterns (Entities, Value Objects, Aggregates), see:

- Create a separate `ddd-patterns` skill
- Or reference official DDD books/resources

This document is **structure only**.
