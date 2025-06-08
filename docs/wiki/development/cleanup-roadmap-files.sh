#!/bin/bash

# Dieses Skript bereinigt die Roadmap-Dateien und behält nur die konsolidierte Version

# Sicherstellen, dass wir im richtigen Verzeichnis sind
cd /workspace/smolitux-ui/docs/wiki/development

# Erstellen eines Backup-Verzeichnisses für die alten Dateien
mkdir -p archive
echo "Backup-Verzeichnis erstellt: archive/"

# Verschieben der alten Dateien ins Backup-Verzeichnis
mv roadmap.md archive/
mv improvement-plan.md archive/
mv implementation-roadmap.md archive/

echo "Alte Dateien wurden ins Backup-Verzeichnis verschoben"

# Umbenennen der konsolidierten Roadmap
mv consolidated-roadmap.md roadmap.md

echo "Konsolidierte Roadmap wurde zu roadmap.md umbenannt"

# Erstellen eines Symlinks für die Kompatibilität
ln -sf roadmap.md improvement-plan.md
ln -sf roadmap.md implementation-roadmap.md

echo "Symlinks für Kompatibilität erstellt"

# Aktualisieren des README.md, um auf die neue Roadmap zu verweisen
sed -i 's/improvement-plan\.md/roadmap.md/g' README.md
sed -i 's/implementation-roadmap\.md/roadmap.md/g' README.md

echo "README.md wurde aktualisiert"

echo "Bereinigung abgeschlossen. Die konsolidierte Roadmap ist jetzt die Hauptdatei."