import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../Grid';

const meta: Meta<typeof Grid> = {
  title: 'Core/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 12, 'auto'],
      },
      description: 'Anzahl der Spalten',
    },
    rows: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 'auto'],
      },
      description: 'Anzahl der Zeilen',
    },
    gap: {
      control: {
        type: 'select',
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'Abstand zwischen den Elementen',
    },
    columnGap: {
      control: {
        type: 'select',
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'Abstand zwischen den Spalten',
    },
    rowGap: {
      control: {
        type: 'select',
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
      description: 'Abstand zwischen den Zeilen',
    },
    justifyItems: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'stretch'],
      },
      description: 'Horizontale Ausrichtung der Elemente',
    },
    alignItems: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'stretch', 'baseline'],
      },
      description: 'Vertikale Ausrichtung der Elemente',
    },
    justifyContent: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      },
      description: 'Horizontale Ausrichtung des Grids',
    },
    alignContent: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      },
      description: 'Vertikale Ausrichtung des Grids',
    },
    flow: {
      control: {
        type: 'select',
        options: ['row', 'column', 'row-dense', 'column-dense'],
      },
      description: 'Flussrichtung des Grids',
    },
    autoColumns: {
      control: {
        type: 'select',
        options: ['auto', 'min', 'max', 'fr'],
      },
      description: 'Automatische Spaltengrößen',
    },
    autoRows: {
      control: {
        type: 'select',
        options: ['auto', 'min', 'max', 'fr'],
      },
      description: 'Automatische Zeilengrößen',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Volle Breite',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Volle Höhe',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Hilfsfunktion zum Erstellen von Grid-Elementen
const createGridItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="bg-blue-100 dark:bg-blue-800 p-4 rounded-md flex items-center justify-center"
    >
      Item {index + 1}
    </div>
  ));
};

export const Default: Story = {
  args: {
    columns: 3,
    gap: 'md',
    children: createGridItems(6),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'md',
    children: createGridItems(4),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 'md',
    children: createGridItems(8),
  },
};

export const WithRows: Story = {
  args: {
    columns: 3,
    rows: 2,
    gap: 'md',
    children: createGridItems(6),
  },
};

export const WithDifferentGaps: Story = {
  args: {
    columns: 3,
    columnGap: 'lg',
    rowGap: 'sm',
    children: createGridItems(6),
  },
};

export const CenteredItems: Story = {
  args: {
    columns: 3,
    gap: 'md',
    justifyItems: 'center',
    alignItems: 'center',
    children: createGridItems(6).map((item, index) => (
      React.cloneElement(item, {
        className: `${item.props.className} h-24 w-32`,
      })
    )),
  },
};

export const ColumnFlow: Story = {
  args: {
    columns: 3,
    gap: 'md',
    flow: 'column',
    children: createGridItems(6),
  },
};

export const ResponsiveGrid: Story = {
  args: {
    columns: { sm: 1, md: 2, lg: 3, xl: 4 },
    gap: { sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' },
    children: createGridItems(8),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dieses Grid passt sich an verschiedene Bildschirmgrößen an. Verändere die Größe des Browserfensters, um den Effekt zu sehen.',
      },
    },
  },
};

export const NestedGrids: Story = {
  render: () => (
    <Grid columns={2} gap="lg">
      <Grid columns={2} gap="sm">
        {createGridItems(4).map((item, index) => (
          React.cloneElement(item, {
            className: `${item.props.className} bg-green-100 dark:bg-green-800`,
            children: `Nested ${index + 1}`,
          })
        ))}
      </Grid>
      <Grid columns={1} gap="sm">
        {createGridItems(2).map((item, index) => (
          React.cloneElement(item, {
            className: `${item.props.className} bg-red-100 dark:bg-red-800`,
            children: `Main ${index + 1}`,
          })
        ))}
      </Grid>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grids können ineinander verschachtelt werden, um komplexe Layouts zu erstellen.',
      },
    },
  },
};

export const DashboardLayout: Story = {
  render: () => (
    <Grid columns={12} gap="md" className="h-96">
      <div className="col-span-12 bg-blue-100 dark:bg-blue-800 p-4 rounded-md">Header</div>
      <div className="col-span-3 bg-green-100 dark:bg-green-800 p-4 rounded-md">Sidebar</div>
      <div className="col-span-9 bg-purple-100 dark:bg-purple-800 p-4 rounded-md">Main Content</div>
      <div className="col-span-12 bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md">Footer</div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ein Beispiel für ein typisches Dashboard-Layout mit Header, Sidebar, Hauptinhalt und Footer.',
      },
    },
  },
};

export const CardGrid: Story = {
  render: () => (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4">
            <h3 className="text-lg font-medium">Card Title {index + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This is a sample card description. It demonstrates how Grid can be used to create a responsive card layout.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Action
            </button>
          </div>
        </div>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ein Beispiel für ein responsives Karten-Layout, das sich an verschiedene Bildschirmgrößen anpasst.',
      },
    },
  },
};