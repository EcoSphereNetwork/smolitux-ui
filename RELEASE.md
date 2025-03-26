# Release v0.2.0

## Neue Funktionen

### Neue Pakete

- **@smolitux/ai**: KI-bezogene Komponenten
  - RecommendationCarousel: Zeigt KI-generierte Inhaltsempfehlungen an
  - ContentAnalytics: Visualisiert KI-generierte Inhaltsanalysen
  - SentimentDisplay: Visualisiert Stimmungsanalysen für Inhalte
  - EngagementScore: Zeigt Engagement-Metriken an
  - TrendingTopics: Zeigt trendende Themen basierend auf KI-Analyse an

- **@smolitux/blockchain**: Blockchain-bezogene Komponenten
  - WalletConnect: Verbindet mit Blockchain-Wallets
  - TokenDisplay: Zeigt Token-Informationen und -Guthaben an
  - TransactionHistory: Zeigt Transaktionshistorie an
  - StakingInterface: Interface für Token-Staking
  - TokenDistributionChart: Visualisiert Token-Verteilung

- **@smolitux/community**: Community-bezogene Komponenten
  - CommentSection: Zeigt Kommentare an und verwaltet sie
  - UserProfile: Zeigt Benutzerprofilinformationen an
  - NotificationCenter: Verwaltet Benutzerbenachrichtigungen
  - ActivityFeed: Zeigt Benutzeraktivitäten an
  - FollowButton: Button zum Folgen von Benutzern oder Themen

- **@smolitux/federation**: Föderations-bezogene Komponenten
  - FederatedSearch: Suche über föderierte Plattformen hinweg
  - PlatformSelector: Auswahl aus verfügbaren föderierten Plattformen
  - ActivityStream: Anzeige von Aktivitäten aus föderierten Plattformen
  - FederationStatus: Anzeige des Föderationsstatus
  - CrossPlatformShare: Teilen von Inhalten über Plattformen hinweg

- **@smolitux/media**: Medien-bezogene Komponenten
  - AudioPlayer: Spielt Audiodateien ab
  - VideoPlayer: Spielt Videodateien ab
  - MediaUploader: Lädt Mediendateien hoch
  - MediaGrid: Zeigt Medien in einem Raster an
  - MediaCarousel: Zeigt Medien in einem Karussell an

## Verbesserungen

- Verbesserte Dokumentation für alle Komponenten
- Storybook-Integration für ausgewählte Komponenten
- Entfernung von unnötigen Abhängigkeiten

## Bekannte Probleme

- Einige Komponenten haben noch Abhängigkeiten zu @smolitux/core, die in zukünftigen Versionen behoben werden müssen
- Tests für einige Komponenten müssen noch aktualisiert werden

## Installation

```bash
# Installation des gesamten Pakets
npm install @smolitux/ui

# Installation einzelner Pakete
npm install @smolitux/ai
npm install @smolitux/blockchain
npm install @smolitux/community
npm install @smolitux/federation
npm install @smolitux/media
```

## Verwendung

```jsx
// Beispiel für die Verwendung der RecommendationCarousel-Komponente
import { RecommendationCarousel } from '@smolitux/ai';

const MyComponent = () => {
  return (
    <RecommendationCarousel
      groups={recommendationGroups}
      visibleItems={4}
      onItemClick={handleItemClick}
    />
  );
};
```

Weitere Informationen zur Verwendung der Komponenten finden Sie in der Dokumentation.