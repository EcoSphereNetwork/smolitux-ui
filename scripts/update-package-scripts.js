const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Standardisierte Scripts für alle Pakete
const standardScripts = {
  "build": "tsup src/index.ts --format cjs,esm --dts",
  "build:js": "tsup src/index.ts --format cjs,esm",
  "build:types": "tsc --emitDeclarationOnly",
  "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "test": "jest"
};

// Finde alle package.json-Dateien in den @smolitux-Paketen
const packageJsonFiles = glob.sync('packages/@smolitux/*/package.json');

packageJsonFiles.forEach(filePath => {
  try {
    // Lese die aktuelle package.json
    const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Aktualisiere die Scripts
    packageJson.scripts = { ...packageJson.scripts, ...standardScripts };
    
    // Stelle sicher, dass die devDependencies existieren
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
    }
    
    // Füge die notwendigen devDependencies hinzu
    const devDeps = {
      "typescript": "^5.0.0",
      "tsup": "^8.0.0",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "eslint": "^8.0.0",
      "jest": "^29.0.0",
      "@testing-library/react": "^14.0.0",
      "@testing-library/jest-dom": "^6.0.0"
    };
    
    packageJson.devDependencies = { ...packageJson.devDependencies, ...devDeps };
    
    // Stelle sicher, dass die peerDependencies existieren
    if (!packageJson.peerDependencies) {
      packageJson.peerDependencies = {};
    }
    
    // Füge die notwendigen peerDependencies hinzu
    const peerDeps = {
      "react": "^17.0.0 || ^18.0.0",
      "react-dom": "^17.0.0 || ^18.0.0"
    };
    
    packageJson.peerDependencies = { ...packageJson.peerDependencies, ...peerDeps };
    
    // Schreibe die aktualisierte package.json zurück
    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
    
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
});

console.log('All package.json files updated successfully!');