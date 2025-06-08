import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Stepper, { StepperContent, StepperActions } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Core/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'contained'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showConnector: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Schritt 1' },
      { id: 'step2', title: 'Schritt 2' },
      { id: 'step3', title: 'Schritt 3' },
    ],
    activeStep: 0,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Persönliche Daten',
        description: 'Geben Sie Ihre persönlichen Daten ein',
      },
      { id: 'step2', title: 'Kontaktdaten', description: 'Geben Sie Ihre Kontaktdaten ein' },
      {
        id: 'step3',
        title: 'Bestätigung',
        description: 'Überprüfen und bestätigen Sie Ihre Eingaben',
      },
    ],
    activeStep: 1,
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Persönliche Daten' },
      { id: 'step2', title: 'Kontaktdaten', optional: true },
      { id: 'step3', title: 'Zahlungsdaten' },
      { id: 'step4', title: 'Bestätigung' },
    ],
    activeStep: 0,
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Persönliche Daten' },
      { id: 'step2', title: 'Kontaktdaten' },
      { id: 'step3', title: 'Zahlungsdaten', disabled: true },
      { id: 'step4', title: 'Bestätigung' },
    ],
    activeStep: 1,
  },
};

export const VerticalStepper: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Persönliche Daten',
        description: 'Geben Sie Ihre persönlichen Daten ein',
      },
      { id: 'step2', title: 'Kontaktdaten', description: 'Geben Sie Ihre Kontaktdaten ein' },
      { id: 'step3', title: 'Zahlungsdaten', description: 'Geben Sie Ihre Zahlungsdaten ein' },
      {
        id: 'step4',
        title: 'Bestätigung',
        description: 'Überprüfen und bestätigen Sie Ihre Eingaben',
      },
    ],
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const OutlinedVariant: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Schritt 1' },
      { id: 'step2', title: 'Schritt 2' },
      { id: 'step3', title: 'Schritt 3' },
    ],
    activeStep: 1,
    variant: 'outlined',
  },
};

export const ContainedVariant: Story = {
  args: {
    steps: [
      { id: 'step1', title: 'Schritt 1' },
      { id: 'step2', title: 'Schritt 2' },
      { id: 'step3', title: 'Schritt 3' },
    ],
    activeStep: 1,
    variant: 'contained',
  },
};

export const WithCustomIcons: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Persönliche Daten',
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
        id: 'step2',
        title: 'Kontaktdaten',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        ),
      },
      {
        id: 'step3',
        title: 'Zahlungsdaten',
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
    ],
    activeStep: 1,
  },
};

export const WithContent: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
      {
        id: 'step1',
        title: 'Persönliche Daten',
        description: 'Geben Sie Ihre persönlichen Daten ein',
      },
      { id: 'step2', title: 'Kontaktdaten', description: 'Geben Sie Ihre Kontaktdaten ein' },
      {
        id: 'step3',
        title: 'Bestätigung',
        description: 'Überprüfen und bestätigen Sie Ihre Eingaben',
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <Stepper steps={steps} activeStep={activeStep} onStepChange={setActiveStep}>
          <StepperContent>
            <div>
              <h3 className="text-lg font-medium mb-4">Persönliche Daten</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vorname</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nachname</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Geburtsdatum</label>
                  <input type="date" className="w-full p-2 border rounded" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Kontaktdaten</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-Mail</label>
                  <input type="email" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon</label>
                  <input type="tel" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse</label>
                  <textarea className="w-full p-2 border rounded" rows={3}></textarea>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Bestätigung</h3>
              <div className="p-4 bg-gray-100 rounded mb-4">
                <p className="text-sm">
                  Bitte überprüfen Sie Ihre Eingaben und bestätigen Sie, dass alle Angaben korrekt
                  sind.
                </p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="confirm" className="mr-2" />
                <label htmlFor="confirm">Ich bestätige, dass alle Angaben korrekt sind</label>
              </div>
            </div>
          </StepperContent>

          <StepperActions
            backLabel="Zurück"
            nextLabel="Weiter"
            completeLabel="Absenden"
            onComplete={() => alert('Formular abgesendet!')}
          />
        </Stepper>
      </div>
    );
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Stepper
          steps={[
            { id: 'step1', title: 'Schritt 1' },
            { id: 'step2', title: 'Schritt 2' },
            { id: 'step3', title: 'Schritt 3' },
          ]}
          activeStep={1}
          size="sm"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
        <Stepper
          steps={[
            { id: 'step1', title: 'Schritt 1' },
            { id: 'step2', title: 'Schritt 2' },
            { id: 'step3', title: 'Schritt 3' },
          ]}
          activeStep={1}
          size="md"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Stepper
          steps={[
            { id: 'step1', title: 'Schritt 1' },
            { id: 'step2', title: 'Schritt 2' },
            { id: 'step3', title: 'Schritt 3' },
          ]}
          activeStep={1}
          size="lg"
        />
      </div>
    </div>
  ),
};
