# AI Agent Guidelines for [PROJECT_NAME]

Instructions for AI coding assistants working on this project.

---

## Skills Reference

Use these skills for detailed patterns on-demand:

### Generic Skills

| Skill                  | Description                        | URL                                              |
| ---------------------- | ---------------------------------- | ------------------------------------------------ |
| `structuring-projects` | Project structure (features, DDD)  | [SKILL.md](skills/structuring-projects/SKILL.md) |
| `react-19`             | React 19 + React Compiler patterns | [SKILL.md](skills/react-19/SKILL.md)             |
| `typescript`           | Strict types, const patterns       | [SKILL.md](skills/typescript/SKILL.md)           |
| `nextjs-16`            | App Router, Server Components      | [SKILL.md](skills/nextjs-16/SKILL.md)            |
| `tailwind-4`           | cn() utility, responsive patterns  | [SKILL.md](skills/tailwind-4/SKILL.md)           |

<!-- Add more generic skills as needed -->

### Project-Specific Skills

| Skill             | Description   | URL                                |
| ----------------- | ------------- | ---------------------------------- |
| `[project-skill]` | [Description] | [SKILL.md](skills/[name]/SKILL.md) |

<!-- Add your project-specific skills here -->

---

## Auto-invoke Skills

When performing these actions, ALWAYS load the corresponding skill FIRST:

| Action                       | Skill                  |
| ---------------------------- | ---------------------- |
| Creating features or modules | `structuring-projects` |
| Writing React components     | `react-19`             |
| Creating TypeScript types    | `typescript`           |
| Building Next.js pages       | `nextjs-16`            |
| Styling with Tailwind        | `tailwind-4`           |

<!-- Add project-specific triggers -->

---

## Project Context

<!-- Customize this section for your project -->

**Tech Stack:**

- Frontend: Next.js 16, React 19, Tailwind 4
- Backend: [Your backend tech]
- Database: [Your database]
- Testing: [Your testing tools]

**Architecture:**

- [Describe your architecture: feature-based, DDD, etc.]
- [Key structural decisions]

**Structure:**

```
[project-root]/
├── src/
│   ├── app/              # [Description]
│   ├── features/         # [Description]
│   └── ...
├── tests/                # [Description]
└── ...
```

---

## Development Rules

### ALWAYS

- Follow the structure defined in `structuring-projects` skill
- Use TypeScript strict mode
- Validate inputs with Zod
- Write tests for new features
- Use feature-based organization
- Export via public APIs (`index.ts`)

### NEVER

- Use `any` type without explicit justification
- Put business logic in `app/` directory
- Import feature internals directly
- Skip error handling
- Hardcode environment variables

### DEFAULTS

- Features are isolated modules
- Shared code lives in `features/shared/`
- Tests mirror `src/` structure in `/tests`
- Use `@/` import alias

---

## Code Quality Standards

**Type Safety:**

- Const types for literal values
- No implicit `any`
- Strict null checks

**Testing:**

- Unit tests for logic
- Integration tests for features
- E2E tests for critical flows

**Styling:**

- Use design system tokens
- Mobile-first responsive
- Dark mode compatible

---

## Contribution Workflow

1. **Understand requirements** (read related skills)
2. **Plan structure** (use `structuring-projects`)
3. **Implement** (follow skill patterns)
4. **Test** (write tests first when possible)
5. **Document** (update README, add comments)
6. **Review** (self-review against skills)

---

## Common Commands

```bash
# Development
npm run dev

# Testing
npm test
npm run test:e2e

# Linting
npm run lint
npm run format

# Build
npm run build
```

---

## Resources

- [Project README](README.md)
- [Skills Documentation](skills/README.md)
- [Contributing Guide](CONTRIBUTING.md)
