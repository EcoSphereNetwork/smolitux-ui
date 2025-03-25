# TimePicker

Die TimePicker-Komponente ermöglicht es Benutzern, eine Uhrzeit auszuwählen oder direkt einzugeben.

## Import

```jsx
import { TimePicker } from '@smolitux/core';
```

## Verwendung

### Einfacher TimePicker

```jsx
<TimePicker />
```

### TimePicker mit Standardwert

```jsx
<TimePicker defaultValue="14:30" />
```

### TimePicker mit Label

```jsx
<TimePicker 
  label="Startzeit" 
  placeholder="Zeit auswählen" 
/>
```

### TimePicker mit Hilfetext

```jsx
<TimePicker 
  label="Besprechungszeit" 
  helperText="Bitte wählen Sie eine Zeit während der Geschäftszeiten" 
  placeholder="Zeit auswählen" 
/>
```

### TimePicker mit Fehlermeldung

```jsx
<TimePicker 
  label="Lieferzeit" 
  error="Die gewählte Zeit liegt außerhalb unserer Lieferzeiten" 
  placeholder="Zeit auswählen" 
/>
```

### TimePicker mit verschiedenen Formaten

```jsx
<TimePicker 
  label="24-Stunden-Format" 
  format="24h" 
  defaultValue="14:30" 
  className="mb-4" 
/>

<TimePicker 
  label="12-Stunden-Format" 
  format="12h" 
  defaultValue="02:30 PM" 
/>
```

### TimePicker mit/ohne Sekunden

```jsx
<TimePicker 
  label="Mit Sekunden" 
  hideSeconds={false} 
  defaultValue="14:30:00" 
  className="mb-4" 
/>

<TimePicker 
  label="Ohne Sekunden" 
  hideSeconds={true} 
  defaultValue="14:30" 
/>
```

### TimePicker mit Zeitintervallen

```jsx
<TimePicker 
  label="15-Minuten-Intervall" 
  minuteStep={15} 
  defaultValue="14:30" 
  className="mb-4" 
/>

<TimePicker 
  label="30-Minuten-Intervall" 
  minuteStep={30} 
  defaultValue="14:30" 
  className="mb-4" 
/>

<TimePicker 
  label="15-Sekunden-Intervall" 
  secondStep={15} 
  hideSeconds={false} 
  defaultValue="14:30:00" 
/>
```

### TimePicker mit Min/Max-Zeit

```jsx
<TimePicker 
  label="Geschäftszeiten" 
  minTime="09:00" 
  maxTime="17:00" 
  placeholder="Zeit auswählen" 
/>
```

### TimePicker mit verschiedenen Größen

```jsx
<TimePicker 
  label="Klein" 
  size="sm" 
  defaultValue="14:30" 
  className="mb-4" 
/>

<TimePicker 
  label="Mittel" 
  size="md" 
  defaultValue="14:30" 
  className="mb-4" 
/>

<TimePicker 
  label="Groß" 
  size="lg" 
  defaultValue="14:30" 
/>
```

### TimePicker mit Icon

```jsx
<TimePicker 
  label="Mit Icon" 
  leftIcon={<ClockIcon className="w-5 h-5 text-gray-400" />} 
  defaultValue="14:30" 
/>
```

### TimePicker mit voller Breite

```jsx
<TimePicker 
  label="Volle Breite" 
  fullWidth 
  defaultValue="14:30" 
/>
```

### Kontrollierter TimePicker

```jsx
function ControlledTimePickerExample() {
  const [time, setTime] = useState({ hours: 14, minutes: 30 });
  
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };
  
  return (
    <div>
      <TimePicker 
        label="Kontrollierter TimePicker" 
        value={time} 
        onChange={handleTimeChange} 
      />
      <p className="mt-2">
        Ausgewählte Zeit: {time.hours}:{time.minutes.toString().padStart(2, '0')}
        {time.period ? ` ${time.period}` : ''}
      </p>
    </div>
  );
}
```

### TimePicker mit Validierung

```jsx
function ValidatedTimePickerExample() {
  const [time, setTime] = useState(null);
  const [error, setError] = useState('');
  
  const handleTimeChange = (newTime) => {
    setTime(newTime);
    
    // Geschäftszeiten: 9:00 - 17:00
    const businessStart = { hours: 9, minutes: 0 };
    const businessEnd = { hours: 17, minutes: 0 };
    
    if (!newTime) {
      setError('Bitte wählen Sie eine Zeit aus');
    } else if (
      newTime.hours < businessStart.hours || 
      (newTime.hours === businessStart.hours && newTime.minutes < businessStart.minutes) ||
      newTime.hours > businessEnd.hours ||
      (newTime.hours === businessEnd.hours && newTime.minutes > businessEnd.minutes)
    ) {
      setError('Die Zeit muss zwischen 9:00 und 17:00 Uhr liegen');
    } else {
      setError('');
    }
  };
  
  return (
    <TimePicker 
      label="Validierter TimePicker" 
      value={time} 
      onChange={handleTimeChange} 
      error={error}
      placeholder="Geschäftszeit wählen"
    />
  );
}
```

## Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `value` | `TimeValue \| string` | - | Ausgewählte Zeit |
| `defaultValue` | `TimeValue \| string` | - | Standard-Ausgewählte Zeit |
| `onChange` | `(time: TimeValue) => void` | - | Callback bei Auswahl einer Zeit |
| `label` | `string` | - | Text-Label |
| `helperText` | `string` | - | Hilfetext |
| `error` | `string` | - | Fehlermeldung |
| `format` | `'12h' \| '24h'` | `'24h'` | Format der Zeit |
| `hideSeconds` | `boolean` | `true` | Nur Stunden und Minuten anzeigen, keine Sekunden |
| `placeholder` | `string` | `'Zeit auswählen'` | Platzhaltertext |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Größe des TimePickers |
| `fullWidth` | `boolean` | `false` | Volle Breite |
| `leftIcon` | `ReactNode` | - | Icons vor dem Input anzeigen |
| `portalTarget` | `HTMLElement \| null` | - | Portierung des Popups |
| `closeOnSelect` | `boolean` | `true` | Automatisches Schließen nach Auswahl |
| `zIndex` | `number` | `1000` | Z-Index für den Popup |
| `minuteStep` | `number` | `1` | Zeitintervall in Minuten |
| `secondStep` | `number` | `1` | Zeitintervall in Sekunden |
| `minTime` | `TimeValue \| string` | - | Minimale wählbare Zeit |
| `maxTime` | `TimeValue \| string` | - | Maximale wählbare Zeit |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### TimeValue Interface

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|-------------|
| `hours` | `number` | Stunden |
| `minutes` | `number` | Minuten |
| `seconds` | `number` | Sekunden (optional) |
| `period` | `'AM' \| 'PM'` | Tageszeit für 12-Stunden-Format (optional) |

## Barrierefreiheit

Die TimePicker-Komponente ist für Barrierefreiheit optimiert:

- Verwendet ARIA-Attribute für bessere Screenreader-Unterstützung
- Unterstützt Tastaturnavigation (Tab, Pfeiltasten, Enter, Escape)
- Labels sind korrekt mit den Eingabefeldern verknüpft
- Ausreichender Kontrast für Texte und Bedienelemente
- Zeitwerte können auch direkt als Text eingegeben werden

## Beispiele

### Terminplaner

```jsx
function AppointmentScheduler() {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleStartTimeChange = (time) => {
    setStartTime(time);
    
    // Wenn die Endzeit vor der Startzeit liegt, setze die Endzeit auf Startzeit + 1 Stunde
    if (endTime && (
      time.hours > endTime.hours || 
      (time.hours === endTime.hours && time.minutes >= endTime.minutes)
    )) {
      const newEndHours = time.hours + 1 > 23 ? 23 : time.hours + 1;
      setEndTime({
        ...time,
        hours: newEndHours
      });
    }
  };
  
  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };
  
  const isFormValid = () => {
    return date && startTime && endTime && title;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }
    
    const appointment = {
      date,
      startTime,
      endTime,
      title,
      description
    };
    
    console.log('Termin erstellt:', appointment);
    // Hier würde normalerweise ein API-Aufruf erfolgen
    
    // Formular zurücksetzen
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setTitle('');
    setDescription('');
    
    alert('Termin erfolgreich erstellt!');
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Termin planen</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <DatePicker 
            label="Datum"
            value={date}
            onChange={setDate}
            minDate={new Date()}
            placeholder="Datum auswählen"
            fullWidth
            required
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <TimePicker 
              label="Startzeit"
              value={startTime}
              onChange={handleStartTimeChange}
              minTime="08:00"
              maxTime="20:00"
              minuteStep={15}
              placeholder="Von"
              fullWidth
              required
            />
          </div>
          
          <div className="flex-1">
            <TimePicker 
              label="Endzeit"
              value={endTime}
              onChange={handleEndTimeChange}
              minTime={startTime ? `${startTime.hours}:${startTime.minutes}` : "08:00"}
              maxTime="20:00"
              minuteStep={15}
              placeholder="Bis"
              fullWidth
              required
              disabled={!startTime}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titel *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beschreibung
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>
        
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isFormValid()}
          >
            Termin erstellen
          </button>
        </div>
      </form>
    </div>
  );
}
```

### Öffnungszeiten-Editor

```jsx
function BusinessHoursEditor() {
  const daysOfWeek = [
    'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'
  ];
  
  const [businessHours, setBusinessHours] = useState({
    Montag: { open: true, hours: [{ start: { hours: 9, minutes: 0 }, end: { hours: 17, minutes: 0 } }] },
    Dienstag: { open: true, hours: [{ start: { hours: 9, minutes: 0 }, end: { hours: 17, minutes: 0 } }] },
    Mittwoch: { open: true, hours: [{ start: { hours: 9, minutes: 0 }, end: { hours: 17, minutes: 0 } }] },
    Donnerstag: { open: true, hours: [{ start: { hours: 9, minutes: 0 }, end: { hours: 17, minutes: 0 } }] },
    Freitag: { open: true, hours: [{ start: { hours: 9, minutes: 0 }, end: { hours: 16, minutes: 0 } }] },
    Samstag: { open: false, hours: [{ start: { hours: 10, minutes: 0 }, end: { hours: 14, minutes: 0 } }] },
    Sonntag: { open: false, hours: [{ start: { hours: 10, minutes: 0 }, end: { hours: 14, minutes: 0 } }] }
  });
  
  const toggleDayOpen = (day) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        open: !prev[day].open
      }
    }));
  };
  
  const updateHours = (day, index, field, time) => {
    const newHours = [...businessHours[day].hours];
    newHours[index] = {
      ...newHours[index],
      [field]: time
    };
    
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: newHours
      }
    }));
  };
  
  const addHoursSlot = (day) => {
    const lastSlot = businessHours[day].hours[businessHours[day].hours.length - 1];
    const newStart = { 
      hours: lastSlot.end.hours, 
      minutes: lastSlot.end.minutes 
    };
    const newEnd = { 
      hours: Math.min(23, lastSlot.end.hours + 2), 
      minutes: lastSlot.end.minutes 
    };
    
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: [...prev[day].hours, { start: newStart, end: newEnd }]
      }
    }));
  };
  
  const removeHoursSlot = (day, index) => {
    if (businessHours[day].hours.length <= 1) return;
    
    const newHours = businessHours[day].hours.filter((_, i) => i !== index);
    
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: newHours
      }
    }));
  };
  
  const copyToAllDays = (sourceDay) => {
    const sourceDayData = businessHours[sourceDay];
    
    const newBusinessHours = { ...businessHours };
    daysOfWeek.forEach(day => {
      if (day !== sourceDay) {
        newBusinessHours[day] = { ...sourceDayData };
      }
    });
    
    setBusinessHours(newBusinessHours);
  };
  
  const saveBusinessHours = () => {
    console.log('Öffnungszeiten gespeichert:', businessHours);
    // Hier würde normalerweise ein API-Aufruf erfolgen
    alert('Öffnungszeiten erfolgreich gespeichert!');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Öffnungszeiten</h2>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          onClick={saveBusinessHours}
        >
          Speichern
        </button>
      </div>
      
      <div className="space-y-4">
        {daysOfWeek.map(day => (
          <div key={day} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={businessHours[day].open}
                  onChange={() => toggleDayOpen(day)}
                  className="h-4 w-4 text-primary-600 rounded"
                />
                <label htmlFor={`day-${day}`} className="ml-2 font-medium">
                  {day}
                </label>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="text-sm text-primary-600 hover:text-primary-800"
                  onClick={() => copyToAllDays(day)}
                >
                  Auf alle Tage kopieren
                </button>
              </div>
            </div>
            
            {businessHours[day].open && (
              <div className="space-y-3 pl-6">
                {businessHours[day].hours.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TimePicker 
                      value={slot.start}
                      onChange={(time) => updateHours(day, index, 'start', time)}
                      size="sm"
                      format="24h"
                      minuteStep={15}
                      placeholder="Von"
                    />
                    
                    <span className="text-gray-500">bis</span>
                    
                    <TimePicker 
                      value={slot.end}
                      onChange={(time) => updateHours(day, index, 'end', time)}
                      size="sm"
                      format="24h"
                      minuteStep={15}
                      placeholder="Bis"
                      minTime={`${slot.start.hours}:${slot.start.minutes}`}
                    />
                    
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-600"
                      onClick={() => removeHoursSlot(day, index)}
                      disabled={businessHours[day].hours.length <= 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button 
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  onClick={() => addHoursSlot(day)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Zeitfenster hinzufügen
                </button>
              </div>
            )}
            
            {!businessHours[day].open && (
              <div className="pl-6 text-gray-500">
                Geschlossen
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Zeiterfassung

```jsx
function TimeTracker() {
  const [entries, setEntries] = useState([
    { id: 1, date: '2023-05-15', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 }, project: 'Website-Entwicklung', description: 'Homepage-Design' },
    { id: 2, date: '2023-05-16', startTime: { hours: 9, minutes: 30 }, endTime: { hours: 16, minutes: 45 }, project: 'App-Entwicklung', description: 'Bug-Fixes' }
  ]);
  
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: { hours: 9, minutes: 0 },
    endTime: { hours: 17, minutes: 0 },
    project: '',
    description: ''
  });
  
  const projects = ['Website-Entwicklung', 'App-Entwicklung', 'Kundensupport', 'Meetings', 'Dokumentation'];
  
  const handleInputChange = (field, value) => {
    setNewEntry(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const calculateDuration = (start, end) => {
    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;
    const durationMinutes = endMinutes - startMinutes;
    
    if (durationMinutes <= 0) return '0h 0m';
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };
  
  const addEntry = () => {
    if (!newEntry.date || !newEntry.startTime || !newEntry.endTime || !newEntry.project) {
      alert('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }
    
    const startMinutes = newEntry.startTime.hours * 60 + newEntry.startTime.minutes;
    const endMinutes = newEntry.endTime.hours * 60 + newEntry.endTime.minutes;
    
    if (endMinutes <= startMinutes) {
      alert('Die Endzeit muss nach der Startzeit liegen');
      return;
    }
    
    const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    
    setEntries([
      ...entries,
      {
        id: newId,
        ...newEntry
      }
    ]);
    
    // Formular zurücksetzen
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      startTime: { hours: 9, minutes: 0 },
      endTime: { hours: 17, minutes: 0 },
      project: '',
      description: ''
    });
  };
  
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };
  
  const totalHours = entries.reduce((total, entry) => {
    const startMinutes = entry.startTime.hours * 60 + entry.startTime.minutes;
    const endMinutes = entry.endTime.hours * 60 + entry.endTime.minutes;
    return total + (endMinutes - startMinutes);
  }, 0);
  
  const formatTotalHours = () => {
    const hours = Math.floor(totalHours / 60);
    const minutes = totalHours % 60;
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Zeiterfassung</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium mb-4">Neue Zeiterfassung</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum *
            </label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projekt *
            </label>
            <select
              value={newEntry.project}
              onChange={(e) => handleInputChange('project', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Projekt auswählen</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Startzeit *
            </label>
            <TimePicker 
              value={newEntry.startTime}
              onChange={(time) => handleInputChange('startTime', time)}
              format="24h"
              minuteStep={15}
              fullWidth
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endzeit *
            </label>
            <TimePicker 
              value={newEntry.endTime}
              onChange={(time) => handleInputChange('endTime', time)}
              format="24h"
              minuteStep={15}
              fullWidth
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beschreibung
          </label>
          <textarea
            value={newEntry.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={2}
          />
        </div>
        
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          onClick={addEntry}
        >
          Eintrag hinzufügen
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Zeiterfassungen</h3>
          <div className="text-sm">
            Gesamtzeit: <span className="font-medium">{formatTotalHours()}</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projekt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startzeit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endzeit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dauer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beschreibung</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.startTime.hours}:{entry.startTime.minutes.toString().padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.endTime.hours}:{entry.endTime.minutes.toString().padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {calculateDuration(entry.startTime, entry.endTime)}
                  </td>
                  <td className="px-6 py-4">{entry.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
              
              {entries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Keine Einträge vorhanden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```