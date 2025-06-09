# 🎨 @smolitux/theme - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS THEME SYSTEM 100% COMPLETE
while [ ! -f "packages/@smolitux/theme/src/index.ts" ] || [ "$(grep -c "export" packages/@smolitux/theme/src/index.ts)" -lt 8 ]; do
  bash scripts/smolitux-analyzer.sh --package=theme
  cd packages/@smolitux/theme
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE THEME KOMPONENTE
  THEME_FEATURES=("ThemeProvider" "useTheme" "ColorSystem" "Typography" "Spacing" "BreakPoints" "Tokens" "CSSVariables")
  
  NEXT=$(for feature in "${THEME_FEATURES[@]}"; do
    if ! grep -q "$feature" src/index.ts 2>/dev/null; then
      echo "$feature"; break
    fi
  done)
  
  echo "🎯 COMPLETING THEME: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE THEME FEATURE
  [IMPLEMENT_OR_IMPROVE_THEME]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(theme): complete $NEXT - design system component"
  git push origin main
  gh pr create --title "Complete Theme: $NEXT" --body "Design system implementation with TypeScript"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(grep -c "export" src/index.ts)/8 Theme Features"
done
echo "🎉 @smolitux/theme 100% COMPLETE!"
```

---

## 📋 **THEME PACKAGE SPEZIFIKATIONEN:**

### **🎯 Theme Features (8 Total):**
```
ThemeProvider useTheme ColorSystem Typography Spacing BreakPoints Tokens CSSVariables
```

### **✅ Pro Feature REQUIRED:**
- **ThemeProvider:** Context + CSS variables + dark/light mode
- **useTheme:** Hook für theme access + mode switching
- **ColorSystem:** Primary, secondary, accent, semantic colors
- **Typography:** Font families, sizes, weights, line heights
- **Spacing:** Consistent spacing scale (4px grid)
- **BreakPoints:** Responsive design breakpoints
- **Tokens:** Design tokens export (JSON + TypeScript)
- **CSSVariables:** Auto-generated CSS custom properties

### **🔧 Implementierung STRUKTUR:**
```
src/
├── providers/ThemeProvider.tsx    # Main theme context
├── hooks/useTheme.ts             # Theme hook
├── tokens/                       # Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── breakpoints.ts
├── utils/cssVariables.ts         # CSS variables generator
└── index.ts                      # Complete exports
```

### **🎨 Design System REQUIREMENTS:**
```typescript
// THEME CONFIG Interface:
interface ThemeConfig {
  colors: ColorPalette;           // Primary, secondary, semantic
  typography: TypographyScale;    // Sizes, weights, families
  spacing: SpacingScale;          # 4px grid system
  breakpoints: BreakPointMap;     // sm, md, lg, xl, 2xl
  borderRadius: RadiusScale;      // Consistent border radius
  shadows: ShadowScale;           // Box shadows
}

// DARK/LIGHT Mode Support:
type ThemeMode = 'light' | 'dark' | 'system';
```

### **🧪 TESTING Requirements:**
- **Context Tests:** Provider functionality, mode switching
- **Hook Tests:** useTheme hook behavior, mode persistence
- **CSS Tests:** Variables generation, theme application
- **Integration:** Theme works with @smolitux/core components

### **📚 STORYBOOK Integration:**
```typescript
// REQUIRED Stories:
✅ ThemeShowcase (color palette)
✅ TypographyScale (all font sizes)
✅ SpacingExamples (spacing grid)
✅ DarkLightToggle (mode switching)
✅ ComponentTheming (themed components)
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-theme.md`
- **INTEGRATION:** Ensure @smolitux/core compatibility
- **CSS VARS:** Auto-generate without conflicts

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
THEME_EXPORTS=$(grep -c "export" src/index.ts)
if [ $THEME_EXPORTS -lt 8 ]; then
  echo "🔄 CONTINUE: $THEME_EXPORTS/8 Complete - Next theme feature..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 DESIGN SYSTEM COMPLETE: @smolitux/theme 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **8/8 Theme Features** fully implemented
- **CSS Variables** auto-generated for all tokens
- **Dark/Light Mode** seamless switching
- **@smolitux/core Integration** verified
- **Design System** ready for production

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **ThemeProvider STRUCTURE:**
```typescript
// CORE Implementation:
export const ThemeProvider: FC<{children: ReactNode; defaultMode?: ThemeMode}> = ({children, defaultMode = 'system'}) => {
  // Theme state, CSS variables injection, system detection
}

export const useTheme = () => {
  // Theme access, mode switching, CSS variables
}
```

### **Tokens ORGANIZATION:**
```typescript
// DESIGN TOKENS Export:
export const tokens = {
  colors: { /* complete color system */ },
  typography: { /* font scale */ },
  spacing: { /* 4px grid */ },
  // ... all design tokens
}
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-theme.md << EOF
# @smolitux/theme Status
Last Updated: $(date)
Progress: $(grep -c "export" src/index.ts)/8 ($(echo "scale=0; $(grep -c "export" src/index.ts) * 100 / 8" | bc)%)
Theme System: $([ -f "src/providers/ThemeProvider.tsx" ] && echo "✅" || echo "🔄")
Latest: $NEXT ✅
Integration: @smolitux/core compatible
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 8/8 THEME FEATURES = 100% DESIGN SYSTEM!**
