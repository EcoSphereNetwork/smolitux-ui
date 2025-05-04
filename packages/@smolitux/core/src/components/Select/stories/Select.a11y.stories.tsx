import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select } from '../';
import { FormControl } from '../../FormControl';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', description: 'Dies ist Option 4' }
];

const groupedOptions = [
  { value: 'option1', label: 'Option 1', group: 'Gruppe 1' },
  { value: 'option2', label: 'Option 2', group: 'Gruppe 1' },
  { value: 'option3', label: 'Option 3', group: 'Gruppe 2' },
  { value: 'option4', label: 'Option 4', group: 'Gruppe 2' }
];

const meta: Meta<typeof Select.A11y> = {
  title: 'Core/Select/A11y',
  component: Select.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der Select-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    isMulti: { control: 'boolean' },
    maxSelections: { control: 'number' },
    groupOptions: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined', 'unstyled']
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onKeyDown: { action: 'key pressed' }
  }
};

export default meta;
type Story = StoryObj<typeof Select.A11y>;

export const Default: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    placeholder: 'Bitte auswählen'
  }
};

export const WithHelperText: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    helperText: 'Wählen Sie die Option, die am besten zu Ihnen passt',
    placeholder: 'Bitte auswählen'
  }
};

export const WithError: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    error: 'Bitte wählen Sie eine Option',
    placeholder: 'Bitte auswählen'
  }
};

export const Required: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    required: true,
    placeholder: 'Bitte auswählen'
  }
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    disabled: true,
    placeholder: 'Bitte auswählen'
  }
};

export const ReadOnly: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    readOnly: true,
    value: 'option1',
    placeholder: 'Bitte auswählen'
  }
};

export const MultiSelect: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie Optionen',
    ariaLabel: 'Mehrfachauswahl',
    isMulti: true,
    placeholder: 'Bitte auswählen'
  }
};

export const WithMaxSelections: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie Optionen',
    ariaLabel: 'Mehrfachauswahl',
    isMulti: true,
    maxSelections: 2,
    placeholder: 'Bitte auswählen'
  }
};

export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    groupOptions: true,
    placeholder: 'Bitte auswählen'
  }
};

export const WithIcons: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    leftIcon: <span>🔍</span>,
    rightIcon: <span>▼</span>,
    placeholder: 'Bitte auswählen'
  }
};

export const WithDescription: Story = {
  args: {
    options: mockOptions,
    label: 'Wählen Sie eine Option',
    ariaLabel: 'Optionsauswahl',
    description: 'Diese Auswahl bestimmt, welche Optionen Ihnen zur Verfügung stehen',
    placeholder: 'Bitte auswählen'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select.A11y
        options={mockOptions}
        label="Extra Small"
        ariaLabel="XS Auswahl"
        size="xs"
        placeholder="XS Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Small"
        ariaLabel="SM Auswahl"
        size="sm"
        placeholder="SM Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Medium"
        ariaLabel="MD Auswahl"
        size="md"
        placeholder="MD Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Large"
        ariaLabel="LG Auswahl"
        size="lg"
        placeholder="LG Select"
      />
    </div>
  )
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Select.A11y
        options={mockOptions}
        label="Default"
        ariaLabel="Default Auswahl"
        variant="default"
        placeholder="Default Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Filled"
        ariaLabel="Filled Auswahl"
        variant="filled"
        placeholder="Filled Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Outlined"
        ariaLabel="Outlined Auswahl"
        variant="outlined"
        placeholder="Outlined Select"
      />
      
      <Select.A11y
        options={mockOptions}
        label="Unstyled"
        ariaLabel="Unstyled Auswahl"
        variant="unstyled"
        placeholder="Unstyled Select"
      />
    </div>
  )
};

export const WithFormControl: Story = {
  render: () => (
    <FormControl
      label="Land"
      helperText="Wählen Sie Ihr Land aus der Liste"
      required
    >
      <Select.A11y
        options={[
          { value: 'de', label: 'Deutschland' },
          { value: 'at', label: 'Österreich' },
          { value: 'ch', label: 'Schweiz' },
          { value: 'li', label: 'Liechtenstein' }
        ]}
        ariaLabel="Länderauswahl"
        placeholder="Land auswählen"
      />
    </FormControl>
  )
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <div className="space-y-4">
        <Select.A11y
          options={mockOptions}
          label="Wählen Sie eine Option"
          ariaLabel="Optionsauswahl"
          placeholder="Bitte auswählen"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <div className="text-center">
          <p>Ausgewählter Wert: {value || 'Keine Auswahl'}</p>
        </div>
      </div>
    );
  }
};

export const InteractiveMulti: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setValues(selectedOptions);
    };
    
    return (
      <div className="space-y-4">
        <Select.A11y
          options={mockOptions}
          label="Wählen Sie Optionen"
          ariaLabel="Mehrfachauswahl"
          placeholder="Bitte auswählen"
          isMulti
          value={values}
          onChange={handleChange}
        />
        
        <div className="text-center">
          <p>Ausgewählte Werte: {values.length > 0 ? values.join(', ') : 'Keine Auswahl'}</p>
        </div>
      </div>
    );
  }
};