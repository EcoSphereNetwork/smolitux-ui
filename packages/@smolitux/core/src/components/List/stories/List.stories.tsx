import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemAction } from '../List';

const meta: Meta<typeof List> = {
  title: 'Components/Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ordered', 'unordered', 'description', 'custom'],
      description: 'Variante der Liste',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Größe der Liste',
    },
    density: {
      control: 'select',
      options: ['compact', 'default', 'comfortable'],
      description: 'Dichte der Liste',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Ausrichtung der Listenelemente',
    },
    dividers: {
      control: 'boolean',
      description: 'Trennlinien zwischen Listenelementen anzeigen',
    },
    horizontal: {
      control: 'boolean',
      description: 'Horizontale Liste',
    },
    marker: {
      control: 'text',
      description: 'Benutzerdefiniertes Marker-Symbol für ungeordnete Listen',
    },
    indent: {
      control: 'boolean',
      description: 'Einrückung der Liste',
    },
    selectable: {
      control: 'boolean',
      description: 'Listenelemente können ausgewählt werden',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    children: [
      <ListItem key="1" primary="Item 1" />,
      <ListItem key="2" primary="Item 2" />,
      <ListItem key="3" primary="Item 3" />,
    ],
  },
};

export const WithSecondaryText: Story = {
  args: {
    children: [
      <ListItem key="1" primary="Inbox" secondary="Alle eingehenden Nachrichten" />,
      <ListItem key="2" primary="Gesendet" secondary="Alle gesendeten Nachrichten" />,
      <ListItem key="3" primary="Entwürfe" secondary="Gespeicherte Entwürfe" />,
    ],
  },
};

export const WithIcons: Story = {
  render: () => (
    <List>
      <ListItem icon={<span style={{ fontSize: '1.2em' }}>📥</span>} primary="Inbox" />
      <ListItem icon={<span style={{ fontSize: '1.2em' }}>📤</span>} primary="Gesendet" />
      <ListItem icon={<span style={{ fontSize: '1.2em' }}>📝</span>} primary="Entwürfe" />
    </List>
  ),
};

export const WithActions: Story = {
  render: () => (
    <List>
      <ListItem
        primary="Dokument 1"
        action={
          <button
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
            }}
          >
            Öffnen
          </button>
        }
      />
      <ListItem
        primary="Dokument 2"
        action={
          <button
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
            }}
          >
            Öffnen
          </button>
        }
      />
      <ListItem
        primary="Dokument 3"
        action={
          <button
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
            }}
          >
            Öffnen
          </button>
        }
      />
    </List>
  ),
};

export const WithDividers: Story = {
  args: {
    dividers: true,
    children: [
      <ListItem key="1" primary="Item 1" />,
      <ListItem key="2" primary="Item 2" />,
      <ListItem key="3" primary="Item 3" />,
    ],
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    children: [
      <ListItem key="1" primary="Home" />,
      <ListItem key="2" primary="Produkte" />,
      <ListItem key="3" primary="Über uns" />,
      <ListItem key="4" primary="Kontakt" />,
    ],
  },
};

export const Ordered: Story = {
  args: {
    variant: 'ordered',
    children: [
      <ListItem key="1" primary="Erster Schritt" />,
      <ListItem key="2" primary="Zweiter Schritt" />,
      <ListItem key="3" primary="Dritter Schritt" />,
    ],
  },
};

export const Unordered: Story = {
  args: {
    variant: 'unordered',
    children: [
      <ListItem key="1" primary="Äpfel" />,
      <ListItem key="2" primary="Bananen" />,
      <ListItem key="3" primary="Orangen" />,
    ],
  },
};

export const Description: Story = {
  args: {
    variant: 'description',
    children: [
      <ListItem key="1" primary="Name" secondary="Max Mustermann" />,
      <ListItem key="2" primary="E-Mail" secondary="max@example.com" />,
      <ListItem key="3" primary="Telefon" secondary="+49 123 456789" />,
    ],
  },
};

export const CustomMarker: Story = {
  args: {
    variant: 'unordered',
    marker: '→',
    children: [
      <ListItem key="1" primary="Erster Punkt" />,
      <ListItem key="2" primary="Zweiter Punkt" />,
      <ListItem key="3" primary="Dritter Punkt" />,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <List size="sm">
        <ListItem primary="Kleine Liste" />
        <ListItem primary="Mit kleiner Schrift" />
      </List>

      <List size="md">
        <ListItem primary="Mittlere Liste" />
        <ListItem primary="Mit mittlerer Schrift" />
      </List>

      <List size="lg">
        <ListItem primary="Große Liste" />
        <ListItem primary="Mit großer Schrift" />
      </List>
    </div>
  ),
};

export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <List density="compact">
        <ListItem primary="Kompakte Liste" />
        <ListItem primary="Mit weniger Abstand" />
      </List>

      <List density="default">
        <ListItem primary="Standard-Liste" />
        <ListItem primary="Mit normalem Abstand" />
      </List>

      <List density="comfortable">
        <ListItem primary="Komfortable Liste" />
        <ListItem primary="Mit mehr Abstand" />
      </List>
    </div>
  ),
};

export const Selectable: Story = {
  render: () => {
    // In einer echten Komponente würde hier useState verwendet werden
    return (
      <List selectable selectedItem="item1">
        <ListItem id="item1" primary="Auswählbares Item 1" />
        <ListItem id="item2" primary="Auswählbares Item 2" />
        <ListItem id="item3" primary="Auswählbares Item 3" />
      </List>
    );
  },
};

export const WithDisabledItems: Story = {
  args: {
    children: [
      <ListItem key="1" primary="Aktives Item" />,
      <ListItem key="2" primary="Deaktiviertes Item" disabled />,
      <ListItem key="3" primary="Aktives Item" />,
    ],
  },
};

export const CustomComponents: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemIcon>
          <span style={{ fontSize: '1.2em' }}>👤</span>
        </ListItemIcon>
        <ListItemText primary="Benutzerprofil" secondary="Persönliche Informationen verwalten" />
        <ListItemAction>
          <button
            style={{
              padding: '4px 8px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Bearbeiten
          </button>
        </ListItemAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <span style={{ fontSize: '1.2em' }}>⚙️</span>
        </ListItemIcon>
        <ListItemText primary="Einstellungen" secondary="Konto- und App-Einstellungen" />
        <ListItemAction>
          <button
            style={{
              padding: '4px 8px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Öffnen
          </button>
        </ListItemAction>
      </ListItem>
    </List>
  ),
};
