# Accordion

Die Accordion-Komponente ermöglicht es, Inhalte in ausklappbaren Panels zu organisieren, um Platz zu sparen und die Benutzeroberfläche übersichtlicher zu gestalten.

## Import

```jsx
import { Accordion, AccordionItem } from '@smolitux/core';
```

## Verwendung

### Einfaches Accordion

```jsx
<Accordion>
  <AccordionItem title="Abschnitt 1">
    Inhalt für Abschnitt 1
  </AccordionItem>
  <AccordionItem title="Abschnitt 2">
    Inhalt für Abschnitt 2
  </AccordionItem>
  <AccordionItem title="Abschnitt 3">
    Inhalt für Abschnitt 3
  </AccordionItem>
</Accordion>
```

### Accordion mit standardmäßig geöffnetem Panel

```jsx
<Accordion defaultOpenItems="section1">
  <AccordionItem id="section1" title="Abschnitt 1">
    Dieser Abschnitt ist standardmäßig geöffnet
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2">
    Inhalt für Abschnitt 2
  </AccordionItem>
  <AccordionItem id="section3" title="Abschnitt 3">
    Inhalt für Abschnitt 3
  </AccordionItem>
</Accordion>
```

### Accordion mit mehreren geöffneten Panels

```jsx
<Accordion defaultOpenItems={['section1', 'section3']} allowMultiple>
  <AccordionItem id="section1" title="Abschnitt 1">
    Dieser Abschnitt ist standardmäßig geöffnet
  </AccordionItem>
  <AccordionItem id="section2" title="Abschnitt 2">
    Inhalt für Abschnitt 2
  </AccordionItem>
  <AccordionItem id="section3" title="Abschnitt 3">
    Dieser Abschnitt ist auch standardmäßig geöffnet
  </AccordionItem>
</Accordion>
```

### Verschiedene Varianten

```jsx
<Accordion variant="default" className="mb-4">
  <AccordionItem title="Default Variante">
    Standard-Accordion ohne Rahmen
  </AccordionItem>
  <AccordionItem title="Zweiter Abschnitt">
    Weiterer Inhalt
  </AccordionItem>
</Accordion>

<Accordion variant="bordered" className="mb-4">
  <AccordionItem title="Bordered Variante">
    Accordion mit Rahmen um alle Elemente
  </AccordionItem>
  <AccordionItem title="Zweiter Abschnitt">
    Weiterer Inhalt
  </AccordionItem>
</Accordion>

<Accordion variant="separated">
  <AccordionItem title="Separated Variante">
    Accordion mit separaten Rahmen und Abständen
  </AccordionItem>
  <AccordionItem title="Zweiter Abschnitt">
    Weiterer Inhalt
  </AccordionItem>
</Accordion>
```

### Verschiedene Icon-Stile

```jsx
<Accordion iconStyle="arrow" className="mb-4">
  <AccordionItem title="Mit Pfeil-Icon">
    Inhalt mit Pfeil-Icon
  </AccordionItem>
</Accordion>

<Accordion iconStyle="plus" className="mb-4">
  <AccordionItem title="Mit Plus/Minus-Icon">
    Inhalt mit Plus/Minus-Icon
  </AccordionItem>
</Accordion>

<Accordion iconStyle="chevron" className="mb-4">
  <AccordionItem title="Mit Chevron-Icon">
    Inhalt mit Chevron-Icon
  </AccordionItem>
</Accordion>

<Accordion iconStyle="none">
  <AccordionItem title="Ohne Icon">
    Inhalt ohne Icon
  </AccordionItem>
</Accordion>
```

### Benutzerdefinierte Titel

```jsx
<Accordion>
  <AccordionItem 
    title={
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Wichtige Informationen</span>
      </div>
    }
  >
    Hier stehen wichtige Informationen.
  </AccordionItem>
</Accordion>
```

### Deaktiviertes Panel

```jsx
<Accordion>
  <AccordionItem title="Aktives Panel">
    Dieses Panel kann geöffnet werden.
  </AccordionItem>
  <AccordionItem title="Deaktiviertes Panel" disabled>
    Dieses Panel kann nicht geöffnet werden.
  </AccordionItem>
</Accordion>
```

### Kontrolliertes Accordion

```jsx
function ControlledAccordion() {
  const [openItems, setOpenItems] = useState(['section1']);
  
  const handleChange = (items) => {
    setOpenItems(items);
    console.log('Geöffnete Panels:', items);
  };
  
  return (
    <Accordion 
      defaultOpenItems={openItems} 
      onChange={handleChange}
      allowMultiple
    >
      <AccordionItem id="section1" title="Abschnitt 1">
        Inhalt für Abschnitt 1
      </AccordionItem>
      <AccordionItem id="section2" title="Abschnitt 2">
        Inhalt für Abschnitt 2
      </AccordionItem>
      <AccordionItem id="section3" title="Abschnitt 3">
        Inhalt für Abschnitt 3
      </AccordionItem>
    </Accordion>
  );
}
```

## Props

### Accordion Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Die AccordionItem-Komponenten |
| `defaultOpenItems` | `string \| string[]` | - | ID(s) der standardmäßig geöffneten Panels |
| `allowMultiple` | `boolean` | `false` | Erlaubt das gleichzeitige Öffnen mehrerer Panels |
| `variant` | `'default' \| 'bordered' \| 'separated'` | `'default'` | Visuelle Variante des Accordions |
| `iconStyle` | `'arrow' \| 'plus' \| 'chevron' \| 'none'` | `'chevron'` | Stil der Icons |
| `onChange` | `(openItems: string[]) => void` | - | Callback bei Panel-Öffnung/Schließung |

### AccordionItem Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Der Inhalt des Panels |
| `title` | `ReactNode` | - | Der Titel des Panels |
| `id` | `string` | - | Eindeutige ID des Panels (wird automatisch generiert, wenn nicht angegeben) |
| `disabled` | `boolean` | `false` | Deaktiviert das Panel |
| `className` | `string` | - | Zusätzliche CSS-Klassen für das Panel |
| `titleClassName` | `string` | - | Zusätzliche CSS-Klassen für den Titel |
| `contentClassName` | `string` | - | Zusätzliche CSS-Klassen für den Inhalt |

## Barrierefreiheit

Die Accordion-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`aria-expanded`, `aria-controls`, `aria-disabled`)
- Unterstützt Tastaturnavigation (Tab, Enter, Space)
- Korrekte Semantik mit `<button>` für die Titel und entsprechenden Rollen

## Beispiele

### FAQ-Accordion

```jsx
const faqs = [
  {
    question: 'Was ist Smolitux UI?',
    answer: 'Smolitux UI ist eine Komponentenbibliothek für React, die eine Vielzahl von wiederverwendbaren UI-Komponenten bietet, um moderne Webanwendungen zu erstellen.'
  },
  {
    question: 'Wie installiere ich Smolitux UI?',
    answer: 'Sie können Smolitux UI mit npm oder yarn installieren: `npm install @smolitux/core` oder `yarn add @smolitux/core`.'
  },
  {
    question: 'Ist Smolitux UI für Produktionsanwendungen geeignet?',
    answer: 'Ja, Smolitux UI ist für den Einsatz in Produktionsanwendungen konzipiert und wird regelmäßig aktualisiert und getestet.'
  },
  {
    question: 'Unterstützt Smolitux UI Barrierefreiheit?',
    answer: 'Ja, alle Komponenten in Smolitux UI sind für Barrierefreiheit optimiert und folgen den WCAG-Richtlinien.'
  }
];

function FAQAccordion() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen</h2>
      <Accordion>
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            title={faq.question}
            titleClassName="font-medium"
          >
            <p className="text-gray-600">{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
```

### Verschachteltes Accordion

```jsx
<Accordion>
  <AccordionItem title="Hauptkategorie 1">
    <p className="mb-4">Hauptinhalt für Kategorie 1</p>
    
    <Accordion variant="bordered">
      <AccordionItem title="Unterkategorie 1.1">
        Inhalt für Unterkategorie 1.1
      </AccordionItem>
      <AccordionItem title="Unterkategorie 1.2">
        Inhalt für Unterkategorie 1.2
      </AccordionItem>
    </Accordion>
  </AccordionItem>
  
  <AccordionItem title="Hauptkategorie 2">
    <p className="mb-4">Hauptinhalt für Kategorie 2</p>
    
    <Accordion variant="bordered">
      <AccordionItem title="Unterkategorie 2.1">
        Inhalt für Unterkategorie 2.1
      </AccordionItem>
      <AccordionItem title="Unterkategorie 2.2">
        Inhalt für Unterkategorie 2.2
      </AccordionItem>
    </Accordion>
  </AccordionItem>
</Accordion>
```

### Accordion mit benutzerdefinierten Styles

```jsx
<Accordion 
  className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg overflow-hidden"
>
  <AccordionItem 
    title="Benutzerdefiniertes Design" 
    titleClassName="text-purple-700 font-bold"
    contentClassName="bg-white bg-opacity-50"
  >
    <p>Dieser Accordion hat ein benutzerdefiniertes Design mit Farbverlauf.</p>
  </AccordionItem>
  
  <AccordionItem 
    title="Weiterer Abschnitt" 
    titleClassName="text-purple-700 font-bold"
    contentClassName="bg-white bg-opacity-50"
  >
    <p>Weiterer Inhalt mit benutzerdefinierten Styles.</p>
  </AccordionItem>
</Accordion>
```