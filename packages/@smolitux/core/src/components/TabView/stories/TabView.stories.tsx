import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TabView } from '../TabView';

const meta: Meta<typeof TabView> = {
  title: 'Core/Navigation/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: 'number',
      description: 'Der Index des aktiven Tabs',
    },
    defaultActiveIndex: {
      control: 'number',
      description: 'Der standardmäßige Index des aktiven Tabs',
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback, der aufgerufen wird, wenn sich der aktive Tab ändert',
    },
    onChange: {
      action: 'changed',
      description: 'Alias für onTabChange',
    },
    variant: {
      control: {
        type: 'select',
        options: ['line', 'enclosed', 'enclosed-colored', 'soft-rounded', 'solid-rounded', 'unstyled'],
      },
      description: 'Die Variante der Tabs',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema der Tabs',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Tabs',
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
      description: 'Die Ausrichtung der Tabs',
    },
    isFitted: {
      control: 'boolean',
      description: 'Gibt an, ob die Tabs die volle Breite einnehmen sollen',
    },
    isLazy: {
      control: 'boolean',
      description: 'Gibt an, ob die Tab-Panels erst beim Aktivieren gerendert werden sollen',
    },
    isManual: {
      control: 'boolean',
      description: 'Gibt an, ob die Tabs manuell aktiviert werden sollen (nur bei Klick, nicht bei Fokus)',
    },
    tabs: {
      control: 'array',
      description: 'Die Tabs, die angezeigt werden sollen',
    },
    children: {
      description: 'Der Inhalt der Tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabView>;

export const Basic: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
      { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
      { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
    ],
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Line (Standard)</h3>
        <TabView
          variant="line"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Enclosed</h3>
        <TabView
          variant="enclosed"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Enclosed Colored</h3>
        <TabView
          variant="enclosed-colored"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Soft Rounded</h3>
        <TabView
          variant="soft-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Solid Rounded</h3>
        <TabView
          variant="solid-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Unstyled</h3>
        <TabView
          variant="unstyled"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Primary</h3>
        <TabView
          colorScheme="primary"
          variant="solid-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Secondary</h3>
        <TabView
          colorScheme="secondary"
          variant="solid-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Success</h3>
        <TabView
          colorScheme="success"
          variant="solid-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Danger</h3>
        <TabView
          colorScheme="danger"
          variant="solid-rounded"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <TabView
          size="sm"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <TabView
          size="md"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <TabView
          size="lg"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Horizontal (Standard)</h3>
        <TabView
          orientation="horizontal"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Vertical</h3>
        <TabView
          orientation="vertical"
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
      </div>
    </div>
  ),
};

export const Fitted: Story = {
  args: {
    isFitted: true,
    tabs: [
      { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
      { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
      { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        label: (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </div>
        ),
        content: <div>Home-Inhalt</div>
      },
      {
        label: (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Info
          </div>
        ),
        content: <div>Info-Inhalt</div>
      },
      {
        label: (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
            Support
          </div>
        ),
        content: <div>Support-Inhalt</div>
      },
    ],
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
      { label: 'Tab 2', content: <div>Inhalt von Tab 2</div>, disabled: true },
      { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    
    return (
      <div className="space-y-4">
        <TabView
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
          tabs={[
            { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
            { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
            { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
          ]}
        />
        
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setActiveIndex(0)}
          >
            Tab 1 anzeigen
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setActiveIndex(1)}
          >
            Tab 2 anzeigen
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setActiveIndex(2)}
          >
            Tab 3 anzeigen
          </button>
        </div>
        
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          Aktiver Tab-Index: {activeIndex}
        </div>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <TabView
      tabs={[
        { label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
        { label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
        { label: 'Tab 3', content: <div>Inhalt von Tab 3</div> },
      ]}
      tabListClassName="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-t-lg"
      tabClassName="text-white rounded-t-md hover:bg-white hover:bg-opacity-20 px-4 py-2 font-medium"
      activeTabClassName="bg-white text-purple-700 hover:bg-white"
      tabPanelClassName="bg-white dark:bg-gray-800 p-4 rounded-b-lg border border-purple-200 dark:border-purple-800"
    />
  ),
};

export const WithLazyLoading: Story = {
  args: {
    isLazy: true,
    tabs: [
      {
        label: 'Tab 1',
        content: (
          <div>
            <p>Dieser Inhalt wird sofort geladen, da Tab 1 standardmäßig aktiv ist.</p>
            <p>Zeitstempel: {new Date().toLocaleTimeString()}</p>
          </div>
        ),
      },
      {
        label: 'Tab 2',
        content: (
          <div>
            <p>Dieser Inhalt wird erst geladen, wenn Tab 2 aktiviert wird.</p>
            <p>Zeitstempel: {new Date().toLocaleTimeString()}</p>
          </div>
        ),
      },
      {
        label: 'Tab 3',
        content: (
          <div>
            <p>Dieser Inhalt wird erst geladen, wenn Tab 3 aktiviert wird.</p>
            <p>Zeitstempel: {new Date().toLocaleTimeString()}</p>
          </div>
        ),
      },
    ],
  },
};

export const WithDynamicTabs: Story = {
  render: () => {
    const [tabs, setTabs] = React.useState([
      { id: 1, label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },
      { id: 2, label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },
    ]);
    const [nextId, setNextId] = React.useState(3);
    
    const addTab = () => {
      const newTab = {
        id: nextId,
        label: `Tab ${nextId}`,
        content: <div>Inhalt von Tab {nextId}</div>,
      };
      setTabs([...tabs, newTab]);
      setNextId(nextId + 1);
    };
    
    const removeTab = (id: number) => {
      setTabs(tabs.filter(tab => tab.id !== id));
    };
    
    return (
      <div className="space-y-4">
        <TabView
          tabs={tabs.map(tab => ({
            label: (
              <div className="flex items-center">
                <span>{tab.label}</span>
                {tabs.length > 1 && (
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ),
            content: tab.content,
          }))}
        />
        
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addTab}
        >
          Tab hinzufügen
        </button>
      </div>
    );
  },
};