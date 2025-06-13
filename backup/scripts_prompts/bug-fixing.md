# Smolitux UI Bug-Fixing

## 🎯 Ziel

Behebe einen Bug in einer Smolitux UI-Komponente und stelle sicher, dass die Komponente weiterhin alle Qualitätskriterien erfüllt.

## 📋 Bug-Spezifikation

```
Komponente: {{COMPONENT_NAME}}
Paket: @smolitux/{{PACKAGE_NAME}}
Fehler: {{BUG_DESCRIPTION}}
Reproduktion: {{REPRODUCTION_STEPS}}
```

## 🔍 Analyse-Schritte

1. **Fehlerverständnis**: Verstehe den Fehler und seine Auswirkungen
2. **Reproduktion**: Reproduziere den Fehler in einer Testumgebung
3. **Ursachenanalyse**: Identifiziere die Ursache des Fehlers
4. **Lösungsansätze**: Entwickle verschiedene Lösungsansätze
5. **Lösungsauswahl**: Wähle den besten Lösungsansatz aus

## 🛠️ Implementierungsrichtlinien

### TypeScript-Fehler

- Verwende explizite Typen statt `any` oder `unknown`
- Verwende Typ-Assertions nur, wenn unbedingt nötig
- Verwende Typ-Guards für Null-Safety
- Verwende generische Typen für wiederverwendbare Komponenten

### Ref-Fehler

- Verwende `React.MutableRefObject` für Refs, die geändert werden müssen
- Verwende Null-Checks vor dem Zuweisen von Refs
- Verwende `React.forwardRef` für Komponenten, die Refs unterstützen

### Event-Handler-Fehler

- Verwende generische Event-Handler-Typen
- Verwende `React.MouseEvent<HTMLElement>` statt spezifischer Element-Typen
- Verwende `React.KeyboardEvent<HTMLElement>` statt spezifischer Element-Typen

### Prop-Typen-Fehler

- Verwende eigene Interfaces statt HTML-Attribute-Extensions
- Verwende Unions für Prop-Typen, die mehrere Typen akzeptieren
- Verwende optionale Props mit Standardwerten

### Null-Safety-Fehler

- Verwende Null-Checks vor dem Zugriff auf Eigenschaften
- Verwende Default-Werte für optionale Props
- Verwende Typ-Guards für Null-Safety

## 🧪 Test-Richtlinien

- Schreibe Tests, die den Fehler reproduzieren
- Schreibe Tests, die die Lösung validieren
- Stelle sicher, dass alle bestehenden Tests weiterhin bestehen
- Stelle sicher, dass die Komponente weiterhin barrierefrei ist

## 📋 Checkliste

- [ ] Fehler verstanden und reproduziert
- [ ] Ursache identifiziert
- [ ] Lösungsansätze entwickelt
- [ ] Besten Lösungsansatz ausgewählt
- [ ] Lösung implementiert
- [ ] Tests geschrieben
- [ ] Bestehende Tests bestehen
- [ ] Barrierefreiheit getestet
- [ ] Dokumentation aktualisiert

## 📝 Lösungsdokumentation

```
Komponente: {{COMPONENT_NAME}}
Paket: @smolitux/{{PACKAGE_NAME}}
Fehler: {{BUG_DESCRIPTION}}
Ursache: {{ROOT_CAUSE}}
Lösung: {{SOLUTION_DESCRIPTION}}
Änderungen:
- {{CHANGE_1}}
- {{CHANGE_2}}
- ...
Tests:
- {{TEST_1}}
- {{TEST_2}}
- ...
```