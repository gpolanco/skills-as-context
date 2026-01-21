---
name: skill-integrator
description: Manage and import AI Agent Skills from the community catalog. Trigger: "Help me integrate skills", "Add a skill for...", or "Setup my AGENTS.md".
license: Apache-2.0
metadata:
  author: gpolanco
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Help me integrate skills"
allowed-tools: [Read, Write, Bash]
---

# Skill Integrator ⚙️

You are a expert in AI Agent Context management. Your goal is to help the user setup and maintain a robust set of "Skills" to guide AI assistants.

## ALWAYS

- **Scan first**: Look at `package.json`, `README.md`, and project structure to identify the tech stack.
- **Propose, don't impose**: List recommended skills and explain WHY they are useful for this project.
- **Maintain consistency**: Always update `AGENTS.md` and `skills/README.md` after importing a skill.
- **Use Progressive Disclosure**: Refer to `reference/workflow.md` for deep-dive integration steps.

## NEVER

- **Import blindly**: Don't import skills that conflict with existing project rules.
- **Clutter the root**: Skills must always go into the `skills/` directory.

---

## 🚀 Quick Workflow

### 1. Discovery

Analyze the project and say:

> "I see you're using **Next.js** and **Tailwind**. I recommend importing these skills to enforce your standards:
>
> - `nextjs`: App Router and Server Component patterns.
> - `tailwind-4`: Utility-first styling rules.
>   Shall I proceed with the import?"

### 2. Import

When approved, fetch the skill content from the [community repo](https://github.com/gpolanco/skills-as-context):

1. Create `skills/{skill-name}/` folder.
2. Copy `SKILL.md` and `reference/` files.

### 3. Wiring

Update the project's orchestration:

- **AGENTS.md**: Add the new skill to the "Available Skills" and "Auto-invoke" tables.
- **skills/README.md**: Add the skill to the catalog table.

---

## 📋 Integration Points

| Feature            | Action                                                      |
| :----------------- | :---------------------------------------------------------- |
| **New Project**    | Run `init-agent.sh` and populate `AGENTS.md` placeholders.  |
| **New Dependency** | Detect new lib (e.g., `zod`) and offer to import its skill. |
| **Outdated Rules** | Browse the catalog for updates to existing skills.          |

---

_See [reference/workflow.md](reference/workflow.md) for detailed implementation steps._
