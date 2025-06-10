# Smolitux UI - Codex Documentation

Welcome to the Smolitux UI Codex documentation. This documentation provides comprehensive guidance for AI agents working with the Smolitux UI component library.

## 📋 Table of Contents

- [Quick Start Guide](./quickstart.md) - Get started quickly with the Smolitux UI component library
- [Workflows](./workflows.md) - Detailed workflow documentation for common tasks
- [Component Patterns](./component-patterns.md) - Patterns and templates for component development
- [Package-Specific Guidelines](./package-specific/README.md) - Guidelines for specific packages
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

## 🎯 Mission Statement

The Smolitux UI Codex Agent System is designed to facilitate the development, testing, and deployment of the Smolitux UI component library. The primary goals are:

- Complete the Smolitux UI component library to production-ready status
- Ensure 100% functional components across all packages
- Maintain zero TypeScript/ESLint errors
- Achieve comprehensive test coverage with passing tests
- Provide complete Storybook documentation
- Ensure full accessibility compliance

## 📊 Repository Structure

```
smolitux-ui/
├── packages/                       # Component packages
│   └── @smolitux/
│       ├── core/                   # Foundation components
│       ├── theme/                  # Design system & theming
│       ├── utils/                  # Utility functions
│       ├── testing/                # Test utilities
│       ├── layout/                 # Layout components
│       ├── charts/                 # Data visualization
│       ├── media/                  # Media components
│       ├── community/              # Social features
│       ├── ai/                     # AI components
│       ├── blockchain/             # Blockchain components
│       ├── resonance/              # Platform features
│       ├── federation/             # Cross-platform integration
│       └── voice-control/          # Voice interfaces
├── docs/                           # Documentation
│   └── wiki/
│       ├── codex/                  # Codex documentation
│       ├── components/             # Component documentation
│       └── development/            # Development guides
├── scripts/                        # Development scripts
│   ├── core/                       # Core script modules
│   ├── workflows/                  # Workflow scripts
│   └── packages/                   # Package-specific scripts
├── prompts/                        # Prompt system
│   ├── core/                       # Core prompt components
│   ├── packages/                   # Package-specific prompts
│   └── workflows/                  # Workflow prompts
└── .github/                        # GitHub configuration
    └── workflows/                  # CI/CD workflows
```

## 📈 Package Priority Matrix

| Priority | Package | Complexity | Dependencies | Focus |
|----------|---------|------------|--------------|-------|
| **P0** | `core` | High | None | Foundation components |
| **P0** | `theme` | Medium | None | Design system |
| **P1** | `utils` | Low | None | Utility functions |
| **P1** | `testing` | Medium | Core | Test utilities |
| **P1** | `layout` | Medium | Core, Theme | Layout components |
| **P2** | `charts` | High | Core, Utils | Data visualization |
| **P2** | `media` | High | Core, Utils | Media components |
| **P3** | `community` | Medium | Core, Media | Social features |
| **P3** | `ai` | High | Core, Utils | AI components |
| **P3** | `blockchain` | High | Core, Utils | Blockchain components |
| **P4** | `resonance` | High | All above | Platform features |
| **P4** | `federation` | High | Core, Community | Cross-platform integration |
| **P4** | `voice-control` | High | Core, AI | Voice interfaces |

## 🛠️ Tools and Scripts

The Smolitux UI repository includes a variety of tools and scripts to facilitate development:

- **Repository Analysis**: `scripts/workflows/analyze-repo.sh`
- **Component Completion**: `scripts/workflows/complete-components.sh`
- **Quality Validation**: `scripts/workflows/validate-quality.sh`
- **Coverage Dashboard**: `scripts/workflows/generate-coverage-dashboard.sh`

## 📚 Additional Resources

- [AGENTS.md](../../AGENTS.md) - Central reference for AI agents
- [Component Status](../../COMPONENT_STATUS.md) - Current status of all components
- [GitHub Workflows](../../.github/workflows/README.md) - CI/CD workflow documentation
- [Prompt System](../../prompts/README.md) - Documentation for the prompt system

## 🚨 Critical Guidelines

### ✅ MUST DO
1. **Always run analyzer first** to understand current state
2. **Work systematically** through packages in priority order
3. **Validate each component** before moving to next
4. **Update progress tracking** after each session
5. **Follow TypeScript strict mode** - zero `any` types
6. **Include accessibility tests** - jest-axe for all components
7. **Use forwardRef pattern** - for proper ref forwarding
8. **Add proper test-ids** - data-testid for all testable elements

### ❌ NEVER DO
1. **Skip validation** - always test before moving on
2. **Generate duplicates** - check for existing files first
3. **Use any types** - always use proper TypeScript typing
4. **Ignore accessibility** - include a11y tests from start
5. **Work without status** - always understand current state first
6. **Skip documentation** - stories are required for all components
7. **Ignore performance** - monitor bundle size and render time

This documentation serves as the central reference for AI agents working with the Smolitux UI component library. For package-specific guidelines, refer to the package-specific documentation.