---
name: skill-creator
description: >
  Orchestrates the design and creation of high-quality AI Skills.
  Trigger: Use when the user asks to "create a skill", "standardize a workflow", "package a pattern", or "generate a rule set".
license: Apache-2.0
metadata:
  author: devcontext
  version: "2.0.0"
  scope: [root]
  auto_invoke: false  # Meta-skill: Manual invocation preferred with @skill-creator
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Skill Creator

## 🚨 CRITICAL: Reference Files are MANDATORY

**This SKILL.md provides OVERVIEW only. For EXACT patterns:**

| Task | MANDATORY Reading |
|------|-------------------|
| **Skill Design Standards** | ⚠️ [reference/skill-designer-core.md](reference/skill-designer-core.md) |

**⚠️ DO NOT generate a new skill without reading [skill-designer-core.md](reference/skill-designer-core.md) FIRST.**

---

## When to Use

Use this skill to transform raw requests into structured `agent-skills` folders when:

- A pattern repeats ≥ 3 times (Rule R1).
- The project needs specific "guardrails" for AI behavior.
- You need to package automation scripts with documentation.

**Do NOT use when:**

- The request is for a one-off task (create a snippet instead).
- The documentation already exists (just reference it).
- The scope is too broad (e.g., "database-skill"). Split it first.

## Critical Patterns (ALWAYS / NEVER)

You must enforce the design standards during generation:

### ALWAYS

- **Reusability Filter**: Ask "Will this be used at least 3 times?". If no, reject.
- **Single Responsibility**: One skill = One job. Split monolithic requests.
- **Progressive Disclosure**: `SKILL.md` < 500 lines. Move heavy content to `reference/`.
- **Add "When to use"** context for each code example.
- **Add cross-references** to related skills (e.g., "For React patterns → See `react-19`").

### NEVER

- **Never define component structure** - That's `react-19`'s responsibility.
- **Never define file/folder locations** - That's `structuring-projects`'s responsibility.
- **Never define styling patterns** - That's `tailwind-4`'s responsibility.
- **Never duplicate content** between `SKILL.md` and `reference/`.
- **Never use external URLs** in `reference/`. Copy content locally.
- **Never generate a skill** without a specific `Trigger` in the description.

---

## 🚫 Critical Anti-Patterns

- **DO NOT** generate a skill WITHOUT a specific `Trigger`.
- **DO NOT** define file/folder locations in the skill → let `structuring-projects` handle that.
- **DO NOT** duplicate content between `SKILL.md` and `reference/`.
- **DO NOT** use external URLs in `reference/` → always copy content locally.

---

## Workflow (The Factory Process)

1. **Analysis & Validation**:
   - Analyze the user request.
   - **CRITICAL**: Read `reference/skill-designer-core.md` to load the validation rules into context.
   - Validate if it meets Rule R1 (Reusability) and R3 (Responsibility).

2. **Scaffolding**:
   - Create the folder structure: `name-of-skill/` (kebab-case).
   - Create subfolders: `assets/`, `reference/`, `scripts/`.

3. **Drafting**:
   - Read `assets/SKILL-TEMPLATE.md`.
   - Populate the template. Ensure `metadata` and `allowed-tools` are correct based on the skill type (Knowledge vs Tool vs Hybrid).

4. **Quality Check**:
   - Run the "Validation Checklist" found in `skill-designer-core.md`.
   - Ensure strict Frontmatter compliance.

## Resources & References

- **Design Standards**: See [reference/skill-designer-core.md](reference/skill-designer-core.md). _Read this before generating._
- **Master Template**: See [assets/SKILL-TEMPLATE.md](assets/SKILL-TEMPLATE.md).
