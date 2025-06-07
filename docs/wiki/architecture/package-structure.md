# Paketstruktur

Diese Dokumentation beschreibt die Struktur und Organisation der Pakete in der Smolitux-UI-Bibliothek.

## Übersicht

Smolitux-UI ist als Monorepo mit mehreren Paketen organisiert. Jedes Paket hat eine spezifische Verantwortung und kann unabhängig von den anderen Paketen verwendet werden.

```
smolitux-ui/
├── packages/
│   ├── @smolitux/
│   │   ├── ai/
│   │   ├── blockchain/
│   │   ├── charts/
│   │   ├── community/
│   │   ├── core/
│   │   ├── federation/
│   │   ├── layout/
│   │   ├── media/
│   │   ├── resonance/
│   │   ├── theme/
│   │   └── utils/
│   └── playground/
├── docs/
├── .github/
├── .storybook/
├── package.json
├── lerna.json
└── tsconfig.json
```

## Pakete

### @smolitux/utils

Das `@smolitux/utils`-Paket enthält grundlegende Utility-Funktionen und -Komponenten, die von anderen Paketen verwendet werden.

#### Struktur

```
@smolitux/utils/
├── src/
│   ├── components/
│   │   ├── primitives/
│   │   │   ├── Box/
│   │   │   ├── Flex/
│   │   │   ├── Grid/
│   │   │   └── Text/
│   │   └── patterns/
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── Input/
│   │       └── Modal/
│   ├── styling/
│   │   ├── theme/
│   │   ├── colors/
│   │   ├── spacing/
│   │   ├── typography/
│   │   └── responsive/
│   ├── types/
│   │   ├── components/
│   │   ├── theme/
│   │   └── common/
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### Verantwortlichkeiten

- Bereitstellung von grundlegenden UI-Primitiven
- Bereitstellung von wiederverwendbaren UI-Patterns
- Bereitstellung von Styling-Utilities
- Bereitstellung von Typdefinitionen

### @smolitux/core

Das `@smolitux/core`-Paket enthält die Kernkomponenten der Smolitux-UI-Bibliothek.

#### Struktur

```
@smolitux/core/
├── src/
│   ├── components/
│   │   ├── Alert/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── ColorPicker/
│   │   ├── FormControl/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Radio/
│   │   ├── Select/
│   │   ├── Switch/
│   │   └── Table/
│   ├── hooks/
│   │   ├── useForm/
│   │   ├── useModal/
│   │   └── useToast/
│   ├── context/
│   │   ├── ThemeContext/
│   │   └── ToastContext/
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### Verantwortlichkeiten

- Bereitstellung von Kernkomponenten
- Bereitstellung von Hooks für häufige Anwendungsfälle
- Bereitstellung von Kontext-Providern

### @smolitux/ai

Das `@smolitux/ai`-Paket enthält KI-bezogene Komponenten.

#### Struktur

```
@smolitux/ai/
├── src/
│   ├── components/
│   │   ├── FakeNewsDetector/
│   │   ├── TrollFilter/
│   │   └── ContentModerator/
│   ├── hooks/
│   │   ├── useAIAnalysis/
│   │   └── useContentModeration/
│   ├── utils/
│   │   ├── aiHelpers/
│   │   └── moderationHelpers/
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### Verantwortlichkeiten

- Bereitstellung von KI-bezogenen Komponenten
- Bereitstellung von Hooks für KI-Funktionalitäten
- Bereitstellung von Hilfsfunktionen für KI-Anwendungsfälle

### @smolitux/blockchain

Das `@smolitux/blockchain`-Paket enthält Blockchain-bezogene Komponenten.

#### Struktur

```
@smolitux/blockchain/
├── src/
│   ├── components/
│   │   ├── WalletConnect/
│   │   ├── TokenDisplay/
│   │   ├── TransactionHistory/
│   │   ├── TokenEconomy/
│   │   └── SmartContractInteraction/
│   ├── hooks/
│   │   ├── useWallet/
│   │   ├── useTransaction/
│   │   └── useContract/
│   ├── utils/
│   │   ├── walletHelpers/
│   │   └── contractHelpers/
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### Verantwortlichkeiten

- Bereitstellung von Blockchain-bezogenen Komponenten
- Bereitstellung von Hooks für Blockchain-Funktionalitäten
- Bereitstellung von Hilfsfunktionen für Blockchain-Anwendungsfälle

### @smolitux/resonance

Das `@smolitux/resonance`-Paket enthält ResonanceLink-spezifische Komponenten.

#### Struktur

```
@smolitux/resonance/
├── src/
│   ├── components/
│   │   ├── feed/
│   │   │   ├── FeedView/
│   │   │   ├── FeedFilter/
│   │   │   ├── FeedItem/
│   │   │   └── FeedSidebar/
│   │   ├── post/
│   │   │   ├── PostView/
│   │   │   ├── PostCreator/
│   │   │   ├── PostInteractions/
│   │   │   └── PostMetrics/
│   │   ├── profile/
│   │   │   ├── ProfileHeader/
│   │   │   ├── ProfileContent/
│   │   │   ├── ProfileEditor/
│   │   │   └── ProfileWallet/
│   │   ├── governance/
│   │   │   ├── GovernanceDashboard/
│   │   │   ├── ProposalView/
│   │   │   └── VotingSystem/
│   │   └── monetization/
│   │       ├── RevenueModel/
│   │       ├── RewardSystem/
│   │       └── CreatorDashboard/
│   ├── hooks/
│   │   ├── useFeed/
│   │   ├── usePost/
│   │   ├── useProfile/
│   │   ├── useGovernance/
│   │   └── useMonetization/
│   ├── utils/
│   │   ├── formatters/
│   │   ├── validators/
│   │   └── helpers/
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### Verantwortlichkeiten

- Bereitstellung von ResonanceLink-spezifischen Komponenten
- Bereitstellung von Hooks für ResonanceLink-Funktionalitäten
- Bereitstellung von Hilfsfunktionen für ResonanceLink-Anwendungsfälle

### Weitere Pakete

- **@smolitux/charts**: Diagramm- und Visualisierungskomponenten
- **@smolitux/community**: Community-bezogene Komponenten
- **@smolitux/federation**: Föderations-bezogene Komponenten
- **@smolitux/layout**: Layout-Komponenten
- **@smolitux/media**: Medien-bezogene Komponenten
- **@smolitux/theme**: Theme-System und -Definitionen

## Abhängigkeiten

Die Pakete haben folgende Abhängigkeiten:

```
@smolitux/utils <- @smolitux/core <- @smolitux/ai
                                  <- @smolitux/blockchain
                                  <- @smolitux/charts
                                  <- @smolitux/community
                                  <- @smolitux/federation
                                  <- @smolitux/layout
                                  <- @smolitux/media
                                  <- @smolitux/resonance
                                  <- @smolitux/theme
```

Das bedeutet, dass `@smolitux/utils` keine Abhängigkeiten hat, während alle anderen Pakete von `@smolitux/utils` abhängen. Einige Pakete können auch von anderen Paketen abhängen, aber es sollte keine zirkulären Abhängigkeiten geben.

## Versionierung

Alle Pakete werden mit der gleichen Version veröffentlicht, um Kompatibilitätsprobleme zu vermeiden. Die Versionierung folgt Semantic Versioning (MAJOR.MINOR.PATCH).

## Veröffentlichung

Die Pakete werden mit Lerna veröffentlicht. Die Veröffentlichung erfolgt über die CI/CD-Pipeline.

```bash
npx lerna publish
```

## Entwicklung

Für die Entwicklung wird ein Monorepo-Ansatz mit Lerna verwendet. Die Entwicklung erfolgt in Feature-Branches, die dann in den Hauptbranch gemergt werden.

```bash
# Erstellen eines neuen Feature-Branches
git checkout -b feature/new-feature

# Entwickeln und Testen
npm run build
npm test

# Committen und Pushen
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

## Fazit

Die Paketstruktur von Smolitux-UI ist darauf ausgelegt, eine modulare und erweiterbare Komponentenbibliothek zu schaffen. Durch die Aufteilung in verschiedene Pakete können Benutzer nur die Teile der Bibliothek verwenden, die sie benötigen, was zu kleineren Bundle-Größen führt.