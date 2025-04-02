import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../FormField';
import { Input } from '../../Input/Input';
import { Select } from '../../Select/Select';
import { Textarea } from '../../Textarea/Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Core/Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Das Label des Formularfelds',
    },
    htmlFor: {
      control: 'text',
      description: 'Die ID des zugehörigen Formularelements',
    },
    helperText: {
      control: 'text',
      description: 'Hilfetext für das Formularfeld',
    },
    errorMessage: {
      control: 'text',
      description: 'Fehlermeldung für das Formularfeld',
    },
    labelClassName: {
      control: 'text',
      description: 'CSS-Klassen für das Label',
    },
    helperTextClassName: {
      control: 'text',
      description: 'CSS-Klassen für den Hilfetext',
    },
    errorMessageClassName: {
      control: 'text',
      description: 'CSS-Klassen für die Fehlermeldung',
    },
    fieldClassName: {
      control: 'text',
      description: 'CSS-Klassen für das Feld',
    },
    className: {
      control: 'text',
      description: 'CSS-Klassen für das gesamte FormField',
    },
    children: {
      description: 'Der Inhalt des FormFields',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Basic: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField label="Name" htmlFor="name">
        <Input id="name" placeholder="Ihr Name" />
      </FormField>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="E-Mail"
        htmlFor="email"
        helperText="Wir werden Ihre E-Mail-Adresse niemals an Dritte weitergeben."
      >
        <Input id="email" type="email" placeholder="Ihre E-Mail-Adresse" />
      </FormField>
    </div>
  ),
};

export const WithErrorMessage: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Passwort"
        htmlFor="password"
        errorMessage="Passwort muss mindestens 8 Zeichen lang sein"
      >
        <Input
          id="password"
          type="password"
          placeholder="Passwort eingeben"
          className="border-red-500 focus:border-red-500 focus:ring-red-500"
        />
      </FormField>
    </div>
  ),
};

export const WithRequiredLabel: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Benutzername"
        htmlFor="username"
        labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        <Input id="username" placeholder="Benutzername eingeben" />
      </FormField>
    </div>
  ),
};

export const WithDifferentInputs: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <FormField label="Name" htmlFor="name">
        <Input id="name" placeholder="Ihr Name" />
      </FormField>
      
      <FormField label="Beschreibung" htmlFor="description">
        <Textarea id="description" placeholder="Beschreibung eingeben" rows={3} />
      </FormField>
      
      <FormField label="Land" htmlFor="country">
        <Select id="country">
          <option value="">Bitte wählen</option>
          <option value="de">Deutschland</option>
          <option value="at">Österreich</option>
          <option value="ch">Schweiz</option>
        </Select>
      </FormField>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="E-Mail"
        htmlFor="email"
        labelClassName="text-blue-700 dark:text-blue-300 font-bold"
        helperText="Wir werden Ihre E-Mail-Adresse niemals an Dritte weitergeben."
        helperTextClassName="text-blue-600 dark:text-blue-400 italic"
        className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg"
      >
        <Input
          id="email"
          type="email"
          placeholder="Ihre E-Mail-Adresse"
          className="border-blue-300 dark:border-blue-700 focus:ring-blue-500"
        />
      </FormField>
    </div>
  ),
};

export const WithHorizontalLayout: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <FormField
        label="Benutzername"
        htmlFor="username"
        className="flex items-center"
        labelClassName="w-1/3"
        fieldClassName="w-2/3"
      >
        <Input id="username" placeholder="Benutzername eingeben" />
      </FormField>
      
      <FormField
        label="E-Mail"
        htmlFor="email"
        className="flex items-center"
        labelClassName="w-1/3"
        fieldClassName="w-2/3"
      >
        <Input id="email" type="email" placeholder="E-Mail-Adresse eingeben" />
      </FormField>
      
      <FormField
        label="Passwort"
        htmlFor="password"
        className="flex items-center"
        labelClassName="w-1/3"
        fieldClassName="w-2/3"
      >
        <Input id="password" type="password" placeholder="Passwort eingeben" />
      </FormField>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      if (!newValue) {
        setIsValid(false);
        setErrorMessage('E-Mail ist erforderlich');
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newValue)) {
        setIsValid(false);
        setErrorMessage('Ungültige E-Mail-Adresse');
      } else {
        setIsValid(true);
        setErrorMessage('');
      }
    };
    
    return (
      <div className="w-[400px]">
        <FormField
          label="E-Mail"
          htmlFor="email"
          errorMessage={!isValid ? errorMessage : undefined}
        >
          <Input
            id="email"
            type="email"
            value={value}
            onChange={handleChange}
            placeholder="Ihre E-Mail-Adresse"
            className={!isValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          />
        </FormField>
      </div>
    );
  },
};

export const WithOptionalLabel: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Telefon"
        htmlFor="phone"
        helperText="(Optional) Wir verwenden Ihre Telefonnummer nur im Notfall."
      >
        <Input id="phone" type="tel" placeholder="Ihre Telefonnummer" />
      </FormField>
    </div>
  ),
};

export const WithLabelTooltip: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label={
          <div className="flex items-center">
            <span>Steuer-ID</span>
            <div className="relative ml-1 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                Die Steuer-ID ist eine 11-stellige Nummer, die Ihnen vom Finanzamt zugewiesen wurde.
              </div>
            </div>
          </div>
        }
        htmlFor="taxId"
      >
        <Input id="taxId" placeholder="Ihre Steuer-ID eingeben" />
      </FormField>
    </div>
  ),
};

export const WithNestedFields: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField label="Adresse" htmlFor="address">
        <Input id="address" placeholder="Straße und Hausnummer" className="mb-2" />
        
        <div className="grid grid-cols-2 gap-2">
          <FormField label="PLZ" htmlFor="zip" labelClassName="text-sm">
            <Input id="zip" placeholder="PLZ" />
          </FormField>
          
          <FormField label="Stadt" htmlFor="city" labelClassName="text-sm">
            <Input id="city" placeholder="Stadt" />
          </FormField>
        </div>
        
        <FormField label="Land" htmlFor="country" labelClassName="text-sm" className="mt-2">
          <Select id="country">
            <option value="">Bitte wählen</option>
            <option value="de">Deutschland</option>
            <option value="at">Österreich</option>
            <option value="ch">Schweiz</option>
          </Select>
        </FormField>
      </FormField>
    </div>
  ),
};