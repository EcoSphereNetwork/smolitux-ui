# Sprachsteuerung: Komponenten-Integration

Diese Dokumentation beschreibt, wie die Sprachsteuerungsfunktionalität in alle Smolitux-UI-Komponenten integriert wird. Sie enthält detaillierte Anweisungen und Beispiele für jede Komponente.

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Grundlegende Komponenten](#grundlegende-komponenten)
   - [Button](#button)
   - [Input](#input)
   - [Checkbox](#checkbox)
   - [Radio](#radio)
   - [Select](#select)
   - [Textarea](#textarea)
3. [Layout-Komponenten](#layout-komponenten)
   - [Container](#container)
   - [Grid](#grid)
   - [Flex](#flex)
   - [Card](#card)
4. [Feedback-Komponenten](#feedback-komponenten)
   - [Alert](#alert)
   - [Toast](#toast)
   - [Modal](#modal)
   - [Dialog](#dialog)
   - [Drawer](#drawer)
5. [Navigations-Komponenten](#navigations-komponenten)
   - [Tabs](#tabs)
   - [Menu](#menu)
   - [Breadcrumb](#breadcrumb)
   - [Pagination](#pagination)
6. [Daten-Komponenten](#daten-komponenten)
   - [Table](#table)
   - [List](#list)
   - [DataGrid](#datagrid)
7. [Chart-Komponenten](#chart-komponenten)
   - [LineChart](#linechart)
   - [BarChart](#barchart)
   - [PieChart](#piechart)
   - [AreaChart](#areachart)
8. [Spezial-Komponenten](#spezial-komponenten)
   - [DatePicker](#datepicker)
   - [TimePicker](#timepicker)
   - [ColorPicker](#colorpicker)
   - [FileUpload](#fileupload)
9. [Komplexe Komponenten-Interaktionen](#komplexe-komponenten-interaktionen)
   - [Formulare](#formulare)
   - [Dashboards](#dashboards)
   - [Wizards](#wizards)
10. [Barrierefreiheit](#barrierefreiheit)
11. [Leistungsoptimierung](#leistungsoptimierung)

## Übersicht

Die Integration der Sprachsteuerung in Smolitux-UI-Komponenten erfolgt über das `withVoiceControl` Higher-Order Component (HOC) und den `useVoiceControl` Hook. Jede Komponente wird mit standardmäßigen Sprachbefehlen konfiguriert und kann benutzerdefinierte Befehle akzeptieren.

### Allgemeines Integrationsmuster

```tsx
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';
import { ComponentName, ComponentProps } from '@smolitux/core';

export type VoiceComponentProps = ComponentProps & VoiceControlProps;

const VoiceComponentBase: React.FC<VoiceComponentProps> = ({
  onVoiceCommand,
  ...props
}) => {
  const handleVoiceCommand = (command: string) => {
    // Komponenten-spezifische Befehlsverarbeitung
    
    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return <ComponentName {...props} />;
};

// Standardbefehle für die Komponente
const defaultCommands = ['befehl1', 'befehl2'];

export const VoiceComponent = withVoiceControl(VoiceComponentBase, defaultCommands);
```

## Grundlegende Komponenten

### Button

Die Button-Komponente reagiert auf Sprachbefehle wie "klick" oder "drücken".

```tsx
// src/components/voice/VoiceButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceButtonProps = ButtonProps & VoiceControlProps;

const VoiceButtonBase: React.FC<VoiceButtonProps> = ({ 
  onVoiceCommand, 
  onClick,
  children,
  ...props 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Standardbefehle für Button-Aktivierung
    if (lowerCommand === 'klick' || 
        lowerCommand === 'click' || 
        lowerCommand === 'drücken' || 
        lowerCommand === 'press') {
      // Simuliere einen Klick-Event
      const buttonElement = document.getElementById(props.id || '');
      if (buttonElement) {
        buttonElement.click();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const VoiceButton = withVoiceControl(
  VoiceButtonBase, 
  ['klick', 'click', 'drücken', 'press']
);
```

#### Verwendungsbeispiel

```tsx
<VoiceButton 
  onClick={() => console.log('Button clicked')}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
>
  Speichern
</VoiceButton>
```

### Input

Die Input-Komponente unterstützt Sprachbefehle zum Eingeben und Löschen von Text.

```tsx
// src/components/voice/VoiceInput.tsx
import React, { useState, useEffect } from 'react';
import { Input, InputProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceInputProps = InputProps & VoiceControlProps;

const VoiceInputBase: React.FC<VoiceInputProps> = ({ 
  onVoiceCommand, 
  onChange,
  value: propValue,
  ...props 
}) => {
  const [value, setValue] = useState(propValue || '');

  // Synchronisiere den Wert mit den Props
  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehl zum Eingeben von Text
    if (lowerCommand.startsWith('eingabe ') || lowerCommand.startsWith('input ')) {
      // Extrahiere den Text nach "eingabe " oder "input "
      const text = command.substring(lowerCommand.startsWith('eingabe ') ? 8 : 6);
      
      // Setze den Wert
      setValue(text);
      
      // Simuliere ein Change-Event
      const inputElement = document.getElementById(props.id || '') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = text;
        
        // Erstelle und dispatche ein synthetisches Event
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
        
        // Fokussiere das Element
        inputElement.focus();
        
        // Wenn onChange als Prop übergeben wurde, rufe es mit einem simulierten Event auf
        if (onChange) {
          const syntheticEvent = {
            target: { value: text },
            currentTarget: { value: text },
            preventDefault: () => {},
            stopPropagation: () => {}
          } as React.ChangeEvent<HTMLInputElement>;
          
          onChange(syntheticEvent);
        }
      }
    } 
    // Befehl zum Löschen des Textes
    else if (lowerCommand === 'löschen' || lowerCommand === 'clear') {
      setValue('');
      
      const inputElement = document.getElementById(props.id || '') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
        
        // Erstelle und dispatche ein synthetisches Event
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
        
        // Wenn onChange als Prop übergeben wurde, rufe es mit einem simulierten Event auf
        if (onChange) {
          const syntheticEvent = {
            target: { value: '' },
            currentTarget: { value: '' },
            preventDefault: () => {},
            stopPropagation: () => {}
          } as React.ChangeEvent<HTMLInputElement>;
          
          onChange(syntheticEvent);
        }
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export const VoiceInput = withVoiceControl(
  VoiceInputBase, 
  ['eingabe', 'input', 'löschen', 'clear']
);
```

#### Verwendungsbeispiel

```tsx
<VoiceInput 
  placeholder="Sprich, um Text einzugeben"
  onChange={(e) => console.log('Input changed:', e.target.value)}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
/>
```

### Checkbox

Die Checkbox-Komponente unterstützt Sprachbefehle zum Aktivieren und Deaktivieren.

```tsx
// src/components/voice/VoiceCheckbox.tsx
import React, { useState, useEffect } from 'react';
import { Checkbox, CheckboxProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceCheckboxProps = CheckboxProps & VoiceControlProps;

const VoiceCheckboxBase: React.FC<VoiceCheckboxProps> = ({ 
  onVoiceCommand, 
  onChange,
  checked: propChecked,
  ...props 
}) => {
  const [checked, setChecked] = useState(propChecked || false);

  // Synchronisiere den Wert mit den Props
  useEffect(() => {
    if (propChecked !== undefined) {
      setChecked(propChecked);
    }
  }, [propChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zum Aktivieren/Deaktivieren der Checkbox
    if (lowerCommand === 'aktivieren' || 
        lowerCommand === 'check' || 
        lowerCommand === 'ankreuzen') {
      setChecked(true);
      simulateChange(true);
    } 
    else if (lowerCommand === 'deaktivieren' || 
             lowerCommand === 'uncheck' || 
             lowerCommand === 'abwählen') {
      setChecked(false);
      simulateChange(false);
    }
    else if (lowerCommand === 'umschalten' || 
             lowerCommand === 'toggle') {
      const newChecked = !checked;
      setChecked(newChecked);
      simulateChange(newChecked);
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  const simulateChange = (newChecked: boolean) => {
    const checkboxElement = document.getElementById(props.id || '') as HTMLInputElement;
    if (checkboxElement) {
      checkboxElement.checked = newChecked;
      
      // Erstelle und dispatche ein synthetisches Event
      const event = new Event('change', { bubbles: true });
      checkboxElement.dispatchEvent(event);
      
      // Wenn onChange als Prop übergeben wurde, rufe es mit einem simulierten Event auf
      if (onChange) {
        const syntheticEvent = {
          target: { checked: newChecked },
          currentTarget: { checked: newChecked },
          preventDefault: () => {},
          stopPropagation: () => {}
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(syntheticEvent);
      }
    }
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      {...props}
    />
  );
};

export const VoiceCheckbox = withVoiceControl(
  VoiceCheckboxBase, 
  ['aktivieren', 'check', 'ankreuzen', 'deaktivieren', 'uncheck', 'abwählen', 'umschalten', 'toggle']
);
```

#### Verwendungsbeispiel

```tsx
<VoiceCheckbox 
  label="Ich stimme den AGB zu"
  onChange={(e) => console.log('Checkbox changed:', e.target.checked)}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
/>
```

### Select

Die Select-Komponente unterstützt Sprachbefehle zur Auswahl von Optionen.

```tsx
// src/components/voice/VoiceSelect.tsx
import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceSelectProps = SelectProps & VoiceControlProps;

const VoiceSelectBase: React.FC<VoiceSelectProps> = ({ 
  onVoiceCommand, 
  onChange,
  value: propValue,
  options = [],
  ...props 
}) => {
  const [value, setValue] = useState(propValue);

  // Synchronisiere den Wert mit den Props
  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehl zum Auswählen einer Option
    if (lowerCommand.startsWith('wähle ') || 
        lowerCommand.startsWith('select ') || 
        lowerCommand.includes(' wählen') || 
        lowerCommand.includes(' auswählen')) {
      
      // Extrahiere den Optionsnamen
      let optionName = '';
      if (lowerCommand.startsWith('wähle ')) {
        optionName = command.substring(6).toLowerCase();
      } else if (lowerCommand.startsWith('select ')) {
        optionName = command.substring(7).toLowerCase();
      } else if (lowerCommand.includes(' wählen')) {
        optionName = command.split(' wählen')[0].toLowerCase();
      } else if (lowerCommand.includes(' auswählen')) {
        optionName = command.split(' auswählen')[0].toLowerCase();
      }
      
      // Finde die passende Option
      const matchingOption = options.find(option => {
        const optionLabel = typeof option === 'string' 
          ? option.toLowerCase() 
          : (option.label || '').toLowerCase();
        return optionLabel === optionName;
      });
      
      if (matchingOption) {
        const optionValue = typeof matchingOption === 'string' 
          ? matchingOption 
          : matchingOption.value;
        
        // Setze den Wert
        setValue(optionValue);
        
        // Simuliere ein Change-Event
        const selectElement = document.getElementById(props.id || '') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = optionValue;
          
          // Erstelle und dispatche ein synthetisches Event
          const event = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(event);
          
          // Wenn onChange als Prop übergeben wurde, rufe es mit einem simulierten Event auf
          if (onChange) {
            const syntheticEvent = {
              target: { value: optionValue },
              currentTarget: { value: optionValue },
              preventDefault: () => {},
              stopPropagation: () => {}
            } as React.ChangeEvent<HTMLSelectElement>;
            
            onChange(syntheticEvent);
          }
        }
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export const VoiceSelect = withVoiceControl(
  VoiceSelectBase, 
  ['wähle', 'select', 'wählen', 'auswählen']
);
```

#### Verwendungsbeispiel

```tsx
<VoiceSelect 
  label="Kategorie"
  options={[
    { value: 'tech', label: 'Technologie' },
    { value: 'science', label: 'Wissenschaft' },
    { value: 'art', label: 'Kunst' }
  ]}
  onChange={(e) => console.log('Select changed:', e.target.value)}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
/>
```

## Layout-Komponenten

### Container

Die Container-Komponente unterstützt Sprachbefehle zur Steuerung des Layouts.

```tsx
// src/components/voice/VoiceContainer.tsx
import React from 'react';
import { Container, ContainerProps } from '@smolitux/layout';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceContainerProps = ContainerProps & VoiceControlProps;

const VoiceContainerBase: React.FC<VoiceContainerProps> = ({ 
  onVoiceCommand, 
  children,
  ...props 
}) => {
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zur Steuerung des Containers
    if (lowerCommand === 'zentrieren' || lowerCommand === 'center') {
      // Implementiere Zentrierung
    } 
    else if (lowerCommand === 'erweitern' || lowerCommand === 'expand') {
      // Implementiere Erweiterung
    }
    else if (lowerCommand === 'verkleinern' || lowerCommand === 'collapse') {
      // Implementiere Verkleinerung
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

export const VoiceContainer = withVoiceControl(
  VoiceContainerBase, 
  ['zentrieren', 'center', 'erweitern', 'expand', 'verkleinern', 'collapse']
);
```

### Card

Die Card-Komponente unterstützt Sprachbefehle zum Öffnen, Schließen und Erweitern.

```tsx
// src/components/voice/VoiceCard.tsx
import React, { useState } from 'react';
import { Card, CardProps } from '@smolitux/layout';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceCardProps = CardProps & VoiceControlProps & {
  collapsible?: boolean;
  expandable?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
};

const VoiceCardBase: React.FC<VoiceCardProps> = ({ 
  onVoiceCommand, 
  children,
  collapsible = false,
  expandable = false,
  onExpand,
  onCollapse,
  ...props 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zur Steuerung der Card
    if (collapsible && (lowerCommand === 'einklappen' || lowerCommand === 'collapse')) {
      setIsCollapsed(true);
      if (onCollapse) onCollapse();
    } 
    else if (collapsible && (lowerCommand === 'ausklappen' || lowerCommand === 'expand')) {
      setIsCollapsed(false);
    }
    else if (expandable && (lowerCommand === 'maximieren' || lowerCommand === 'maximize')) {
      setIsExpanded(true);
      if (onExpand) onExpand();
    }
    else if (expandable && (lowerCommand === 'minimieren' || lowerCommand === 'minimize')) {
      setIsExpanded(false);
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Card 
      {...props}
      className={`${props.className || ''} ${isCollapsed ? 'collapsed' : ''} ${isExpanded ? 'expanded' : ''}`}
    >
      {!isCollapsed && children}
    </Card>
  );
};

export const VoiceCard = withVoiceControl(
  VoiceCardBase, 
  ['einklappen', 'collapse', 'ausklappen', 'expand', 'maximieren', 'maximize', 'minimieren', 'minimize']
);
```

## Feedback-Komponenten

### Modal

Die Modal-Komponente unterstützt Sprachbefehle zum Öffnen und Schließen.

```tsx
// src/components/voice/VoiceModal.tsx
import React from 'react';
import { Modal, ModalProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceModalProps = ModalProps & VoiceControlProps;

const VoiceModalBase: React.FC<VoiceModalProps> = ({ 
  onVoiceCommand, 
  onClose,
  children,
  ...props 
}) => {
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zum Schließen des Modals
    if (lowerCommand === 'schließen' || 
        lowerCommand === 'close' || 
        lowerCommand === 'abbrechen' || 
        lowerCommand === 'cancel') {
      if (onClose) {
        onClose();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Modal
      onClose={onClose}
      {...props}
    >
      {children}
    </Modal>
  );
};

export const VoiceModal = withVoiceControl(
  VoiceModalBase, 
  ['schließen', 'close', 'abbrechen', 'cancel']
);
```

#### Verwendungsbeispiel

```tsx
const [isOpen, setIsOpen] = useState(false);

<VoiceButton 
  onClick={() => setIsOpen(true)}
  voiceCommands={['öffnen', 'open']}
>
  Modal öffnen
</VoiceButton>

<VoiceModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Beispiel-Modal"
>
  <p>Dieses Modal kann mit Sprachbefehlen geschlossen werden.</p>
  <VoiceButton onClick={() => setIsOpen(false)}>Schließen</VoiceButton>
</VoiceModal>
```

## Daten-Komponenten

### Table

Die Table-Komponente unterstützt Sprachbefehle zur Navigation und Sortierung.

```tsx
// src/components/voice/VoiceTable.tsx
import React, { useState } from 'react';
import { Table, TableProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceTableProps = TableProps & VoiceControlProps & {
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
};

const VoiceTableBase: React.FC<VoiceTableProps> = ({ 
  onVoiceCommand, 
  onSort,
  onPageChange,
  onRowsPerPageChange,
  columns = [],
  ...props 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zur Sortierung
    if (lowerCommand.startsWith('sortiere nach ') || lowerCommand.startsWith('sort by ')) {
      const columnName = command.substring(lowerCommand.startsWith('sortiere nach ') ? 14 : 8).toLowerCase();
      
      // Finde die passende Spalte
      const matchingColumn = columns.find(column => 
        (typeof column === 'string' ? column : column.header || column.accessor || '').toLowerCase() === columnName
      );
      
      if (matchingColumn && onSort) {
        const columnKey = typeof matchingColumn === 'string' ? matchingColumn : (matchingColumn.accessor || matchingColumn.header || '');
        onSort(columnKey, 'asc');
      }
    }
    // Befehle zur Seitennavigation
    else if (lowerCommand.startsWith('gehe zu seite ') || lowerCommand.startsWith('go to page ')) {
      const pageNumber = parseInt(command.substring(lowerCommand.startsWith('gehe zu seite ') ? 14 : 11), 10);
      
      if (!isNaN(pageNumber) && pageNumber > 0) {
        setCurrentPage(pageNumber);
        if (onPageChange) {
          onPageChange(pageNumber);
        }
      }
    }
    // Befehle zur Änderung der Zeilenanzahl pro Seite
    else if (lowerCommand.startsWith('zeige ') || lowerCommand.startsWith('show ')) {
      const match = lowerCommand.match(/zeige (\d+) (einträge|zeilen)|show (\d+) (entries|rows)/i);
      
      if (match) {
        const count = parseInt(match[1] || match[3], 10);
        
        if (!isNaN(count) && count > 0) {
          setRowsPerPage(count);
          if (onRowsPerPageChange) {
            onRowsPerPageChange(count);
          }
        }
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Table
      columns={columns}
      {...props}
    />
  );
};

export const VoiceTable = withVoiceControl(
  VoiceTableBase, 
  [
    'sortiere nach', 'sort by', 
    'gehe zu seite', 'go to page', 
    'zeige', 'show'
  ]
);
```

#### Verwendungsbeispiel

```tsx
<VoiceTable 
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Alter', accessor: 'age' },
    { header: 'Stadt', accessor: 'city' }
  ]}
  data={[
    { name: 'Max Mustermann', age: 30, city: 'Berlin' },
    { name: 'Erika Musterfrau', age: 28, city: 'Hamburg' }
  ]}
  onSort={(column, direction) => console.log(`Sort ${column} ${direction}`)}
  onPageChange={(page) => console.log(`Go to page ${page}`)}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
/>
```

## Chart-Komponenten

### LineChart

Die LineChart-Komponente unterstützt Sprachbefehle zur Datenvisualisierung.

```tsx
// src/components/voice/VoiceLineChart.tsx
import React, { useState } from 'react';
import { LineChart, LineChartProps } from '@smolitux/charts';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceLineChartProps = LineChartProps & VoiceControlProps & {
  onZoom?: (level: number) => void;
  onTimeRangeChange?: (range: 'day' | 'week' | 'month' | 'year') => void;
};

const VoiceLineChartBase: React.FC<VoiceLineChartProps> = ({ 
  onVoiceCommand, 
  onZoom,
  onTimeRangeChange,
  ...props 
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehle zum Zoomen
    if (lowerCommand === 'vergrößern' || lowerCommand === 'zoom in') {
      const newZoomLevel = zoomLevel + 0.2;
      setZoomLevel(newZoomLevel);
      if (onZoom) onZoom(newZoomLevel);
    } 
    else if (lowerCommand === 'verkleinern' || lowerCommand === 'zoom out') {
      const newZoomLevel = Math.max(0.2, zoomLevel - 0.2);
      setZoomLevel(newZoomLevel);
      if (onZoom) onZoom(newZoomLevel);
    }
    // Befehle zur Änderung des Zeitraums
    else if (lowerCommand.includes('tag') || lowerCommand.includes('day')) {
      setTimeRange('day');
      if (onTimeRangeChange) onTimeRangeChange('day');
    }
    else if (lowerCommand.includes('woche') || lowerCommand.includes('week')) {
      setTimeRange('week');
      if (onTimeRangeChange) onTimeRangeChange('week');
    }
    else if (lowerCommand.includes('monat') || lowerCommand.includes('month')) {
      setTimeRange('month');
      if (onTimeRangeChange) onTimeRangeChange('month');
    }
    else if (lowerCommand.includes('jahr') || lowerCommand.includes('year')) {
      setTimeRange('year');
      if (onTimeRangeChange) onTimeRangeChange('year');
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <LineChart
      {...props}
      style={{ 
        ...props.style,
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center center'
      }}
      data-time-range={timeRange}
    />
  );
};

export const VoiceLineChart = withVoiceControl(
  VoiceLineChartBase, 
  [
    'vergrößern', 'zoom in', 
    'verkleinern', 'zoom out', 
    'tag', 'day', 
    'woche', 'week', 
    'monat', 'month', 
    'jahr', 'year'
  ]
);
```

## Spezial-Komponenten

### DatePicker

Die DatePicker-Komponente unterstützt Sprachbefehle zur Datumsauswahl.

```tsx
// src/components/voice/VoiceDatePicker.tsx
import React, { useState } from 'react';
import { DatePicker, DatePickerProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceDatePickerProps = DatePickerProps & VoiceControlProps;

const VoiceDatePickerBase: React.FC<VoiceDatePickerProps> = ({ 
  onVoiceCommand, 
  onChange,
  value: propValue,
  ...props 
}) => {
  const [value, setValue] = useState(propValue);

  const handleChange = (date: Date | null) => {
    setValue(date);
    if (onChange) {
      onChange(date);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehl zum Setzen des heutigen Datums
    if (lowerCommand === 'heute' || lowerCommand === 'today') {
      const today = new Date();
      setValue(today);
      if (onChange) onChange(today);
    } 
    // Befehl zum Setzen des morgigen Datums
    else if (lowerCommand === 'morgen' || lowerCommand === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setValue(tomorrow);
      if (onChange) onChange(tomorrow);
    }
    // Befehl zum Setzen eines bestimmten Datums
    else if (lowerCommand.startsWith('datum ') || lowerCommand.startsWith('date ')) {
      const dateStr = command.substring(lowerCommand.startsWith('datum ') ? 6 : 5);
      
      // Versuche, das Datum zu parsen
      try {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          setValue(date);
          if (onChange) onChange(date);
        }
      } catch (error) {
        console.error('Failed to parse date:', error);
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export const VoiceDatePicker = withVoiceControl(
  VoiceDatePickerBase, 
  ['heute', 'today', 'morgen', 'tomorrow', 'datum', 'date']
);
```

## Komplexe Komponenten-Interaktionen

### Formulare

Für komplexe Formulare können Sie einen VoiceForm-Container erstellen, der Sprachbefehle für das gesamte Formular verarbeitet.

```tsx
// src/components/voice/VoiceForm.tsx
import React, { FormEvent, useRef } from 'react';
import { Form, FormProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceFormProps = FormProps & VoiceControlProps;

const VoiceFormBase: React.FC<VoiceFormProps> = ({ 
  onVoiceCommand, 
  onSubmit,
  children,
  ...props 
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      onSubmit(event);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Befehl zum Absenden des Formulars
    if (lowerCommand === 'absenden' || 
        lowerCommand === 'submit' || 
        lowerCommand === 'formular absenden' || 
        lowerCommand === 'submit form') {
      if (formRef.current) {
        // Erstelle und dispatche ein synthetisches Event
        const event = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(event);
        
        // Wenn das Event nicht abgebrochen wurde, rufe onSubmit auf
        if (!event.defaultPrevented && onSubmit) {
          onSubmit(event as unknown as FormEvent<HTMLFormElement>);
        }
      }
    } 
    // Befehl zum Zurücksetzen des Formulars
    else if (lowerCommand === 'zurücksetzen' || 
             lowerCommand === 'reset' || 
             lowerCommand === 'formular zurücksetzen' || 
             lowerCommand === 'reset form') {
      if (formRef.current) {
        formRef.current.reset();
      }
    }

    if (onVoiceCommand) {
      onVoiceCommand(command);
    }
  };

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </Form>
  );
};

export const VoiceForm = withVoiceControl(
  VoiceFormBase, 
  ['absenden', 'submit', 'formular absenden', 'submit form', 'zurücksetzen', 'reset', 'formular zurücksetzen', 'reset form']
);
```

#### Verwendungsbeispiel

```tsx
<VoiceForm 
  onSubmit={(e) => {
    e.preventDefault();
    console.log('Form submitted');
  }}
  onVoiceCommand={(cmd) => console.log(`Voice command: ${cmd}`)}
>
  <VoiceInput 
    name="name"
    label="Name"
    placeholder="Geben Sie Ihren Namen ein"
    voiceCommands={['name eingeben']}
  />
  
  <VoiceSelect 
    name="category"
    label="Kategorie"
    options={[
      { value: 'tech', label: 'Technologie' },
      { value: 'science', label: 'Wissenschaft' },
      { value: 'art', label: 'Kunst' }
    ]}
    voiceCommands={['kategorie auswählen', 'technologie wählen', 'wissenschaft wählen', 'kunst wählen']}
  />
  
  <VoiceCheckbox 
    name="terms"
    label="Ich stimme den AGB zu"
    voiceCommands={['agb akzeptieren', 'agb ablehnen']}
  />
  
  <VoiceButton type="submit">Absenden</VoiceButton>
</VoiceForm>
```

## Barrierefreiheit

Alle sprachgesteuerten Komponenten sollten ARIA-Attribute enthalten, die auf die verfügbaren Sprachbefehle hinweisen.

```tsx
// Beispiel für barrierefreie Sprachsteuerung
export const VoiceButtonBase: React.FC<VoiceButtonProps> = ({ 
  onVoiceCommand, 
  onClick,
  children,
  voiceCommands = [],
  ...props 
}) => {
  // ... Implementierung ...

  // Erstelle eine Beschreibung der verfügbaren Sprachbefehle
  const voiceCommandsDescription = voiceCommands.length > 0
    ? `Verfügbare Sprachbefehle: ${voiceCommands.join(', ')}`
    : 'Sprachsteuerung verfügbar';

  return (
    <>
      <Button
        onClick={handleClick}
        aria-describedby={`${props.id || ''}-voice-commands`}
        {...props}
      >
        {children}
      </Button>
      <span 
        id={`${props.id || ''}-voice-commands`}
        className="sr-only" // Screen-Reader-only
      >
        {voiceCommandsDescription}
      </span>
    </>
  );
};
```

## Leistungsoptimierung

Für eine optimale Leistung sollten Sie die Sprachsteuerung nur für die wichtigsten Komponenten aktivieren und Lazy Loading verwenden.

```tsx
// Lazy Loading für sprachgesteuerte Komponenten
import React, { lazy, Suspense } from 'react';
import { Button } from '@smolitux/core';

// Lazy-Laden der sprachgesteuerten Komponente
const VoiceButton = lazy(() => import('./voice/VoiceButton'));

function MyComponent() {
  const [useVoiceControl, setUseVoiceControl] = useState(false);

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={useVoiceControl} 
          onChange={(e) => setUseVoiceControl(e.target.checked)} 
        />
        Sprachsteuerung aktivieren
      </label>
      
      {useVoiceControl ? (
        <Suspense fallback={<Button>Lade...</Button>}>
          <VoiceButton>Sprachgesteuerter Button</VoiceButton>
        </Suspense>
      ) : (
        <Button>Normaler Button</Button>
      )}
    </div>
  );
}
```

Durch die Implementierung dieser Komponenten-Integration können Sie die Sprachsteuerungsfunktionalität in alle Smolitux-UI-Komponenten integrieren und eine konsistente Benutzererfahrung bieten.