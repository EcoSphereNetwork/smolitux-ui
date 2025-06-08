import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Gibt an, ob die Checkbox ausgewählt ist',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Der initiale Checked-Status (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob die Checkbox deaktiviert ist',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Gibt an, ob die Checkbox im unbestimmten Zustand ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe der Checkbox',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema der Checkbox',
    },
    name: {
      control: 'text',
      description: 'Der Name der Checkbox für Formulare',
    },
    value: {
      control: 'text',
      description: 'Der Wert der Checkbox für Formulare',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Status ändert',
    },
    required: {
      control: 'boolean',
      description: 'Gibt an, ob die Checkbox erforderlich ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob die Checkbox ungültig ist',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    children: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked Checkbox',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'Disabled Checked Checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox size="sm">Small Checkbox</Checkbox>
      <Checkbox size="md">Medium Checkbox</Checkbox>
      <Checkbox size="lg">Large Checkbox</Checkbox>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Checkbox colorScheme="primary" defaultChecked>
        Primary Checkbox
      </Checkbox>
      <Checkbox colorScheme="secondary" defaultChecked>
        Secondary Checkbox
      </Checkbox>
      <Checkbox colorScheme="success" defaultChecked>
        Success Checkbox
      </Checkbox>
      <Checkbox colorScheme="danger" defaultChecked>
        Danger Checkbox
      </Checkbox>
      <Checkbox colorScheme="warning" defaultChecked>
        Warning Checkbox
      </Checkbox>
      <Checkbox colorScheme="info" defaultChecked>
        Info Checkbox
      </Checkbox>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    children: 'Invalid Checkbox',
    isInvalid: true,
  },
};

export const Required: Story = {
  args: {
    children: 'Required Checkbox',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col space-y-1">
      <Checkbox>Terms and Conditions</Checkbox>
      <div className="text-sm text-gray-500 dark:text-gray-400 ml-6">
        Please read and accept the terms and conditions
      </div>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <Checkbox
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Custom Icon Checkbox
    </Checkbox>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Checkbox>
      <div className="flex flex-col">
        <span className="font-medium">Subscribe to newsletter</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Receive updates about new products and features
        </span>
      </div>
    </Checkbox>
  ),
};

export const Group: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState([true, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
      <div className="flex flex-col space-y-4">
        <Checkbox
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        >
          Parent Checkbox
        </Checkbox>
        <div className="ml-6 space-y-2">
          <Checkbox
            checked={checkedItems[0]}
            onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
          >
            Child Checkbox 1
          </Checkbox>
          <Checkbox
            checked={checkedItems[1]}
            onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
          >
            Child Checkbox 2
          </Checkbox>
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col space-y-4">
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          Controlled Checkbox
        </Checkbox>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setChecked(!checked)}
        >
          Toggle Checkbox
        </button>
      </div>
    );
  },
};
