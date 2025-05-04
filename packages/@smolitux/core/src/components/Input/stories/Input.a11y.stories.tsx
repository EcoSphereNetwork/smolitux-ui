import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from '../';
import { FormControl } from '../../FormControl';

const meta: Meta<typeof Input.A11y> = {
  title: 'Core/Input/A11y',
  component: Input.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der Input-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local']
    },
    helperText: { control: 'text' },
    error: { control: 'text' },
    successMessage: { control: 'text' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'unstyled']
    },
    hideLabel: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    maxLength: { control: 'number' }
  }
};

export default meta;
type Story = StoryObj<typeof Input.A11y>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Max Mustermann',
    helperText: 'Bitte geben Sie Ihren vollständigen Namen ein'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'beispiel@domain.de',
    type: 'email',
    error: 'Ungültige Email-Adresse',
    isInvalid: true
  }
};

export const WithSuccess: Story = {
  args: {
    label: 'Benutzername',
    placeholder: 'username',
    successMessage: 'Benutzername ist verfügbar',
    isSuccess: true
  }
};

export const Required: Story = {
  args: {
    label: 'Passwort',
    type: 'password',
    isRequired: true,
    showPasswordToggle: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Kommentar',
    placeholder: 'Deaktiviert',
    helperText: 'Diese Funktion ist derzeit deaktiviert',
    isDisabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    label: 'Benutzername',
    value: 'max.mustermann',
    isReadOnly: true,
    helperText: 'Der Benutzername kann nicht geändert werden'
  }
};

export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Input.A11y
        label="Kurzbeschreibung"
        helperText="Maximal 50 Zeichen"
        showCounter
        maxLength={50}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
};

export const WithPasswordToggle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Input.A11y
        label="Passwort"
        type="password"
        showPasswordToggle
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Klicken Sie auf das Augensymbol, um das Passwort anzuzeigen"
      />
    );
  }
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('Suchbegriff');
    
    return (
      <Input.A11y
        label="Suche"
        type="search"
        isClearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  }
};

export const HiddenLabel: Story = {
  args: {
    label: 'Suche',
    placeholder: 'Suchen...',
    type: 'search',
    hideLabel: true
  }
};

export const WithIcons: Story = {
  args: {
    label: 'Suche',
    placeholder: 'Suchen...',
    type: 'search',
    leftIcon: <span>🔍</span>,
    rightIcon: <span>⌘K</span>,
    isLeftIconClickable: true,
    isRightIconClickable: true
  }
};

export const WithFormControl: Story = {
  render: () => (
    <FormControl
      label="Email"
      helperText="Wir werden Ihre Email niemals teilen"
      required
    >
      <Input.A11y
        placeholder="beispiel@domain.de"
        type="email"
      />
    </FormControl>
  )
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input.A11y
        label="Extra Small"
        placeholder="XS Input"
        size="xs"
      />
      
      <Input.A11y
        label="Small"
        placeholder="SM Input"
        size="sm"
      />
      
      <Input.A11y
        label="Medium"
        placeholder="MD Input"
        size="md"
      />
      
      <Input.A11y
        label="Large"
        placeholder="LG Input"
        size="lg"
      />
    </div>
  )
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Input.A11y
        label="Default"
        placeholder="Default Input"
        variant="default"
      />
      
      <Input.A11y
        label="Filled"
        placeholder="Filled Input"
        variant="filled"
      />
      
      <Input.A11y
        label="Outlined"
        placeholder="Outlined Input"
        variant="outlined"
      />
      
      <Input.A11y
        label="Unstyled"
        placeholder="Unstyled Input"
        variant="unstyled"
      />
    </div>
  )
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input.A11y
        label="Text"
        placeholder="Text Input"
        type="text"
      />
      
      <Input.A11y
        label="Email"
        placeholder="Email Input"
        type="email"
      />
      
      <Input.A11y
        label="Password"
        placeholder="Password Input"
        type="password"
        showPasswordToggle
      />
      
      <Input.A11y
        label="Number"
        placeholder="Number Input"
        type="number"
      />
      
      <Input.A11y
        label="Tel"
        placeholder="Tel Input"
        type="tel"
      />
      
      <Input.A11y
        label="URL"
        placeholder="URL Input"
        type="url"
      />
      
      <Input.A11y
        label="Search"
        placeholder="Search Input"
        type="search"
        isClearable
      />
      
      <Input.A11y
        label="Date"
        type="date"
      />
      
      <Input.A11y
        label="Time"
        type="time"
      />
      
      <Input.A11y
        label="Datetime"
        type="datetime-local"
      />
    </div>
  )
};