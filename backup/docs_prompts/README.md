# Smolitux UI Modular Prompt System

## Overview

This directory contains a modular prompt system for Codex agents working on the Smolitux UI component library. The system is designed to be:

- **Modular**: Combine prompts based on specific needs
- **Maintainable**: Easy to update and extend
- **Consistent**: Ensure all agents follow the same standards
- **Efficient**: Minimize redundancy and maximize reuse

## Directory Structure

```
/docs/prompts/
├── README.md                     # This file
├── core/                         # Core prompts
│   ├── system-prompt.md          # Base system prompt for all agents
│   ├── component-development.md  # Generic component development
│   └── quality-standards.md      # Quality requirements
├── packages/                     # Package-specific prompts
│   ├── core.md                   # @smolitux/core specific
│   ├── theme.md                  # @smolitux/theme specific
│   └── ...                       # Other packages
├── workflows/                    # Task-specific prompts
│   ├── analysis.md               # Repository analysis
│   ├── testing.md                # Testing focus
│   └── documentation.md          # Documentation focus
└── templates/                    # Reusable templates
    ├── component.md              # Component template
    ├── test.md                   # Test template
    └── story.md                  # Story template
```

## How to Use

### Using the Prompt Builder

The prompt builder script combines prompt modules based on your specific task:

```bash
# Generate a prompt for developing components in the core package
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package core --task component-development --template component

# Generate a prompt for testing components in the theme package
node scripts/prompts/prompt-builder.js --base core/system-prompt.md --package theme --task testing --template test
```

### Manual Composition

You can also manually compose prompts by combining:

1. **Always include**: `core/system-prompt.md`
2. **Add package context**: `packages/[package-name].md`
3. **Add task focus**: `workflows/[task-name].md`
4. **Add templates**: `templates/[template-name].md`

## Prompt Modules

### Core Prompts

- **system-prompt.md**: Base instructions for all Codex agents
- **component-development.md**: Generic component development guidelines
- **quality-standards.md**: Quality requirements for all components

### Package-Specific Prompts

Each package has specific considerations:

- **core.md**: Foundation components with broad usage
- **theme.md**: Theming system and design tokens
- **utils.md**: Utility functions and helpers
- **layout.md**: Layout components and systems
- **charts.md**: Data visualization components
- **media.md**: Media handling components
- **ai.md**: AI-powered components
- **blockchain.md**: Blockchain integration components
- **community.md**: Social and community components
- **resonance.md**: Platform-specific components
- **federation.md**: Cross-platform integration
- **voice-control.md**: Voice interface components

### Workflow Prompts

Task-specific instructions:

- **analysis.md**: Repository analysis and assessment
- **testing.md**: Testing focus and strategies
- **documentation.md**: Documentation creation and improvement
- **refactoring.md**: Code refactoring and improvement
- **accessibility.md**: Accessibility improvements
- **performance.md**: Performance optimization

### Templates

Reusable code templates:

- **component.md**: Component implementation templates
- **test.md**: Test implementation templates
- **story.md**: Storybook story templates
- **hook.md**: React hook templates
- **utility.md**: Utility function templates

## Best Practices

1. **Start with Analysis**: Always begin with repository analysis to understand the current state
2. **Follow Priority Order**: Work on packages in the recommended priority order
3. **Maintain Quality Standards**: Always adhere to the quality standards
4. **Document Progress**: Update progress tracking after each session
5. **Validate Changes**: Test all changes before moving on

## Extending the System

To add new prompt modules:

1. Create a new markdown file in the appropriate directory
2. Follow the established format and style
3. Update this README if adding a new category
4. Test the new module with the prompt builder

## Versioning

Prompt modules follow semantic versioning:

- **Major version**: Breaking changes to prompt structure
- **Minor version**: New capabilities or significant improvements
- **Patch version**: Bug fixes and minor improvements

Include version information in the header of each prompt file.