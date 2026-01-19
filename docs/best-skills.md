# Master Guide for Skill Generation

This summary is structured as a "meta-instruction" designed for a Skill Creator Agent. it synthesizes the architectural and content principles for creating high-quality skills.

---

### Master Guide for Skill Generation

To build an effective "skill," do not simply create a text prompt. You must build a **tangible procedural knowledge unit**. A good skill must transform the model's general intelligence into domain-specific expertise through the following structure and principles:

#### 1. Fundamental Architecture: The Skill is a Folder

A skill is not an abstract file; it is an **organized collection of files (a folder)** that can be versioned (Git) and shared.

- **File Structure:** You must generate a clear hierarchy. The core is the main instruction file (`SKILL.md`), accompanied by subdirectories for scripts, reference guides, and assets.
- **Deliberate Simplicity:** The structure must be simple enough that any human or agent can understand it just by exploring the directory.

#### 2. Activation Mechanism: Progressive Disclosure (Critical)

To protect the agent's context window, the skill must be designed under the principle of **Runtime Progressive Disclosure**.

- **High-Level Metadata:** The main file (`SKILL.md`) must contain a clear and concise description (frontmatter) in the header. Initially, the agent only "sees" this to know it possesses the ability.
- **On-Demand Loading:** Dense content (detailed instructions, knowledge bases) should only be loaded when the agent explicitly decides to use that skill for a specific task. This allows equipping the agent with hundreds of skills without saturating its memory.

#### 3. Content: Code as Knowledge

Good skills prefer code over ambiguous text.

- **Scripts as Tools:** Include executable scripts (Python, Bash, etc.) for repetitive tasks. Code is self-documenting, verifiable, and solves the "cold start" problem where the model tries to figure out how to do something from scratch.
- **Example:** Instead of describing how to style a slide, include a Python script that applies the style automatically. This ensures consistency and efficiency.
- **Templates and Standards:** Include template files (e.g., document structures, spreadsheets) and brand style guides. This teaches the agent the "best practices" and unique ways the organization operates, preventing it from using only generalist knowledge.

#### 4. Interoperability: Connection with MCP

Design the skill to act as the "expert logic" that orchestrates external tools.

- **Orchestration:** While the Model Context Protocol (MCP) provides the connection to external data and tools (like Notion or GitHub), the skill should provide the **procedure** on how to use that data.
- **Dependencies:** An advanced skill can orchestrate workflows involving multiple MCP servers and other skills, acting as a bridge between the model's intelligence and the outside world.

#### 5. Maintainability and Evolution

The skill should be treated as software.

- **Tangible Memory:** Design the skill to be a learning receptacle. If the agent discovers a better way to perform a task (e.g., a new script), it should be able to save it inside the skill folder for its "future self."
- **Modularity:** Skills should be composable. Create small, specific skills (e.g., "Data Analysis," "Blog Writing") that can be combined by the main agent as needed, rather than one giant monolithic skill.

---

**Summary for the Creator Agent:**

> _Your goal is to package experience. Create a folder containing a `SKILL.md` with clear metadata for selective activation. Fill the folder with executable scripts to ensure deterministic execution and templates that encode domain best practices. Ensure this structure protects the context window and integrates logically with MCP servers if external data is required._

---

**Version:** V5 Hybrid Model  
**Date:** 2026-01-19
