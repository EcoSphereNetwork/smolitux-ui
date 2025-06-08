import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../Switch';

const meta: Meta<typeof Switch> = {
  title: 'Core/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Gibt an, ob der Switch eingeschaltet ist',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Der initiale Checked-Status (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der Switch deaktiviert ist',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des Switches',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema des Switches',
    },
    name: {
      control: 'text',
      description: 'Der Name des Switches für Formulare',
    },
    value: {
      control: 'text',
      description: 'Der Wert des Switches für Formulare',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Status ändert',
    },
    required: {
      control: 'boolean',
      description: 'Gibt an, ob der Switch erforderlich ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob der Switch ungültig ist',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  args: {
    children: 'Switch Label',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked Switch',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'Disabled Checked Switch',
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Switch size="sm">Small Switch</Switch>
      <Switch size="md">Medium Switch</Switch>
      <Switch size="lg">Large Switch</Switch>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Switch colorScheme="primary" defaultChecked>
        Primary Switch
      </Switch>
      <Switch colorScheme="secondary" defaultChecked>
        Secondary Switch
      </Switch>
      <Switch colorScheme="success" defaultChecked>
        Success Switch
      </Switch>
      <Switch colorScheme="danger" defaultChecked>
        Danger Switch
      </Switch>
      <Switch colorScheme="warning" defaultChecked>
        Warning Switch
      </Switch>
      <Switch colorScheme="info" defaultChecked>
        Info Switch
      </Switch>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    children: 'Invalid Switch',
    isInvalid: true,
  },
};

export const Required: Story = {
  args: {
    children: 'Required Switch',
    required: true,
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col space-y-1">
      <Switch>Benachrichtigungen aktivieren</Switch>
      <div className="text-sm text-gray-500 dark:text-gray-400 ml-6">
        Erhalten Sie E-Mail-Benachrichtigungen für wichtige Updates
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Switch
      checkedIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      }
      uncheckedIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Switch mit Icons
    </Switch>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Switch>
      <div className="flex flex-col">
        <span className="font-medium">Dark Mode</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Dunkles Erscheinungsbild aktivieren
        </span>
      </div>
    </Switch>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col space-y-4">
        <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          Controlled Switch {checked ? 'ON' : 'OFF'}
        </Switch>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setChecked(!checked)}
        >
          Toggle Switch
        </button>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Switch
      className="border-purple-500"
      trackClassName="bg-purple-200 dark:bg-purple-900"
      thumbClassName="bg-purple-500"
      checkedTrackClassName="bg-purple-500"
      checkedThumbClassName="bg-white"
    >
      Custom Styled Switch
    </Switch>
  ),
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle feature',
  },
};

export const Group: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      newsletter: false,
      darkMode: false,
    });

    const handleChange =
      (setting: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
          ...settings,
          [setting]: e.target.checked,
        });
      };

    return (
      <div className="flex flex-col space-y-4 w-80">
        <div className="font-medium mb-2">Einstellungen:</div>
        <div className="space-y-3">
          <Switch checked={settings.notifications} onChange={handleChange('notifications')}>
            Benachrichtigungen
          </Switch>
          <Switch checked={settings.newsletter} onChange={handleChange('newsletter')}>
            Newsletter
          </Switch>
          <Switch checked={settings.darkMode} onChange={handleChange('darkMode')}>
            Dark Mode
          </Switch>
        </div>
        <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="font-medium mb-1">Aktuelle Einstellungen:</div>
          <div className="text-sm">
            Benachrichtigungen: {settings.notifications ? 'Ein' : 'Aus'}
            <br />
            Newsletter: {settings.newsletter ? 'Ein' : 'Aus'}
            <br />
            Dark Mode: {settings.darkMode ? 'Ein' : 'Aus'}
          </div>
        </div>
      </div>
    );
  },
};
