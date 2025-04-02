# Tabs

Die Tabs-Komponente ermöglicht es, Inhalte in verschiedenen Panels zu organisieren, zwischen denen Benutzer wechseln können.

## Import

```jsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@smolitux/core';
```

## Verwendung

### Einfache Tabs

```jsx
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt für Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 2</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 3</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit verschiedenen Varianten

```jsx
<Tabs variant="line" className="mb-8">
  <TabList>
    <Tab>Line</Tab>
    <Tab>Variant</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Line Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs variant="enclosed" className="mb-8">
  <TabList>
    <Tab>Enclosed</Tab>
    <Tab>Variant</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Enclosed Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs variant="soft-rounded" className="mb-8">
  <TabList>
    <Tab>Soft Rounded</Tab>
    <Tab>Variant</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Soft Rounded Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs variant="solid-rounded" className="mb-8">
  <TabList>
    <Tab>Solid Rounded</Tab>
    <Tab>Variant</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Solid Rounded Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs variant="unstyled">
  <TabList>
    <Tab>Unstyled</Tab>
    <Tab>Variant</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Unstyled Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit verschiedenen Farbschemata

```jsx
<Tabs colorScheme="primary" className="mb-4">
  <TabList>
    <Tab>Primary</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Primary Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs colorScheme="secondary" className="mb-4">
  <TabList>
    <Tab>Secondary</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Secondary Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs colorScheme="success" className="mb-4">
  <TabList>
    <Tab>Success</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Success Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs colorScheme="danger" className="mb-4">
  <TabList>
    <Tab>Danger</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Danger Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit verschiedenen Größen

```jsx
<Tabs size="xs" className="mb-4">
  <TabList>
    <Tab>Extra Small</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Extra Small Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="sm" className="mb-4">
  <TabList>
    <Tab>Small</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Small Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="md" className="mb-4">
  <TabList>
    <Tab>Medium</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Medium Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="lg" className="mb-4">
  <TabList>
    <Tab>Large</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Large Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs size="xl">
  <TabList>
    <Tab>Extra Large</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Extra Large Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit verschiedenen Ausrichtungen

```jsx
<Tabs align="start" className="mb-4">
  <TabList>
    <Tab>Start</Tab>
    <Tab>Aligned</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Start Aligned Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
    <TabPanel>Dritter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs align="center" className="mb-4">
  <TabList>
    <Tab>Center</Tab>
    <Tab>Aligned</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für Center Aligned Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
    <TabPanel>Dritter Tab</TabPanel>
  </TabPanels>
</Tabs>

<Tabs align="end">
  <TabList>
    <Tab>End</Tab>
    <Tab>Aligned</Tab>
    <Tab>Tabs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Inhalt für End Aligned Tabs</TabPanel>
    <TabPanel>Zweiter Tab</TabPanel>
    <TabPanel>Dritter Tab</TabPanel>
  </TabPanels>
</Tabs>
```

### Vertikale Tabs

```jsx
<Tabs orientation="vertical">
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt für Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 2</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 3</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Tabs mit Icons

```jsx
<Tabs>
  <TabList>
    <Tab leftIcon={<HomeIcon className="w-4 h-4" />}>Home</Tab>
    <Tab leftIcon={<UserIcon className="w-4 h-4" />}>Profil</Tab>
    <Tab leftIcon={<SettingsIcon className="w-4 h-4" />}>Einstellungen</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Home-Inhalt</p>
    </TabPanel>
    <TabPanel>
      <p>Profil-Inhalt</p>
    </TabPanel>
    <TabPanel>
      <p>Einstellungen-Inhalt</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Deaktivierte Tabs

```jsx
<Tabs>
  <TabList>
    <Tab>Aktiv</Tab>
    <Tab isDisabled>Deaktiviert</Tab>
    <Tab>Aktiv</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <p>Inhalt für Tab 1</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 2 (wird nicht angezeigt)</p>
    </TabPanel>
    <TabPanel>
      <p>Inhalt für Tab 3</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Kontrollierte Tabs

```jsx
function ControlledTabsExample() {
  const [tabIndex, setTabIndex] = useState(0);
  
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  
  return (
    <div>
      <div className="mb-4">
        <button 
          onClick={() => setTabIndex(0)} 
          className={`px-4 py-2 mr-2 ${tabIndex === 0 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
        >
          Tab 1
        </button>
        <button 
          onClick={() => setTabIndex(1)} 
          className={`px-4 py-2 mr-2 ${tabIndex === 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
        >
          Tab 2
        </button>
        <button 
          onClick={() => setTabIndex(2)} 
          className={`px-4 py-2 ${tabIndex === 2 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
        >
          Tab 3
        </button>
      </div>
      
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Inhalt für Tab 1</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt für Tab 2</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt für Tab 3</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
```

### Tabs mit Werten

```jsx
function TabsWithValuesExample() {
  const [tabValue, setTabValue] = useState('home');
  
  return (
    <div>
      <p className="mb-2">Aktueller Tab: {tabValue}</p>
      
      <Tabs onChange={(index) => console.log(`Tab ${index} ausgewählt`)}>
        <TabList>
          <Tab value="home" onClick={() => setTabValue('home')}>Home</Tab>
          <Tab value="profile" onClick={() => setTabValue('profile')}>Profil</Tab>
          <Tab value="settings" onClick={() => setTabValue('settings')}>Einstellungen</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Home-Inhalt</p>
          </TabPanel>
          <TabPanel>
            <p>Profil-Inhalt</p>
          </TabPanel>
          <TabPanel>
            <p>Einstellungen-Inhalt</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
```

## Props

### Tabs Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Kinder-Elemente (TabList, TabPanels) |
| `defaultIndex` | `number` | `0` | Standardmäßig aktiver Tab-Index |
| `index` | `number` | - | Aktiver Tab-Index (kontrollierter Modus) |
| `onChange` | `(index: number) => void` | - | Callback bei Tab-Wechsel |
| `variant` | `'line' \| 'enclosed' \| 'soft-rounded' \| 'solid-rounded' \| 'unstyled'` | `'line'` | Variante der Tabs |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Farbschema der Tabs |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe der Tabs |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Ausrichtung der Tabs |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientierung der Tabs |
| `isDisabled` | `boolean` | `false` | Sind die Tabs deaktiviert? |
| `isManual` | `boolean` | `false` | Sind die Tabs manuell? (Keine automatische Aktivierung bei Hover) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### TabList Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Kinder-Elemente (Tab) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### Tab Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Inhalt des Tabs |
| `isDisabled` | `boolean` | `false` | Ist der Tab deaktiviert? |
| `value` | `string` | - | Wert des Tabs (für programmatische Aktivierung) |
| `leftIcon` | `ReactNode` | - | Icon vor dem Text |
| `rightIcon` | `ReactNode` | - | Icon nach dem Text |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### TabPanels Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Kinder-Elemente (TabPanel) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### TabPanel Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Inhalt des Panels |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Barrierefreiheit

Die Tabs-Komponente ist für Barrierefreiheit optimiert:

- Verwendet die korrekten ARIA-Attribute (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`)
- Unterstützt Tastaturnavigation (Tab, Pfeiltasten)
- Korrekte Fokus-Verwaltung
- Screenreader-Unterstützung durch semantische Struktur

## Beispiele

### Produktdetails mit Tabs

```jsx
function ProductDetailsTabs() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Produktname</h2>
        <p className="text-gray-500">Produktkategorie</p>
      </div>
      
      <Tabs>
        <TabList>
          <Tab>Beschreibung</Tab>
          <Tab>Spezifikationen</Tab>
          <Tab>Bewertungen</Tab>
          <Tab>Lieferung</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">Produktbeschreibung</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl
                nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
              <p className="mt-4">
                Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
                eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
                tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">Technische Spezifikationen</h3>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Maße</td>
                    <td className="py-2">10 x 20 x 5 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Gewicht</td>
                    <td className="py-2">500g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Material</td>
                    <td className="py-2">Aluminium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Farbe</td>
                    <td className="py-2">Silber</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Garantie</td>
                    <td className="py-2">2 Jahre</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">Kundenbewertungen</h3>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-gray-300">★</span>
                </div>
                <span className="ml-2 text-gray-600">4.0 von 5 Sternen</span>
              </div>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">Max Mustermann</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500 text-sm">vor 2 Tagen</span>
                  </div>
                  <div className="flex text-yellow-400 text-sm mb-2">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <p className="text-gray-700">
                    Tolles Produkt, ich bin sehr zufrieden mit dem Kauf.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">Erika Musterfrau</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500 text-sm">vor 1 Woche</span>
                  </div>
                  <div className="flex text-yellow-400 text-sm mb-2">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span className="text-gray-300">★</span>
                    <span className="text-gray-300">★</span>
                  </div>
                  <p className="text-gray-700">
                    Gutes Produkt, aber die Lieferung hat etwas länger gedauert als erwartet.
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">Lieferinformationen</h3>
              <p>
                Die Lieferung erfolgt innerhalb von 2-3 Werktagen nach Bestelleingang.
                Für Bestellungen über 50€ ist der Versand kostenlos.
              </p>
              <h4 className="font-medium mt-4 mb-2">Versandoptionen:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Standardversand: 4,99€ (2-3 Werktage)</li>
                <li>Expressversand: 9,99€ (1 Werktag)</li>
                <li>Abholung im Geschäft: kostenlos</li>
              </ul>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
```

### Dashboard mit Tabs

```jsx
function DashboardTabs() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <Tabs variant="enclosed" colorScheme="primary">
        <TabList>
          <Tab leftIcon={<ChartIcon className="w-4 h-4" />}>Übersicht</Tab>
          <Tab leftIcon={<ListIcon className="w-4 h-4" />}>Aktivitäten</Tab>
          <Tab leftIcon={<SettingsIcon className="w-4 h-4" />}>Einstellungen</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Gesamtumsatz</h3>
                  <p className="text-2xl font-bold">€24,532</p>
                  <p className="text-green-500 text-sm">+12% gegenüber Vormonat</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Neue Kunden</h3>
                  <p className="text-2xl font-bold">132</p>
                  <p className="text-green-500 text-sm">+8% gegenüber Vormonat</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Bestellungen</h3>
                  <p className="text-2xl font-bold">287</p>
                  <p className="text-red-500 text-sm">-3% gegenüber Vormonat</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium mb-4">Umsatzentwicklung</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  Chart-Platzhalter
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="py-4">
              <h3 className="font-medium mb-4">Letzte Aktivitäten</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <OrderIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Neue Bestellung #12345</p>
                      <p className="text-sm text-gray-500">Vor 2 Stunden</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Neuer Kunde registriert</p>
                      <p className="text-sm text-gray-500">Vor 5 Stunden</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-3">
                      <CommentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Neue Produktbewertung</p>
                      <p className="text-sm text-gray-500">Vor 1 Tag</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="py-4">
              <h3 className="font-medium mb-4">Kontoeinstellungen</h3>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="admin@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="********"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary-600" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">
                        E-Mail-Benachrichtigungen aktivieren
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md">
                      Änderungen speichern
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
```

### Responsive Tabs

```jsx
function ResponsiveTabs() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Überprüfe die Bildschirmgröße beim Laden und bei Größenänderungen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  return (
    <Tabs orientation={isMobile ? 'vertical' : 'horizontal'}>
      <TabList>
        <Tab>Profil</Tab>
        <Tab>Konto</Tab>
        <Tab>Sicherheit</Tab>
        <Tab>Benachrichtigungen</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel>
          <h3 className="text-lg font-medium mb-2">Profileinstellungen</h3>
          <p>Hier können Sie Ihre Profilinformationen bearbeiten.</p>
        </TabPanel>
        <TabPanel>
          <h3 className="text-lg font-medium mb-2">Kontoeinstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen verwalten.</p>
        </TabPanel>
        <TabPanel>
          <h3 className="text-lg font-medium mb-2">Sicherheitseinstellungen</h3>
          <p>Hier können Sie Ihre Sicherheitseinstellungen anpassen.</p>
        </TabPanel>
        <TabPanel>
          <h3 className="text-lg font-medium mb-2">Benachrichtigungseinstellungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen konfigurieren.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```