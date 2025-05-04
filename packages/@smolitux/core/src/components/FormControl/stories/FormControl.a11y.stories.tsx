import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormControl } from '../';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Select } from '../../Select';
import { Checkbox } from '../../Checkbox';
import { RadioGroup, Radio } from '../../Radio';
import { FileUpload } from '../../FileUpload';

const meta: Meta<typeof FormControl.A11y> = {
  title: 'Core/FormControl/A11y',
  component: FormControl.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der FormControl-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    successMessage: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'right', 'bottom', 'floating']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'unstyled']
    },
    fullWidth: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    hideHelperText: { control: 'boolean' },
    hideError: { control: 'boolean' },
    hideSuccessMessage: { control: 'boolean' },
    showRequiredIndicator: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    counterValue: { control: 'number' },
    counterMax: { control: 'number' },
    showProgressBar: { control: 'boolean' },
    progressValue: { control: 'number' },
    progressMax: { control: 'number' },
    isLoading: { control: 'boolean' },
    isValid: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isSuccess: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof FormControl.A11y>;

export const Default: Story = {
  args: {
    label: 'Name',
    helperText: 'Bitte geben Sie Ihren vollständigen Namen ein',
    children: <Input placeholder="Max Mustermann" />
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Ungültige Email-Adresse',
    children: <Input type="email" placeholder="beispiel@domain.de" />
  }
};

export const WithSuccess: Story = {
  args: {
    label: 'Benutzername',
    successMessage: 'Benutzername ist verfügbar',
    isSuccess: true,
    children: <Input placeholder="username" />
  }
};

export const Required: Story = {
  args: {
    label: 'Passwort',
    required: true,
    showRequiredIndicator: true,
    children: <Input type="password" />
  }
};

export const Disabled: Story = {
  args: {
    label: 'Kommentar',
    helperText: 'Diese Funktion ist derzeit deaktiviert',
    disabled: true,
    children: <Textarea placeholder="Ihr Kommentar" />
  }
};

export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <FormControl.A11y
        label="Beschreibung"
        helperText="Maximal 100 Zeichen"
        showCounter
        counterValue={value.length}
        counterMax={100}
      >
        <Textarea
          placeholder="Beschreiben Sie sich kurz..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl.A11y>
    );
  }
};

export const WithProgressBar: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    return (
      <div className="space-y-4">
        <FormControl.A11y
          label="Datei hochladen"
          helperText="Maximale Dateigröße: 5MB"
          showProgressBar
          progressValue={progress}
          progressMax={100}
        >
          <FileUpload accept="image/*,application/pdf" />
        </FormControl.A11y>
        
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            +10%
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            -10%
          </button>
          <button
            className="px-3 py-1 bg-gray-500 text-white rounded"
            onClick={() => setProgress(0)}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
};

export const Loading: Story = {
  args: {
    label: 'Suche',
    helperText: 'Suche läuft...',
    isLoading: true,
    showLoadingIndicator: true,
    children: <Input placeholder="Suchbegriff" />
  }
};

export const WithTooltip: Story = {
  args: {
    label: 'Geburtsdatum',
    tooltip: 'Bitte geben Sie Ihr Geburtsdatum im Format TT.MM.JJJJ ein',
    children: <Input placeholder="TT.MM.JJJJ" />
  }
};

export const HiddenLabel: Story = {
  args: {
    label: 'Suche',
    hideLabel: true,
    children: <Input placeholder="Suchen..." />
  }
};

export const FloatingLabel: Story = {
  args: {
    label: 'Email',
    labelPosition: 'floating',
    children: <Input placeholder="beispiel@domain.de" />
  }
};

export const HorizontalLayout: Story = {
  args: {
    label: 'Geschlecht',
    labelPosition: 'left',
    labelWidth: '30%',
    children: (
      <RadioGroup>
        <Radio value="male">Männlich</Radio>
        <Radio value="female">Weiblich</Radio>
        <Radio value="diverse">Divers</Radio>
        <Radio value="none">Keine Angabe</Radio>
      </RadioGroup>
    )
  }
};

export const WithDescription: Story = {
  args: {
    label: 'Newsletter',
    description: 'Aktivieren Sie diese Option, um regelmäßig Neuigkeiten und Angebote zu erhalten',
    children: <Checkbox>Newsletter abonnieren</Checkbox>
  }
};

export const WithSelect: Story = {
  args: {
    label: 'Land',
    helperText: 'Wählen Sie Ihr Land aus',
    children: (
      <Select placeholder="Land auswählen">
        <option value="de">Deutschland</option>
        <option value="at">Österreich</option>
        <option value="ch">Schweiz</option>
        <option value="other">Anderes Land</option>
      </Select>
    )
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <FormControl.A11y
        label="Extra Small"
        size="xs"
      >
        <Input placeholder="XS Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Small"
        size="sm"
      >
        <Input placeholder="SM Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Medium"
        size="md"
      >
        <Input placeholder="MD Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Large"
        size="lg"
      >
        <Input placeholder="LG Input" />
      </FormControl.A11y>
    </div>
  )
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <FormControl.A11y
        label="Default"
        variant="default"
      >
        <Input placeholder="Default Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Filled"
        variant="filled"
      >
        <Input placeholder="Filled Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Outlined"
        variant="outlined"
      >
        <Input placeholder="Outlined Input" />
      </FormControl.A11y>
      
      <FormControl.A11y
        label="Unstyled"
        variant="unstyled"
      >
        <Input placeholder="Unstyled Input" />
      </FormControl.A11y>
    </div>
  )
};