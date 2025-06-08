# 🚀 OPTIMIZED CODEX - Quick Reference

**Zero-setup, maximum productivity guide for Codex agents**

## ⚡ **Quick Start (Choose Your Approach)**

### **🎯 Approach A: Direct Component Work** 
*Best when: Dependencies work, want immediate results*

```bash
# 30-second assessment
find packages/@smolitux/core/src/components -maxdepth 1 -type d | head -5

# 8-minute per-component workflow
COMPONENT="Button"  # Iterate through each
echo "🧩 FIXING: $COMPONENT"
# → Analyze → Fix TypeScript → Tests → Stories → Validate → Next
```

**Session Goal:** 5 components fixed per session (~45 minutes)

### **🔧 Approach B: Systematic Analysis + Bulk** 
*Best when: Many missing files, want comprehensive completion*

```bash
# 1. Assess repository state
bash scripts/smolitux-analyzer.sh

# 2. Bulk completion (if needed)
bash scripts/smolitux-completion-finisher.sh

# 3. Quality enhancement
# Focus on improving generated files
```

**Session Goal:** Complete package analysis + targeted improvements

---

## 🎯 **Per-Component Workflow (8 minutes)**

### **Minute 0-1: Quick Analysis**
```bash
COMPONENT="Button"
PACKAGE="core"

# Check current state
ls packages/@smolitux/$PACKAGE/src/components/$COMPONENT/
head -10 packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.tsx
```

### **Minute 1-3: TypeScript Implementation**
```typescript
// Ensure proper structure
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  // ... other props with JSDoc
}

export const Component = forwardRef<HTMLElement, ComponentProps>((props, ref) => {
  return <element ref={ref} data-testid="Component" {...props} />;
});
```

### **Minute 3-6: Test Implementation**
```typescript
// Essential tests only
describe('Component', () => {
  it('renders correctly', () => { /* basic render */ });
  it('handles props correctly', () => { /* props test */ });
  it('has no accessibility violations', async () => { /* jest-axe */ });
});
```

### **Minute 6-8: Story Implementation**
```typescript
// Basic stories
export default { title: 'Core/Component', component: Component };
export const Default = {};
export const WithProps = { args: { prop: 'value' } };
export const AllVariants = { /* variant showcase */ };
```

### **Minute 8: Validation**
```bash
# Quick check
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT" --passWithNoTests
echo "✅ $COMPONENT: Complete" >> COMPONENT_STATUS.md
```

---

## 📋 **Session Templates**

### **Template A: Direct Component Session**
```markdown
## Session [X] - $(date +%Y-%m-%d)

### 🎯 Target (5 components, 45 min):
1. [ ] Button (8 min)
2. [ ] Input (8 min)  
3. [ ] Card (8 min)
4. [ ] Modal (8 min)
5. [ ] Table (8 min)

### ✅ Results:
- Components Fixed: X/5
- Average Time: X min per component
- Issues: [any problems encountered]

### 🎯 Next:
Continue with [next 5 components]
```

### **Template B: Analysis + Bulk Session**
```markdown
## Analysis Session [X] - $(date +%Y-%m-%d)

### 📊 Repository Analysis:
- Total Components: [X]
- Missing Tests: [X] 
- Missing Stories: [X]
- Coverage: [X]%

### 🔧 Actions Taken:
- Ran completion finisher: Generated [X] tests, [Y] stories
- Fixed [Z] validation issues
- Updated COMPONENT_STATUS.md

### 🎯 Next:
Quality enhancement of generated files in @smolitux/[package]
```

---

## 🛠️ **Essential Tools**

### **Repository Analyzer**
```bash
bash scripts/smolitux-analyzer.sh
# Shows: coverage %, missing files, validation issues
```

### **Completion Finisher** 
```bash
bash scripts/smolitux-completion-finisher.sh [--detailed]
# Generates: missing tests/stories, fixes validation issues
```

### **Quick Component Check**
```bash
# Component analysis one-liner
COMP="Button"; ls packages/@smolitux/core/src/components/$COMP/ && echo "Files: $(ls packages/@smolitux/core/src/components/$COMP/ | wc -l)"
```

---

## ⚠️ **Critical Dos & Don'ts**

### **✅ DO:**
- Run analyzer first to understand current state
- Work systematically through packages (core → theme → layout → ...)
- Use 8-minute per-component target
- Validate each component before moving on
- Update COMPONENT_STATUS.md after each component

### **❌ DON'T:**
- Generate duplicate files (use improved scripts only)
- Work on test/story files as if they were components  
- Skip TypeScript strict mode compliance
- Ignore accessibility testing
- Work without understanding current state

---

## 🎯 **Success Metrics**

### **Per Session:**
- **Components Fixed:** 5 per direct session
- **Time per Component:** ~8 minutes average
- **Quality Gate:** TypeScript + ESLint + Tests passing

### **Per Package:**
- **Test Coverage:** ≥90%
- **Story Coverage:** 100% 
- **Build Status:** Clean with no errors
- **Accessibility:** All jest-axe tests passing

---

## 🔄 **Iteration Strategy**

### **Package Order:**
1. `@smolitux/core` (foundation)
2. `@smolitux/theme` (styling)
3. `@smolitux/layout` (layout)
4. `@smolitux/utils` (utilities)
5. Continue through specialized packages...

### **Component Priority per Package:**
1. Basic components (Button, Input, Card)
2. Layout components (Container, Grid, Flex)
3. Form components (Form, Field, Select)
4. Complex components (Table, Modal, Carousel)

---

## 💡 **Productivity Hacks**

### **Time Savers:**
- Copy proven test patterns between similar components
- Use completion finisher for bulk missing files
- Template reuse for consistent story structures
- Quick validation commands per component

### **Quality Shortcuts:**
- Start with accessibility in mind (saves rework)
- Use TypeScript strict mode from beginning
- Include data-testid in initial implementation
- Write JSDoc as you code (not later)

### **Common Fixes:**
```bash
# Missing React import
sed -i '1i import React from '\''react'\'';' ComponentFile.tsx

# Add missing export
echo "export default ComponentName;" >> ComponentFile.tsx

# Quick test-id addition
sed -i 's/<div/<div data-testid="ComponentName"/g' ComponentFile.tsx
```

---

## 🚀 **Optimized Starting Prompts**

### **For Direct Component Work:**
```
Fix 5 core components systematically: packages/@smolitux/core/src/components/[Button|Input|Card|Modal|Table] - ensure TypeScript compliance, create missing *.test.tsx and *.stories.tsx files, 8 minutes per component target, document progress in COMPONENT_STATUS.md, skip setup/dependencies
```

### **For Systematic Completion:**
```
Analyze Smolitux UI repository state using scripts/smolitux-analyzer.sh, identify packages with low coverage, run completion finisher for bulk file generation, then focus on quality enhancement of generated files, prioritize @smolitux/core package
```

### **For Quality Enhancement:**
```
Review and enhance generated test/story files in @smolitux/[package], improve component-specific test logic, add realistic story scenarios, ensure ≥90% coverage, validate accessibility compliance, focus on [specific components]
```

---

**🎯 This quick reference enables immediate productivity while maintaining quality standards. Choose the approach that fits your current repository state and session goals.**
