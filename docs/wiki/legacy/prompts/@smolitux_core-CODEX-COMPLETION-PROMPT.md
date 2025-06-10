# 🎯 @smolitux/core - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS 100% COMPLETION
while [ "$(find packages/@smolitux/core/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 20 ]; do
  bash scripts/smolitux-analyzer.sh --package=core
  cd packages/@smolitux/core
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE KOMPONENTE
  NEXT=$(echo "Button Input Card Modal Table Form Select Checkbox Radio Textarea Badge Avatar Alert Breadcrumb Pagination Tooltip Popover Dropdown Tabs Accordion" | tr ' ' '\n' | while read comp; do
    if [ ! -f "src/components/$comp/$comp.tsx" ] || [ ! -f "src/components/$comp/$comp.test.tsx" ] || [ ! -f "src/components/$comp/$comp.stories.tsx" ]; then
      echo "$comp"; break
    fi
  done)
  
  echo "🎯 COMPLETING: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_COMPONENT]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(core): complete $NEXT - 100% implementation"
  git push origin main
  gh pr create --title "Complete $NEXT" --body "100% TypeScript + Tests + Stories + A11y"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/20 Core Components"
done
echo "🎉 @smolitux/core 100% COMPLETE!"
```

---

## 📋 **CORE PACKAGE SPEZIFIKATIONEN:**

### **🎯 Ziel-Komponenten (20 Total):**
```
Button Input Card Modal Table Form Select Checkbox Radio Textarea 
Badge Avatar Alert Breadcrumb Pagination Tooltip Popover Dropdown Tabs Accordion
```

### **✅ Pro Komponente REQUIRED:**
- **TypeScript:** `ComponentName.tsx` mit forwardRef, typed props, variants
- **Tests:** `ComponentName.test.tsx` mit jest-axe, user interactions, all variants  
- **Stories:** `ComponentName.stories.tsx` mit Default, AllVariants, Interactive
- **Export:** Update `src/index.ts` mit component + types export

### **🔧 Implementierung PRIORITÄT:**
1. **PRÜFE EXISTING:** Ist Komponente bereits vorhanden aber unvollständig?
2. **VERBESSERE:** TypeScript issues, missing tests, incomplete stories
3. **ERSTELLE NUR:** Falls Datei komplett fehlt
4. **VALIDIERE:** npm run test && npm run build erfolreich

### **📁 File Structure TEMPLATE:**
```
src/components/ComponentName/
├── ComponentName.tsx      # React component mit forwardRef
├── ComponentName.test.tsx # Jest tests + accessibility  
└── ComponentName.stories.tsx # Storybook stories
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-core.md`
- **NEVER TOUCH:** `docs/wiki/development/component-status.md` (master file)
- **ISSUE CREATION:** Bei unlösbaren TypeScript/Build errors

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
COMPLETED=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $COMPLETED -lt 20 ]; then
  echo "🔄 CONTINUE: $COMPLETED/20 Complete - Next iteration..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 MISSION ACCOMPLISHED: @smolitux/core 100% COMPLETE!"
fi
```

### **📊 SUCCESS METRICS:**
- **20/20 Components** with complete implementation
- **100% Test Coverage** with accessibility validation
- **Complete Storybook** documentation for all variants
- **Zero TypeScript Errors** in strict mode
- **Successful Build** without warnings

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **Komponente VERBESSERN (nicht neu erstellen):**
```typescript
// PRÜFE: Fehlt forwardRef?
const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)

// PRÜFE: Fehlen Variants?
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

// PRÜFE: Fehlt Accessibility?
aria-label, role, aria-expanded, keyboard navigation
```

### **Tests VERVOLLSTÄNDIGEN:**
```typescript
// REQUIRED Tests:
✅ renders correctly
✅ handles all variants  
✅ forwards ref
✅ accessibility (jest-axe)
✅ user interactions
✅ disabled state
```

### **Stories KOMPLETTIEREN:**
```typescript
// REQUIRED Stories:
✅ Default
✅ AllVariants (grid view)
✅ Interactive (with actions)
✅ Disabled states
✅ Size variations
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-core.md << EOF
# @smolitux/core Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/20 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 20" | bc)%)
Latest: $NEXT ✅
Next: [AUTO-DETERMINED]
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 20/20 CORE COMPONENTS = 100% COMPLETE!**
