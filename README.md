# Build-a-Skills 🎯

**A curated collection of AI Agent Skills for modern full-stack development.**

This repository provides production-ready skills that teach AI coding assistants (Claude, Cursor, Copilot, Antigravity) how to follow best practices, enforce architectural patterns, and maintain consistency across your codebase.

---

## 🎯 What Are Skills?

[Agent Skills](https://agentskills.io) is an open standard that extends AI agents with domain-specific knowledge. Skills teach AI assistants best practices, architectural patterns, and coding conventions.

**V5 Hybrid Model**: Skills can be **Knowledge** (rules/patterns), **Tools** (automation), or **Hybrid** (both).

### Skill Types

| Type             | Description                       | Example                            |
| ---------------- | --------------------------------- | ---------------------------------- |
| **Knowledge** 📚 | Markdown-based rules and patterns | `react-19`, `structuring-projects` |
| **Tool** 🔧      | Executable scripts for automation | `db-seed`, `validate-structure`    |
| **Hybrid** ⚙️    | Rules + Automation together       | `creating-components`              |

### Without Skills ❌

AI uses generic knowledge:

- Breaks your naming conventions
- Uses outdated patterns
- Ignores your project structure
- Skips validation rules

### With Skills ✅

AI follows your standards:

- Enforces your conventions
- Uses correct tech stack patterns
- Respects your architecture
- Applies validation consistently

---

## 📦 Quick Start

### Copy Skills to Your Project

```bash
# Clone this repo
git clone https://github.com/yourusername/build-a-skills.git

# Copy all skills to your project
cp -r build-a-skills/skills /path/to/your/project/

# Or copy specific skills
cp -r build-a-skills/skills/react-19 /path/to/your/project/skills/
```

### Use with AI Assistant

Skills are auto-discovered. To manually load:

```
Read skills/react-19/SKILL.md
```

See [`/skills/README.md`](skills/README.md) for the complete catalog.

---

## 🎯 Featured Skills

| Skill                                               | Type         | Description                              | Status     |
| --------------------------------------------------- | ------------ | ---------------------------------------- | ---------- |
| [structuring-projects](skills/structuring-projects) | 📚 Knowledge | Feature-based architecture, DDD patterns | ✅ Ready   |
| [react-19](skills/react-19)                         | 📚 Knowledge | React 19 + React Compiler patterns       | ✅ Ready   |
| [zod-4](skills/zod-4)                               | 📚 Knowledge | Zod v4 validation patterns               | ✅ Ready   |
| [skill-creator](skills/skill-creator)               | 📚 Knowledge | Create new skills following V5 standard  | ✅ Ready   |
| [typescript](skills/typescript)                     | 📚 Knowledge | Strict types, const patterns             | ✅ Ready   |
| [tailwind-4](skills/tailwind-4)                     | 📚 Knowledge | cn() patterns, v4 API                    | ✅ Ready   |
| nextjs-16                                           | 📚 Knowledge | App Router, Server Components            | 🚧 Planned |

👉 **[View all available skills →](skills/README.md)**

---

## 🛠️ Creating Skills

Skills follow the **V5 Hybrid Model** with three types:

### 📚 Knowledge Skills

Rules and patterns in Markdown (most common)

- Example: `react-19`, `zod-4`, `structuring-projects`
- Content: `SKILL.md` + `reference/*.md`
- Permissions: `Read` only

### 🔧 Tool Skills

Executable scripts for automation

- Example: `db-seed`, `validate-structure`
- Content: `SKILL.md` + `scripts/*.py`
- Permissions: `Read, Write, Bash`

### ⚙️ Hybrid Skills

Rules + Automation together

- Example: `creating-components`
- Content: `SKILL.md` + `reference/*.md` + `scripts/*.py`
- Permissions: `Read, Write, Bash`

Use the `skill-creator` skill as your guide:

```bash
cat skills/skill-creator/SKILL.md
```

### Quick Checklist

- [ ] Follow [V5 Hybrid Model Standard](skills/skill-creator/references/skill-designer-core.md)
- [ ] Choose skill type (Knowledge/Tool/Hybrid)
- [ ] Keep `SKILL.md` under 500 lines
- [ ] Use Progressive Disclosure (details in `reference/`)
- [ ] Include ALWAYS/NEVER patterns
- [ ] Test with AI assistant

**[Full skill creation guide →](skills/skill-creator/SKILL.md)**

---

## 📚 Documentation

- **[Skills Catalog](skills/README.md)** - All available skills
- **[Skill Creator Guide](skills/skill-creator/SKILL.md)** - How to create skills
- **[V5 Hybrid Model Standard](skills/skill-creator/references/skill-designer-core.md)** - Design standards
- **[Best Practices Guide](docs/best-skills.md)** - Tips and recommendations

---

## 🤝 Contributing

Contributions welcome!

1. Fork the repo
2. Create a skill following the V5 standard
3. Test with an AI assistant
4. Submit a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

Apache 2.0 - See [LICENSE](LICENSE) for details.

---

## 🌟 Why This Project?

**Problem**: Every project reinvents skill creation from scratch.

**Solution**: A curated, battle-tested collection following industry standards.

**Benefits**:

- ✅ Production-ready skills
- ✅ Consistent quality (V5 standard)
- ✅ Progressive Disclosure pattern
- ✅ Active maintenance
- ✅ Community-driven

---

**Made with ❤️ for better AI-assisted development**
