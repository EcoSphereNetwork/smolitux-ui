# 🧠 Codex Prompt – Isolate Jest Failures & Stabilize Test Suite Before `Dropdown`

## 🧭 Context

- ✅ Linting und Build-Prozess erfolgreich nach Toolchain-Fix
- ❌ `npm run test --workspace=@smolitux/core` schlägt fehl wegen **mehrerer Snapshot- und Logikfehler**
- 🟡 Ursache liegt vermutlich in veralteten Snapshots, instabilen Mocks oder fehlerhaften globalen Zuständen

## 🎯 Ziel
👉 **Stabilisiere die Jest-Testumgebung**, indem du inkonsistente oder veraltete Tests isolierst, Snapshots aktualisierst (wo nötig) und globale Testhilfen prüfst.
