import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormControl } from '../FormControl';
import { FormField } from '../../FormField/FormField';
import { Input } from '../../Input/Input';
import { Select } from '../../Select/Select';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Radio } from '../../Radio/Radio';
import { Textarea } from '../../Textarea/Textarea';

const meta: Meta<typeof FormControl> = {
  title: 'Core/Forms/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Die ID des FormControls',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob das Formularfeld erforderlich ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob das Formularfeld ungültig ist',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Gibt an, ob das Formularfeld deaktiviert ist',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Gibt an, ob das Formularfeld schreibgeschützt ist',
    },
    children: {
      description: 'Der Inhalt des FormControls',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

export const Basic: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl>
        <FormField label="Name" htmlFor="name">
          <Input id="name" placeholder="Ihr Name" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl>
        <FormField
          label="E-Mail"
          htmlFor="email"
          helperText="Wir werden Ihre E-Mail-Adresse niemals an Dritte weitergeben."
        >
          <Input id="email" type="email" placeholder="Ihre E-Mail-Adresse" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl isRequired>
        <FormField label="Benutzername" htmlFor="username">
          <Input id="username" placeholder="Benutzername eingeben" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl isInvalid>
        <FormField
          label="Passwort"
          htmlFor="password"
          errorMessage="Passwort muss mindestens 8 Zeichen lang sein"
        >
          <Input id="password" type="password" placeholder="Passwort eingeben" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl isDisabled>
        <FormField label="Adresse" htmlFor="address">
          <Input id="address" placeholder="Adresse eingeben" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl isReadOnly>
        <FormField label="Benutzername" htmlFor="username">
          <Input
            id="username"
            defaultValue="max.mustermann"
            placeholder="Benutzername eingeben"
          />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const WithDifferentInputs: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <FormControl>
        <FormField label="Name" htmlFor="name">
          <Input id="name" placeholder="Ihr Name" />
        </FormField>
      </FormControl>
      
      <FormControl>
        <FormField label="Beschreibung" htmlFor="description">
          <Textarea id="description" placeholder="Beschreibung eingeben" rows={3} />
        </FormField>
      </FormControl>
      
      <FormControl>
        <FormField label="Land" htmlFor="country">
          <Select id="country">
            <option value="">Bitte wählen</option>
            <option value="de">Deutschland</option>
            <option value="at">Österreich</option>
            <option value="ch">Schweiz</option>
          </Select>
        </FormField>
      </FormControl>
      
      <FormControl>
        <FormField label="Geschlecht" htmlFor="gender">
          <div className="space-y-2">
            <div>
              <Radio id="gender-male" name="gender" value="male">
                Männlich
              </Radio>
            </div>
            <div>
              <Radio id="gender-female" name="gender" value="female">
                Weiblich
              </Radio>
            </div>
            <div>
              <Radio id="gender-other" name="gender" value="other">
                Divers
              </Radio>
            </div>
          </div>
        </FormField>
      </FormControl>
      
      <FormControl>
        <div>
          <Checkbox id="terms">
            Ich akzeptiere die AGB
          </Checkbox>
        </div>
      </FormControl>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <FormField
          label="E-Mail"
          htmlFor="email"
          labelClassName="text-blue-700 dark:text-blue-300 font-bold"
          helperText="Wir werden Ihre E-Mail-Adresse niemals an Dritte weitergeben."
          helperTextClassName="text-blue-600 dark:text-blue-400 italic"
        >
          <Input
            id="email"
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            className="border-blue-300 dark:border-blue-700 focus:ring-blue-500"
          />
        </FormField>
      </FormControl>
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
        <FormControl isInvalid={!isValid}>
          <FormField
            label="E-Mail"
            htmlFor="email"
            errorMessage={errorMessage}
          >
            <Input
              id="email"
              type="email"
              value={value}
              onChange={handleChange}
              placeholder="Ihre E-Mail-Adresse"
              isInvalid={!isValid}
            />
          </FormField>
        </FormControl>
      </div>
    );
  },
};

export const WithHorizontalLayout: Story = {
  render: () => (
    <div className="w-[500px]">
      <FormControl>
        <FormField
          label="Benutzername"
          htmlFor="username"
          className="flex items-center"
          labelClassName="w-1/3"
          fieldClassName="w-2/3"
        >
          <Input id="username" placeholder="Benutzername eingeben" />
        </FormField>
      </FormControl>
      
      <FormControl className="mt-4">
        <FormField
          label="E-Mail"
          htmlFor="email"
          className="flex items-center"
          labelClassName="w-1/3"
          fieldClassName="w-2/3"
        >
          <Input id="email" type="email" placeholder="E-Mail-Adresse eingeben" />
        </FormField>
      </FormControl>
      
      <FormControl className="mt-4">
        <FormField
          label="Passwort"
          htmlFor="password"
          className="flex items-center"
          labelClassName="w-1/3"
          fieldClassName="w-2/3"
        >
          <Input id="password" type="password" placeholder="Passwort eingeben" />
        </FormField>
      </FormControl>
    </div>
  ),
};

export const WithNestedControls: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormControl>
        <FormField label="Adresse" htmlFor="address">
          <Input id="address" placeholder="Straße und Hausnummer" className="mb-2" />
          
          <div className="grid grid-cols-2 gap-2">
            <FormControl>
              <FormField label="PLZ" htmlFor="zip" labelClassName="text-sm">
                <Input id="zip" placeholder="PLZ" />
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="Stadt" htmlFor="city" labelClassName="text-sm">
                <Input id="city" placeholder="Stadt" />
              </FormField>
            </FormControl>
          </div>
          
          <FormControl className="mt-2">
            <FormField label="Land" htmlFor="country" labelClassName="text-sm">
              <Select id="country">
                <option value="">Bitte wählen</option>
                <option value="de">Deutschland</option>
                <option value="at">Österreich</option>
                <option value="ch">Schweiz</option>
              </Select>
            </FormField>
          </FormControl>
        </FormField>
      </FormControl>
    </div>
  ),
};