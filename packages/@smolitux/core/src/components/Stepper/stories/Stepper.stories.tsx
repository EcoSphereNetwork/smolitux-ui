import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../Stepper';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Stepper> = {
  title: 'Core/Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'array',
      description: 'Die Schritte des Steppers',
    },
    activeStep: {
      control: 'number',
      description: 'Der aktive Schritt',
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
      description: 'Die Ausrichtung des Steppers',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des Steppers',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema des Steppers',
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'simple', 'circles', 'numbers'],
      },
      description: 'Die Variante des Steppers',
    },
    showLabels: {
      control: 'boolean',
      description: 'Gibt an, ob Labels angezeigt werden sollen',
    },
    showDescription: {
      control: 'boolean',
      description: 'Gibt an, ob Beschreibungen angezeigt werden sollen',
    },
    showConnectors: {
      control: 'boolean',
      description: 'Gibt an, ob Verbindungslinien angezeigt werden sollen',
    },
    connectorStyle: {
      control: {
        type: 'select',
        options: ['solid', 'dashed', 'dotted'],
      },
      description: 'Der Stil der Verbindungslinien',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Basic: Story = {
  args: {
    steps: [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ],
    activeStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    const nextStep = () => {
      setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const prevStep = () => {
      setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    return (
      <div className="space-y-4 w-[600px]">
        <Stepper steps={steps} activeStep={activeStep} />

        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} disabled={activeStep === 0} variant="outline">
            Zurück
          </Button>

          <Button onClick={nextStep} disabled={activeStep === steps.length - 1}>
            Weiter
          </Button>
        </div>
      </div>
    );
  },
};

export const Orientations: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Horizontal (Standard)</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} orientation="horizontal" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Vertikal</h3>
          <div className="h-[300px]">
            <Stepper steps={steps} activeStep={1} orientation="vertical" />
          </div>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Small</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} size="sm" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} size="md" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Large</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} size="lg" />
          </div>
        </div>
      </div>
    );
  },
};

export const ColorSchemes: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Primary (Standard)</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} colorScheme="primary" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Secondary</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} colorScheme="secondary" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Success</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} colorScheme="success" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Danger</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} colorScheme="danger" />
          </div>
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Default</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} variant="default" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Simple</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} variant="simple" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Circles</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} variant="circles" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Numbers</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} variant="numbers" />
          </div>
        </div>
      </div>
    );
  },
};

export const WithoutLabels: Story = {
  args: {
    steps: [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ],
    activeStep: 1,
    showLabels: false,
  },
};

export const WithoutDescription: Story = {
  args: {
    steps: [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ],
    activeStep: 1,
    showDescription: false,
  },
};

export const WithoutConnectors: Story = {
  args: {
    steps: [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ],
    activeStep: 1,
    showConnectors: false,
  },
};

export const ConnectorStyles: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Solid (Standard)</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} connectorStyle="solid" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Dashed</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} connectorStyle="dashed" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Dotted</h3>
          <div className="w-[600px]">
            <Stepper steps={steps} activeStep={1} connectorStyle="dotted" />
          </div>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const steps = [
      {
        label: 'Konto erstellen',
        description: 'Erstellen Sie Ihr Konto',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'Profil ausfüllen',
        description: 'Vervollständigen Sie Ihr Profil',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        ),
      },
      {
        label: 'Abschließen',
        description: 'Bestätigen Sie Ihre Angaben',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ];

    return (
      <div className="w-[600px]">
        <Stepper steps={steps} activeStep={1} />
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="w-[600px]">
        <Stepper
          steps={steps}
          activeStep={1}
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          stepClassName="bg-white dark:bg-gray-700 shadow-md rounded-lg p-2"
          activeStepClassName="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          connectorClassName="border-purple-200 dark:border-purple-800"
          labelClassName="font-bold"
          descriptionClassName="text-gray-500 dark:text-gray-400"
        />
      </div>
    );
  },
};

export const WithClickableSteps: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
      { label: 'Schritt 1', description: 'Erste Beschreibung' },
      { label: 'Schritt 2', description: 'Zweite Beschreibung' },
      { label: 'Schritt 3', description: 'Dritte Beschreibung' },
    ];

    return (
      <div className="space-y-4 w-[600px]">
        <Stepper steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-8">
          <h3 className="text-lg font-medium mb-2">Schritt {activeStep + 1}</h3>
          <p>{steps[activeStep].description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Klicken Sie auf einen Schritt, um zu diesem zu navigieren.
          </p>
        </div>
      </div>
    );
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    });

    const steps = [
      {
        label: 'Persönliche Daten',
        description: 'Name und Kontaktdaten',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'Adresse',
        description: 'Lieferadresse',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'Zahlung',
        description: 'Zahlungsinformationen',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fillRule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        label: 'Bestätigung',
        description: 'Überprüfen und bestätigen',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    return (
      <div className="space-y-6 w-[600px]">
        <Stepper steps={steps} activeStep={activeStep} variant="circles" />

        <div className="p-6 border rounded-lg">
          {activeStep === 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Persönliche Daten</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name eingeben"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E-Mail eingeben"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Adresse</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="address">
                    Straße
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Straße eingeben"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="zip">
                      PLZ
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="PLZ eingeben"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="city">
                      Stadt
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Stadt eingeben"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Zahlungsinformationen</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                    Kartennummer
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Kartennummer eingeben"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cardExpiry">
                      Ablaufdatum
                    </label>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      type="text"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/JJ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cardCvc">
                      CVC
                    </label>
                    <input
                      id="cardCvc"
                      name="cardCvc"
                      type="text"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CVC eingeben"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Bestätigung</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Persönliche Daten</h4>
                  <p>Name: {formData.name}</p>
                  <p>E-Mail: {formData.email}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Adresse</h4>
                  <p>Straße: {formData.address}</p>
                  <p>PLZ: {formData.zip}</p>
                  <p>Stadt: {formData.city}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Zahlungsinformationen</h4>
                  <p>
                    Kartennummer:{' '}
                    {formData.cardNumber ? '****' + formData.cardNumber.slice(-4) : ''}
                  </p>
                  <p>Ablaufdatum: {formData.cardExpiry}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={activeStep === 0} variant="outline">
            Zurück
          </Button>

          <Button onClick={nextStep} disabled={activeStep === steps.length - 1}>
            {activeStep === steps.length - 2 ? 'Abschließen' : 'Weiter'}
          </Button>
        </div>
      </div>
    );
  },
};
