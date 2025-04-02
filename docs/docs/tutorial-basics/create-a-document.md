---
sidebar_position: 1
---

# Dokument erstellen

Dokumente sind Gruppen von Seiten, die mit einer **Seitenleiste** verbunden sind und können optional in **Kategorien** gruppiert werden.

## Dokument erstellen

Erstellen Sie eine Markdown-Datei im Verzeichnis `docs`:

```md title="docs/hello.md"
# Hallo

Dies ist mein **erstes Docusaurus-Dokument**!
```

Eine neue Dokumentseite ist jetzt unter `http://localhost:3000/docs/hello` verfügbar.

## Konfigurieren der Seitenleiste

Docusaurus generiert automatisch eine Seitenleiste aus dem Verzeichnis `docs`.

Fügen Sie Metadaten hinzu, um die Seitenleistenposition anzupassen:

```md title="docs/hello.md" {1-4}
---
sidebar_position: 1
---

# Hallo

Dies ist mein **erstes Docusaurus-Dokument**!
```

Sie können auch die Seitenleiste in `sidebars.js` explizit konfigurieren:

```js title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    'intro',
    // Highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```