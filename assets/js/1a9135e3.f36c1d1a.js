"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6815],{8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>a});var s=t(6540);const i={},r=s.createContext(i);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}},8977:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"testing/testplan/CI-CD-Integration","title":"CI/CD-Integration","description":"Dieses Dokument beschreibt die Integration der Teststrategie in eine Continuous Integration/Continuous Deployment (CI/CD) Pipeline f\xfcr die smolitux UI-Bibliothek.","source":"@site/docs/testing/testplan/08-CI-CD-Integration.md","sourceDirName":"testing/testplan","slug":"/testing/testplan/CI-CD-Integration","permalink":"/smolitux-ui/docs/testing/testplan/CI-CD-Integration","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/testing/testplan/08-CI-CD-Integration.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Browserkompatibilitaetstests","permalink":"/smolitux-ui/docs/testing/testplan/Browserkompatibilitaetstests"},"next":{"title":"Implementierungsplan","permalink":"/smolitux-ui/docs/testing/testplan/Implementierungsplan"}}');var i=t(4848),r=t(8453);const l={},a="CI/CD-Integration",o={},c=[{value:"1. \xdcberblick CI/CD f\xfcr Komponentenbibliotheken",id:"1-\xfcberblick-cicd-f\xfcr-komponentenbibliotheken",level:2},{value:"2. GitHub Actions f\xfcr CI/CD",id:"2-github-actions-f\xfcr-cicd",level:2},{value:"2.1 CI-Workflow f\xfcr Pull Requests",id:"21-ci-workflow-f\xfcr-pull-requests",level:3},{value:"2.2 CD-Workflow f\xfcr Releases",id:"22-cd-workflow-f\xfcr-releases",level:3},{value:"3. Automatisierte Tests in der Pipeline",id:"3-automatisierte-tests-in-der-pipeline",level:2},{value:"3.1 Unit- und Integrationstests",id:"31-unit--und-integrationstests",level:3},{value:"3.2 Visuelle Regressionstests",id:"32-visuelle-regressionstests",level:3},{value:"3.3 E2E-Tests",id:"33-e2e-tests",level:3},{value:"4. Testberichte und Artefakte",id:"4-testberichte-und-artefakte",level:2},{value:"4.1 Jest-Testberichte",id:"41-jest-testberichte",level:3},{value:"4.2 Playwright-Testberichte",id:"42-playwright-testberichte",level:3},{value:"4.3 Chromatic-Berichte",id:"43-chromatic-berichte",level:3},{value:"5. Pull Request Status Checks",id:"5-pull-request-status-checks",level:2},{value:"5.1 Branch-Schutzregeln in GitHub",id:"51-branch-schutzregeln-in-github",level:3},{value:"6. Testumgebungen",id:"6-testumgebungen",level:2},{value:"6.1 Test-Umgebungsvariablen",id:"61-test-umgebungsvariablen",level:3},{value:"6.2 Browser-Matrix f\xfcr Tests",id:"62-browser-matrix-f\xfcr-tests",level:3},{value:"7. Automatisierte Release-Erstellung",id:"7-automatisierte-release-erstellung",level:2},{value:"7.1 Semantic Release",id:"71-semantic-release",level:3},{value:"7.2 Automatisierte Changelog-Generierung",id:"72-automatisierte-changelog-generierung",level:3},{value:"8. Notifikationen und Feedback",id:"8-notifikationen-und-feedback",level:2},{value:"8.1 Pull Request-Kommentare",id:"81-pull-request-kommentare",level:3},{value:"8.2 Slack-Benachrichtigungen",id:"82-slack-benachrichtigungen",level:3},{value:"8.3 Status-Badges",id:"83-status-badges",level:3},{value:"9. Kontinuierliche \xdcberwachung",id:"9-kontinuierliche-\xfcberwachung",level:2},{value:"9.1 Test-Trends",id:"91-test-trends",level:3},{value:"9.2 Testabdeckungs\xfcberwachung",id:"92-testabdeckungs\xfcberwachung",level:3},{value:"10. Fehlerbehandlung in der Pipeline",id:"10-fehlerbehandlung-in-der-pipeline",level:2},{value:"10.1 Wiederholungsversuche f\xfcr instabile Tests",id:"101-wiederholungsversuche-f\xfcr-instabile-tests",level:3},{value:"10.2 Fehlerisolation",id:"102-fehlerisolation",level:3},{value:"11. Best Practices f\xfcr CI/CD",id:"11-best-practices-f\xfcr-cicd",level:2},{value:"12. Beispiel f\xfcr eine vollst\xe4ndige GitHub Actions-Workflow-Datei",id:"12-beispiel-f\xfcr-eine-vollst\xe4ndige-github-actions-workflow-datei",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"cicd-integration",children:"CI/CD-Integration"})}),"\n",(0,i.jsx)(n.p,{children:"Dieses Dokument beschreibt die Integration der Teststrategie in eine Continuous Integration/Continuous Deployment (CI/CD) Pipeline f\xfcr die smolitux UI-Bibliothek."}),"\n",(0,i.jsx)(n.h2,{id:"1-\xfcberblick-cicd-f\xfcr-komponentenbibliotheken",children:"1. \xdcberblick CI/CD f\xfcr Komponentenbibliotheken"}),"\n",(0,i.jsx)(n.p,{children:"Eine effektive CI/CD-Pipeline f\xfcr eine Komponentenbibliothek sollte folgende Phasen enthalten:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Build"}),": Kompilierung und Bundling der Komponenten"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Test"}),": Automatisierte Tests (Unit, Integration, E2E)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Dokumentation"}),": Generierung der Storybook-Dokumentation"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Ver\xf6ffentlichung"}),": Paketierung und Ver\xf6ffentlichung auf npm"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Deployment"}),": Bereitstellung der Dokumentation"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"2-github-actions-f\xfcr-cicd",children:"2. GitHub Actions f\xfcr CI/CD"}),"\n",(0,i.jsx)(n.p,{children:"GitHub Actions bietet eine einfache und flexible M\xf6glichkeit, CI/CD-Pipelines zu implementieren."}),"\n",(0,i.jsx)(n.h3,{id:"21-ci-workflow-f\xfcr-pull-requests",children:"2.1 CI-Workflow f\xfcr Pull Requests"}),"\n",(0,i.jsxs)(n.p,{children:["Erstellen Sie eine ",(0,i.jsx)(n.code,{children:".github/workflows/ci.yml"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: CI\n\non:\n  pull_request:\n    branches: [main, develop]\n  push:\n    branches: [main, develop]\n\njobs:\n  build_and_test:\n    name: Build and Test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Lint\n        run: npm run lint\n      \n      - name: Build\n        run: npm run build\n      \n      - name: Test\n        run: npm run test\n      \n      - name: Upload coverage\n        uses: codecov/codecov-action@v3\n        with:\n          token: ${{ secrets.CODECOV_TOKEN }}\n      \n  visual_testing:\n    name: Visual Tests\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n        with:\n          fetch-depth: 0  # Required for Chromatic to work correctly\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Publish to Chromatic\n        uses: chromaui/action@v1\n        with:\n          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}\n          token: ${{ secrets.GITHUB_TOKEN }}\n      \n  e2e_testing:\n    name: E2E Tests\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Install Playwright\n        run: npx playwright install --with-deps\n      \n      - name: Build Storybook\n        run: npm run build-storybook\n      \n      - name: Run Playwright tests\n        run: |\n          npx concurrently -k -s first -n \"SB,TEST\" \\\n            \"npx http-server storybook-static --port 6006 --silent\" \\\n            \"npx wait-on tcp:6006 && npx playwright test\"\n      \n      - name: Upload Playwright report\n        uses: actions/upload-artifact@v3\n        if: always()\n        with:\n          name: playwright-report\n          path: playwright-report/\n          retention-days: 30\n"})}),"\n",(0,i.jsx)(n.h3,{id:"22-cd-workflow-f\xfcr-releases",children:"2.2 CD-Workflow f\xfcr Releases"}),"\n",(0,i.jsxs)(n.p,{children:["Erstellen Sie eine ",(0,i.jsx)(n.code,{children:".github/workflows/release.yml"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: Release\n\non:\n  push:\n    tags:\n      - 'v*'\n\njobs:\n  release:\n    name: Release\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n          registry-url: 'https://registry.npmjs.org'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Build\n        run: npm run build\n      \n      - name: Test\n        run: npm run test\n      \n      - name: Publish to NPM\n        run: npm publish\n        env:\n          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}\n      \n      - name: Create GitHub Release\n        uses: softprops/action-gh-release@v1\n        with:\n          generate_release_notes: true\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n      \n  deploy_docs:\n    name: Deploy Documentation\n    needs: release\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      \n      - name: Install dependencies\n        run: npm ci\n      \n      - name: Build Storybook\n        run: npm run build-storybook\n      \n      - name: Deploy to GitHub Pages\n        uses: JamesIves/github-pages-deploy-action@v4\n        with:\n          folder: storybook-static\n          branch: gh-pages\n"})}),"\n",(0,i.jsx)(n.h2,{id:"3-automatisierte-tests-in-der-pipeline",children:"3. Automatisierte Tests in der Pipeline"}),"\n",(0,i.jsx)(n.h3,{id:"31-unit--und-integrationstests",children:"3.1 Unit- und Integrationstests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# Ausschnitt aus CI-Workflow\n- name: Test\n  run: npm run test\n\n- name: Upload coverage\n  uses: codecov/codecov-action@v3\n  with:\n    token: ${{ secrets.CODECOV_TOKEN }}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"32-visuelle-regressionstests",children:"3.2 Visuelle Regressionstests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# Ausschnitt aus CI-Workflow\n- name: Publish to Chromatic\n  uses: chromaui/action@v1\n  with:\n    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}\n    token: ${{ secrets.GITHUB_TOKEN }}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"33-e2e-tests",children:"3.3 E2E-Tests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'# Ausschnitt aus CI-Workflow\n- name: Run Playwright tests\n  run: |\n    npx concurrently -k -s first -n "SB,TEST" \\\n      "npx http-server storybook-static --port 6006 --silent" \\\n      "npx wait-on tcp:6006 && npx playwright test"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"4-testberichte-und-artefakte",children:"4. Testberichte und Artefakte"}),"\n",(0,i.jsx)(n.h3,{id:"41-jest-testberichte",children:"4.1 Jest-Testberichte"}),"\n",(0,i.jsx)(n.p,{children:"Konfigurieren Sie Jest, um JUnit-Berichte zu generieren:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"// jest.config.js\nmodule.exports = {\n  // ... andere Konfigurationen\n  reporters: [\n    'default',\n    ['jest-junit', {\n      outputDirectory: './reports/jest',\n      outputName: 'jest-junit.xml',\n    }],\n  ],\n};\n"})}),"\n",(0,i.jsx)(n.p,{children:"Berichte in der CI-Pipeline hochladen:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- name: Upload Jest Test Report\n  uses: actions/upload-artifact@v3\n  if: always()\n  with:\n    name: jest-report\n    path: reports/jest/\n    retention-days: 30\n"})}),"\n",(0,i.jsx)(n.h3,{id:"42-playwright-testberichte",children:"4.2 Playwright-Testberichte"}),"\n",(0,i.jsx)(n.p,{children:"Automatisch generierte Playwright-Berichte:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- name: Upload Playwright report\n  uses: actions/upload-artifact@v3\n  if: always()\n  with:\n    name: playwright-report\n    path: playwright-report/\n    retention-days: 30\n"})}),"\n",(0,i.jsx)(n.h3,{id:"43-chromatic-berichte",children:"4.3 Chromatic-Berichte"}),"\n",(0,i.jsx)(n.p,{children:"Berichte zu visuellen Tests werden direkt in der Chromatic-Oberfl\xe4che angezeigt und mit Pull Requests verkn\xfcpft."}),"\n",(0,i.jsx)(n.h2,{id:"5-pull-request-status-checks",children:"5. Pull Request Status Checks"}),"\n",(0,i.jsx)(n.p,{children:"Status-Checks f\xfcr Pull Requests konfigurieren, um sicherzustellen, dass alle Tests bestanden werden, bevor ein Merge m\xf6glich ist."}),"\n",(0,i.jsx)(n.h3,{id:"51-branch-schutzregeln-in-github",children:"5.1 Branch-Schutzregeln in GitHub"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Navigieren Sie zu den Repository-Einstellungen"}),"\n",(0,i.jsx)(n.li,{children:'W\xe4hlen Sie "Branches" > "Branch protection rules" > "Add rule"'}),"\n",(0,i.jsxs)(n.li,{children:["Konfigurieren Sie die Regel f\xfcr den ",(0,i.jsx)(n.code,{children:"main"}),"-Branch:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Require status checks to pass before merging \u2713"}),"\n",(0,i.jsx)(n.li,{children:"Require branches to be up to date before merging \u2713"}),"\n",(0,i.jsxs)(n.li,{children:["Status checks that are required:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"build_and_test"}),"\n",(0,i.jsx)(n.li,{children:"visual_testing"}),"\n",(0,i.jsx)(n.li,{children:"e2e_testing"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"6-testumgebungen",children:"6. Testumgebungen"}),"\n",(0,i.jsx)(n.p,{children:"F\xfcr verschiedene Testphasen k\xf6nnen unterschiedliche Umgebungen definiert werden:"}),"\n",(0,i.jsx)(n.h3,{id:"61-test-umgebungsvariablen",children:"6.1 Test-Umgebungsvariablen"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"env:\n  NODE_ENV: test\n  TEST_REPORT_PATH: './reports'\n  STORYBOOK_PORT: 6006\n"})}),"\n",(0,i.jsx)(n.h3,{id:"62-browser-matrix-f\xfcr-tests",children:"6.2 Browser-Matrix f\xfcr Tests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"strategy:\n  matrix:\n    browser: [chromium, firefox, webkit]\n\nsteps:\n  # ...\n  - name: Run browser tests\n    run: npx playwright test --project=${{ matrix.browser }}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"7-automatisierte-release-erstellung",children:"7. Automatisierte Release-Erstellung"}),"\n",(0,i.jsx)(n.h3,{id:"71-semantic-release",children:"7.1 Semantic Release"}),"\n",(0,i.jsx)(n.p,{children:"Integration von Semantic Release f\xfcr automatisierte Versionierung und Release-Generierung:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'# package.json\n{\n  "scripts": {\n    "semantic-release": "semantic-release"\n  },\n  "devDependencies": {\n    "semantic-release": "^18.0.0"\n  }\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# .github/workflows/release.yml\n- name: Semantic Release\n  run: npx semantic-release\n  env:\n    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"72-automatisierte-changelog-generierung",children:"7.2 Automatisierte Changelog-Generierung"}),"\n",(0,i.jsx)(n.p,{children:"Mit Semantic Release wird der Changelog automatisch aus den Commit-Nachrichten generiert."}),"\n",(0,i.jsx)(n.h2,{id:"8-notifikationen-und-feedback",children:"8. Notifikationen und Feedback"}),"\n",(0,i.jsx)(n.h3,{id:"81-pull-request-kommentare",children:"8.1 Pull Request-Kommentare"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- name: Comment PR with Test Results\n  uses: actions/github-script@v6\n  if: github.event_name == 'pull_request'\n  with:\n    github-token: ${{ secrets.GITHUB_TOKEN }}\n    script: |\n      const fs = require('fs');\n      const testSummary = fs.readFileSync('./reports/summary.md', 'utf8');\n      github.rest.issues.createComment({\n        issue_number: context.issue.number,\n        owner: context.repo.owner,\n        repo: context.repo.repo,\n        body: testSummary\n      });\n"})}),"\n",(0,i.jsx)(n.h3,{id:"82-slack-benachrichtigungen",children:"8.2 Slack-Benachrichtigungen"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- name: Slack Notification\n  uses: 8398a7/action-slack@v3\n  with:\n    status: ${{ job.status }}\n    fields: repo,message,commit,author,action,eventName,workflow\n  env:\n    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}\n  if: always()\n"})}),"\n",(0,i.jsx)(n.h3,{id:"83-status-badges",children:"8.3 Status-Badges"}),"\n",(0,i.jsx)(n.p,{children:"F\xfcgen Sie Status-Badges in Ihre README.md ein:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-markdown",children:"# smolitux UI\n\n![CI](https://github.com/user/repo/workflows/CI/badge.svg)\n![E2E Tests](https://github.com/user/repo/workflows/E2E%20Tests/badge.svg)\n![Coverage](https://img.shields.io/codecov/c/github/user/repo)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"9-kontinuierliche-\xfcberwachung",children:"9. Kontinuierliche \xdcberwachung"}),"\n",(0,i.jsx)(n.h3,{id:"91-test-trends",children:"9.1 Test-Trends"}),"\n",(0,i.jsx)(n.p,{children:"Verwenden Sie die Test-Insights von GitHub Actions oder ein externes Dashboarding-Tool wie Datadog oder Grafana, um Trends bei Testausf\xfchrungen zu erkennen."}),"\n",(0,i.jsx)(n.h3,{id:"92-testabdeckungs\xfcberwachung",children:"9.2 Testabdeckungs\xfcberwachung"}),"\n",(0,i.jsx)(n.p,{children:"Codecov oder \xe4hnliche Dienste k\xf6nnen die Testabdeckung \xfcberwachen und Alarme ausl\xf6sen, wenn sie unter einen bestimmten Schwellenwert f\xe4llt."}),"\n",(0,i.jsx)(n.h2,{id:"10-fehlerbehandlung-in-der-pipeline",children:"10. Fehlerbehandlung in der Pipeline"}),"\n",(0,i.jsx)(n.h3,{id:"101-wiederholungsversuche-f\xfcr-instabile-tests",children:"10.1 Wiederholungsversuche f\xfcr instabile Tests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- name: Run E2E Tests with Retry\n  uses: nick-invision/retry@v2\n  with:\n    timeout_minutes: 10\n    max_attempts: 3\n    command: npm run test:e2e\n"})}),"\n",(0,i.jsx)(n.h3,{id:"102-fehlerisolation",children:"10.2 Fehlerisolation"}),"\n",(0,i.jsx)(n.p,{children:"Teilen Sie die Pipeline in unabh\xe4ngige Jobs auf, sodass einzelne Fehler nicht die gesamte Pipeline stoppen."}),"\n",(0,i.jsx)(n.h2,{id:"11-best-practices-f\xfcr-cicd",children:"11. Best Practices f\xfcr CI/CD"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Schnelle Feedback-Loops"}),": Priorisieren Sie schnell laufende Tests am Anfang der Pipeline"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Fehlerhafte Tests isolieren"}),": Identifizieren und isolieren Sie instabile Tests"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Ressourcenoptimierung"}),": Verwenden Sie Caching und parallele Jobs"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Umgebungskonsistenz"}),": Verwenden Sie Container, um konsistente Testumgebungen zu gew\xe4hrleisten"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Versionsverwaltung"}),": Versionieren Sie Testdaten und Abh\xe4ngigkeiten"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Sicherheit"}),": Sch\xfctzen Sie sensible Daten mit Secrets"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Dokumentation"}),": Dokumentieren Sie die CI/CD-Pipeline und Fehlerbehebungsprozesse"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Wartungsplan"}),": Regelm\xe4\xdfig die Pipeline \xfcberpr\xfcfen und aktualisieren"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"12-beispiel-f\xfcr-eine-vollst\xe4ndige-github-actions-workflow-datei",children:"12. Beispiel f\xfcr eine vollst\xe4ndige GitHub Actions-Workflow-Datei"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: smolitux UI Test Pipeline\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main, develop]\n\njobs:\n  lint:\n    name: Lint\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint\n\n  unit_tests:\n    name: Unit Tests\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run test:unit\n      - name: Upload coverage\n        uses: codecov/codecov-action@v3\n        with:\n          token: ${{ secrets.CODECOV_TOKEN }}\n\n  build:\n    name: Build\n    runs-on: ubuntu-latest\n    needs: [lint]\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run build\n      - name: Upload build artifacts\n        uses: actions/upload-artifact@v3\n        with:\n          name: dist\n          path: dist/\n          retention-days: 7\n\n  visual_tests:\n    name: Visual Tests\n    runs-on: ubuntu-latest\n    needs: [build]\n    steps:\n      - uses: actions/checkout@v3\n        with:\n          fetch-depth: 0\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      - run: npm ci\n      - name: Publish to Chromatic\n        uses: chromaui/action@v1\n        with:\n          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}\n          token: ${{ secrets.GITHUB_TOKEN }}\n\n  browser_tests:\n    name: Browser Tests\n    runs-on: ubuntu-latest\n    needs: [build]\n    strategy:\n      matrix:\n        browser: [chromium, firefox, webkit]\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: '16'\n          cache: 'npm'\n      - run: npm ci\n      - name: Install Playwright\n        run: npx playwright install --with-deps\n      - name: Build Storybook\n        run: npm run build-storybook\n      - name: Run Playwright tests\n        run: |\n          npx concurrently -k -s first -n \"SB,TEST\" \\\n            \"npx http-server storybook-static --port 6006 --silent\" \\\n            \"npx wait-on tcp:6006 && npx playwright test --project=${{ matrix.browser }}\"\n      - name: Upload Playwright report\n        uses: actions/upload-artifact@v3\n        if: always()\n        with:\n          name: playwright-report-${{ matrix.browser }}\n          path: playwright-report/\n          retention-days: 30\n\n  notify:\n    name: Notification\n    runs-on: ubuntu-latest\n    needs: [unit_tests, visual_tests, browser_tests]\n    if: always()\n    steps:\n      - name: Slack Notification\n        uses: 8398a7/action-slack@v3\n        with:\n          status: ${{ job.status }}\n          fields: repo,message,commit,author,action,eventName,workflow\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}\n"})})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}}}]);