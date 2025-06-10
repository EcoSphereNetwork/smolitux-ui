# Konfliktfreie Package-Specific Codex Prompts

## 🎯 **Lösung: Separate Dokumentations-Dateien pro Paket**

Um Merge-Konflikte zu vermeiden, schreibt jedes Paket in separate Status-Dateien.

---

## 🚀 **Tier 1: Foundation Packages (Konfliktfrei)**

### **@smolitux/core** (Höchste Priorität)
```
SMOLITUX CORE WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/core (60+ Basis-Komponenten: Button, Input, Modal, Table, Form, Card). Wenn >30% missing: bash scripts/smolitux-completion-finisher.sh --detailed. Code-Review: Button→Input→Card→Modal→Table→Form→Select→Checkbox→Radio Priority. TypeScript cleanup: keine any-types, forwardRef korrekt, Props-Interfaces vollständig. Tests: User-Interaction, A11y mit jest-axe, alle Variants. Stories: Default, Props, Interactive, Disabled, AllVariants. Integration-Tests für komplexe Komponenten (Table, Form). Update NUR docs/wiki/development/component-status-core.md (SKIP COMPONENT_STATUS.md - merge conflicts). Ziel: 100% Coverage, Core als solide Basis für andere Pakete
```

### **@smolitux/theme**
```
SMOLITUX THEME WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/theme (Design-System, Tokens, ThemeProvider). Code-Review: Theme-Komponenten, Color-System, Typography, Spacing-Scale. TypeScript: Theme-Interfaces strikt typisiert, keine any-types in ThemeProvider. Tests: Theme-Context, Dark/Light-Mode, Token-Resolution, CSS-Variable-Generation. Stories: Theme-Showcase, Color-Palette, Typography-Scale, Component-Theming. Validiere Cross-Package-Integration mit @smolitux/core. Update NUR docs/wiki/development/component-status-theme.md (SKIP COMPONENT_STATUS.md - merge conflicts). Ziel: Robustes Theme-System als Foundation für alle UI-Komponenten
```

### **@smolitux/utils**
```
SMOLITUX UTILS WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/utils (Formatters, Helpers, Validators, Styling-Utils). Code-Review: Utility-Functions, Type-Guards, Helper-Methods. TypeScript: Generics korrekt typisiert, Return-Types explizit, Input-Validation strikt. Tests: Edge-Cases, Error-Handling, Performance für häufig verwendete Utils. Stories: Utility-Showcase, Usage-Examples, Input/Output-Demonstrations. Cross-Package-Validation: Utils werden korrekt von anderen Paketen verwendet. Update NUR docs/wiki/development/component-status-utils.md (SKIP COMPONENT_STATUS.md - merge conflicts). Ziel: Zuverlässige Utility-Library als Dependency für alle anderen Pakete
```

### **@smolitux/testing**
```
SMOLITUX TESTING WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/testing (Test-Utils, Mocks, A11y-Helpers, Custom-Matchers). Code-Review: Test-Utilities, Mock-Providers, Accessibility-Helpers. TypeScript: Test-Helper-Types, Mock-Interfaces, Custom-Matcher-Types. Tests: Test-Utils selbst testen, Mock-Functionality, A11y-Helper-Validation. Stories: Testing-Showcase, Mock-Examples, A11y-Testing-Demo. Validiere: Test-Utils funktionieren mit anderen Paketen. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-testing.md. Ziel: Robuste Test-Infrastructure für gesamte Smolitux-Library
```

## 🎯 **Tier 2: Layout & Visualization (Konfliktfrei)**

### **@smolitux/layout**
```
SMOLITUX LAYOUT WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/layout (Container, Grid, Flex, Header, Footer, Sidebar, Navigation). Code-Review Priority: Container→Grid→Flex→Header→Footer. TypeScript: Layout-Props, Responsive-Breakpoints, Grid-System-Types. Tests: Responsive-Behavior, Layout-Composition, CSS-Grid/Flexbox-Logic. Stories: Responsive-Layouts, Grid-Examples, Navigation-Patterns, Layout-Combinations. CSS-Integration: Layout-System mit Theme-Integration. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-layout.md. Ziel: Flexibles Layout-System für komplexe UI-Strukturen
```

### **@smolitux/charts**
```
SMOLITUX CHARTS WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/charts (AreaChart, BarChart, LineChart, PieChart, RadarChart). Code-Review Priority: LineChart→BarChart→PieChart→AreaChart→RadarChart. TypeScript: Chart-Data-Interfaces, Config-Types, Event-Handler-Types. Tests: Data-Rendering, Interactive-Features, Responsive-Charts, Error-Handling für malformed data. Stories: Chart-Types, Interactive-Features, Real-Data-Examples, Responsive-Behavior. Performance: Chart-Rendering-Optimization. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-charts.md. Ziel: Vollständige Data-Visualization-Library mit Interactive-Features
```

## 🎯 **Tier 3: Advanced Features (Konfliktfrei)**

### **@smolitux/media**
```
SMOLITUX MEDIA WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/media (AudioPlayer, VideoPlayer, ImageGallery, MediaGrid). Code-Review Priority: AudioPlayer→VideoPlayer→ImageGallery→MediaGrid. TypeScript: Media-Event-Types, Player-State-Interfaces, Gallery-Config-Types. Tests: Media-Playback-Logic, Controls-Interaction, Error-Handling, Accessibility für Media-Players. Stories: Media-Players mit Controls, Gallery-Layouts, Responsive-Media. Browser-API-Integration: HTMLMediaElement, File-API. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-media.md. Ziel: Comprehensive Media-Handling mit Accessibility-Support
```

### **@smolitux/community**
```
SMOLITUX COMMUNITY WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/community (UserProfile, ActivityFeed, Comments, Social-Features). Code-Review Priority: UserProfile→ActivityFeed→Comments→SocialInteractions. TypeScript: User-Data-Types, Activity-Interfaces, Comment-Threads, Social-Graph-Types. Tests: User-Interactions, Feed-Updates, Comment-System, Privacy-Controls. Stories: User-Profiles, Activity-Streams, Comment-Threads, Social-Components. Mock-Data: Realistic Social-Data für Stories. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-community.md. Ziel: Social-Platform-Features mit Privacy und Moderation
```

## 🎯 **Tier 4: Specialized (Konfliktfrei)**

### **@smolitux/ai**
```
SMOLITUX AI WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/ai (ContentAnalytics, SentimentDisplay, AI-Moderation, Content-Generation). Code-Review Priority: SentimentDisplay→ContentAnalytics→AI-Moderation→Content-Generation. TypeScript: AI-Response-Types, Analytics-Interfaces, Moderation-Config-Types. Tests: AI-Service-Mocks, Error-Handling für API-Failures, Real-time-Updates. Stories: AI-Components mit Mock-Data, Analytics-Dashboards, Moderation-Interfaces. Performance: AI-Response-Caching, Real-time-Processing. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-ai.md. Ziel: AI-powered UI-Components mit robuster Error-Handling
```

### **@smolitux/blockchain**
```
SMOLITUX BLOCKCHAIN WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/blockchain (WalletConnect, TokenDisplay, Transaction-History, DeFi-Components). Code-Review Priority: WalletConnect→TokenDisplay→Transaction-History→DeFi-Features. TypeScript: Wallet-Types, Token-Interfaces, Transaction-Types, Web3-Integration-Types. Tests: Wallet-Connection-Mocks, Token-Formatting, Transaction-Validation, Error-Handling für Blockchain-Failures. Stories: Wallet-Integration, Token-Displays, Transaction-Flows, DeFi-Interfaces. Web3-Integration: MetaMask, WalletConnect, Chain-Support. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-blockchain.md. Ziel: Comprehensive Blockchain-UI mit Multi-Chain-Support
```

### **@smolitux/resonance**
```
SMOLITUX RESONANCE WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/resonance (Feed-Components, Governance-UI, Monetization-Features). Code-Review Priority: Feed-Components→Governance-UI→Monetization→Platform-Specific-Features. TypeScript: Platform-Data-Types, Governance-Interfaces, Monetization-Types. Tests: Feed-Logic, Governance-Workflows, Payment-Integration-Mocks, Platform-Specific-Behavior. Stories: Resonance-Feed, Governance-Dashboards, Monetization-Flows, Platform-Integration. Business-Logic: Resonance-Platform-Specific Requirements. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-resonance.md. Ziel: Platform-Specific UI-Components für Resonance-Ecosystem
```

### **@smolitux/federation**
```
SMOLITUX FEDERATION WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/federation (FederatedSearch, Cross-Platform-Components, Integration-APIs). Code-Review Priority: FederatedSearch→Cross-Platform-Components→Integration-APIs→Protocol-Handlers. TypeScript: Federation-Protocols, Cross-Platform-Types, Search-Result-Interfaces. Tests: Federation-Logic-Mocks, Cross-Platform-Communication, Protocol-Validation, Error-Handling für Network-Issues. Stories: Federation-Interfaces, Cross-Platform-Demos, Search-Results, Protocol-Examples. Network-Logic: ActivityPub, Federation-Protocols. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-federation.md. Ziel: Cross-Platform-Federation mit Protocol-Compliance
```

### **@smolitux/voice-control**
```
SMOLITUX VOICE-CONTROL WORKFLOW: bash scripts/smolitux-analyzer.sh → fokus @smolitux/voice-control (Voice-Recognition, Speech-Synthesis, Voice-Commands, Audio-Processing). Code-Review Priority: Voice-Recognition→Speech-Synthesis→Voice-Commands→Audio-Processing. TypeScript: Speech-API-Types, Voice-Command-Interfaces, Audio-Processing-Types. Tests: Speech-API-Mocks, Voice-Command-Recognition, Accessibility-Integration, Error-Handling für unsupported browsers. Stories: Voice-Interfaces, Command-Demos, Accessibility-Features, Audio-Controls. Browser-APIs: SpeechRecognition, SpeechSynthesis, Web-Audio-API. Update COMPONENT_STATUS.md + docs/wiki/development/component-status-voice-control.md. Ziel: Comprehensive Voice-Interface mit Accessibility-First-Approach
```

---

## 📁 **Datei-Struktur für konfliktfreie Dokumentation**

```
docs/wiki/development/
├── component-status.md              # Master-Übersicht (MANUELL gepflegt - NO Codex updates)
├── component-status-core.md         # @smolitux/core Status (Codex updates)
├── component-status-theme.md        # @smolitux/theme Status (Codex updates)
├── component-status-utils.md        # @smolitux/utils Status (Codex updates)
├── component-status-testing.md      # @smolitux/testing Status (Codex updates)
├── component-status-layout.md       # @smolitux/layout Status (Codex updates)
├── component-status-charts.md       # @smolitux/charts Status (Codex updates)
├── component-status-media.md        # @smolitux/media Status (Codex updates)
├── component-status-community.md    # @smolitux/community Status (Codex updates)
├── component-status-ai.md           # @smolitux/ai Status (Codex updates)
├── component-status-blockchain.md   # @smolitux/blockchain Status (Codex updates)
├── component-status-resonance.md    # @smolitux/resonance Status (Codex updates)
├── component-status-federation.md   # @smolitux/federation Status (Codex updates)
└── component-status-voice-control.md # @smolitux/voice-control Status (Codex updates)
```

## 📋 **Master Status-Datei Template (MANUELL GEPFLEGT)**

**docs/wiki/development/component-status.md:** (Wird NICHT von Codex aktualisiert)
```markdown
# Smolitux UI Component Status - Master Overview

Last Updated: $(date +%Y-%m-%d)
**NOTE: This file is manually maintained to avoid merge conflicts**

## 📊 Overall Progress

### Foundation Packages (Tier 1)
- [📋 @smolitux/core](./component-status-core.md) - Updated by Codex
- [📋 @smolitux/theme](./component-status-theme.md) - Updated by Codex
- [📋 @smolitux/utils](./component-status-utils.md) - Updated by Codex
- [📋 @smolitux/testing](./component-status-testing.md) - Updated by Codex

### Layout & Visualization (Tier 2)
- [📋 @smolitux/layout](./component-status-layout.md) - Updated by Codex
- [📋 @smolitux/charts](./component-status-charts.md) - Updated by Codex

### Advanced Features (Tier 3)
- [📋 @smolitux/media](./component-status-media.md) - Updated by Codex
- [📋 @smolitux/community](./component-status-community.md) - Updated by Codex

### Specialized Packages (Tier 4)
- [📋 @smolitux/ai](./component-status-ai.md) - Updated by Codex
- [📋 @smolitux/blockchain](./component-status-blockchain.md) - Updated by Codex
- [📋 @smolitux/resonance](./component-status-resonance.md) - Updated by Codex
- [📋 @smolitux/federation](./component-status-federation.md) - Updated by Codex
- [📋 @smolitux/voice-control](./component-status-voice-control.md) - Updated by Codex

## 🎯 Quick Stats

*Check individual package status files for current metrics*

## 📋 Execution Order

1. **Foundation First:** core → theme → utils → testing
2. **Build Up:** layout → charts
3. **Advanced Features:** media + community (parallel)
4. **Specialized:** ai + blockchain + resonance + federation + voice-control (parallel)
```

## 🛠️ **Setup Script für Datei-Struktur**

```bash
#!/bin/bash
# setup-status-files.sh

mkdir -p docs/wiki/development

PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")

for pkg in "${PACKAGES[@]}"; do
    STATUS_FILE="docs/wiki/development/component-status-$pkg.md"
    
    cat > "$STATUS_FILE" << EOF
# @smolitux/$pkg Component Status

Last Updated: $(date +%Y-%m-%d)
Package: @smolitux/$pkg

## 📊 Package Overview
- Total Components: [TBD]
- Test Coverage: [TBD]%
- Story Coverage: [TBD]%
- Validation Issues: [TBD]

## 🔧 Latest Session Results
*No sessions recorded yet*

## 📋 Component Status
*Component analysis pending*

## 🎯 Next Steps
*To be determined after initial analysis*
EOF

    echo "Created: $STATUS_FILE"
done

echo "✅ All package-specific status files created!"
echo "📁 Files available at: docs/wiki/development/component-status-*.md"
```

## ✅ **Vorteile dieser Lösung**

1. **Keine Merge-Konflikte** - Jedes Paket schreibt in separate Datei
2. **Parallele Bearbeitung** - Mehrere Codex-Instanzen können gleichzeitig arbeiten
3. **Klare Trennung** - Package-spezifische Details in eigenen Dateien
4. **Master-Übersicht** - Zentrale Übersicht verlinkt zu Details
5. **Skalierbar** - Einfach neue Pakete hinzufügen

## ✅ **Vollständig Konfliktfreie Lösung**

1. **🚫 KEINE COMPONENT_STATUS.md Updates** - Wird manuell gepflegt
2. **✅ NUR Package-spezifische Status-Dateien** - `component-status-[PACKAGE].md`
3. **⚡ 12 parallele Codex-Instanzen** - Ohne Merge-Konflikte
4. **🎯 Klare Trennung** - Jedes Paket isoliert
5. **📋 Master-Übersicht bleibt sauber** - Manuelle Kontrolle

**Ergebnis:** Alle 12 Codex-Instanzen können **parallel und konfliktfrei** arbeiten! 🚀

## 🎯 **Ready-to-Use Prompts**

Alle Prompts sind **sofort einsatzbereit** und verwenden das Schema:
- ✅ **Update:** `docs/wiki/development/component-status-[PACKAGE].md`
- ❌ **SKIP:** `COMPONENT_STATUS.md` (merge conflicts avoided)

Kopiere einfach den gewünschten Prompt für das entsprechende Paket!
