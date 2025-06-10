<div align="center">
  <img src="https://avatars.githubusercontent.com/u/168775088?s=400&u=a782fd605bdf54421b8bb4b011a8fb3d93ffa5cc&v=4" width="200">
  <h1>Smolitux UI</h1>
  <p>Eine umfassende Komponentenbibliothek im EcoSphere Network.</p>

  [![Contributors][contributors-shield]][contributors-url]
  [![Stars][stars-shield]][stars-url]
  [![Coverage][coverage-shield]][coverage-url]
  [![MIT License][license-shield]][license-url]
  <br/>
  [![Discord][discord-shield]][discord-url]
  [![Documentation][docs-shield]][docs-url]
  [![Project Credits][credits-shield]][credits-url]

  [Start Documentation](https://ecospherenetwork.github.io/smolitux-ui/wiki/) •
  [Report Bug](https://github.com/EcoSphereNetwork/smolitux-ui/issues) •
  [Request Feature](https://github.com/EcoSphereNetwork/smolitux-ui/issues)
</div>

## 📋 Table of Contents
- [About](#-about)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 🎯 About
Smolitux UI stellt standardisierte UI-Komponenten für Webanwendungen bereit und wird im gesamten *EcoSphere Network* eingesetzt.

Wenn du mit automatisierten Helfern wie **Codex** arbeitest, findest du alle Regeln und Abläufe in [AGENTS.md](AGENTS.md). Weitere Details sind im [Codex-Wiki](docs/wiki/codex/index.md) dokumentiert.

### Why Use This Library?
- 🚀 **Quick Start**: Sofort einsatzbereite Komponenten
- 🔄 **CI/CD Ready**: GitHub Actions Workflows für Tests und Builds
- 📊 **Quality Focused**: Linting und Test-Framework
- 🛡️ **Security First**: Automatisierte Security-Checks
- 📚 **Well Documented**: Umfangreiche Dokumentation im Wiki und Storybook

## ✨ Key Features

### Core Features
- 🔧 **Komponentenvielfalt**: Umfangreiche Paketsammlung unter `packages/@smolitux/`
- 📝 **Dokumentation**: Docusaurus-Wiki und Storybook
- 🔄 **Workflows**: GitHub Actions für CI/CD
- 🧪 **Testing**: Beispieltests und Playwright E2E-Setup
- 🛡️ **Security**: Abhängigkeitsprüfungen und Best Practices

### Development Tools
- 📊 **Code Quality**: Prettier und ESLint-Konfiguration
- 🐳 **Docker Support**: Container-Setups und Build-Skripte
- 🔄 **Dependency Management**: Automatische Updates
- 🧪 **Testing Framework**: Jest und Playwright

## 🚀 Getting Started

### Prerequisites
- Node.js 20 oder höher
- Git

### Installation

```bash
npm install @smolitux/core @smolitux/theme
```

## 📁 Project Structure
```
smolitux-ui/
├── packages/@smolitux/    # Bibliothekspakete
├── docs/                 # Dokumentationsseite
├── examples/             # Beispielprojekte
├── test-app/             # Demo-Applikation
├── scripts/              # Hilfsskripte
└── README.md             # Dieses Dokument
```

## 💻 Development

### Setting Up for Development
1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Pre-commit Hooks einrichten:
   ```bash
   npx husky install
   ```
3. Umgebungsdatei kopieren:
   ```bash
   cp .env.example .env
   ```

### Development Commands
```bash
npm run build       # Pakete bauen
npm run storybook   # Storybook starten
```

### Code Quality Tools
- **Formatierung**: `npm run format`
- **Linting**: `npm run lint`
- **Linting manuell**: `npx eslint packages/@smolitux --ext .ts,.tsx`
- **Type Checking**: `npm run typecheck`

## 🧪 Testing

### Running Tests
```bash
npm run test          # Unit-Tests
npm run test:e2e      # End-to-End-Tests mit Playwright
```

## 🚢 Deployment

### Using GitHub Actions
1. Secrets im Repository anlegen
2. Push ausführen, um den Workflow zu starten
3. Deployment in der Actions-Ansicht überwachen

### Manual Deployment
```bash
./scripts/deploy.sh [environment]
```

## 🤝 Contributing

Beiträge sind willkommen! Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Details.

1. Fork das Repository
2. Feature-Branch erstellen:
   ```bash
   git checkout -b feature/neues-feature
   ```
3. Änderungen committen:
   ```bash
   git commit -m 'feat: implement neues feature'
   ```
4. Branch pushen und Pull Request öffnen

## 💬 Support

- [Issue Tracker](https://github.com/EcoSphereNetwork/smolitux-ui/issues)
- [Discussions](https://github.com/EcoSphereNetwork/smolitux-ui/discussions)
- [Discord Community][discord-url]
- [Documentation][docs-url]

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">

### Repository Activity

[![Repository Activity][activity-graph]][activity-url]

</div>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/EcoSphereNetwork/smolitux-ui?style=for-the-badge&color=blue
[contributors-url]: https://github.com/EcoSphereNetwork/smolitux-ui/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/EcoSphereNetwork/smolitux-ui?style=for-the-badge&color=blue
[stars-url]: https://github.com/EcoSphereNetwork/smolitux-ui/stargazers
[coverage-shield]: https://img.shields.io/codecov/c/github/EcoSphereNetwork/smolitux-ui?style=for-the-badge&color=blue
[coverage-url]: https://codecov.io/github/EcoSphereNetwork/smolitux-ui
[license-shield]: https://img.shields.io/github/license/EcoSphereNetwork/smolitux-ui?style=for-the-badge&color=blue
[license-url]: https://github.com/EcoSphereNetwork/smolitux-ui/blob/main/LICENSE
[discord-shield]: https://img.shields.io/badge/Discord-Join%20Us-purple?logo=discord&logoColor=white&style=for-the-badge
[discord-url]: https://discord.gg/cTWBHGkn
[docs-shield]: https://img.shields.io/badge/Documentation-000?logo=googledocs&logoColor=FFE165&style=for-the-badge
[docs-url]: https://ecospherenetwork.github.io/smolitux-ui/wiki/
[credits-shield]: https://img.shields.io/badge/Project-Credits-blue?style=for-the-badge&color=FFE165&logo=github&logoColor=white
[credits-url]: https://github.com/EcoSphereNetwork/smolitux-ui/blob/main/CREDITS.md
[activity-graph]: https://repobeats.axiom.co/api/embed/8d1a53c73cf5523d0e52a6cc5b74bce75eecc801.svg
[activity-url]: https://repobeats.axiom.co
