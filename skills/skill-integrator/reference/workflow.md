# Skill Integration Workflow Guide

This document provides step-by-step instructions for AI assistants on how to perform a deep integration of skills into any project.

## Phase 1: Contextual Analysis

Before suggesting anything, you must understand the project's soul.

1.  **Read `package.json`**: Identify frameworks (Next.js, Vite, Express), styling (Tailwind, CSS Modules), and utilities (Zod, React Hook Form).
2.  **Check `AGENTS.md`**: Does it already exist? If so, what skills are already active?
3.  **Inspect Directory Structure**: Is it a monorepo? Feature-based? Layered architecture?

## Phase 2: The Pitch

Present your findings in a structured way.

```markdown
I've analyzed your project and found:

- **Next.js 15+** with App Router.
- **Tailwind CSS 4.0**.
- **Supabase** for Auth and DB.

I recommend importing the following skills from @build-a-skills:

1. `nextjs`: To ensure we use Server Components correctly.
2. `tailwind-4`: To enforce the new v4 cn() patterns.
3. `supabase`: To follow RLS and SSR auth best practices.

Shall I import these now? (This will create folders in `skills/`)
```

## Phase 3: The Import (Technical Steps)

When you have permission to import a skill (e.g., `skill-name`):

1.  **Source Discovery**: Locate the skill folder in the [community repository](https://github.com/gpolanco/skills-as-context/tree/main/skills).
2.  **Creation**: Create `skills/skill-name/` and `skills/skill-name/reference/`.
3.  **Transfer**:
    - Read the `SKILL.md` from the source.
    - Write it to the local project.
    - Repeat for all files in the `reference/` folder.
4.  **Verification**: Confirm the files are readable by you.

## Phase 4: Project Orchestration

A skill is useless if the AI doesn't know when to use it.

1.  **Update `AGENTS.md`**:
    - Add the skill to the "Available Skills" table.
    - Add it to the "Auto-invoke" table with a clear trigger.
2.  **Update `skills/README.md`**:
    - Add the skill to the catalog so the user has a visual inventory.

## Phase 5: Initialization (First Time Only)

If the project has NO agent context yet:

1.  Create the `skills/` folder.
2.  Import `skill-integrator` and `skill-creator`.
3.  Generate `AGENTS.md` using the `templates/AGENTS.template.md` as a base.
4.  Fill in the `{PROJECT_NAME}` and `{PROJECT_PURPOSE}` placeholders by inferring from existing docs.
