# TextArea

Die TextArea-Komponente ermöglicht die Eingabe von mehrzeiligem Text und ist ideal für längere Textinhalte wie Beschreibungen, Kommentare oder Nachrichten.

## Import

```jsx
import { TextArea } from '@smolitux/core';
```

## Verwendung

### Einfache TextArea

```jsx
<TextArea placeholder="Geben Sie einen Text ein..." />
```

### TextArea mit Label

```jsx
<TextArea 
  label="Beschreibung" 
  placeholder="Beschreiben Sie das Produkt..." 
/>
```

### TextArea mit Hilfetext

```jsx
<TextArea 
  label="Feedback" 
  helperText="Ihre Meinung ist uns wichtig" 
  placeholder="Teilen Sie uns Ihre Gedanken mit..." 
/>
```

### TextArea mit Fehlermeldung

```jsx
<TextArea 
  label="Kommentar" 
  error="Bitte geben Sie einen Kommentar ein" 
  placeholder="Ihr Kommentar..." 
/>
```

### TextArea mit verschiedenen Größen

```jsx
<TextArea 
  label="Klein" 
  size="sm" 
  placeholder="Kleine TextArea" 
  className="mb-4" 
/>

<TextArea 
  label="Mittel" 
  size="md" 
  placeholder="Mittlere TextArea" 
  className="mb-4" 
/>

<TextArea 
  label="Groß" 
  size="lg" 
  placeholder="Große TextArea" 
/>
```

### TextArea mit verschiedenen Varianten

```jsx
<TextArea 
  label="Outline" 
  variant="outline" 
  placeholder="Outline Variante" 
  className="mb-4" 
/>

<TextArea 
  label="Filled" 
  variant="filled" 
  placeholder="Filled Variante" 
  className="mb-4" 
/>

<TextArea 
  label="Unstyled" 
  variant="unstyled" 
  placeholder="Unstyled Variante" 
/>
```

### TextArea mit voller Breite

```jsx
<TextArea 
  label="Volle Breite" 
  fullWidth 
  placeholder="Diese TextArea nutzt die volle verfügbare Breite" 
/>
```

### TextArea mit Auto-Resize

```jsx
<TextArea 
  label="Auto-Resize" 
  autoResize 
  placeholder="Diese TextArea wächst automatisch mit dem Inhalt" 
/>
```

### TextArea mit festgelegter Zeilenzahl

```jsx
<TextArea 
  label="Mehrzeilig" 
  rows={5} 
  placeholder="TextArea mit 5 Zeilen" 
/>
```

### TextArea mit Zeichenbegrenzung und -zählung

```jsx
<TextArea 
  label="Begrenzte Eingabe" 
  maxLength={100} 
  showCount 
  placeholder="Maximal 100 Zeichen..." 
/>
```

### Kontrollierte TextArea

```jsx
function ControlledTextAreaExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <TextArea 
        label="Kontrollierte TextArea" 
        value={value} 
        onChange={handleChange} 
        placeholder="Geben Sie etwas ein..." 
      />
      <p className="mt-2">
        Eingegebener Text: {value}
      </p>
    </div>
  );
}
```

### TextArea mit Validierung

```jsx
function ValidatedTextAreaExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (newValue.length < 10) {
      setError('Der Text muss mindestens 10 Zeichen lang sein');
    } else {
      setError('');
    }
  };
  
  return (
    <TextArea 
      label="Validierte TextArea" 
      value={value} 
      onChange={handleChange} 
      error={error} 
      placeholder="Mindestens 10 Zeichen..." 
    />
  );
}
```

### TextArea mit Readonly und Disabled

```jsx
<TextArea 
  label="Nur lesen" 
  readOnly 
  value="Dieser Text kann nicht bearbeitet werden" 
  className="mb-4" 
/>

<TextArea 
  label="Deaktiviert" 
  disabled 
  value="Diese TextArea ist deaktiviert" 
/>
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `label` | `string` | - | Text-Label (alternativ zu label im FormControl) |
| `helperText` | `string` | - | Hilfetext (alternativ zu helperText im FormControl) |
| `error` | `string` | - | Fehlermeldung (alternativ zu error im FormControl) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe der TextArea |
| `variant` | `'outline' \| 'filled' \| 'unstyled'` | `'outline'` | Visuelle Variante |
| `fullWidth` | `boolean` | `false` | Volle Breite |
| `autoResize` | `boolean` | `false` | Auto-Resize bei Eingabe |
| `rows` | `number` | `3` | Anzahl der Zeilen |
| `maxLength` | `number` | - | Maximale Zeichenanzahl |
| `showCount` | `boolean` | `false` | Zeichenzählung anzeigen |
| `placeholder` | `string` | - | Platzhalter-Text |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

Zusätzlich werden alle nativen Props von `<textarea>` unterstützt.

## Barrierefreiheit

Die TextArea-Komponente ist für Barrierefreiheit optimiert:

- Verwendet native `<textarea>` Elemente für korrekte Semantik
- Labels sind korrekt mit der TextArea verknüpft
- Unterstützt Tastaturnavigation
- Fehlermeldungen werden mit ARIA-Attributen verknüpft
- Ausreichender Kontrast zwischen Vorder- und Hintergrund

## Beispiele

### Kontaktformular

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Einfache Validierung
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      }));
    } else if (name === 'message' && value.length < 20) {
      setErrors(prev => ({
        ...prev,
        message: 'Die Nachricht sollte mindestens 20 Zeichen lang sein'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formular abgesendet:', formData);
    // Hier würde normalerweise ein API-Aufruf erfolgen
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Kontaktieren Sie uns</h2>
      
      <div className="mb-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Input
          label="E-Mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Input
          label="Betreff"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          fullWidth
        />
      </div>
      
      <div className="mb-6">
        <TextArea
          label="Nachricht"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          rows={6}
          placeholder="Wie können wir Ihnen helfen?"
          fullWidth
          required
          maxLength={500}
          showCount
        />
      </div>
      
      <Button type="submit" variant="primary" size="lg">
        Nachricht senden
      </Button>
    </form>
  );
}
```

### Kommentarbereich

```jsx
function CommentSection() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Max Mustermann', text: 'Toller Artikel, vielen Dank für die Informationen!', date: '2023-05-15' },
    { id: 2, author: 'Erika Musterfrau', text: 'Sehr hilfreich, ich habe viel gelernt.', date: '2023-05-16' }
  ]);
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (comment.trim() === '') return;
    
    const newComment = {
      id: comments.length + 1,
      author: 'Aktueller Benutzer',
      text: comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setComments([...comments, newComment]);
    setComment('');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Kommentare ({comments.length})</h3>
      
      <div className="space-y-4 mb-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmitComment}>
        <TextArea
          label="Ihr Kommentar"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Schreiben Sie einen Kommentar..."
          rows={4}
          fullWidth
          autoResize
          maxLength={300}
          showCount
        />
        
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={!comment.trim()}>
            Kommentar absenden
          </Button>
        </div>
      </form>
    </div>
  );
}
```

### Notizen-Editor

```jsx
function NotesEditor() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Einkaufsliste', content: 'Milch, Brot, Eier, Käse', date: '2023-05-10' },
    { id: 2, title: 'Meeting-Notizen', content: 'Projekt-Update besprechen, Zeitplan festlegen', date: '2023-05-12' }
  ]);
  
  const [activeNote, setActiveNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const handleSelectNote = (note) => {
    setActiveNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };
  
  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Neue Notiz',
      content: '',
      date: new Date().toISOString().split('T')[0]
    };
    
    setNotes([...notes, newNote]);
    handleSelectNote(newNote);
  };
  
  const handleSaveNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? { ...note, title: editTitle, content: editContent } 
        : note
    );
    
    setNotes(updatedNotes);
    setActiveNote({ ...activeNote, title: editTitle, content: editContent });
  };
  
  const handleDeleteNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.filter(note => note.id !== activeNote.id);
    setNotes(updatedNotes);
    setActiveNote(null);
    setEditTitle('');
    setEditContent('');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notizen</h2>
        <Button onClick={handleNewNote}>Neue Notiz</Button>
      </div>
      
      <div className="flex gap-4">
        <div className="w-1/3 border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-2 font-medium">Meine Notizen</div>
          <div className="divide-y">
            {notes.map(note => (
              <div 
                key={note.id} 
                className={`p-3 cursor-pointer hover:bg-gray-50 ${activeNote?.id === note.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleSelectNote(note)}
              >
                <div className="font-medium truncate">{note.title}</div>
                <div className="text-sm text-gray-500 truncate">{note.content}</div>
                <div className="text-xs text-gray-400 mt-1">{note.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-2/3">
          {activeNote ? (
            <div className="border rounded-lg p-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titel"
                className="text-xl font-medium mb-2"
                variant="unstyled"
              />
              
              <div className="text-xs text-gray-400 mb-4">
                Zuletzt bearbeitet: {activeNote.date}
              </div>
              
              <TextArea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Notizinhalt..."
                rows={12}
                fullWidth
                autoResize
                variant="unstyled"
              />
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  color="danger" 
                  onClick={handleDeleteNote}
                >
                  Löschen
                </Button>
                <Button onClick={handleSaveNote}>Speichern</Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 h-full">
              <p>Keine Notiz ausgewählt</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={handleNewNote}
              >
                Neue Notiz erstellen
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```