#!/bin/bash

# Codex Initialization Script
# This script initializes a Codex session with the appropriate environment and prompt

# Parse command line arguments
PACKAGE=""
TASK="component-development"
COMPONENT=""
DETAILED=false

print_usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  --package PACKAGE      Package name (core, theme, etc.)"
  echo "  --task TASK            Task name (component-development, testing, etc.)"
  echo "  --component COMPONENT  Component name (Button, Input, etc.)"
  echo "  --detailed             Include detailed information"
  echo "  --help                 Show this help message"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --package)
      PACKAGE="$2"
      shift 2
      ;;
    --task)
      TASK="$2"
      shift 2
      ;;
    --component)
      COMPONENT="$2"
      shift 2
      ;;
    --detailed)
      DETAILED=true
      shift
      ;;
    --help)
      print_usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      print_usage
      exit 1
      ;;
  esac
done

# Validate required arguments
if [ -z "$PACKAGE" ]; then
  echo "Error: Package name is required"
  print_usage
  exit 1
fi

# Analyze repository state
echo "🔍 Analyzing repository state..."
bash scripts/analysis/smolitux-analyzer.sh > /tmp/repo-analysis.txt

# Build the prompt
echo "🔧 Building Codex prompt..."
if [ -z "$COMPONENT" ]; then
  # Package-level prompt
  node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package "$PACKAGE" --task "$TASK" --output /tmp/codex-prompt.md
else
  # Component-level prompt
  node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package "$PACKAGE" --task "$TASK" --template component --output /tmp/codex-prompt.md
fi

# Add repository analysis to the prompt if detailed
if [ "$DETAILED" = true ]; then
  echo -e "\n\n## Repository Analysis\n\n\`\`\`" >> /tmp/codex-prompt.md
  cat /tmp/repo-analysis.txt >> /tmp/codex-prompt.md
  echo -e "\`\`\`" >> /tmp/codex-prompt.md
fi

# Add component-specific information if provided
if [ -n "$COMPONENT" ]; then
  echo -e "\n\n## Component Information\n" >> /tmp/codex-prompt.md
  
  # Check if component exists
  COMPONENT_DIR="packages/@smolitux/$PACKAGE/src/components/$COMPONENT"
  if [ -d "$COMPONENT_DIR" ]; then
    echo -e "Component $COMPONENT exists in package @smolitux/$PACKAGE.\n" >> /tmp/codex-prompt.md
    
    # List component files
    echo -e "### Component Files\n\n\`\`\`" >> /tmp/codex-prompt.md
    ls -la "$COMPONENT_DIR" >> /tmp/codex-prompt.md
    echo -e "\`\`\`\n" >> /tmp/codex-prompt.md
    
    # Check for missing files
    if [ ! -f "$COMPONENT_DIR/$COMPONENT.test.tsx" ]; then
      echo -e "❌ Missing test file: $COMPONENT.test.tsx\n" >> /tmp/codex-prompt.md
    fi
    
    if [ ! -f "$COMPONENT_DIR/$COMPONENT.stories.tsx" ]; then
      echo -e "❌ Missing story file: $COMPONENT.stories.tsx\n" >> /tmp/codex-prompt.md
    fi
    
    # Show component implementation if it exists
    if [ -f "$COMPONENT_DIR/$COMPONENT.tsx" ]; then
      echo -e "### Component Implementation\n\n\`\`\`typescript" >> /tmp/codex-prompt.md
      cat "$COMPONENT_DIR/$COMPONENT.tsx" >> /tmp/codex-prompt.md
      echo -e "\`\`\`\n" >> /tmp/codex-prompt.md
    fi
  else
    echo -e "Component $COMPONENT does not exist in package @smolitux/$PACKAGE. You need to create it.\n" >> /tmp/codex-prompt.md
    
    # Create component directory structure
    echo -e "### Component Directory Structure\n\n\`\`\`" >> /tmp/codex-prompt.md
    echo "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/" >> /tmp/codex-prompt.md
    echo "├── $COMPONENT.tsx" >> /tmp/codex-prompt.md
    echo "├── $COMPONENT.test.tsx" >> /tmp/codex-prompt.md
    echo "└── $COMPONENT.stories.tsx" >> /tmp/codex-prompt.md
    echo -e "\`\`\`\n" >> /tmp/codex-prompt.md
  fi
fi

# Display the prompt
echo "📝 Codex prompt generated at /tmp/codex-prompt.md"
echo "🚀 Ready to start Codex session for package @smolitux/$PACKAGE"
if [ -n "$COMPONENT" ]; then
  echo "🧩 Component: $COMPONENT"
fi
echo "🔧 Task: $TASK"

# Open the prompt in the default editor if available
if command -v code &> /dev/null; then
  code /tmp/codex-prompt.md
elif command -v vim &> /dev/null; then
  vim /tmp/codex-prompt.md
elif command -v nano &> /dev/null; then
  nano /tmp/codex-prompt.md
else
  cat /tmp/codex-prompt.md
fi