# Build-a-Skills 🎯

**Standardized AI Agent Skills for modern full-stack development.**

This repository provides a collection of [V5 Hybrid Skills](https://agentskills.io) that teach AI assistants (Claude, Cursor, Antigravity) how to follow your project's architectural patterns and coding standards.

---

## 🚀 Quick Start (Transform Your Project)

Run the initialization script from your project root:

```bash
curl -sSL https://raw.githubusercontent.com/gpolanco/skills-as-context/main/templates/init-agent.sh | bash
```

**Next Step**: Ask your AI assistant:

> "Help me integrate skills into this project. Use the @skill-integrator meta-skill as your guide."

---

## 📦 What's Inside?

### ⚙️ Meta-Skills (The Orchestrators)

- [**skill-integrator**](skills/skill-integrator): Analyzes your tech stack and auto-imports relevant skills.
- [**skill-creator**](skills/skill-creator): Guides you in creating your own custom v5 skills.

### 📚 Generic Skills (The Catalog)

| Skill                                                   | Description                       | Status   |
| :------------------------------------------------------ | :-------------------------------- | :------- |
| [**structuring-projects**](skills/structuring-projects) | Feature-based architecture & DDD  | ✅ Ready |
| [**react-19**](skills/react-19)                         | React 19 + Compiler patterns      | ✅ Ready |
| [**nextjs**](skills/nextjs)                             | App Router & Server Components    | ✅ Ready |
| [**supabase**](skills/supabase)                         | Auth, RLS, and SSR best practices | ✅ Ready |
| [**zod-4**](skills/zod-4)                               | Runtime validation patterns       | ✅ Ready |

👉 **[View Full Catalog →](skills/README.md)**

---

## 🛠️ Why Use This?

1.  **Stop Re-typing Rules**: Don't waste time telling the AI to use kebab-case or Server Components in every chat.
2.  **Enforce Architecture**: Ensure the AI places files in the right folders (DDD, Features).
3.  **Community Patterns**: Use battle-tested skills for the most popular full-stack technologies.
4.  **Small Context**: Uses the **Progressive Disclosure** pattern — only loads deep technical details when needed.

---

## 🤝 Contributing

Have a skill for a library you love?

1. Open this repo with your AI.
2. Use `@skill-creator` to build a new skill following the V5 standard.
3. Submit a PR.

---

_Made with ❤️ by [gpolanco](https://github.com/gpolanco)_
