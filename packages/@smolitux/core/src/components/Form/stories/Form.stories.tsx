import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Form } from '../Form';
import { FormControl } from '../../FormControl/FormControl';
import { FormField } from '../../FormField/FormField';
import { Input } from '../../Input/Input';
import { Select } from '../../Select/Select';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Radio } from '../../Radio/Radio';
import { Button } from '../../Button/Button';
import { Textarea } from '../../Textarea/Textarea';

const meta: Meta<typeof Form> = {
  title: 'Core/Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      action: 'submitted',
      description: 'Callback, der aufgerufen wird, wenn das Formular abgesendet wird',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich ein Formularfeld ändert',
    },
    onReset: {
      action: 'reset',
      description: 'Callback, der aufgerufen wird, wenn das Formular zurückgesetzt wird',
    },
    initialValues: {
      control: 'object',
      description: 'Die initialen Werte des Formulars',
    },
    validationSchema: {
      description: 'Das Validierungsschema für das Formular',
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Gibt an, ob die Validierung bei Änderungen durchgeführt werden soll',
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Gibt an, ob die Validierung beim Verlassen eines Feldes durchgeführt werden soll',
    },
    validateOnSubmit: {
      control: 'boolean',
      description: 'Gibt an, ob die Validierung beim Absenden durchgeführt werden soll',
    },
    children: {
      description: 'Der Inhalt des Formulars',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: () => {
    const handleSubmit = (values: any) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    };
    
    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        className="w-[400px]"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl>
              <FormField label="Name" htmlFor="name">
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Ihr Name"
                />
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="E-Mail" htmlFor="email">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Ihre E-Mail-Adresse"
                />
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="Nachricht" htmlFor="message">
                <Textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Ihre Nachricht"
                  rows={4}
                />
              </FormField>
            </FormControl>
            
            <Button type="submit" className="w-full">
              Absenden
            </Button>
          </form>
        )}
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    
    const validate = (values: any) => {
      const newErrors: Record<string, string> = {};
      
      if (!values.name) {
        newErrors.name = 'Name ist erforderlich';
      }
      
      if (!values.email) {
        newErrors.email = 'E-Mail ist erforderlich';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        newErrors.email = 'Ungültige E-Mail-Adresse';
      }
      
      if (!values.password) {
        newErrors.password = 'Passwort ist erforderlich';
      } else if (values.password.length < 8) {
        newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
      }
      
      if (values.password !== values.confirmPassword) {
        newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
      }
      
      return newErrors;
    };
    
    const handleSubmit = (values: any) => {
      const validationErrors = validate(values);
      
      if (Object.keys(validationErrors).length === 0) {
        console.log('Form submitted:', values);
        alert('Formular erfolgreich abgesendet:\n' + JSON.stringify(values, null, 2));
      } else {
        setErrors(validationErrors);
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      // Löschen des Fehlers für das geänderte Feld
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    };
    
    return (
      <Form
        onSubmit={handleSubmit}
        onChange={handleChange}
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        className="w-[400px]"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl isInvalid={!!errors.name}>
              <FormField label="Name" htmlFor="name" errorMessage={errors.name}>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Ihr Name"
                  isInvalid={!!errors.name}
                />
              </FormField>
            </FormControl>
            
            <FormControl isInvalid={!!errors.email}>
              <FormField label="E-Mail" htmlFor="email" errorMessage={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Ihre E-Mail-Adresse"
                  isInvalid={!!errors.email}
                />
              </FormField>
            </FormControl>
            
            <FormControl isInvalid={!!errors.password}>
              <FormField label="Passwort" htmlFor="password" errorMessage={errors.password}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Ihr Passwort"
                  isInvalid={!!errors.password}
                />
              </FormField>
            </FormControl>
            
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormField label="Passwort bestätigen" htmlFor="confirmPassword" errorMessage={errors.confirmPassword}>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Passwort wiederholen"
                  isInvalid={!!errors.confirmPassword}
                />
              </FormField>
            </FormControl>
            
            <Button type="submit" className="w-full">
              Registrieren
            </Button>
          </form>
        )}
      </Form>
    );
  },
};

export const WithDifferentControls: Story = {
  render: () => {
    const handleSubmit = (values: any) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    };
    
    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          country: '',
          gender: '',
          interests: [],
          subscribe: false,
          message: '',
        }}
        className="w-[400px]"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl>
              <FormField label="Name" htmlFor="name">
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Ihr Name"
                />
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="E-Mail" htmlFor="email">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Ihre E-Mail-Adresse"
                />
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="Land" htmlFor="country">
                <Select
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                >
                  <option value="">Bitte wählen</option>
                  <option value="de">Deutschland</option>
                  <option value="at">Österreich</option>
                  <option value="ch">Schweiz</option>
                  <option value="other">Anderes Land</option>
                </Select>
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="Geschlecht" htmlFor="gender">
                <div className="space-y-2">
                  <div>
                    <Radio
                      id="gender-male"
                      name="gender"
                      value="male"
                      checked={values.gender === 'male'}
                      onChange={handleChange}
                    >
                      Männlich
                    </Radio>
                  </div>
                  <div>
                    <Radio
                      id="gender-female"
                      name="gender"
                      value="female"
                      checked={values.gender === 'female'}
                      onChange={handleChange}
                    >
                      Weiblich
                    </Radio>
                  </div>
                  <div>
                    <Radio
                      id="gender-other"
                      name="gender"
                      value="other"
                      checked={values.gender === 'other'}
                      onChange={handleChange}
                    >
                      Divers
                    </Radio>
                  </div>
                </div>
              </FormField>
            </FormControl>
            
            <FormControl>
              <FormField label="Interessen" htmlFor="interests">
                <div className="space-y-2">
                  <div>
                    <Checkbox
                      id="interests-tech"
                      name="interests"
                      value="tech"
                      checked={values.interests.includes('tech')}
                      onChange={handleChange}
                    >
                      Technologie
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox
                      id="interests-sports"
                      name="interests"
                      value="sports"
                      checked={values.interests.includes('sports')}
                      onChange={handleChange}
                    >
                      Sport
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox
                      id="interests-music"
                      name="interests"
                      value="music"
                      checked={values.interests.includes('music')}
                      onChange={handleChange}
                    >
                      Musik
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox
                      id="interests-travel"
                      name="interests"
                      value="travel"
                      checked={values.interests.includes('travel')}
                      onChange={handleChange}
                    >
                      Reisen
                    </Checkbox>
                  </div>
                </div>
              </FormField>
            </FormControl>
            
            <FormControl>
              <div>
                <Checkbox
                  id="subscribe"
                  name="subscribe"
                  checked={values.subscribe}
                  onChange={handleChange}
                >
                  Newsletter abonnieren
                </Checkbox>
              </div>
            </FormControl>
            
            <FormControl>
              <FormField label="Nachricht" htmlFor="message">
                <Textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Ihre Nachricht"
                  rows={4}
                />
              </FormField>
            </FormControl>
            
            <div className="flex space-x-4">
              <Button type="reset" variant="outline" className="flex-1">
                Zurücksetzen
              </Button>
              <Button type="submit" className="flex-1">
                Absenden
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  },
};

export const WithFormLayout: Story = {
  render: () => {
    const handleSubmit = (values: any) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    };
    
    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          zip: '',
          country: '',
        }}
        className="w-[600px]"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormControl>
                <FormField label="Vorname" htmlFor="firstName">
                  <Input
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder="Vorname"
                  />
                </FormField>
              </FormControl>
              
              <FormControl>
                <FormField label="Nachname" htmlFor="lastName">
                  <Input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Nachname"
                  />
                </FormField>
              </FormControl>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormControl>
                <FormField label="E-Mail" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="E-Mail-Adresse"
                  />
                </FormField>
              </FormControl>
              
              <FormControl>
                <FormField label="Telefon" htmlFor="phone">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Telefonnummer"
                  />
                </FormField>
              </FormControl>
            </div>
            
            <FormControl>
              <FormField label="Adresse" htmlFor="address">
                <Input
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Straße und Hausnummer"
                />
              </FormField>
            </FormControl>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormControl>
                <FormField label="Stadt" htmlFor="city">
                  <Input
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="Stadt"
                  />
                </FormField>
              </FormControl>
              
              <FormControl>
                <FormField label="PLZ" htmlFor="zip">
                  <Input
                    id="zip"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    placeholder="Postleitzahl"
                  />
                </FormField>
              </FormControl>
              
              <FormControl>
                <FormField label="Land" htmlFor="country">
                  <Select
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="de">Deutschland</option>
                    <option value="at">Österreich</option>
                    <option value="ch">Schweiz</option>
                    <option value="other">Anderes Land</option>
                  </Select>
                </FormField>
              </FormControl>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button type="reset" variant="outline">
                Zurücksetzen
              </Button>
              <Button type="submit">
                Absenden
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  },
};

export const WithDynamicFields: Story = {
  render: () => {
    const [fields, setFields] = React.useState([{ id: 1, value: '' }]);
    
    const handleSubmit = (values: any) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    };
    
    const addField = () => {
      setFields([...fields, { id: fields.length + 1, value: '' }]);
    };
    
    const removeField = (id: number) => {
      setFields(fields.filter(field => field.id !== id));
    };
    
    const handleFieldChange = (id: number, value: string) => {
      setFields(fields.map(field => 
        field.id === id ? { ...field, value } : field
      ));
    };
    
    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          fields: fields.reduce((acc, field) => ({ ...acc, [`field-${field.id}`]: field.value }), {}),
        }}
        className="w-[500px]"
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl>
              <FormField label="Titel" htmlFor="title">
                <Input
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Titel eingeben"
                />
              </FormField>
            </FormControl>
            
            <div className="space-y-2">
              <div className="font-medium">Dynamische Felder</div>
              
              {fields.map((field) => (
                <div key={field.id} className="flex space-x-2">
                  <Input
                    name={`field-${field.id}`}
                    value={field.value}
                    onChange={(e) => {
                      handleFieldChange(field.id, e.target.value);
                      setFieldValue(`field-${field.id}`, e.target.value);
                    }}
                    placeholder={`Feld ${field.id}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    colorScheme="danger"
                    onClick={() => removeField(field.id)}
                    disabled={fields.length === 1}
                  >
                    Entfernen
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addField}
                className="w-full"
              >
                Feld hinzufügen
              </Button>
            </div>
            
            <Button type="submit" className="w-full">
              Absenden
            </Button>
          </form>
        )}
      </Form>
    );
  },
};