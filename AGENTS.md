# Smolitux UI Guide for Codex Agents

**READ docs/wiki/Codex.md**     
**READ packages/@smolitux/AGENTS.md**     
**READ docs/wiki/development/component-status.md**     
**READ COMPONENT_STATUS.md**     
**READ docs/wiki/testing/test-coverage-dashboard.md**    
**READ docs/wiki/development/component-todo.md**    

This repository hosts the **Smolitux UI** component library. Packages live under `packages/@smolitux/` and are written in TypeScript.

## Repository Layout

- `packages/@smolitux/` – main library packages (`core`, `theme`, `icons`, `layout`, `charts`, `ai`, `blockchain`, `community`, `media`, `resonance`, `testing`, `utils`, `voice-control`, `federation`)
- `docs/` – Docusaurus documentation site
- `docs/wiki/development/` - smolitux-ui development documentation
- `docs/wiki/testing/` - test strategy, coverage reports, and testing documentation
- `scripts/` – helper scripts such as `setup-dev-env.sh`, `generate-coverage-dashboard.sh`
- `test-app/` – simple demo application
- `test-utils/` – shared testing utilities and mocks

## Node Development

- **Format:** `npm run format` (Prettier, width 100)
- **Lint:** `npm run lint` (ESLint with TypeScript support)
- **Test:** `npm run test` (Jest with coverage reporting)
- **Test E2E:** `npm run test:e2e` (Playwright for end-to-end testing)
- **Build:** `npm run build` or `./build-all.sh` (builds all packages)
- **Storybook:** `npm run storybook` (component development environment)
- **Coverage:** `./generate-coverage-dashboard.sh --package <name>` (generate coverage reports)

### Package-specific Commands
```bash
# Run commands for specific packages
npm run test --workspace=@smolitux/core
npm run build --workspace=@smolitux/layout
npm run lint --workspace=@smolitux/utils
```

## 🚀 Codex Completion Workflow

### **Step 1: Repository Analysis**
Before making any changes, always run the **Repository Analyzer** to understand the current state:

```bash
# Analyze current repository state
bash smolitux-analyzer.sh
```

This will show you:
- Current test and story coverage by package
- Missing test/story files count
- Validation issues (imports, exports, TypeScript)
- Predicted impact of completion finisher

### **Step 2: Bulk Completion (if needed)**
If significant files are missing, use the **Improved Completion Finisher**:

```bash
# Generate missing tests and stories, fix validation issues
bash smolitux-completion-finisher.sh

# For detailed component breakdown in status report
bash smolitux-completion-finisher.sh --detailed
```

**⚠️ CRITICAL: The completion finisher uses improved logic to avoid duplicate file generation.**

### **Step 3: Manual Refinement**
After bulk completion, manually refine:
- Review generated test files for component-specific logic
- Enhance story files with realistic props and interactions
- Validate tests pass: `npm test`
- Verify stories work: `npm run storybook`

## Documentation

- **Main Docs:** The Docusaurus site resides in `docs/`. Use `npm start` inside that directory to preview docs and `npm run build` to generate the static site
- **User Documentation:** Complete user documentation for **smolitux-ui** is located under `docs/wiki/`
- **Developer Documentation:** Build process, component structure, test strategy, etc. lives in `docs/wiki/development/`
- **Testing Documentation:** Test coverage reports, testing strategy, and component status in `docs/wiki/testing/`

**Note:** There is no top‑level `npm run docs` command – run documentation scripts from within the `docs/` folder.

## Commits and Pull Requests

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, etc.)
- Keep commits focused and atomic
- **Always** update or add tests for changes
- **Always** update documentation for new features
- Include a comprehensive summary of changes and test results in PR descriptions
- **Mandatory:** Run `npm run lint`, `npm run test`, and `npm run build` before opening a PR
- **Coverage Requirements:** Maintain ≥90% test coverage for all new components

## Component Development Standards

### 🧩 **Component Structure Requirements**
Every component MUST include:

1. **Implementation** (`ComponentName.tsx`):
   - Complete TypeScript interfaces for all props
   - `forwardRef` support for ref forwarding
   - Proper accessibility attributes (ARIA, semantic HTML)
   - Error boundaries where appropriate
   - Performance optimizations (`React.memo` for expensive components)

2. **Tests** (`ComponentName.test.tsx`):
   - Unit tests for all props and states
   - Accessibility tests using `jest-axe`
   - User interaction tests with `@testing-library/user-event`
   - Snapshot tests for UI consistency
   - Error handling and edge case tests
   - Performance tests for complex components

3. **Stories** (`ComponentName.stories.tsx`):
   - Default story showcasing basic usage
   - Stories for all prop variations
   - Interactive stories demonstrating user interactions
   - Accessibility-focused stories
   - Comprehensive documentation and controls

4. **Types** (`ComponentName.types.ts` or inline):
   - Complete TypeScript interfaces
   - Event handler type definitions
   - Ref type definitions
   - Theme integration types

### 📋 **Testing Requirements**

- **Coverage Minimum:** ≥90% for statements, branches, functions, and lines
- **Accessibility:** All components must pass `jest-axe` tests
- **Performance:** Components should render in <16ms (1 frame at 60fps)
- **Cross-browser:** Ensure compatibility with modern browsers
- **Responsive:** Test components across different viewport sizes

### 📚 **Documentation Requirements**

- **Component README:** Each package should have detailed component documentation
- **Props Documentation:** Complete JSDoc comments for all props
- **Usage Examples:** Practical examples in Storybook and documentation
- **Migration Guides:** Document breaking changes and migration paths

## Codex AI Agent Role & Responsibilities

### ✅ **Codex MAY:**

- **Component Development:**
  - Create, modify, and enhance React components
  - Write comprehensive test suites for all components
  - Create and update Storybook stories
  - Fix TypeScript, ESLint, and accessibility issues

- **Testing & Quality:**
  - Run test suites and interpret results
  - Generate and update coverage reports
  - Fix failing tests and improve test coverage
  - Perform accessibility audits and fixes

- **Documentation:**
  - Update component documentation
  - Maintain test coverage dashboards
  - Update development documentation
  - Create migration guides for breaking changes

- **Development Environment:**
  - Install and manage dependencies
  - Update build configurations
  - Improve development scripts
  - Optimize package configurations

- **Completion Tools:**
  - Use repository analyzer to assess current state
  - Run completion finisher for bulk test/story generation
  - Fix validation issues systematically
  - Update progress tracking documents

### ❌ **Codex MUST NOT:**

- **Release Management:**
  - Publish releases to npm
  - Create or push git tags
  - Modify version numbers without explicit instruction
  - Deploy to production environments

- **Security & Access:**
  - Modify authentication configurations
  - Change repository permissions
  - Access or modify secrets/environment variables
  - Make changes outside the repository scope

- **File Generation Pitfalls:**
  - Generate duplicate test/story files (e.g., `Component.test.test.tsx`)
  - Create tests for test files or stories for story files
  - Modify files in `__tests__` directories without understanding structure

### 🎯 **Codex Workflow for Component Development**

#### **Phase 0: Assessment (NEW)**
1. **Run Repository Analyzer:** `bash smolitux-analyzer.sh`
2. **Review Current State:** Check test/story coverage and validation issues
3. **Plan Approach:** Decide between bulk completion vs targeted fixes
4. **Document Baseline:** Note starting metrics for progress tracking

#### **Phase 1: Bulk Completion (if needed)**
1. **Run Completion Finisher:** `bash smolitux-completion-finisher.sh`
2. **Review Generated Files:** Verify no duplicates or invalid files
3. **Initial Validation:** Quick check that generated tests/stories compile
4. **Update Status:** Review updated `COMPONENT_STATUS.md`

#### **Phase 2: Component Analysis**
1. Analyze current component structure and identify gaps
2. Review existing tests and coverage metrics
3. Check for TypeScript, ESLint, and accessibility issues
4. Document findings in structured format

#### **Phase 3: Implementation**
1. Fix or create component implementation
2. Ensure proper TypeScript typing
3. Implement accessibility features
4. Add performance optimizations

#### **Phase 4: Testing Enhancement**
1. Enhance generated test suites with component-specific logic
2. Ensure ≥90% coverage across all metrics
3. Add accessibility tests with jest-axe
4. Verify cross-browser compatibility

#### **Phase 5: Documentation**
1. Enhance generated Storybook stories with realistic scenarios
2. Document all props and usage patterns
3. Add examples and best practices
4. Update coverage dashboard

#### **Phase 6: Validation**
1. Run full test suite
2. Verify build process
3. Check linting and formatting
4. Validate accessibility compliance

### 📊 **Progress Tracking**

Codex should maintain progress in:
- `COMPONENT_STATUS.md` (component-level status) - **Auto-updated by completion finisher**
- `docs/wiki/testing/test-coverage-dashboard.md` (coverage metrics)
- `docs/wiki/development/component-status.md` (development status)

### 🔄 **Iterative Development Process**

**Component Priority Order:**
1. `@smolitux/core` (foundational components) - **START HERE**
2. `@smolitux/theme` (theming system)
3. `@smolitux/layout` (layout components)
4. `@smolitux/utils` (utility functions)
5. `@smolitux/testing` (testing utilities)
6. `@smolitux/charts` (data visualization)
7. `@smolitux/ai` (AI-powered components)
8. `@smolitux/media` (media components)
9. `@smolitux/blockchain` (blockchain integrations)
10. `@smolitux/community` (community features)
11. `@smolitux/resonance` (resonance features)
12. `@smolitux/voice-control` (voice control)
13. `@smolitux/federation` (federation features)

**Per-Component Checklist:**
- [ ] TypeScript implementation (0 `any` types)
- [ ] Comprehensive test suite (≥90% coverage)
- [ ] Accessibility compliance (jest-axe passing)
- [ ] Storybook stories (all variants)
- [ ] Performance optimization
- [ ] Documentation complete
- [ ] Build successful
- [ ] ESLint clean

### 🔧 **Error Handling & Troubleshooting**

**Common Issues & Solutions:**

1. **Missing Dependencies:**
   ```bash
   npm install --save-dev @typescript-eslint/eslint-plugin @eslint/js jest jest-axe tsup ts-node
   ```

2. **Build Failures:**
   - Check TypeScript errors: `npm run type-check`
   - Verify imports and exports
   - Ensure proper package.json configuration

3. **Test Failures:**
   - Check Jest configuration in `jest.config.js`
   - Verify test environment setup
   - Ensure proper mocking for external dependencies

4. **Coverage Issues:**
   - Review uncovered lines with `npm test -- --coverage`
   - Add tests for error cases and edge conditions
   - Ensure all exported functions are tested

5. **Duplicate File Generation (RESOLVED):**
   - Use improved completion finisher script
   - Script now properly excludes test/story files from component detection
   - If duplicates exist, run `git reset --hard` and use new script

6. **Validation Issues:**
   - Run completion finisher to fix common issues automatically
   - For manual fixes, target specific file types:
     - React imports: `find packages -name "*.tsx" -exec grep -l "React\." {} \;`
     - Missing exports: Components without export statements
     - TypeScript issues: Files with `any` or `@ts-ignore`

### 📝 **Quality Gates**

Before marking any component as "complete":
- ✅ All TypeScript strict mode compliance
- ✅ 100% ESLint compliance (0 errors, minimal warnings)
- ✅ ≥90% test coverage on all metrics
- ✅ All accessibility tests passing
- ✅ Successful build with no warnings
- ✅ Storybook stories functional
- ✅ Documentation complete and accurate
- ✅ Performance benchmarks met

### 🌐 **Research & References**

When questions arise, Codex should research:
- **Primary:** https://github.com/EcoSphereNetwork/smolitux-ui
- **Documentation:** Component patterns, API references
- **Issues:** Known bugs, feature requests, discussions
- **Pull Requests:** Recent changes, code review patterns

**External Resources:**
- React Best Practices
- TypeScript Handbook
- Jest Testing Framework
- Storybook Documentation
- Web Accessibility Guidelines (WCAG)

### 📞 **Communication & Reporting**

**After each work session, Codex should provide:**
1. **Summary:** What was accomplished
2. **Metrics:** Test coverage, component completion rate
3. **Issues:** Problems encountered and solutions applied
4. **Next Steps:** Specific recommendations for continuation
5. **Quality Report:** Current state vs. target standards

**Enhanced Report Format:**
```markdown
## Codex Session Report - [Date]

### 📊 Metrics Overview
- **Starting State:** X% test coverage, Y% story coverage
- **Ending State:** A% test coverage, B% story coverage
- **Files Generated:** Z tests, W stories
- **Issues Fixed:** N validation issues resolved

### ✅ Completed
- Component X: Implementation + Tests + Stories (Coverage: 95%)
- Fixed Y accessibility issues in Component Z
- Ran completion finisher: Generated N missing files

### 🔧 In Progress
- Component A: Implementation complete, tests 70% done
- Package @smolitux/core: 45/60 components complete

### ❌ Blocked
- Component B: Waiting for dependency X to be updated

### 🎯 Next Session Priorities
1. Focus on @smolitux/charts package - LineChart component priority
2. Enhance generated test files with component-specific logic
3. Review and improve story files with realistic scenarios

### 🚨 Issues Encountered
- [List any problems and solutions applied]

### 📋 Quality Status
- ESLint Errors: X → 0
- TypeScript Strict: ✅ Compliant
- Coverage Target: ≥90% achieved for Y packages
```

## 🛠️ **Advanced Codex Tools**

### **Repository Analyzer**
- **Purpose:** Assess current state before making changes
- **Usage:** Run before any major component work
- **Output:** Package breakdown, coverage metrics, validation issues

### **Completion Finisher**
- **Purpose:** Bulk generation of missing tests and stories
- **Usage:** When multiple packages need test/story completion
- **Features:** 
  - Smart component detection (excludes test/story files)
  - Template-based generation with proper placeholders
  - Validation issue fixing
  - Comprehensive status reporting

### **Coverage Dashboard Generator**
- **Purpose:** Generate detailed coverage reports
- **Usage:** `./generate-coverage-dashboard.sh --package <name>`
- **Integration:** Updates wiki documentation automatically

## 🎯 **Success Metrics**

**Repository-Level Goals:**
- 100% test coverage across all packages
- 100% story coverage for component library
- Zero ESLint errors/warnings
- All components pass accessibility tests
- Complete documentation coverage

**Package-Level Goals:**
- ≥90% test coverage per package
- All components have comprehensive stories
- TypeScript strict mode compliance
- Performance benchmarks met

**Component-Level Goals:**
- All props tested
- All user interactions covered
- Accessibility compliance verified
- Documentation complete
- Examples provided

This enhanced guide ensures Codex operates efficiently while maintaining the highest quality standards for the Smolitux UI component library, with improved tooling and workflows to prevent common pitfalls.
