import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../RadioGroup';
import { Radio } from '../../Radio/Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Der ausgewählte Wert der RadioGroup',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardwert der RadioGroup',
    },
    name: {
      control: 'text',
      description: 'Der Name der RadioGroup für Formulare',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der ausgewählte Wert ändert',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Gibt an, ob die RadioGroup deaktiviert ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob die RadioGroup ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob die RadioGroup erforderlich ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der RadioGroup',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema der RadioGroup',
    },
    children: {
      description: 'Der Inhalt der RadioGroup',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="2">
      <div className="space-y-2">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="2">
      <div className="flex space-x-4">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <RadioGroup size="sm" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Medium</h3>
        <RadioGroup size="md" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <RadioGroup size="lg" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Primary</h3>
        <RadioGroup colorScheme="primary" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Secondary</h3>
        <RadioGroup colorScheme="secondary" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Success</h3>
        <RadioGroup colorScheme="success" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Danger</h3>
        <RadioGroup colorScheme="danger" defaultValue="1">
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup isDisabled defaultValue="1">
      <div className="space-y-2">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </div>
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup isInvalid defaultValue="1">
      <div className="space-y-2">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </div>
    </RadioGroup>
  ),
};

export const Required: Story = {
  render: () => (
    <RadioGroup isRequired defaultValue="1">
      <div className="space-y-2">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </div>
    </RadioGroup>
  ),
};

export const WithCustomIcons: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <div className="space-y-2">
        <Radio
          value="1"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Option 1
        </Radio>
        <Radio
          value="2"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Option 2
        </Radio>
        <Radio
          value="3"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Option 3
        </Radio>
      </div>
    </RadioGroup>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <div className="space-y-4">
        <Radio value="standard">
          <div className="flex flex-col">
            <span className="font-medium">Standard-Lieferung</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Lieferung innerhalb von 3-5 Werktagen
            </span>
          </div>
        </Radio>
        <Radio value="express">
          <div className="flex flex-col">
            <span className="font-medium">Express-Lieferung</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Lieferung innerhalb von 1-2 Werktagen
            </span>
          </div>
        </Radio>
        <Radio value="same-day">
          <div className="flex flex-col">
            <span className="font-medium">Same-Day-Lieferung</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Lieferung am selben Tag (nur in ausgewählten Städten)
            </span>
          </div>
        </Radio>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('1');

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onChange={setValue}>
          <div className="space-y-2">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
            <Radio value="3">Option 3</Radio>
          </div>
        </RadioGroup>

        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">Ausgewählter Wert: {value}</div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setValue('1')}
          >
            Option 1 wählen
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setValue('2')}
          >
            Option 2 wählen
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setValue('3')}
          >
            Option 3 wählen
          </button>
        </div>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <div className="space-y-2">
        <Radio value="1" className="border-purple-500 text-purple-600" iconClassName="text-white">
          Option 1
        </Radio>
        <Radio value="2" className="border-purple-500 text-purple-600" iconClassName="text-white">
          Option 2
        </Radio>
        <Radio value="3" className="border-purple-500 text-purple-600" iconClassName="text-white">
          Option 3
        </Radio>
      </div>
    </RadioGroup>
  ),
};

export const WithCards: Story = {
  render: () => (
    <RadioGroup defaultValue="basic">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Radio value="basic" className="sr-only">
          <div className="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900">
            <h3 className="font-bold text-lg mb-2">Basic</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Grundlegende Funktionen für Einsteiger
            </p>
            <div className="mt-4 text-xl font-bold">9,99 €</div>
          </div>
        </Radio>

        <Radio value="pro" className="sr-only">
          <div className="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900">
            <h3 className="font-bold text-lg mb-2">Pro</h3>
            <p className="text-gray-600 dark:text-gray-400">Erweiterte Funktionen für Profis</p>
            <div className="mt-4 text-xl font-bold">19,99 €</div>
          </div>
        </Radio>

        <Radio value="enterprise" className="sr-only">
          <div className="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900">
            <h3 className="font-bold text-lg mb-2">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-400">Umfassende Lösung für Unternehmen</p>
            <div className="mt-4 text-xl font-bold">49,99 €</div>
          </div>
        </Radio>
      </div>
    </RadioGroup>
  ),
};
