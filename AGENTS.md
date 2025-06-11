# Smolitux UI - Codex Agent System

## 🎯 Mission: Complete Component Library

Primary Goals:
- Complete all UI components to production-ready status
- Ensure zero TypeScript/ESLint errors
- Achieve comprehensive test coverage
- Provide complete documentation

## 🚀 Operation Modes

### **PR Management Mode** 🔀 (CURRENT MODE)
**When:** Received PR merge prompts
**Action:** EXECUTE the PR merge workflow immediately
**Focus:** Merge PRs chronologically, preserve ALL code improvements
**Do NOT:** Read documentation, run analysis, generate components

### **Component Development Mode** 🔧
**When:** Received component development prompts  
**Action:** Create/complete components systematically
**Focus:** Quality implementation, testing, documentation

### **Analysis Mode** 🔍
**When:** Received analysis prompts
**Action:** Run repository analysis and generate reports
**Focus:** Current state assessment, progress tracking

## 📋 Repository Structure

```
smolitux-ui/
├── packages/@smolitux/
│   ├── core/                   # Foundation components
│   ├── theme/                  # Design system
│   ├── utils/                  # Utilities
│   ├── testing/                # Test utilities
│   ├── layout/                 # Layout components
│   ├── charts/                 # Data visualization
│   ├── media/                  # Media components
│   ├── community/              # Social features
│   ├── ai/                     # AI components
│   ├── blockchain/             # Blockchain components
│   ├── resonance/              # Platform features
│   ├── federation/             # Cross-platform integration
│   └── voice-control/          # Voice interfaces
└── scripts/                    # Use only when instructed
```

## 🔧 Setup Verification

**Repository:** https://github.com/EcoSphereNetwork/smolitux-ui.git
**Default Branch:** main

Quick check (only if issues):
```bash
git remote -v  # Should show origin
gh auth status  # Should show authenticated
```

## 🚨 Critical Rules

### **PR Management Mode Rules:**
1. **NEVER close PRs** without successful merge
2. **PRESERVE ALL code improvements** from PRs
3. **Recover closed PRs** automatically
4. **Resolve conflicts** by keeping PR improvements
5. **Work chronologically** (oldest PR first)

### **Conflict Resolution Priority:**
1. Security fixes (highest)
2. Bug fixes (highest)
3. Performance improvements
4. New features (combine with existing)
5. Documentation (merge both)

### **Never Do:**
- Close PRs when conflicts occur
- Lose code improvements from PRs
- Skip conflict resolution
- Work on multiple modes simultaneously

## 🎯 Success Indicators

- All PRs successfully merged (not closed)
- All code improvements preserved in main branch
- No regression of bug fixes or security improvements
- Chronological merge order maintained

---

**Focus on your assigned task. In PR Management Mode: Execute the merge workflow immediately without reading additional documentation.**
