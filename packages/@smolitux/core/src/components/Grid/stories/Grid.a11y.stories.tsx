import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../';

const meta: Meta<typeof Grid.A11y> = {
  title: 'Core/Grid/A11y',
  component: Grid.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Grid-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'],
      description: 'Anzahl der Spalten',
    },
    rows: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'auto'],
      description: 'Anzahl der Zeilen',
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Abstand zwischen den Elementen',
    },
    columnGap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Abstand zwischen den Spalten',
    },
    rowGap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Abstand zwischen den Zeilen',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für das Grid',
    },
    ariaLabelledby: {
      control: 'text',
      description: 'ARIA-Labelledby für das Grid',
    },
    ariaDescribedby: {
      control: 'text',
      description: 'ARIA-Describedby für das Grid',
    },
    role: {
      control: 'text',
      description: 'ARIA-Rolle für das Grid',
    },
    isRegion: {
      control: 'boolean',
      description: 'Ob das Grid eine Region ist',
    },
    isLandmark: {
      control: 'boolean',
      description: 'Ob das Grid eine Landmark ist',
    },
    isTable: {
      control: 'boolean',
      description: 'Ob das Grid eine Tabelle ist',
    },
    isForm: {
      control: 'boolean',
      description: 'Ob das Grid ein Formular ist',
    },
    isNavigation: {
      control: 'boolean',
      description: 'Ob das Grid eine Navigation ist',
    },
    isList: {
      control: 'boolean',
      description: 'Ob das Grid eine Liste ist',
    },
    isLiveRegion: {
      control: 'boolean',
      description: 'Ob das Grid eine Live-Region ist',
    },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Politeness-Level für Live-Region',
    },
    isAtomic: {
      control: 'boolean',
      description: 'Ob das Grid atomar ist',
    },
    isBusy: {
      control: 'boolean',
      description: 'Ob das Grid busy ist',
    },
    isFocusable: {
      control: 'boolean',
      description: 'Ob das Grid fokussierbar ist',
    },
    hasTableCaption: {
      control: 'boolean',
      description: 'Ob das Grid eine Tabellen-Beschreibung hat',
    },
    tableCaption: {
      control: 'text',
      description: 'Tabellen-Beschreibung',
    },
    hasTableSummary: {
      control: 'boolean',
      description: 'Ob das Grid eine Tabellen-Zusammenfassung hat',
    },
    tableSummary: {
      control: 'text',
      description: 'Tabellen-Zusammenfassung',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid.A11y>;

export const Default: Story = {
  args: {
    columns: 2,
    gap: 'md',
    ariaLabel: 'Beispiel-Grid',
    children: (
      <>
        <div className="bg-gray-200 p-4 rounded">Element 1</div>
        <div className="bg-gray-200 p-4 rounded">Element 2</div>
        <div className="bg-gray-200 p-4 rounded">Element 3</div>
        <div className="bg-gray-200 p-4 rounded">Element 4</div>
      </>
    ),
  },
};

export const AsRegion: Story = {
  args: {
    columns: 2,
    gap: 'md',
    ariaLabel: 'Region-Grid',
    isRegion: true,
    children: (
      <>
        <div className="bg-gray-200 p-4 rounded">Element 1</div>
        <div className="bg-gray-200 p-4 rounded">Element 2</div>
        <div className="bg-gray-200 p-4 rounded">Element 3</div>
        <div className="bg-gray-200 p-4 rounded">Element 4</div>
      </>
    ),
  },
};

export const AsNavigation: Story = {
  args: {
    columns: 4,
    gap: 'md',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    children: (
      <>
        <a href="#" className="bg-blue-100 p-4 rounded hover:bg-blue-200">
          Startseite
        </a>
        <a href="#" className="bg-blue-100 p-4 rounded hover:bg-blue-200">
          Produkte
        </a>
        <a href="#" className="bg-blue-100 p-4 rounded hover:bg-blue-200">
          Über uns
        </a>
        <a href="#" className="bg-blue-100 p-4 rounded hover:bg-blue-200">
          Kontakt
        </a>
      </>
    ),
  },
};

export const AsList: Story = {
  args: {
    columns: 1,
    gap: 'sm',
    ariaLabel: 'Aufgabenliste',
    isList: true,
    children: (
      <>
        <div className="bg-gray-200 p-4 rounded flex items-center">
          <input type="checkbox" id="task1" className="mr-2" />
          <label htmlFor="task1">Aufgabe 1 erledigen</label>
        </div>
        <div className="bg-gray-200 p-4 rounded flex items-center">
          <input type="checkbox" id="task2" className="mr-2" />
          <label htmlFor="task2">Aufgabe 2 erledigen</label>
        </div>
        <div className="bg-gray-200 p-4 rounded flex items-center">
          <input type="checkbox" id="task3" className="mr-2" />
          <label htmlFor="task3">Aufgabe 3 erledigen</label>
        </div>
      </>
    ),
  },
};

export const AsTable: Story = {
  args: {
    columns: 3,
    gap: 'md',
    ariaLabel: 'Produkttabelle',
    isTable: true,
    hasTableCaption: true,
    tableCaption: 'Liste der verfügbaren Produkte',
    hasTableSummary: true,
    tableSummary: 'Diese Tabelle zeigt Produkte mit ihren Namen, Preisen und Verfügbarkeit.',
    children: (
      <>
        <div className="bg-gray-300 p-4 rounded font-bold">Produkt</div>
        <div className="bg-gray-300 p-4 rounded font-bold">Preis</div>
        <div className="bg-gray-300 p-4 rounded font-bold">Verfügbarkeit</div>

        <div className="bg-gray-200 p-4 rounded">Produkt A</div>
        <div className="bg-gray-200 p-4 rounded">19,99 €</div>
        <div className="bg-gray-200 p-4 rounded">Auf Lager</div>

        <div className="bg-gray-200 p-4 rounded">Produkt B</div>
        <div className="bg-gray-200 p-4 rounded">29,99 €</div>
        <div className="bg-gray-200 p-4 rounded">Ausverkauft</div>

        <div className="bg-gray-200 p-4 rounded">Produkt C</div>
        <div className="bg-gray-200 p-4 rounded">39,99 €</div>
        <div className="bg-gray-200 p-4 rounded">Auf Lager</div>
      </>
    ),
  },
};

export const AsForm: Story = {
  args: {
    columns: 2,
    gap: 'md',
    ariaLabel: 'Kontaktformular',
    isForm: true,
    children: (
      <>
        <div className="col-span-2 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-bold">Kontaktformular</h2>
        </div>

        <div className="bg-gray-200 p-4 rounded">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input id="name" type="text" className="w-full p-2 border rounded" />
        </div>

        <div className="bg-gray-200 p-4 rounded">
          <label htmlFor="email" className="block mb-2">
            E-Mail
          </label>
          <input id="email" type="email" className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-2 bg-gray-200 p-4 rounded">
          <label htmlFor="message" className="block mb-2">
            Nachricht
          </label>
          <textarea id="message" className="w-full p-2 border rounded" rows={4}></textarea>
        </div>

        <div className="col-span-2 bg-gray-200 p-4 rounded flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Absenden</button>
        </div>
      </>
    ),
  },
};

export const AsLiveRegion: Story = {
  args: {
    columns: 1,
    gap: 'md',
    ariaLabel: 'Statusmeldungen',
    isLiveRegion: true,
    liveRegionPoliteness: 'polite',
    isAtomic: true,
    children: (
      <>
        <div className="bg-green-100 p-4 rounded border border-green-500">
          Ihre Änderungen wurden erfolgreich gespeichert.
        </div>
        <div className="bg-yellow-100 p-4 rounded border border-yellow-500">
          Warnung: Ihre Sitzung läuft in 5 Minuten ab.
        </div>
      </>
    ),
  },
};

export const WithDifferentGaps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2">Kein Abstand (none)</h3>
        <Grid.A11y columns={3} gap="none" ariaLabel="Grid ohne Abstand">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">Kleiner Abstand (xs)</h3>
        <Grid.A11y columns={3} gap="xs" ariaLabel="Grid mit kleinem Abstand">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">Mittlerer Abstand (md)</h3>
        <Grid.A11y columns={3} gap="md" ariaLabel="Grid mit mittlerem Abstand">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">Großer Abstand (xl)</h3>
        <Grid.A11y columns={3} gap="xl" ariaLabel="Grid mit großem Abstand">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
        </Grid.A11y>
      </div>
    </div>
  ),
};

export const WithDifferentColumns: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2">1 Spalte</h3>
        <Grid.A11y columns={1} gap="md" ariaLabel="Grid mit 1 Spalte">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">2 Spalten</h3>
        <Grid.A11y columns={2} gap="md" ariaLabel="Grid mit 2 Spalten">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">3 Spalten</h3>
        <Grid.A11y columns={3} gap="md" ariaLabel="Grid mit 3 Spalten">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
        </Grid.A11y>
      </div>

      <div>
        <h3 className="mb-2">4 Spalten</h3>
        <Grid.A11y columns={4} gap="md" ariaLabel="Grid mit 4 Spalten">
          <div className="bg-gray-200 p-4 rounded">Element 1</div>
          <div className="bg-gray-200 p-4 rounded">Element 2</div>
          <div className="bg-gray-200 p-4 rounded">Element 3</div>
          <div className="bg-gray-200 p-4 rounded">Element 4</div>
          <div className="bg-gray-200 p-4 rounded">Element 5</div>
          <div className="bg-gray-200 p-4 rounded">Element 6</div>
          <div className="bg-gray-200 p-4 rounded">Element 7</div>
          <div className="bg-gray-200 p-4 rounded">Element 8</div>
        </Grid.A11y>
      </div>
    </div>
  ),
};

export const NestedGrids: Story = {
  render: () => (
    <Grid.A11y columns={2} gap="lg" ariaLabel="Äußeres Grid">
      <Grid.A11y columns={2} gap="sm" ariaLabel="Inneres Grid 1" isRegion={true}>
        <div className="bg-blue-100 p-4 rounded">Inneres Element 1</div>
        <div className="bg-blue-100 p-4 rounded">Inneres Element 2</div>
        <div className="bg-blue-100 p-4 rounded">Inneres Element 3</div>
        <div className="bg-blue-100 p-4 rounded">Inneres Element 4</div>
      </Grid.A11y>

      <Grid.A11y columns={1} gap="sm" ariaLabel="Inneres Grid 2" isRegion={true}>
        <div className="bg-green-100 p-4 rounded">Inneres Element 5</div>
        <div className="bg-green-100 p-4 rounded">Inneres Element 6</div>
      </Grid.A11y>
    </Grid.A11y>
  ),
};
