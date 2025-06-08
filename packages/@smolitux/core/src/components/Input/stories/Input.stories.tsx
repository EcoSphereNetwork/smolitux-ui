import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'Core/Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'text',
          'password',
          'email',
          'number',
          'tel',
          'url',
          'search',
          'date',
          'time',
          'datetime-local',
          'month',
          'week',
          'color',
        ],
      },
      description: 'Der Typ des Eingabefelds',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      description: 'Die Größe des Eingabefelds',
    },
    variant: {
      control: {
        type: 'select',
        options: ['outline', 'filled', 'flushed', 'unstyled'],
      },
      description: 'Die Variante des Eingabefelds',
    },
    placeholder: {
      control: 'text',
      description: 'Der Platzhaltertext des Eingabefelds',
    },
    value: {
      control: 'text',
      description: 'Der Wert des Eingabefelds (kontrollierte Komponente)',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardwert des Eingabefelds (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob das Eingabefeld deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob das Eingabefeld schreibgeschützt ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob das Eingabefeld ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob das Eingabefeld erforderlich ist',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Wert ändert',
    },
    onFocus: {
      action: 'focused',
      description: 'Callback, der aufgerufen wird, wenn das Eingabefeld fokussiert wird',
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback, der aufgerufen wird, wenn das Eingabefeld den Fokus verliert',
    },
    leftElement: {
      description: 'Element, das links im Eingabefeld angezeigt wird',
    },
    rightElement: {
      description: 'Element, das rechts im Eingabefeld angezeigt wird',
    },
    leftAddon: {
      description: 'Element, das links an das Eingabefeld angehängt wird',
    },
    rightAddon: {
      description: 'Element, das rechts an das Eingabefeld angehängt wird',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: 'Bitte Text eingeben',
  },
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input type="text" placeholder="Text" />
      <Input type="password" placeholder="Passwort" />
      <Input type="email" placeholder="E-Mail" />
      <Input type="number" placeholder="Nummer" />
      <Input type="tel" placeholder="Telefon" />
      <Input type="url" placeholder="URL" />
      <Input type="search" placeholder="Suche" />
      <Input type="date" />
      <Input type="time" />
      <Input type="datetime-local" />
      <Input type="month" />
      <Input type="week" />
      <Input type="color" className="h-10" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input variant="outline" placeholder="Outline (Standard)" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
      <Input variant="unstyled" placeholder="Unstyled" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input placeholder="Standard" />
      <Input placeholder="Disabled" disabled />
      <Input
        placeholder="Read Only"
        readOnly
        defaultValue="Dieser Text kann nicht geändert werden"
      />
      <Input placeholder="Invalid" isInvalid />
      <Input placeholder="Required" isRequired />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Standardwert',
    placeholder: 'Bitte Text eingeben',
  },
};

export const WithLeftElement: Story = {
  render: () => (
    <Input
      placeholder="Suchen..."
      leftElement={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  ),
};

export const WithRightElement: Story = {
  render: () => (
    <Input
      type="password"
      placeholder="Passwort eingeben"
      rightElement={
        <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      }
    />
  ),
};

export const WithAddons: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Input placeholder="Website" leftAddon="https://" />
      <Input placeholder="Benutzername" rightAddon="@example.com" />
      <Input placeholder="Preis" leftAddon="€" rightAddon=".00" />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setIsValid(newValue.includes('@'));
    };

    return (
      <div className="flex flex-col space-y-2 w-80">
        <Input
          type="email"
          placeholder="E-Mail eingeben"
          value={value}
          onChange={handleChange}
          isInvalid={!isValid && value !== ''}
        />
        {!isValid && value !== '' && (
          <div className="text-red-500 text-sm">
            Bitte geben Sie eine gültige E-Mail-Adresse ein
          </div>
        )}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col space-y-4 w-80">
        <Input
          placeholder="Kontrolliertes Eingabefeld"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>Aktueller Wert: {value || '(leer)'}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setValue('')}
        >
          Zurücksetzen
        </button>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Input
      placeholder="Benutzerdefiniertes Styling"
      className="border-purple-500 focus:border-purple-700 focus:ring-purple-500 bg-purple-50"
    />
  ),
};
