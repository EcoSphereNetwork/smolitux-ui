#!/bin/bash

# Skript zum Verschieben aller Testdateien in __tests__ Ordner

# Finde alle Testdateien, die nicht in __tests__ Ordnern sind
find packages -name "*.test.ts*" | grep -v "__tests__" | while read -r file; do
  # Extrahiere den Ordnerpfad und den Dateinamen
  dir=$(dirname "$file")
  filename=$(basename "$file")
  
  # Erstelle den __tests__ Ordner, falls er nicht existiert
  mkdir -p "$dir/__tests__"
  
  # Kopiere die Testdatei in den __tests__ Ordner
  cp "$file" "$dir/__tests__/$filename"
  
  # Lösche die ursprüngliche Testdatei
  rm "$file"
  
  echo "Moved $file to $dir/__tests__/$filename"
done

echo "All test files have been moved to __tests__ folders."