#!/usr/bin/env node

/**
 * Dieses Skript generiert einen Testabdeckungsbericht für die aktuelle Version
 * und speichert ihn im docs/Wiki/testing/coverage-reports Verzeichnis.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Lese die aktuelle Version aus package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const version = packageJson.version;

// Führe die Tests mit Coverage aus
console.log(`Generating test coverage report for version ${version}...`);
execSync('npm run test:coverage', { stdio: 'inherit' });

// Erstelle das Verzeichnis für die Coverage-Berichte, falls es nicht existiert
const reportsDir = path.join(__dirname, '..', 'docs', 'Wiki', 'testing', 'coverage-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Lese die Coverage-Daten
const coverageSummary = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'coverage', 'coverage-summary.json'), 'utf8'));

// Extrahiere die relevanten Daten
const totalCoverage = coverageSummary.total;
const packageCoverage = {};

// Sammle Coverage-Daten für jedes Paket
Object.keys(coverageSummary).forEach(key => {
  if (key !== 'total' && key.includes('packages/@smolitux/')) {
    const packageName = key.split('packages/@smolitux/')[1].split('/')[0];
    if (!packageCoverage[packageName]) {
      packageCoverage[packageName] = {
        statements: { total: 0, covered: 0 },
        branches: { total: 0, covered: 0 },
        functions: { total: 0, covered: 0 },
        lines: { total: 0, covered: 0 }
      };
    }
    
    const data = coverageSummary[key];
    packageCoverage[packageName].statements.total += data.statements.total;
    packageCoverage[packageName].statements.covered += data.statements.covered;
    packageCoverage[packageName].branches.total += data.branches.total;
    packageCoverage[packageName].branches.covered += data.branches.covered;
    packageCoverage[packageName].functions.total += data.functions.total;
    packageCoverage[packageName].functions.covered += data.functions.covered;
    packageCoverage[packageName].lines.total += data.lines.total;
    packageCoverage[packageName].lines.covered += data.lines.covered;
  }
});

// Berechne die Prozentsätze für jedes Paket
Object.keys(packageCoverage).forEach(packageName => {
  const pkg = packageCoverage[packageName];
  pkg.statements.pct = (pkg.statements.covered / pkg.statements.total * 100).toFixed(2);
  pkg.branches.pct = (pkg.branches.covered / pkg.branches.total * 100).toFixed(2);
  pkg.functions.pct = (pkg.functions.covered / pkg.functions.total * 100).toFixed(2);
  pkg.lines.pct = (pkg.lines.covered / pkg.lines.total * 100).toFixed(2);
});

// Generiere den Markdown-Bericht
const reportDate = new Date().toISOString().split('T')[0];
let markdownReport = `# Test Coverage Report - v${version} (${reportDate})

## Gesamtabdeckung

| Kategorie | Abdeckung | Abgedeckt | Total |
|-----------|-----------|-----------|-------|
| Statements | ${totalCoverage.statements.pct}% | ${totalCoverage.statements.covered} | ${totalCoverage.statements.total} |
| Branches | ${totalCoverage.branches.pct}% | ${totalCoverage.branches.covered} | ${totalCoverage.branches.total} |
| Functions | ${totalCoverage.functions.pct}% | ${totalCoverage.functions.covered} | ${totalCoverage.functions.total} |
| Lines | ${totalCoverage.lines.pct}% | ${totalCoverage.lines.covered} | ${totalCoverage.lines.total} |

## Abdeckung nach Paketen

`;

// Füge die Paketabdeckung hinzu
Object.keys(packageCoverage).sort().forEach(packageName => {
  const pkg = packageCoverage[packageName];
  markdownReport += `### @smolitux/${packageName}

| Kategorie | Abdeckung | Abgedeckt | Total |
|-----------|-----------|-----------|-------|
| Statements | ${pkg.statements.pct}% | ${pkg.statements.covered} | ${pkg.statements.total} |
| Branches | ${pkg.branches.pct}% | ${pkg.branches.covered} | ${pkg.branches.total} |
| Functions | ${pkg.functions.pct}% | ${pkg.functions.covered} | ${pkg.functions.total} |
| Lines | ${pkg.lines.pct}% | ${pkg.lines.covered} | ${pkg.lines.total} |

`;
});

// Speichere den Bericht
const reportPath = path.join(reportsDir, `coverage-report-v${version}.md`);
fs.writeFileSync(reportPath, markdownReport);

console.log(`Coverage report saved to ${reportPath}`);

// Erstelle einen Index für alle Coverage-Berichte
const reportFiles = fs.readdirSync(reportsDir)
  .filter(file => file.startsWith('coverage-report-v') && file.endsWith('.md'))
  .sort((a, b) => {
    const versionA = a.replace('coverage-report-v', '').replace('.md', '');
    const versionB = b.replace('coverage-report-v', '').replace('.md', '');
    return versionB.localeCompare(versionA, undefined, { numeric: true });
  });

let indexContent = `# Test Coverage Reports

Diese Seite enthält Links zu allen Testabdeckungsberichten für verschiedene Versionen der Smolitux UI Bibliothek.

| Version | Datum | Link |
|---------|-------|------|
`;

reportFiles.forEach(file => {
  const fileVersion = file.replace('coverage-report-v', '').replace('.md', '');
  const fileContent = fs.readFileSync(path.join(reportsDir, file), 'utf8');
  const dateMatch = fileContent.match(/\(([0-9-]+)\)/);
  const date = dateMatch ? dateMatch[1] : 'Unbekannt';
  
  indexContent += `| v${fileVersion} | ${date} | [Bericht](./coverage-reports/${file}) |\n`;
});

fs.writeFileSync(path.join(reportsDir, '..', 'coverage-reports-index.md'), indexContent);

console.log('Coverage reports index updated');