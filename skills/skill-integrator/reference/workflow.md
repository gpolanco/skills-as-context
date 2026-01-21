# Skill Integration Workflow Guide

This document provides step-by-step instructions for AI assistants on how to perform a deep integration of skills into any project.

## Phase 1: Contextual Analysis

Before suggesting anything, you must understand the project's soul.

1.  **Read `package.json`**: Identify frameworks (Next.js, Vite, Express), styling (Tailwind, CSS Modules), and utilities (Zod, React Hook Form).
2.  **Check `AGENTS.md`**: Does it already exist? If so, what skills are already active?
3.  **Inspect Directory Structure**: Is it a monorepo? Feature-based? Layered architecture?

## Phase 2: The Pitch

Present your findings in a structured way. Use the locally available skills in the `skills/` directory as your menu.

## Phase 3: Orchestration (Technical Steps)

Since all skills are already present in the `skills/` directory, your job is to "activate" them in the project's orchestration files.

1.  **Selection**: Identify the subset of skills in `skills/` that match the project's tech stack.
2.  **Activation (AGENTS.md)**:
    - **MANDATORY**: Fetch `https://raw.githubusercontent.com/gpolanco/skills-as-context/main/templates/AGENTS.template.md` using your tools (e.g. `read_url_content`).
    - Use this exact structure for the local `AGENTS.md`.
    - Fill `{PROJECT_NAME}`, `{PROJECT_PURPOSE}`, and the tech stack.
    - Update the tables with local skills found in `skills/`.
3.  **Catalog Update (skills/README.md)**:
    - **MANDATORY**: Fetch `https://raw.githubusercontent.com/gpolanco/skills-as-context/main/templates/SKILLS_README.template.md`.
    - Use this exact structure for `skills/README.md`.
    - List every subdirectory in `skills/` in the "Active Skills" or "Available Skills" section as appropriate.
4.  **Verification**: Confirm that all paths in `AGENTS.md` correctly point to the local `skills/` subdirectory.

## Phase 4: Initialization (First Time Only)

If the project has NO agent context yet:

1.  Ensure the `skills/` folder was created by the setup script.
2.  Follow the **Orchestration** steps above to generate the first version of the project's context using the remote templates.
