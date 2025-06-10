# Smolitux UI - Codex System Redesign Plan

## 📋 Executive Summary

This document outlines a comprehensive redesign plan for the Smolitux UI Codex agent and script system. The goal is to create a modular, maintainable, and efficient system that streamlines development workflows and ensures consistent quality across all packages.

### Current State Assessment

The repository currently contains:
- Multiple overlapping documentation files
- Redundant prompt templates
- Scattered script functionality
- Inconsistent workflow definitions
- Duplicate AGENTS.md files

### Redesign Goals

1. **Consolidate Documentation**: Create a clear, hierarchical documentation structure
2. **Modularize Prompts**: Develop a reusable prompt component system
3. **Streamline Scripts**: Optimize and standardize automation scripts
4. **Enhance Workflows**: Improve CI/CD processes
5. **Standardize AGENTS.md**: Create a consistent agent architecture

## 🔍 Detailed Analysis

### 1. Documentation Structure

#### Current Issues
- Duplicate content across multiple files
- Inconsistent formatting and organization
- Outdated information mixed with current guidelines
- No clear hierarchy or navigation

#### Files to Consolidate
- `AGENTS.md`, `AGENTS.old.md`, `AGENTS.old2.md`
- `docs/wiki/Codex.md`, `docs/wiki/OPTIMIZED_CODEX.md`
- Various package-specific documentation

### 2. Prompt System

#### Current Issues
- Multiple similar prompts for different packages
- No modular structure for reusing prompt components
- Inconsistent formatting and organization
- Scattered across different directories

#### Files to Consolidate
- All files in `docs/wiki/development/prompts/`
- Embedded prompts in scripts and documentation

### 3. Script System

#### Current Issues
- Redundant functionality across multiple scripts
- Inconsistent naming conventions
- Limited error handling and logging
- No clear documentation for script usage

#### Files to Optimize
- `scripts/smolitux-analyzer.sh`
- `scripts/smolitux-completion-finisher.sh`
- `scripts/create_issues.sh`, `scripts/create_package_issues.sh`
- `scripts/codex-lint-*.sh`

### 4. CI/CD Workflows

#### Current Issues
- Multiple similar workflows for different test types
- Limited integration between workflows
- No clear documentation for workflow usage

#### Files to Optimize
- `.github/workflows/ci.yml`
- `.github/workflows/accessibility-tests.yml`
- `.github/workflows/browser-tests.yml`
- `.github/workflows/e2e-tests.yml`
- `.github/workflows/visual-tests.yml`

### 5. AGENTS.md Architecture

#### Current Issues
- Duplicate content between root and package-specific files
- Inconsistent formatting and organization
- No clear hierarchy or navigation

#### Files to Optimize
- `AGENTS.md`
- `packages/@smolitux/AGENTS.md`

## 🛠️ Redesign Implementation Plan

### 1. Documentation Structure

#### New Structure
```
docs/
├── wiki/
│   ├── codex/                      # Consolidated Codex documentation
│   │   ├── index.md                # Overview and navigation
│   │   ├── quickstart.md           # Quick start guide
│   │   ├── workflows.md            # Detailed workflow documentation
│   │   ├── component-patterns.md   # Component development patterns
│   │   ├── package-specific/       # Package-specific guidelines
│   │   │   ├── core.md
│   │   │   ├── theme.md
│   │   │   └── ...
│   │   └── troubleshooting.md      # Common issues and solutions
│   └── ...                         # Other existing wiki content
```

#### Implementation Steps
1. Create the new directory structure
2. Extract and consolidate content from existing files
3. Update references to documentation in scripts and workflows
4. Archive or remove redundant files

### 2. Prompt System

#### New Structure
```
prompts/
├── core/                           # Core prompt components
│   ├── system.md                   # System context and guidelines
│   ├── component-templates.md      # Reusable component templates
│   ├── test-templates.md           # Reusable test templates
│   └── story-templates.md          # Reusable story templates
├── packages/                       # Package-specific prompts
│   ├── core.md
│   ├── theme.md
│   └── ...
├── workflows/                      # Workflow-specific prompts
│   ├── analysis.md                 # Repository analysis
│   ├── completion.md               # Component completion
│   └── validation.md               # Quality validation
└── index.md                        # Prompt system documentation
```

#### Implementation Steps
1. Create the new directory structure
2. Extract and modularize content from existing prompts
3. Create a prompt composition system for combining components
4. Update references to prompts in scripts and documentation
5. Archive or remove redundant files

### 3. Script System

#### New Structure
```
scripts/
├── core/                           # Core script functionality
│   ├── analysis.sh                 # Repository analysis functions
│   ├── completion.sh               # Component completion functions
│   ├── validation.sh               # Quality validation functions
│   └── utils.sh                    # Shared utility functions
├── workflows/                      # Workflow scripts
│   ├── analyze-repo.sh             # Repository analysis workflow
│   ├── complete-components.sh      # Component completion workflow
│   └── validate-quality.sh         # Quality validation workflow
├── packages/                       # Package-specific scripts
│   ├── core.sh
│   ├── theme.sh
│   └── ...
└── index.sh                        # Script system documentation
```

#### Implementation Steps
1. Create the new directory structure
2. Extract and modularize functionality from existing scripts
3. Standardize script interfaces and error handling
4. Create comprehensive documentation for script usage
5. Update references to scripts in documentation and workflows
6. Archive or remove redundant scripts

### 4. CI/CD Workflows

#### New Structure
```
.github/workflows/
├── ci.yml                          # Main CI workflow
├── release.yml                     # Release workflow
├── docs.yml                        # Documentation workflow
└── tests/                          # Test workflows
    ├── unit.yml                    # Unit tests
    ├── integration.yml             # Integration tests
    ├── e2e.yml                     # End-to-end tests
    ├── visual.yml                  # Visual tests
    └── a11y.yml                    # Accessibility tests
```

#### Implementation Steps
1. Create the new directory structure
2. Consolidate and optimize existing workflows
3. Standardize workflow interfaces and error handling
4. Create comprehensive documentation for workflow usage
5. Update references to workflows in documentation and scripts
6. Archive or remove redundant workflows

### 5. AGENTS.md Architecture

#### New Structure
```
AGENTS.md                           # Main agent documentation
packages/
├── @smolitux/
│   ├── AGENTS.md                   # Package-level agent documentation
│   ├── core/
│   │   └── AGENTS.md               # Core package agent documentation
│   ├── theme/
│   │   └── AGENTS.md               # Theme package agent documentation
│   └── ...
```

#### Implementation Steps
1. Create the new AGENTS.md hierarchy
2. Extract and consolidate content from existing files
3. Standardize formatting and organization
4. Create clear navigation between files
5. Archive or remove redundant files

## 📊 File Disposition Plan

### Files to Keep (with modifications)
- `AGENTS.md` - Update with new structure and content
- `scripts/smolitux-analyzer.sh` - Refactor into modular components
- `scripts/smolitux-completion-finisher.sh` - Refactor into modular components
- `.github/workflows/ci.yml` - Optimize and standardize
- `docs/wiki/Codex.md` - Consolidate as main Codex documentation

### Files to Refactor
- `packages/@smolitux/AGENTS.md` - Simplify and focus on package-specific content
- `scripts/create_issues.sh` - Integrate into modular script system
- `scripts/codex-lint-*.sh` - Consolidate into a single modular linting script

### Files to Archive or Remove
- `AGENTS.old.md`, `AGENTS.old2.md` - Archive or remove
- `docs/wiki/OPTIMIZED_CODEX.md` - Consolidate into main Codex documentation
- Duplicate prompt files in `docs/wiki/development/prompts/`

### New Files to Create
- `prompts/core/system.md` - Core system prompt
- `prompts/core/component-templates.md` - Reusable component templates
- `prompts/index.md` - Prompt system documentation
- `scripts/core/analysis.sh` - Core analysis functions
- `scripts/core/completion.sh` - Core completion functions
- `scripts/index.sh` - Script system documentation

## 🚀 Implementation Strategy

### Phase 1: Documentation Consolidation
1. Create the new documentation structure
2. Consolidate content from existing files
3. Update references to documentation
4. Archive or remove redundant files

### Phase 2: Prompt System Modularization
1. Create the new prompt system structure
2. Extract and modularize content from existing prompts
3. Create the prompt composition system
4. Update references to prompts
5. Archive or remove redundant files

### Phase 3: Script System Optimization
1. Create the new script system structure
2. Extract and modularize functionality from existing scripts
3. Standardize script interfaces and error handling
4. Create comprehensive documentation for script usage
5. Update references to scripts
6. Archive or remove redundant scripts

### Phase 4: CI/CD Workflow Enhancement
1. Create the new workflow structure
2. Consolidate and optimize existing workflows
3. Standardize workflow interfaces and error handling
4. Create comprehensive documentation for workflow usage
5. Update references to workflows
6. Archive or remove redundant workflows

### Phase 5: AGENTS.md Standardization
1. Create the new AGENTS.md hierarchy
2. Extract and consolidate content from existing files
3. Standardize formatting and organization
4. Create clear navigation between files
5. Archive or remove redundant files

## 📈 Success Metrics

### Documentation
- Reduced documentation redundancy by 80%
- Improved navigation and discoverability
- Comprehensive coverage of all development workflows

### Prompt System
- Modular prompt components with 90% reusability
- Reduced prompt redundancy by 80%
- Improved prompt composition and customization

### Script System
- Modular script components with 90% reusability
- Reduced script redundancy by 80%
- Improved script reliability and error handling

### CI/CD Workflows
- Optimized workflow execution time by 30%
- Reduced workflow redundancy by 80%
- Improved workflow reliability and error handling

### AGENTS.md Architecture
- Clear hierarchy and navigation
- Comprehensive coverage of all development workflows
- Reduced content redundancy by 80%

## 🎯 Conclusion

This redesign plan provides a comprehensive roadmap for transforming the Smolitux UI Codex agent and script system into a modular, maintainable, and efficient system. By implementing this plan, we will create a system that streamlines development workflows, ensures consistent quality across all packages, and provides a clear path for future enhancements.

The modular approach ensures that components can be reused and combined as needed, while the standardized interfaces and documentation make the system accessible to all developers. The consolidated documentation and optimized workflows reduce redundancy and improve efficiency, making the system more maintainable and scalable.

By focusing on these key areas, we will create a Codex system that is ready for testing, debugging, building, deployment, and automated prompt processing and agent execution.