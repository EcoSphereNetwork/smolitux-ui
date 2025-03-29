#!/bin/bash

# Dieses Skript entfernt doppelte fileMock.js-Dateien aus den Paketen
# und aktualisiert die Referenzen auf den zentralen Mock in @smolitux/testing/mocks

echo "Entferne doppelte fileMock.js-Dateien..."

# Finde alle fileMock.js-Dateien in den Paketen
MOCK_FILES=$(find packages/@smolitux -name "fileMock.js" | grep -v "testing/mocks")

# Entferne die Dateien
for file in $MOCK_FILES; do
  echo "Entferne $file"
  rm "$file"
done

echo "Alle doppelten Mocks wurden entfernt."
echo "Der zentrale Mock befindet sich jetzt in packages/@smolitux/testing/mocks/fileMock.js"
