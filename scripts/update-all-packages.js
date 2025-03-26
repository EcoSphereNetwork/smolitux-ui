const fs = require('fs');
const path = require('path');

// Finde alle package.json-Dateien in den @smolitux-Paketen
const packagesDir = path.join(__dirname, '..', 'packages', '@smolitux');
const packages = fs.readdirSync(packagesDir);

// Standardisierte devDependencies für alle Pakete
const standardDevDeps = {
  "typescript": "^5.0.0",
  "tsup": "^8.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "eslint": "^8.0.0",
  "jest": "^29.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0"
};

// Standardisierte peerDependencies für alle Pakete
const standardPeerDeps = {
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
};

// Standardisierte Scripts für alle Pakete
const standardScripts = {
  "build": "tsup src/index.ts --format cjs,esm --dts",
  "build:js": "tsup src/index.ts --format cjs,esm",
  "build:types": "tsc --emitDeclarationOnly",
  "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "test": "jest"
};

packages.forEach(packageName => {
  const packageJsonPath = path.join(packagesDir, packageName, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      // Lese die aktuelle package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Aktualisiere die Version
      packageJson.version = "0.2.1";
      
      // Aktualisiere die Scripts
      packageJson.scripts = { ...packageJson.scripts, ...standardScripts };
      
      // Stelle sicher, dass die devDependencies existieren
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      
      // Füge die standardisierten devDependencies hinzu
      packageJson.devDependencies = { ...packageJson.devDependencies, ...standardDevDeps };
      
      // Stelle sicher, dass die peerDependencies existieren
      if (!packageJson.peerDependencies) {
        packageJson.peerDependencies = {};
      }
      
      // Füge die standardisierten peerDependencies hinzu
      packageJson.peerDependencies = { ...packageJson.peerDependencies, ...standardPeerDeps };
      
      // Stelle sicher, dass die dependencies existieren
      if (!packageJson.dependencies) {
        packageJson.dependencies = {};
      }
      
      // Füge @smolitux/utils als Abhängigkeit hinzu, wenn es nicht das utils-Paket selbst ist
      if (packageName !== 'utils') {
        packageJson.dependencies["@smolitux/utils"] = "^0.2.1";
      }
      
      // Schreibe die aktualisierte package.json zurück
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
      console.log(`Updated ${packageName}/package.json`);
    } catch (error) {
      console.error(`Error updating ${packageName}/package.json:`, error);
    }
  }
});

console.log('All package.json files updated successfully!');