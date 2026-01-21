# {PROJECT_NAME} - AI Agent Skills

This directory contains the AI Agent Skills used in this project to guide AI assistants (Claude, Cursor, Copilot, Antigravity) in following our architectural patterns and coding standards.

---

## 📦 Project Skills

| Skill              | Description              | Status    | Source                                       |
| :----------------- | :----------------------- | :-------- | :------------------------------------------- |
| `skill-integrator` | Manage and import skills | ✅ Active | [Internal](skills/skill-integrator/SKILL.md) |
| {SKILL_NAME}       | {SKILL_DESCRIPTION}      | {STATUS}  | [{SOURCE_TYPE}]({SOURCE_URL})                |

---

## 🛠️ Management

This project uses the [Agent Skills Standard](https://agentskills.io). To add or update skills:

1.  **Ask the AI**: "Help me add a new skill for {topic}" or "Update the {skill-name} skill".
2.  The `skill-integrator` will assist in browsing and importing from the [community catalog](https://github.com/gpolanco/skills-as-context).

---

## 🚀 How to Use

AI assistants automatically load these skills. If you need to force-reload a specific skill, tell the AI:

```markdown
Review the current project skills in @skills/README.md
```

---

_Generated via [skills-as-context](https://github.com/gpolanco/skills-as-context)_
