---
slug: smolitux-ui-overview
title: "Smolitux-UI Project Overview"
authors: [sam]
tags: [overview, roadmap]
---

## Einführung ins Projekt Smolitux-UI

Smolitux-UI ist die zentrale Komponentenbibliothek des EcoSphereNetwork. Sie stellt wiederverwendbare React-Komponenten bereit, die vollständig dokumentiert und auf Barrierefreiheit ausgelegt sind. Die [Wiki](/wiki/) bietet eine detaillierte Übersicht über alle Module und Richtlinien.

## Technische Basis

Das Projekt basiert auf React und TypeScript. Für das Styling kommt Tailwind CSS zum Einsatz, während Storybook die visuelle Dokumentation übernimmt. Tests laufen mit Jest und Playwright. Weitere Details finden sich in der [Quickstart-Anleitung](/wiki/guides/quickstart) und der [Architektur-Dokumentation](/wiki/architecture/architecture-design).

## Architektur und Komponentenstruktur

Die Bibliothek ist als Monorepo organisiert. Unter `packages/@smolitux/` befinden sich Kernpakete wie `core`, `layout`, `theme` und `utils`. Jedes Paket kapselt eigenständige Komponenten und kann unabhängig genutzt werden. Eine vollständige Beschreibung liefert die Seite [Paketstruktur](/wiki/architecture/package-structure).

## Ziele, Vision und Einsatzbereich

Ziel des Projekts ist eine nachhaltige, zugängliche UI-Lösung für alle Anwendungen des EcoSphereNetwork. Die Vision umfasst eine modulare Erweiterbarkeit, hohe Testabdeckung und strenge Coding-Standards. Einsatzbereiche reichen von klassischen Web-Apps bis zu Voice-Control-Oberflächen.

## Ausblick / Roadmap

Die aktuelle [Roadmap](/wiki/development/roadmap-main) sieht eine Erweiterung der Barrierefreiheitstests und neue Features wie Voice Control vor. Langfristig soll Smolitux-UI als Basis für ein ganzes Ökosystem von Anwendungen dienen.
