# SKILL DESIGNER CORE - V5 HYBRID MODEL

This document defines the regulations for creating AI Skills. It recognizes that a Skill can be a **rules library** (Knowledge), an **automation tool** (Tool), or **both** (Hybrid).

---

## 1. Skill Typology

The agent must classify the skill into one of these categories based on its purpose:

### TYPE A: Knowledge Skill (Context/Governance)

**Philosophy:** "Teach me the project/framework rules"

**When to Use:**

- There are multiple valid ways to handle something, but we want to enforce a specific style.
- We need to document patterns and best practices.
- We want governance over architectural decisions.

**Characteristics:**

- Markdown files only (`SKILL.md` + `reference/`).
- `allowed-tools: Read` (read-only).
- `type: knowledge` in metadata (optional).
- Focused on ALWAYS/NEVER patterns.

**Real-world Examples:**

- `structuring-projects` - Code organization rules.
- `react-19` - React 19 patterns.
- `zod-4` - Validation patterns.
- `typescript` - Strict typing rules.
- `tailwind-4` - Utility-first CSS patterns.

**Structure:**

```
skill-name/
├── SKILL.md              # Core patterns, ALWAYS/NEVER
└── reference/            # Deep-dive guides
    ├── advanced.md
    └── migration.md
```

---

### TYPE B: Tool Skill (Automation)

**Philosophy:** "Do this repetitive task without errors"

**When to Use:**

- Deterministic and repetitive tasks.
- Mathematical operations or complex transformations.
- Code scaffolding.
- Complex algorithmic validations.

**Characteristics:**

- Executable scripts (`scripts/`).
- `allowed-tools: Read, Write, Bash` (execution).
- `type: tool` in metadata (optional).
- Scripts must be robust (error handling).

**Potential Examples:**

- `db-seed` - Populate DB with test data.
- `generate-sitemap` - Create `sitemap.xml`.
- `validate-translations` - Verify i18n files.

**Structure:**

```
skill-name/
├── SKILL.md              # How to execute, what it does
├── scripts/
│   ├── main.py
│   └── utils.py
└── assets/               # Templates if necessary
    └── config.json
```

---

### TYPE C: Hybrid Skill (The Gold Standard)

**Philosophy:** "Know the law and have the tool to enforce it"

**When to Use:**

- You need to teach rules AND provide automation.
- Rules are complex but execution is repetitive.
- You want governance + efficiency.

**Characteristics:**

- Markdown + Scripts.
- `allowed-tools: Read, Write, Bash`.
- `type: hybrid` in metadata (optional).
- `SKILL.md` orchestrates both worlds.

**Potential Examples:**

- `creating-components`
  - Reference: Naming and structure rules in `reference/naming.md`.
  - Tool: `scripts/scaffold_component.py` to generate files.
- `api-endpoints`
  - Reference: REST patterns, naming conventions.
  - Tool: `scripts/generate_endpoint.py` creates controller + types.

**Structure:**

```
skill-name/
├── SKILL.md              # Orchestrator: rules + how to use scripts
├── reference/            # Governance (deep rules)
│   └── patterns.md
├── scripts/              # Automation (repetitive tasks)
│   └── scaffold.py
└── assets/               # Templates
    └── template.tsx
```

---

## 2. Frontmatter Structure (Mandatory YAML)

```yaml
---
name: skill-name # Kebab-case, verb-noun (e.g., building-apis)
description: >
  Clear description of what it does and the explicit Trigger.
  Trigger: Use when...
license: Apache-2.0
metadata:
  type: knowledge # OPTIONAL: knowledge | tool | hybrid (inferred from allowed-tools)
  author: team-name
  version: "1.0.0" # Semantic versioning (X.Y.Z)
  scope: [root] # [root] or [directory_name]
  auto_invoke: false # false or descriptive string for read-only skills
allowed-tools: Read # Minimum required permissions
---
```

### Field Definitions

| Field               | Values                            | Description                                  |
| ------------------- | --------------------------------- | -------------------------------------------- |
| **`type`**          | `knowledge` \| `tool` \| `hybrid` | **OPTIONAL** - Skill typology (inferred)     |
| **`scope`**         | `[root]` \| `[dir]`               | Where the skill is available                 |
| **`auto_invoke`**   | `false` \| `"string"`             | false for tools/hybrid, string for knowledge |
| **`allowed-tools`** | `Read, Write, Bash, ...`          | Permissions (minimum necessary)              |

**Permission rules by type:**

- **Knowledge**: `Read` (read-only).
- **Tool**: `Read, Write, Bash` (execution needed).
- **Hybrid**: `Read, Write, Bash` (both needed).

---

## 3. `SKILL.md` File Structure

The body acts as an **orchestrator** and must include:

### A. Section: `When to Use` (Mandatory)

Define clear use cases.

```markdown
## When to Use

Use this skill when:

- [Case 1]
- [Case 2]
- [Case 3]
```

---

### B. Section: `Critical Patterns` (Mandatory)

The unbreakable rules (Governance).

```markdown
## Critical Patterns

### ALWAYS

- Rule 1
- Rule 2

### NEVER

- Anti-pattern 1
- Anti-pattern 2

### DEFAULTS

- Default convention 1
- Default convention 2
```

---

### C. Section: `Decision Tree` (Recommended)

For complex decisions.

```markdown
## Decision Tree
```

Condition A? → Action X
Condition B? → Action Y

```

```

---

### D. Section: `Actions` (Tool/Hybrid only)

How to execute scripts.

````markdown
## Actions

To scaffold a new feature:

```bash
python scripts/scaffold.py --name=auth
```
````

````

---

### E. Section: `Resources` (Mandatory)

Local references (Progressive Disclosure).

```markdown
## Resources

- **Advanced Patterns**: [reference/advanced.md](reference/advanced.md)
- **Migration Guide**: [reference/migration.md](reference/migration.md)
````

**IMPORTANT:** Local files only, no external URLs in `reference/`.

---

## 4. Progressive Disclosure Pattern

**Objective:** Keep `SKILL.md` < 500 lines.

**Strategy:**

1. **SKILL.md**: Core patterns, ALWAYS/NEVER, Decision Tree (< 500 lines).
2. **reference/**: Deep-dive guides, extensive examples, migration guides.
3. **assets/**: Templates, schemas, config examples.
4. **scripts/**: Automation (Tool/Hybrid only).

**Golden Rule:** If a topic requires > 100 lines of explanation → move to `reference/`.

---

## 5. Validation Checklist (Quality Gate)

The agent must verify these points before completion:

### Typology Validation

- [ ] **Knowledge**: Has `reference/` with markdown and `allowed-tools: Read`?
- [ ] **Tool**: Has executable `scripts/` and `allowed-tools` includes `Bash`?
- [ ] **Hybrid**: Has both?

**Note:** `type` field is optional - inferred from structure and permissions.

### Frontmatter

- [ ] **Complete Metadata**: type, author, version (X.Y.Z), scope, auto_invoke.
- [ ] **Explicit Trigger**: Description includes "Trigger: when...".
- [ ] **Minimum Permissions**: Only those necessary for the type.

### Content

- [ ] **SKILL.md < 500 lines**: Progressive Disclosure applied.
- [ ] **ALWAYS/NEVER defined**: Clear Critical Patterns.
- [ ] **Local References**: No external URLs in `reference/`.
- [ ] **Single Responsibility**: One well-defined "task".

### Scripts (Tool/Hybrid only)

- [ ] **Robustness**: Scripts handle their own errors.
- [ ] **Documentation**: `SKILL.md` explains how to execute.
- [ ] **Determinism**: Scripts "solve, don't punt" (don't delegate to user).

### Reusability

- [ ] **≥ 3 Uses**: The skill will be used at least 3 times.
- [ ] **Clear Trigger**: When to invoke can be clearly described.

---

## 6. Skill Naming

**Format:** `verb-noun` (kebab-case)

**Good Examples:**

- `structuring-projects` (implicit verb: organizing)
- `creating-components` (explicit verb)
- `managing-auth` (explicit verb)

**Bad Examples:**

- `react` (too generic)
- `database` (what to do with the DB?)
- `helpers` (no clear action)

**Exception:** Framework/Library skills can use the name directly IF they are pure Knowledge skills:

- `react-19` ✅ (library version + patterns)
- `zod-4` ✅ (library version + patterns)
- `tailwind-4` ✅ (library version + patterns)

---

## 7. Examples by Type

### Knowledge Skill Example

```yaml
---
name: react-19
type: knowledge
auto_invoke: "Writing React components"
allowed-tools: Read
---
## When to Use
- Writing React 19 components
- Using new React Compiler

## Critical Patterns
### ALWAYS
- Use Actions instead of useEffect for mutations
- Let React Compiler optimize (no manual memo)

### NEVER
- Use useMemo/useCallback with React Compiler
- Mutate state directly
```

### Tool Skill Example

````yaml
---
name: scaffolding-features
type: tool
auto_invoke: false
allowed-tools: Read, Write, Bash
---
## When to Use
- Creating new feature modules

## Actions
```bash
python scripts/scaffold.py --feature=auth --type=simple
````

## What It Does

- Creates folder structure
- Generates index.ts with exports
- Creates types.ts skeleton

````

### Hybrid Skill Example
```yaml
---
name: creating-api-endpoints
type: hybrid
auto_invoke: false
allowed-tools: Read, Write, Bash
---
## When to Use
- Creating new REST endpoints

## Critical Patterns
### ALWAYS (Governance)
- Use RESTful naming
- Include Zod validation
- Export types

## Actions (Automation)
```bash
python scripts/generate-endpoint.py --resource=users --method=POST
````

## Resources

- [API Patterns](reference/api-patterns.md)

```

---

## 8. Summary for the Creator Agent

Your goal: **Package experience**

- If the experience is **knowing something** → `knowledge` skill (Markdown).
- If the experience is **doing something** → `tool` skill (Scripts).
- If it requires **both** → `hybrid` skill (Markdown + Scripts).

**Key Principle:** A skill without scripts is NOT "incomplete". It is a valid and valuable Knowledge Skill.

---

**Version:** V5 Hybrid Model
**Date:** 2026-01-19
```
