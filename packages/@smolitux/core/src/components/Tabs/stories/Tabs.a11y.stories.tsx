import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../';

const meta: Meta<typeof Tabs.A11y> = {
  title: 'Core/Tabs/A11y',
  component: Tabs.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der Tabs-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'unstyled']
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end']
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    },
    isDisabled: { control: 'boolean' },
    isManual: { control: 'boolean' },
    isLazy: { control: 'boolean' },
    animated: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    keyboardNavigation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'both', 'none']
    },
    description: { control: 'text' },
    ariaLabel: { control: 'text' },
    announceTabChange: { control: 'boolean' },
    tabChangeAnnouncement: { control: 'text' },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs.A11y>;

export const Default: Story = {
  render: () => (
    <Tabs.A11y 
      description="Diese Tabs zeigen verschiedene Inhalte an"
      ariaLabel="Beispiel-Tabs"
      announceTabChange
    >
      <Tabs.A11y.List>
        <Tabs.A11y.Tab>Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels>
        <Tabs.A11y.Panel>
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Einstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen anpassen.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const WithDescriptions: Story = {
  render: () => (
    <Tabs.A11y 
      description="Tabs mit zusätzlichen Beschreibungen für Screenreader"
      ariaLabel="Tabs mit Beschreibungen"
    >
      <Tabs.A11y.List description="Liste der verfügbaren Tabs">
        <Tabs.A11y.Tab description="Zeigt Ihre persönlichen Informationen an">Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab description="Zeigt Ihre Kontoeinstellungen an">Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab description="Zeigt Ihre Benachrichtigungsoptionen an">Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels description="Inhalte der ausgewählten Tabs">
        <Tabs.A11y.Panel description="Profilinformationen und Bearbeitungsoptionen">
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel description="Kontoeinstellungen und Präferenzen">
          <h3>Einstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen anpassen.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel description="Benachrichtigungsoptionen und -einstellungen">
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const WithCustomAnnouncement: Story = {
  render: () => (
    <Tabs.A11y 
      description="Tabs mit benutzerdefinierten Ankündigungen"
      ariaLabel="Tabs mit Ankündigungen"
      announceTabChange
      tabChangeAnnouncement="Sie haben jetzt den Tab {index} ausgewählt"
      liveRegionPoliteness="assertive"
    >
      <Tabs.A11y.List>
        <Tabs.A11y.Tab>Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels>
        <Tabs.A11y.Panel>
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Einstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen anpassen.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const Vertical: Story = {
  render: () => (
    <Tabs.A11y 
      orientation="vertical"
      description="Vertikal ausgerichtete Tabs"
      ariaLabel="Vertikale Tabs"
    >
      <Tabs.A11y.List>
        <Tabs.A11y.Tab>Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels>
        <Tabs.A11y.Panel>
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Einstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen anpassen.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs.A11y 
      description="Tabs mit einem deaktivierten Tab"
      ariaLabel="Tabs mit deaktiviertem Tab"
    >
      <Tabs.A11y.List>
        <Tabs.A11y.Tab>Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab isDisabled>Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels>
        <Tabs.A11y.Panel>
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Einstellungen</h3>
          <p>Dieser Tab ist deaktiviert.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const ManualActivation: Story = {
  render: () => (
    <Tabs.A11y 
      isManual
      description="Tabs mit manueller Aktivierung (Enter-Taste drücken, um auszuwählen)"
      ariaLabel="Tabs mit manueller Aktivierung"
    >
      <Tabs.A11y.List>
        <Tabs.A11y.Tab>Profil</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Einstellungen</Tabs.A11y.Tab>
        <Tabs.A11y.Tab>Benachrichtigungen</Tabs.A11y.Tab>
      </Tabs.A11y.List>
      <Tabs.A11y.Panels>
        <Tabs.A11y.Panel>
          <h3>Profil</h3>
          <p>Hier können Sie Ihre Profilinformationen verwalten.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Einstellungen</h3>
          <p>Hier können Sie Ihre Kontoeinstellungen anpassen.</p>
        </Tabs.A11y.Panel>
        <Tabs.A11y.Panel>
          <h3>Benachrichtigungen</h3>
          <p>Hier können Sie Ihre Benachrichtigungseinstellungen verwalten.</p>
        </Tabs.A11y.Panel>
      </Tabs.A11y.Panels>
    </Tabs.A11y>
  )
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <Tabs.A11y 
        variant="line"
        description="Tabs mit Linienvariante"
        ariaLabel="Linienvariante"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        variant="enclosed"
        description="Tabs mit umschlossener Variante"
        ariaLabel="Umschlossene Variante"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        variant="soft-rounded"
        description="Tabs mit abgerundeter Variante"
        ariaLabel="Abgerundete Variante"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        variant="solid-rounded"
        description="Tabs mit solider abgerundeter Variante"
        ariaLabel="Solide abgerundete Variante"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    </div>
  )
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <Tabs.A11y 
        size="xs"
        description="Tabs in Größe XS"
        ariaLabel="XS Tabs"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        size="sm"
        description="Tabs in Größe SM"
        ariaLabel="SM Tabs"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        size="md"
        description="Tabs in Größe MD"
        ariaLabel="MD Tabs"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        size="lg"
        description="Tabs in Größe LG"
        ariaLabel="LG Tabs"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>

      <Tabs.A11y 
        size="xl"
        description="Tabs in Größe XL"
        ariaLabel="XL Tabs"
      >
        <Tabs.A11y.List>
          <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
          <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
        </Tabs.A11y.List>
        <Tabs.A11y.Panels>
          <Tabs.A11y.Panel>Inhalt 1</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 2</Tabs.A11y.Panel>
          <Tabs.A11y.Panel>Inhalt 3</Tabs.A11y.Panel>
        </Tabs.A11y.Panels>
      </Tabs.A11y>
    </div>
  )
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <div className="space-y-4">
        <Tabs.A11y 
          index={activeTab}
          onChange={setActiveTab}
          description="Interaktive Tabs mit externem State"
          ariaLabel="Interaktive Tabs"
          announceTabChange
        >
          <Tabs.A11y.List>
            <Tabs.A11y.Tab>Tab 1</Tabs.A11y.Tab>
            <Tabs.A11y.Tab>Tab 2</Tabs.A11y.Tab>
            <Tabs.A11y.Tab>Tab 3</Tabs.A11y.Tab>
          </Tabs.A11y.List>
          <Tabs.A11y.Panels>
            <Tabs.A11y.Panel>Inhalt von Tab 1</Tabs.A11y.Panel>
            <Tabs.A11y.Panel>Inhalt von Tab 2</Tabs.A11y.Panel>
            <Tabs.A11y.Panel>Inhalt von Tab 3</Tabs.A11y.Panel>
          </Tabs.A11y.Panels>
        </Tabs.A11y>
        
        <div className="text-center">
          <p>Aktiver Tab: {activeTab + 1}</p>
          <div className="flex justify-center space-x-2 mt-2">
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setActiveTab(0)}
            >
              Tab 1
            </button>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setActiveTab(1)}
            >
              Tab 2
            </button>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setActiveTab(2)}
            >
              Tab 3
            </button>
          </div>
        </div>
      </div>
    );
  }
};