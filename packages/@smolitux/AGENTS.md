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

## 🤖 **Codex AI Agent Guidelines**

### ✅ **What Codex SHOULD do:**
- **Component analysis & completion** for each package systematically
- **Ensure ≥90% test coverage** across all 200+ components
- **Fix TypeScript/ESLint errors** and improve type safety
- **Complete missing implementations** (stories, tests, documentation)
- **Optimize performance** and ensure accessibility compliance
- **Maintain i18n support** (German/English localization)

### ❌ **What Codex MUST NOT do:**
- **Publish to npm** or modify package versions
- **Push git tags** or create releases
- **Change core architecture** or package dependencies

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

### 🔧 **Package-Specific Considerations**

#### **Core Package** (Priority #1)
- **60+ components** - largest package requiring systematic approach
- **Complex components:** Table, Form, Modal, Carousel require extra attention
- **Animation components:** Fade, Slide, Zoom need performance testing
- **Integration tests** in `__tests__/integration/`

#### **AI Package** (Specialized)
- **Domain-specific logic:** Content moderation, sentiment analysis
- **Mock data requirements** for AI service responses
- **Performance considerations** for real-time analytics

#### **Blockchain Package** (Specialized)
- **Web3 integration testing** - mock wallet connections
- **Token/currency formatting** validation
- **Smart contract interaction** error handling

#### **Voice-Control Package** (Specialized)
- **Browser API mocking** (Speech Recognition, Speech Synthesis)
- **Engine-specific testing** for different voice recognition models
- **Accessibility-critical** - ensure proper ARIA live regions

### 📊 **Progress Tracking & Reporting**
Update these files after each package completion:
```bash
# Component status
echo "✅ @smolitux/core: 60/60 components complete (95% coverage)" >> COMPONENT_STATUS.md

# Coverage dashboard
./generate-coverage-dashboard.sh --package core --update-docs

# Development status
# Update docs/wiki/development/component-status.md
```

### 🚨 **Common Issues & Solutions**

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
3. **Test cross-package dependencies** - ensure utils/theme work with core
4. **Document specialized packages** - AI/blockchain components need extra docs
5. **Validate i18n** - test German/English translations

### 🔄 **Codex Session Report Template**
```markdown
## Session Report - [Date]
**Package:** @smolitux/[package]
**Progress:** [X]/[Total] components completed

### ✅ Completed
- ComponentName: Implementation ✓ Tests ✓ Stories ✓ (Coverage: 95%)

### 🔧 Fixed
- Fixed TypeScript errors in ComponentX
- Added missing accessibility attributes to ComponentY

### 📊 Metrics
- Package Coverage: 85% → 92%
- TypeScript Errors: 12 → 0
- ESLint Errors: 5 → 0

### 🎯 Next Session
Continue with @smolitux/[next-package] - focus on [specific components]
```

---
**💡 Key Insight:** This is a **production-grade component library** with advanced features. Prioritize quality and consistency over speed. Each component represents significant user value in AI, blockchain, and social platform contexts.
