import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select } from '../Select';

const meta: Meta<typeof Select> = {
  title: 'Core/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      description: 'Die Größe des Select-Felds',
    },
    variant: {
      control: {
        type: 'select',
        options: ['outline', 'filled', 'flushed', 'unstyled'],
      },
      description: 'Die Variante des Select-Felds',
    },
    placeholder: {
      control: 'text',
      description: 'Der Platzhaltertext des Select-Felds',
    },
    value: {
      control: 'text',
      description: 'Der Wert des Select-Felds (kontrollierte Komponente)',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardwert des Select-Felds (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob das Select-Feld deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob das Select-Feld schreibgeschützt ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob das Select-Feld ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob das Select-Feld erforderlich ist',
    },
    isMulti: {
      control: 'boolean',
      description: 'Aktiviert Mehrfachauswahl',
    },
    maxSelections: {
      control: 'number',
      description: 'Begrenzt die Anzahl auswählbarer Optionen',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Wert ändert',
    },
    onFocus: {
      action: 'focused',
      description: 'Callback, der aufgerufen wird, wenn das Select-Feld fokussiert wird',
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback, der aufgerufen wird, wenn das Select-Feld den Fokus verliert',
    },
    icon: {
      description: 'Icon für das Select-Feld',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => (
    <Select placeholder="Bitte auswählen">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Select size="xs" placeholder="Extra Small">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select size="sm" placeholder="Small">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select size="md" placeholder="Medium">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select size="lg" placeholder="Large">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Select variant="outline" placeholder="Outline (Standard)">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select variant="filled" placeholder="Filled">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select variant="flushed" placeholder="Flushed">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select variant="unstyled" placeholder="Unstyled">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Select placeholder="Standard">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Disabled" disabled>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Read Only" readOnly defaultValue="option1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Invalid" isInvalid>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Required" isRequired>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select placeholder="Wählen Sie ein Land">
      <optgroup label="Europa">
        <option value="de">Deutschland</option>
        <option value="fr">Frankreich</option>
        <option value="it">Italien</option>
        <option value="es">Spanien</option>
      </optgroup>
      <optgroup label="Nordamerika">
        <option value="us">USA</option>
        <option value="ca">Kanada</option>
        <option value="mx">Mexiko</option>
      </optgroup>
      <optgroup label="Asien">
        <option value="jp">Japan</option>
        <option value="cn">China</option>
        <option value="in">Indien</option>
      </optgroup>
    </Select>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select isMulti maxSelections={3} size={4} className="h-auto">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
      <option value="option5">Option 5</option>
      <option value="option6">Option 6</option>
    </Select>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <Select
      placeholder="Mit benutzerdefiniertem Icon"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setIsValid(newValue !== '');
    };

    return (
      <div className="flex flex-col space-y-2 w-80">
        <Select
          placeholder="Bitte auswählen"
          value={value}
          onChange={handleChange}
          isInvalid={!isValid && value === ''}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        {!isValid && <div className="text-red-500 text-sm">Bitte wählen Sie eine Option aus</div>}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col space-y-4 w-80">
        <Select
          placeholder="Kontrolliertes Select-Feld"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <div>Ausgewählter Wert: {value || '(keiner)'}</div>
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
    <Select
      placeholder="Benutzerdefiniertes Styling"
      className="border-purple-500 focus:border-purple-700 focus:ring-purple-500 bg-purple-50"
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};
