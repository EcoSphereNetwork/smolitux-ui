import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Core/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: 'number',
      description: 'Der Index des standardmäßig ausgewählten Tabs',
    },
    index: {
      control: 'number',
      description: 'Der Index des ausgewählten Tabs (kontrollierte Komponente)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der ausgewählte Tab ändert',
    },
    variant: {
      control: {
        type: 'select',
        options: [
          'line',
          'enclosed',
          'enclosed-colored',
          'soft-rounded',
          'solid-rounded',
          'unstyled',
        ],
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
      description:
        'Gibt an, ob die Tabs manuell aktiviert werden sollen (nur bei Klick, nicht bei Fokus)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Inhalt von Tab 1</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 2</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-96">
      <div>
        <h3 className="text-lg font-medium mb-2">Line (Standard)</h3>
        <Tabs variant="line">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Enclosed</h3>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Enclosed Colored</h3>
        <Tabs variant="enclosed-colored">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Soft Rounded</h3>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Solid Rounded</h3>
        <Tabs variant="solid-rounded">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Unstyled</h3>
        <Tabs variant="unstyled">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-96">
      <Tabs colorScheme="primary" variant="solid-rounded">
        <TabList>
          <Tab>Primary</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Inhalt von Tab 1</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 2</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 3</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs colorScheme="secondary" variant="solid-rounded">
        <TabList>
          <Tab>Secondary</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Inhalt von Tab 1</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 2</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 3</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs colorScheme="success" variant="solid-rounded">
        <TabList>
          <Tab>Success</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Inhalt von Tab 1</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 2</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 3</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs colorScheme="danger" variant="solid-rounded">
        <TabList>
          <Tab>Danger</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Inhalt von Tab 1</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 2</p>
          </TabPanel>
          <TabPanel>
            <p>Inhalt von Tab 3</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-96">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <Tabs size="sm">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <Tabs size="md">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <Tabs size="lg">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Horizontal (Standard)</h3>
        <Tabs orientation="horizontal">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Vertical</h3>
        <Tabs orientation="vertical">
          <div className="flex">
            <TabList className="mr-4">
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Inhalt von Tab 1</p>
              </TabPanel>
              <TabPanel>
                <p>Inhalt von Tab 2</p>
              </TabPanel>
              <TabPanel>
                <p>Inhalt von Tab 3</p>
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
    </div>
  ),
};

export const Fitted: Story = {
  render: () => (
    <Tabs isFitted>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Inhalt von Tab 1</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 2</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </Tab>
        <Tab>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Info
        </Tab>
        <Tab>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            />
          </svg>
          Support
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Home-Inhalt</p>
        </TabPanel>
        <TabPanel>
          <p>Info-Inhalt</p>
        </TabPanel>
        <TabPanel>
          <p>Support-Inhalt</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab isDisabled>Tab 2 (Deaktiviert)</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Inhalt von Tab 1</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 2</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [tabIndex, setTabIndex] = React.useState(0);

    return (
      <div className="flex flex-col space-y-4">
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Inhalt von Tab 1</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p>Inhalt von Tab 3</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setTabIndex(0)}
          >
            Tab 1 anzeigen
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setTabIndex(1)}
          >
            Tab 2 anzeigen
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setTabIndex(2)}
          >
            Tab 3 anzeigen
          </button>
        </div>

        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          Aktueller Tab-Index: {tabIndex}
        </div>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Tabs>
      <TabList className="bg-purple-100 dark:bg-purple-900 rounded-t-lg p-1">
        <Tab className="rounded-t-md hover:bg-purple-200 dark:hover:bg-purple-800 px-4 py-2 font-medium">
          Tab 1
        </Tab>
        <Tab className="rounded-t-md hover:bg-purple-200 dark:hover:bg-purple-800 px-4 py-2 font-medium">
          Tab 2
        </Tab>
        <Tab className="rounded-t-md hover:bg-purple-200 dark:hover:bg-purple-800 px-4 py-2 font-medium">
          Tab 3
        </Tab>
      </TabList>
      <TabPanels className="bg-white dark:bg-gray-800 p-4 rounded-b-lg border border-purple-200 dark:border-purple-800">
        <TabPanel>
          <p>Inhalt von Tab 1</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 2</p>
        </TabPanel>
        <TabPanel>
          <p>Inhalt von Tab 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
