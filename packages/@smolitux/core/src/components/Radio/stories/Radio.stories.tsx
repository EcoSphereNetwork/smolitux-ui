import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../Radio';

const meta: Meta<typeof Radio> = {
  title: 'Core/Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Gibt an, ob der Radio-Button ausgewählt ist',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Der initiale Checked-Status (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der Radio-Button deaktiviert ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des Radio-Buttons',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema des Radio-Buttons',
    },
    name: {
      control: 'text',
      description: 'Der Name des Radio-Buttons für Formulare',
    },
    value: {
      control: 'text',
      description: 'Der Wert des Radio-Buttons für Formulare',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Status ändert',
    },
    required: {
      control: 'boolean',
      description: 'Gibt an, ob der Radio-Button erforderlich ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob der Radio-Button ungültig ist',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: {
    children: 'Radio Button Label',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked Radio Button',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Radio Button',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'Disabled Checked Radio Button',
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Radio size="sm">Small Radio Button</Radio>
      <Radio size="md">Medium Radio Button</Radio>
      <Radio size="lg">Large Radio Button</Radio>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Radio colorScheme="primary" defaultChecked>
        Primary Radio Button
      </Radio>
      <Radio colorScheme="secondary" defaultChecked>
        Secondary Radio Button
      </Radio>
      <Radio colorScheme="success" defaultChecked>
        Success Radio Button
      </Radio>
      <Radio colorScheme="danger" defaultChecked>
        Danger Radio Button
      </Radio>
      <Radio colorScheme="warning" defaultChecked>
        Warning Radio Button
      </Radio>
      <Radio colorScheme="info" defaultChecked>
        Info Radio Button
      </Radio>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    children: 'Invalid Radio Button',
    isInvalid: true,
  },
};

export const Required: Story = {
  args: {
    children: 'Required Radio Button',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col space-y-1">
      <Radio>Standard-Lieferung</Radio>
      <div className="text-sm text-gray-500 dark:text-gray-400 ml-6">
        Lieferung innerhalb von 3-5 Werktagen
      </div>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <Radio
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
      Custom Icon Radio Button
    </Radio>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Radio>
      <div className="flex flex-col">
        <span className="font-medium">Premium-Lieferung</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Lieferung am nächsten Werktag
        </span>
      </div>
    </Radio>
  ),
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = React.useState('1');

    return (
      <div className="flex flex-col space-y-4">
        <div className="font-medium mb-2">Wählen Sie eine Option:</div>
        <div className="space-y-2">
          <Radio
            name="group-example"
            value="1"
            checked={value === '1'}
            onChange={(e) => setValue(e.target.value)}
          >
            Option 1
          </Radio>
          <Radio
            name="group-example"
            value="2"
            checked={value === '2'}
            onChange={(e) => setValue(e.target.value)}
          >
            Option 2
          </Radio>
          <Radio
            name="group-example"
            value="3"
            checked={value === '3'}
            onChange={(e) => setValue(e.target.value)}
          >
            Option 3
          </Radio>
        </div>
        <div className="mt-2">Ausgewählter Wert: {value}</div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col space-y-4">
        <Radio checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          Controlled Radio Button
        </Radio>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setChecked(!checked)}
        >
          Toggle Radio
        </button>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Radio className="border-purple-500 text-purple-600" iconClassName="text-white">
      Custom Styled Radio
    </Radio>
  ),
};
