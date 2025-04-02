# Spezielle Komponententests

Dieses Dokument beschreibt spezifische Teststrategien für komplexere Komponententypen in der smolitux UI-Bibliothek.

## 1. Form-Komponenten

Form-Komponenten stellen besondere Herausforderungen dar, da sie Benutzereingaben verarbeiten, Validierungen durchführen und komplexe Zustände verwalten müssen.

### 1.1 Zu testende Aspekte bei Form-Komponenten

1. **Validierung und Fehlerbehandlung**
   - Tests mit gültigen und ungültigen Eingaben
   - Anzeige und Format von Fehlermeldungen
   - Form-übergreifende Validierungsregeln

2. **Zustände und Interaktionen**
   - Disabled/Enabled-Zustand
   - Fokus- und Blur-Events
   - Placeholder-Text und Hinweistexte

3. **Barrierefreiheit**
   - ARIA-Attribute und Rollen
   - Label-Verknüpfung
   - Unterstützung von Bildschirmlesern

### 1.2 Beispiel: FormControl mit verschachtelten Elementen

```tsx
// FormControl.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormControl } from '../FormControl';
import { Input } from '../../Input/Input';
import { Select } from '../../Select/Select';
import { Button } from '../../Button/Button';

const NestedForm = () => {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    role: ''
  });

## 4. Chart-Komponenten

Chart-Komponenten erfordern spezielle Testansätze, da sie visuell komplexe Daten darstellen und mit DOM-Elementen wie SVG interagieren.

### 4.1 Zu testende Aspekte

1. **Korrekte Datenvisualisierung**
   - Prüfung der generierten SVG-Elemente
   - Darstellung verschiedener Datensätze

2. **Interaktivität**
   - Hover-Effekte und Tooltips
   - Klickbare Bereiche und Legenden

3. **Anpassbarkeit**
   - Themes und Farbschemata
   - Responsive Anpassung an Containergrößen

### 4.2 Beispiel: AreaChart-Komponente

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AreaChart } from '../AreaChart';

// Mock für useTheme hook
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' })
}));

describe('AreaChart', () => {
  const mockData = {
    id: 'testSeries',
    name: 'Test Data',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 200 },
      { x: 'Apr', y: 120 },
      { x: 'May', y: 180 }
    ]
  };

  test('renders chart with correct SVG elements', () => {
    render(<AreaChart data={mockData} />);
    
    // SVG sollte gerendert werden
    expect(screen.getByRole('img')).toBeInTheDocument();
    
    // Prüfen auf spezifische SVG-Elemente
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Hintergrund-Rechteck sollte existieren
    expect(svg?.querySelector('rect')).toBeInTheDocument();
    
    // Prüfen der Datenpunkte (Path-Elemente für Linien)
    expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
  });

  test('renders chart with title', () => {
    render(<AreaChart data={mockData} title="Test Chart" />);
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  test('passes height and width properties correctly', () => {
    render(<AreaChart data={mockData} height={400} width={800} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('height', '400');
    expect(svg).toHaveAttribute('width', '800');
  });

  test('shows points when showPoints is true', () => {
    render(<AreaChart data={mockData} showPoints />);
    const svg = document.querySelector('svg');
    expect(svg?.querySelectorAll('circle').length).toBeGreaterThan(0);
  });

  test('hides points when showPoints is false', () => {
    render(<AreaChart data={mockData} showPoints={false} />);
    const svg = document.querySelector('svg');
    expect(svg?.querySelectorAll('circle').length).toBe(0);
  });

  test('renders legend when showLegend is true', () => {
    render(<AreaChart data={[mockData, {...mockData, id: 'second', name: 'Second Series'}]} showLegend />);
    expect(screen.getByText('Test Data')).toBeInTheDocument();
    expect(screen.getByText('Second Series')).toBeInTheDocument();
  });
});
```

## 5. Teststrategien für Context-abhängige Komponenten

Viele Komponenten hängen von Context ab, wie z.B. ThemeContext, FormContext oder AuthContext. Hier sind Strategien für das Testen solcher Komponenten:

### 5.1 Context-Provider verwenden

```tsx
// ThemeAwareComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { ThemeAwareComponent } from '../ThemeAwareComponent';

describe('ThemeAwareComponent', () => {
  test('renders with light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeAwareComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-component')).toHaveClass('bg-white');
  });

  test('renders with dark theme when provided', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeAwareComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-component')).toHaveClass('bg-gray-800');
  });
});
```

### 5.2 Context-Consumer testen

```tsx
// FormControl.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl, useFormControl } from '../FormControl';
import { Input } from '../../Input/Input';

// Testkomponente, die den FormControl-Context verwendet
const FormControlConsumer = () => {
  const context = useFormControl();
  return (
    <div data-testid="consumer">
      {JSON.stringify({
        disabled: context.disabled,
        required: context.required,
        hasError: context.hasError,
      })}
    </div>
  );
};

describe('FormControl Context', () => {
  test('provides correct context values to children', () => {
    render(
      <FormControl disabled required error="Error message">
        <FormControlConsumer />
      </FormControl>
    );
    
    const consumer = screen.getByTestId('consumer');
    expect(consumer).toHaveTextContent(/"disabled":true/);
    expect(consumer).toHaveTextContent(/"required":true/);
    expect(consumer).toHaveTextContent(/"hasError":true/);
  });
});
```

## 6. Tipps für benutzerdefinierte Testhelfer

### 6.1 Benutzerdefinierte render-Funktion mit Providern

```tsx
// test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { ToastProvider } from '@smolitux/toast';

// Benutzerdefinierte render-Funktion, die alle benötigten Provider enthält
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' }
) => {
  const { theme = 'light', ...rest } = options || {};
  
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider initialTheme={theme}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    ),
    ...rest,
  });
};

// Export aller Funktionen aus testing-library/react
export * from '@testing-library/react';

// Überschreiben der render-Methode
export { customRender as render };
```

### 6.2 Häufig benötigte Testhelfer

```tsx
// test-helpers.tsx
import { fireEvent, waitFor } from '@testing-library/react';

// Helfer für Formular-Interaktionen
export const fillForm = async (getByLabelText, formData) => {
  for (const [label, value] of Object.entries(formData)) {
    const input = getByLabelText(label);
    await fireEvent.change(input, { target: { value } });
  }
};

// Helfer für Modaltests
export const openAndVerifyModal = async (getByText, getByRole, buttonText) => {
  fireEvent.click(getByText(buttonText));
  
  await waitFor(() => {
    expect(getByRole('dialog')).toBeInTheDocument();
  });
};

// Helfer für Datumsmanipulation in Tests
export const setTestDate = (year, month, day) => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(year, month, day));
  
  return () => {
    jest.useRealTimers();
  };
};
```
  const [errors, setErrors] = React.useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: values.name ? '' : 'Name is required',
      email: values.email ? '' : 'Email is required'
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).every(error => !error)) {
      // Form is valid
      console.log('Form submitted:', values);
  });

  test('combines filtering and sorting correctly', async () => {
    render(
      <Table 
        data={testData} 
        columns={columns} 
        showSearch={true}
        showPagination={true}
        itemsPerPage={50} {/* Alle auf einer Seite für einfachere Tests */}
      />
    );
    
    // Nach Kategorie A filtern
    const filterButtons = screen.getAllByRole('button');
    const categoryFilterButton = Array.from(filterButtons).find(
      button => button.closest('th')?.textContent?.includes('Category')
    );
    
    if (!categoryFilterButton) throw new Error('Filter button not found');
    
    fireEvent.click(categoryFilterButton);
    
    // Filterwert eingeben
    const filterInput = await screen.findByPlaceholderText('Filterwert...');
    await userEvent.type(filterInput, 'Category A');
    
    // Filter anwenden
    fireEvent.click(screen.getByText('Anwenden'));
    
    // Prüfen, ob nur Kategorie A angezeigt wird
    await waitFor(() => {
      const categoryACells = screen.getAllByText('Category A');
      expect(categoryACells.length).toBeGreaterThan(1); // Header + Zeilen
      expect(screen.queryByText('Category B')).not.toBeInTheDocument();
      expect(screen.queryByText('Category C')).not.toBeInTheDocument();
    });
    
    // Nach Wert sortieren (aufsteigend)
    const valueHeader = Array.from(screen.getAllByRole('columnheader')).find(
      header => header.textContent?.includes('Value')
    );
    
    if (!valueHeader) throw new Error('Value header not found');
    
    fireEvent.click(valueHeader);
    
    // Ersten und letzten Wert merken, um Sortierung zu prüfen
    const valueRows = screen.getAllByRole('row').slice(1); // Header überspringen
    const firstValue = parseFloat(valueRows[0].cells[4].textContent?.replace('€', '') || '0');
    const lastValue = parseFloat(valueRows[valueRows.length - 1].cells[4].textContent?.replace('€', '') || '0');
    
    // Erster Wert sollte kleiner sein als der letzte
    expect(firstValue).toBeLessThan(lastValue);
  });

  test('row selection works correctly with select all', async () => {
    const onRowSelect = jest.fn();
    
    render(
      <Table 
        data={testData.slice(0, 20)} // Nur 20 Zeilen für diesen Test
        columns={columns}
        selectable={true}
        itemsPerPage={10}
        onRowSelect={onRowSelect}
      />
    );
    
    // Alle Zeilen auf der ersten Seite auswählen
    const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
    fireEvent.click(selectAllCheckbox);
    
    // Alle Checkboxen auf der ersten Seite sollten ausgewählt sein
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
    
    // Callback sollte mit 10 ausgewählten Zeilen aufgerufen worden sein
    expect(onRowSelect).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 10 })
    ]));
    expect(onRowSelect.mock.calls[0][0].length).toBe(10);
    
    // Zur zweiten Seite navigieren
    fireEvent.click(screen.getByLabelText('Next slide') || screen.getByText('Weiter'));
    
    // Auf Seite 2 sollten Checkboxen nicht ausgewählt sein
    await waitFor(() => {
      const page2Checkboxes = screen.getAllByRole('checkbox');
      expect(page2Checkboxes[1]).not.toBeChecked(); // Erstes Datencheckbox
    });
    
    // Eine Zeile auf Seite 2 auswählen
    const page2FirstRowCheckbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(page2FirstRowCheckbox);
    
    // Callback sollte mit 11 ausgewählten Zeilen aufgerufen worden sein
    expect(onRowSelect).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 10 }),
      expect.objectContaining({ id: 11 })
    ]));
    expect(onRowSelect.mock.calls[1][0].length).toBe(11);
  });
});
  };

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <FormControl 
        label="Name" 
        error={errors.name}
        required
      >
        <Input
          value={values.name}
          onChange={(e) => setValues({...values, name: e.target.value})}
          placeholder="Enter your name"
        />
      </FormControl>
      
      <FormControl 
        label="Email" 
        error={errors.email}
        required
      >
        <Input
          type="email"
          value={values.email}
          onChange={(e) => setValues({...values, email: e.target.value})}
          placeholder="Enter your email"
        />
      </FormControl>
      
      <FormControl label="Role">
        <Select
          options={[
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' },
            { value: 'editor', label: 'Editor' }
          ]}
          value={values.role}
          onChange={(e) => setValues({...values, role: e.target.value})}
        />
      </FormControl>
      
      <Button type="submit">Submit</Button>
    </form>
  );
};

describe('Form Integration', () => {
  test('validates form fields correctly', async () => {
    render(<NestedForm />);
    
    // Submit empty form
    fireEvent.submit(screen.getByTestId('form'));
    
    // Check for error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    
    // Fill the form
    await userEvent.type(screen.getByPlaceholderText('Enter your name'), 'Test User');
    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    
    // Submit again
    fireEvent.submit(screen.getByTestId('form'));
    
    // Error messages should be gone
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });
  
  test('select component changes value correctly', async () => {
    render(<NestedForm />);
    
    // Open select dropdown
    const select = screen.getByRole('combobox');
    await userEvent.click(select);
    
    // Select an option
    await userEvent.click(screen.getByText('Admin'));
    
    // Value should be updated
    expect(select).toHaveValue('admin');
  });
});
```

## 2. Datums- und Zeit-Komponenten

Datums- und Zeit-Komponenten stellen spezielle Herausforderungen für Tests dar, da sie mit dem aktuellen Datum/der aktuellen Zeit interagieren und komplexe Benutzerinteraktionen unterstützen müssen.

### 2.1 Zu testende Aspekte

1. **Datumsformatierung und -validierung**
   - Verschiedene Datumsformate testen
   - Valide und invalide Eingaben
   - Lokalisierung und Internationalisierung

2. **Navigation und Auswahl**
   - Monats- und Jahresnavigation
   - Datumsauswahl via Klick
   - Tastaturnavigation

3. **Einschränkungen und Anpassungen**
   - Min/Max-Datum
   - Deaktivierte Termine
   - Benutzerdefinierte Datumsformatierung

### 2.2 Beispiel: DatePicker-Komponente

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from '../DatePicker';

describe('DatePicker Complex Tests', () => {
  beforeEach(() => {
    // Konsistentes Datum für Tests
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 15)); // 15. Januar 2023
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('respects min and max date constraints', async () => {
    const minDate = new Date(2023, 0, 10); // 10. Januar 2023
    const maxDate = new Date(2023, 0, 20); // 20. Januar 2023
    
    render(
      <DatePicker 
        minDate={minDate}
        maxDate={maxDate}
      />
    );
    
    // Öffne den Datepicker
    fireEvent.click(screen.getByRole('textbox'));
    
    // Vor dem minDate sollten Tage deaktiviert sein
    await waitFor(() => {
      const day5 = screen.getByText('5'); // 5. Januar
      expect(day5.parentElement).toHaveClass('text-gray-400'); // Deaktivierte Klasse
      expect(day5.parentElement).toHaveAttribute('aria-disabled', 'true');
    });
    
    // Nach dem maxDate sollten Tage deaktiviert sein
    const day25 = screen.getByText('25'); // 25. Januar
    expect(day25.parentElement).toHaveClass('text-gray-400'); // Deaktivierte Klasse
    expect(day25.parentElement).toHaveAttribute('aria-disabled', 'true');
    
    // Tag zwischen min und max sollte wählbar sein
    const day15 = screen.getByText('15'); // 15. Januar
    expect(day15.parentElement).not.toHaveClass('text-gray-400');
    expect(day15.parentElement).not.toHaveAttribute('aria-disabled', 'true');
  });

  test('handles different date formats correctly', async () => {
    const onChange = jest.fn();
    
    render(
      <DatePicker 
        format="dd.MM.yyyy"
        onChange={onChange}
      />
    );
    
    // Öffne den Datepicker
    fireEvent.click(screen.getByRole('textbox'));
    
    // Klicke auf den heutigen Tag
    await waitFor(() => {
      fireEvent.click(screen.getByText('15')); // 15. Januar
    });
    
    // Input sollte im richtigen Format sein
    expect(screen.getByRole('textbox')).toHaveValue('15.01.2023');
    
    // onChange sollte mit korrektem Datum aufgerufen werden
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(15);
    expect(calledDate.getMonth()).toBe(0); // Januar
    expect(calledDate.getFullYear()).toBe(2023);
  });

  test('allows manual date input when allowKeyboardInput is true', async () => {
    const onChange = jest.fn();
    
    render(
      <DatePicker 
        allowKeyboardInput={true}
        format="yyyy-MM-dd"
        onChange={onChange}
      />
    );
    
    // Manuell Datum eingeben
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '2023-02-20');
    
    // Enter drücken oder blur auslösen
    fireEvent.blur(input);
    
    // onChange sollte mit korrektem Datum aufgerufen werden
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(20);
    expect(calledDate.getMonth()).toBe(1); // Februar
    expect(calledDate.getFullYear()).toBe(2023);
  });
});
```

## 3. Tabellenkomponenten

Tabellen sind komplexe Komponenten, die Datenfilterung, Sortierung, Paginierung und andere Funktionen unterstützen können.

### 3.1 Zu testende Aspekte

1. **Datenoperationen**
   - Sortierung (aufsteigend/absteigend)
   - Filterung nach verschiedenen Kriterien
   - Paginierung

2. **Zeilenfunktionen**
   - Zeilenauswahl (einzeln/mehrfach)
   - Aktionen pro Zeile
   - Expansion/Collapse von Details

3. **Darstellungsoptionen**
   - Anzahl von Elementen pro Seite
   - Spaltenbreite und -anpassungen
   - Layoutvarianten (gestreift, mit Rahmen, etc.)

### 3.2 Beispiel: Erweiterte Tabellentests

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from '../Table';

describe('Table Advanced Tests', () => {
  const testData = Array.from({ length: 50 }).map((_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    category: index % 3 === 0 ? 'Category A' : index % 3 === 1 ? 'Category B' : 'Category C',
    status: index % 4 === 0 ? 'active' : index % 4 === 1 ? 'inactive' : index % 4 === 2 ? 'pending' : 'archived',
    value: Math.round(Math.random() * 1000) / 10
  }));

  const columns = [
    {
      id: 'id',
      header: 'ID',
      accessor: (row: any) => row.id
    },
    {
      id: 'name',
      header: 'Name',
      accessor: (row: any) => row.name,
      sortable: true
    },
    {
      id: 'category',
      header: 'Category',
      accessor: (row: any) => row.category,
      filterable: true,
      sortable: true
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (row: any) => row.status,
      filterable: true,
      sortable: true
    },
    {
      id: 'value',
      header: 'Value',
      accessor: (row: any) => row.value,
      sortable: true,
      cell: (value: number) => `${value.toFixed(1)}€`
    }
  ];

  test('pagination controls change page correctly', async () => {
    render(
      <Table 
        data={testData} 
        columns={columns} 
        showPagination={true}
        itemsPerPage={10}
      />
    );
    
    // Erste Seite sollte die ersten 10 Items zeigen
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 10')).toBeInTheDocument();
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument();
    
    // Zur zweiten Seite navigieren
    fireEvent.click(screen.getByLabelText('Next slide') || screen.getByText('Weiter'));
    
    // Zweite Seite sollte Items 11-20 zeigen
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
      expect(screen.getByText('Item 11')).toBeInTheDocument();
      expect(screen.getByText('Item 20')).toBeInTheDocument();
    });
    
    // Zur letzten Seite springen
    const lastPageButton = Array.from(screen.getAllByRole('button')).find(
      button => button.textContent === '5'
    );
    
    if (lastPageButton) {
      fireEvent.click(lastPageButton);
      
      // Letzte Seite sollte Items 41-50 zeigen
      await waitFor(() => {
        expect(screen.queryByText('Item 20')).not.toBeInTheDocument();
        expect(screen.getByText('Item 41')).toBeInTheDocument();
        expect(screen.getByText('Item 50')).toBeInTheDocument();
      });
    }
