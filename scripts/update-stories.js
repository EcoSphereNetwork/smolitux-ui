#!/usr/bin/env node

/**
 * Dieses Skript aktualisiert die Story-Dateien, um sie mit Storybook 7 kompatibel zu machen.
 * Es fügt die fehlende Meta-Import-Deklaration hinzu und korrigiert die Meta-Definition.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Finde alle Story-Dateien
const storyFiles = glob.sync('packages/@smolitux/*/src/**/*.stories.{ts,tsx}', {
  cwd: path.resolve(__dirname, '..'),
  absolute: true,
});

console.log(`Gefundene Story-Dateien: ${storyFiles.length}`);

// Regex-Muster für die Erkennung und Korrektur
const importRegex = /import\s+(?:React(?:,\s*{[^}]*})?|{[^}]*})\s+from\s+['"]react['"];?\s*(?:import\s+(?:{[^}]*})\s+from\s+['"]@storybook\/react['"];?)?/;
const metaRegex = /const\s+meta(?::\s*Meta<[^>]*>)?\s*=\s*{/;

// Zähler für die Statistik
let updatedFiles = 0;
let skippedFiles = 0;
let errorFiles = 0;

// Verarbeite jede Datei
storyFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Überprüfe, ob die Datei bereits den korrekten Import hat
    if (!content.includes('import type { Meta, StoryObj } from \'@storybook/react\';')) {
      // Ersetze den Import oder füge ihn hinzu
      if (importRegex.test(content)) {
        content = content.replace(importRegex, 'import type { Meta, StoryObj } from \'@storybook/react\';');
        updated = true;
      } else if (!content.includes('import type { Meta, StoryObj }')) {
        // Füge den Import am Anfang der Datei hinzu
        content = 'import type { Meta, StoryObj } from \'@storybook/react\';\n' + content;
        updated = true;
      }
    }

    // Überprüfe, ob die Meta-Definition korrekt ist
    if (metaRegex.test(content) && !content.includes('export default meta;')) {
      // Füge die Export-Anweisung nach der Meta-Definition hinzu
      content = content.replace(/const\s+meta(?::\s*Meta<[^>]*>)?\s*=\s*{([^}]*)};/, (match, p1) => {
        return `const meta: Meta<typeof Component> = {${p1}};\n\nexport default meta;`;
      });
      updated = true;
    }

    // Speichere die aktualisierte Datei
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Aktualisiert: ${path.relative(process.cwd(), filePath)}`);
      updatedFiles++;
    } else {
      console.log(`Übersprungen: ${path.relative(process.cwd(), filePath)}`);
      skippedFiles++;
    }
  } catch (error) {
    console.error(`Fehler bei ${filePath}:`, error);
    errorFiles++;
  }
});

console.log(`\nZusammenfassung:`);
console.log(`- Aktualisierte Dateien: ${updatedFiles}`);
console.log(`- Übersprungene Dateien: ${skippedFiles}`);
console.log(`- Fehlerhafte Dateien: ${errorFiles}`);
console.log(`- Gesamt: ${storyFiles.length}`);