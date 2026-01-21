#!/bin/bash

# Agent Skills Initialization Script
# This script performs a bulk download of all AI Agent Skills.

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

REPO_NAME="skills-as-context"
ZIP_URL="https://github.com/gpolanco/skills-as-context/archive/refs/heads/main.zip"
TEMP_DIR=".skills_temp"

echo -e "${BLUE}� Initializing Bulk AI Agent Skills...${NC}"

# 1. Download and Extract
echo -e "${BLUE}📦 Downloading skills catalog from GitHub...${NC}"

if ! curl -sSL "$ZIP_URL" -o "$TEMP_DIR.zip"; then
    echo -e "${RED}❌ Failed to download skills catalog.${NC}"
    exit 1
fi

mkdir -p "$TEMP_DIR"
unzip -q "$TEMP_DIR.zip" -d "$TEMP_DIR"

# Determine the extracted folder name (usually repo-name-main)
EXTRACTED_FOLDER=$(ls "$TEMP_DIR" | head -n 1)

# 2. Copy folders and initialize files
echo -e "${BLUE}📂 Copying skills catalog...${NC}"

cp -r "$TEMP_DIR/$EXTRACTED_FOLDER/skills" ./

# 3. Create project files from Remote Templates
# We download templates temporarily and then remove them to keep the project clean.
echo -e "${BLUE}📝 Initializing AGENTS.md and skills/README.md from remote templates...${NC}"

TEMPLATE_AGENTS="$TEMP_DIR/$EXTRACTED_FOLDER/templates/AGENTS.template.md"
TEMPLATE_README="$TEMP_DIR/$EXTRACTED_FOLDER/templates/SKILLS_README.template.md"

if [ ! -f "AGENTS.md" ]; then
    cp "$TEMPLATE_AGENTS" AGENTS.md
fi

if [ ! -f "skills/README.md" ]; then
    cp "$TEMPLATE_README" skills/README.md
fi

# 4. Cleanup
rm -rf "$TEMP_DIR"
rm "$TEMP_DIR.zip"

echo -e "${GREEN}✅ All skills have been imported locally!${NC}"
echo -e ""
echo -e "--------------------------------------------------------------------------------"
echo -e "${BLUE}🤖 AI HANDOVER GUIDE${NC}"
echo -e "--------------------------------------------------------------------------------"
echo -e "Copy and paste the following message to your AI assistant (Claude/Cursor/Antigravity):"
echo -e ""
echo -e "${GREEN}\"Analyze my project stack and configure my AGENTS.md based on the local skills catalog. Use @skill-integrator for guidance. Use the remote templates as your source of truth.\"${NC}"
echo -e ""
echo -e "${BLUE}Source of Truth (Templates):${NC}"
echo -e "- AGENTS: https://raw.githubusercontent.com/gpolanco/skills-as-context/main/templates/AGENTS.template.md"
echo -e "- README: https://raw.githubusercontent.com/gpolanco/skills-as-context/main/templates/SKILLS_README.template.md"
echo -e "--------------------------------------------------------------------------------"
