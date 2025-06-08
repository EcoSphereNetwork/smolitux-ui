# AGENTS.md - Smolitux UI Component Library

## 🎯 **Repository Overview**
Smolitux UI is an **advanced TypeScript React component library** built as a **monorepo** with 13 specialized packages covering everything from core UI to AI, blockchain, and federation components.

**Repository:** https://github.com/EcoSphereNetwork/smolitux-ui

## 📁 **Actual Package Structure**
```
packages/@smolitux/
├── core/                        # 60+ foundational components (Button, Modal, Table, etc.)
├── theme/                       # Theme system & design tokens
├── layout/                      # Layout components (Container, Grid, Flex, Header, etc.)
├── utils/                       # Utilities (formatters, helpers, styling, validators)
├── testing/                     # Test utilities, mocks, a11y helpers
├── charts/                      # Data visualization (AreaChart, BarChart, PieChart, etc.)
├── ai/                          # AI components (ContentAnalytics, SentimentDisplay, etc.)
├── blockchain/                  # Blockchain components (WalletConnect, TokenDisplay, etc.)
├── community/                   # Community features (ActivityFeed, UserProfile, etc.)
├── media/                       # Media components (AudioPlayer, VideoPlayer, etc.)
├── resonance/                   # Resonance platform (feed, governance, monetization)
├── federation/                  # Cross-platform federation (FederatedSearch, etc.)
└── voice-control/               # Voice control engines and models
```

## ⚡ **Core Commands**
```bash
# Install dependencies
npm install

# Run tests (all packages)
npm run test

# Run tests (specific package)
npm run test --workspace=@smolitux/core

# Build all packages
npm run build

# Coverage report
./generate-coverage-dashboard.sh --package core

# Lint & format
npm run lint && npm run format
```

## 🚀 **Optimized Codex Workflow**

### **Phase 0: Assessment (Always Start Here)**
```bash
# Repository Analyzer - understand current state
bash scripts/smolitux-analyzer.sh

# If massive completion needed:
bash scripts/smolitux-completion-finisher.sh
```

### **Phase 1: Direct Component Work (Zero Setup Approach)**
**Mission:** Skip setup hell, work directly with existing code.

```bash
# 1. Quick inventory of priority package
find packages/@smolitux/core/src/components -maxdepth 1 -type d | head -5

# 2. Per-component workflow (8 minutes each)
COMPONENT="Button"  # Iterate through each
echo "🧩 FIXING: $COMPONENT"

# Analyze → Fix TypeScript → Create Tests → Create Stories → Validate → Move Next
```

### **Phase 2: Component-by-Component Completion**
**Realistic Session Goals:**
- **Session 1:** Fix 5 core components (Button, Input, Card, Modal, Table)
- **Session 2:** Fix 5 layout components
- **Session 3:** Fix 5 form components
- **Continue systematically...**

## 🤖 **Codex AI Agent Guidelines**

### ✅ **What Codex SHOULD do:**
- **Component analysis & completion** for each package systematically
- **Ensure ≥90% test coverage** across all 200+ components
- **Fix TypeScript/ESLint errors** and improve type safety
- **Complete missing implementations** (stories, tests, documentation)
- **Optimize performance** and ensure accessibility compliance
- **Maintain i18n support** (German/English localization)
- **Use completion tools** when appropriate for bulk operations

### ❌ **What Codex MUST NOT do:**
- **Publish to npm** or modify package versions
- **Push git tags** or create releases
- **Change core architecture** or package dependencies
- **Generate duplicate files** (e.g., `Component.test.test.tsx`)
- **Work on test/story files as if they were components**

### 🎯 **Package Priority & Complexity**

#### **Tier 1: Foundation** (Start Here)
1. **`@smolitux/core`** ⭐⭐⭐ - 60+ foundational components (Button, Input, Modal, Table, etc.)
2. **`@smolitux/theme`** ⭐⭐ - Theme system and design tokens
3. **`@smolitux/utils`** ⭐⭐ - Formatters, helpers, styling utilities, validators
4. **`@smolitux/testing`** ⭐ - Test utilities and accessibility helpers

#### **Tier 2: Layout & Visualization** 
5. **`@smolitux/layout`** ⭐⭐ - Container, Grid, Flex, Header, Footer, Sidebar
6. **`@smolitux/charts`** ⭐⭐ - 7 chart types (Area, Bar, Line, Pie, Radar, etc.)

#### **Tier 3: Advanced Features**
7. **`@smolitux/media`** ⭐⭐ - Audio/Video players, media grids
8. **`@smolitux/community`** ⭐⭐ - Social features (profiles, feeds, comments)

#### **Tier 4: Specialized** (Complex Domain Logic)
9. **`@smolitux/ai`** ⭐⭐⭐ - AI-powered components (sentiment, analytics, moderation)
10. **`@smolitux/blockchain`** ⭐⭐⭐ - Crypto/DeFi components (wallets, tokens, staking)
11. **`@smolitux/resonance`** ⭐⭐⭐ - Platform-specific components (governance, monetization)
12. **`@smolitux/federation`** ⭐⭐⭐ - Cross-platform integration
13. **`@smolitux/voice-control`** ⭐⭐⭐ - Voice interface engines

### 📋 **Component Quality Checklist**
Each component must have:
- ✅ **TypeScript implementation** (no `any` types, proper interfaces)
- ✅ **≥90% test coverage** (unit, integration, accessibility)
- ✅ **Storybook stories** (all variants, edge cases)
- ✅ **i18n support** (German/English locales where applicable)
- ✅ **Accessibility compliance** (ARIA, semantic HTML, jest-axe tests)
- ✅ **Performance optimization** (React.memo, proper dependencies)
- ✅ **Clean ESLint** (0 errors, minimal warnings)

### 🔧 **Optimized Component Fix Workflow**

#### **Per-Component Template (8 minutes each):**
```typescript
// 1. TypeScript (2 min) - Ensure proper interfaces
interface ComponentProps {
  // No 'any' types, all props documented with JSDoc
}

export const Component = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
  // Implementation with proper accessibility
});

// 2. Test File (3 min) - Essential test coverage
describe('Component', () => {
  it('renders correctly', () => { /* ... */ });
  it('handles props correctly', () => { /* ... */ });
  it('has no accessibility violations', async () => { /* jest-axe */ });
});

// 3. Story File (2 min) - Storybook integration
export default { title: 'Core/Component', component: Component };
export const Default = {};
export const WithProps = { args: { prop: 'value' } };

// 4. Validation (1 min) - Quick sanity check
```

### 🚨 **Common Issues & Solutions**

#### **Duplicate File Prevention (CRITICAL):**
- **Problem:** Original completion script generated `Component.test.test.tsx`
- **Solution:** Use improved completion finisher with proper file filtering
- **Prevention:** Always exclude test/story files from component detection

#### **Dependency Problems:**
```bash
npm install --save-dev @typescript-eslint/eslint-plugin jest jest-axe 
npm install --save-dev @testing-library/react @testing-library/user-event
npm install --save-dev tsup ts-node react @types/react @types/react-dom
```

#### **Test Environment:**
```bash
# If tests fail due to missing setup
touch test-utils/setup.ts
echo "import '@testing-library/jest-dom';" >> test-utils/setup.ts
```

#### **Coverage Issues:**
```bash
# Generate detailed coverage report
npm test -- --coverage --coverageReporters=text,lcov,html
```

### 📊 **Progress Tracking & Reporting**

#### **Automated Status Updates:**
```bash
# Component status (auto-updated by completion finisher)
echo "✅ @smolitux/core: 60/60 components complete (95% coverage)" >> COMPONENT_STATUS.md

# Coverage dashboard
./generate-coverage-dashboard.sh --package core --update-docs

# Development status
# Update docs/wiki/development/component-status.md
```

#### **Session Report Template:**
```markdown
## Session Report - [Date]
**Package:** @smolitux/[package]
**Progress:** [X]/[Total] components completed
**Time:** [X] minutes total (~8 min per component)

### ✅ Completed This Session
- ComponentA: Added missing tests + stories
- ComponentB: Fixed TypeScript errors + accessibility
- ComponentC: Complete overhaul (was broken)

### 🔧 Fixed Issues
- Fixed duplicate file generation (used improved script)
- Resolved TypeScript strict mode violations
- Added missing accessibility attributes

### 📊 Metrics
- Components Fixed: X/Y target
- Package Coverage: 85% → 92%
- TypeScript Errors: 12 → 0
- ESLint Errors: 5 → 0

### 🎯 Next Session
Continue with @smolitux/[next-package] - focus on [specific components]
```

### 🎯 **Success Metrics per Package**
- **TypeScript:** 100% strict compliance, 0 `any` types
- **Tests:** ≥90% coverage (statements, branches, functions, lines)
- **Performance:** Components render in <16ms (React DevTools)
- **Accessibility:** 100% jest-axe compliance
- **Build:** Clean build with 0 errors, minimal warnings
- **Bundle Size:** No unexpected increases (track with bundlephobia)

### 📈 **Iteration Strategy**
1. **Start with `@smolitux/core`** - foundational components first
2. **Complete 5-10 components per session** - maintain quality over speed
3. **Use completion tools wisely** - bulk generation when appropriate
4. **Test cross-package dependencies** - ensure utils/theme work with core
5. **Document specialized packages** - AI/blockchain components need extra docs
6. **Validate i18n** - test German/English translations

### 🔄 **Optimized Codex Session Template**
```markdown
## Optimized Session [X] - $(date +%Y-%m-%d)

### 🎯 Target Components:
1. [ ] ComponentA (TypeScript + Tests + Stories)
2. [ ] ComponentB (TypeScript + Tests + Stories)
3. [ ] ComponentC (TypeScript + Tests + Stories)
4. [ ] ComponentD (TypeScript + Tests + Stories)
5. [ ] ComponentE (TypeScript + Tests + Stories)

### ⏱️ Time Tracking:
- Component Analysis: 5 min
- Per-Component Work: 8 min × 5 = 40 min
- Session Total: ~45 min

### ✅ Session Results:
- Components Fixed: X/5
- Average Time: X minutes per component
- Quality: All pass TypeScript + ESLint + Tests

### 🎯 Next Session:
Focus on [specific components with clear priority]
```

---

## 🛠️ **Advanced Tools**

### **Repository Analyzer** (`scripts/smolitux-analyzer.sh`)
- Assess current state before making changes
- Package breakdown, coverage metrics, validation issues
- Predicts completion finisher impact

### **Completion Finisher** (`scripts/smolitux-completion-finisher.sh`)
- Bulk generation with improved logic (no duplicates)
- Template-based generation with proper placeholders
- Comprehensive status reporting

### **Coverage Dashboard Generator**
- Package-specific detailed reports
- Integration with wiki documentation
- Tracks progress over time

---

**💡 Key Insight:** This is a **production-grade component library** with advanced features. Use the optimized workflow for maximum efficiency:

1. **Assess first** (analyzer)
2. **Bulk complete if needed** (completion finisher)
3. **Work systematically** (component-by-component)
4. **Track progress** (automated status updates)
5. **Maintain quality** (comprehensive testing)

Prioritize quality and consistency over speed. Each component represents significant user value in AI, blockchain, and social platform contexts.
