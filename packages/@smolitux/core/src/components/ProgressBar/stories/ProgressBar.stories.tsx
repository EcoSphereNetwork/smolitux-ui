import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../ProgressBar';
import { Button } from '../../Button/Button';

const meta: Meta<typeof ProgressBar> = {
  title: 'Core/Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Der aktuelle Wert des ProgressBars',
    },
    min: {
      control: 'number',
      description: 'Der Minimalwert des ProgressBars',
    },
    max: {
      control: 'number',
      description: 'Der Maximalwert des ProgressBars',
    },
    hasStripe: {
      control: 'boolean',
      description: 'Gibt an, ob der ProgressBar gestreift sein soll',
    },
    isAnimated: {
      control: 'boolean',
      description: 'Gibt an, ob der ProgressBar animiert sein soll',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Gibt an, ob der ProgressBar unbestimmt sein soll',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema des ProgressBars',
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      description: 'Die Größe des ProgressBars',
    },
    borderRadius: {
      control: 'text',
      description: 'Der Radius der Ecken des ProgressBars',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
    showLabel: {
      control: 'boolean',
      description: 'Gibt an, ob ein Label angezeigt werden soll',
    },
    labelPosition: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'inside'],
      },
      description: 'Die Position des Labels',
    },
    labelFormat: {
      control: 'text',
      description: 'Das Format des Labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Basic: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
  },
};

export const WithLabel: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    showLabel: true,
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-8 w-[400px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Label oben</h3>
        <ProgressBar
          value={60}
          showLabel
          labelPosition="top"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Label unten</h3>
        <ProgressBar
          value={60}
          showLabel
          labelPosition="bottom"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Label innen</h3>
        <ProgressBar
          value={60}
          showLabel
          labelPosition="inside"
          size="md"
        />
      </div>
    </div>
  ),
};

export const CustomLabelFormat: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    showLabel: true,
    labelFormat: (value, min, max) => `${value}/${max} (${Math.round((value / max) * 100)}%)`,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-[400px]">
      <div>
        <h3 className="text-lg font-medium mb-2">Extra Small</h3>
        <ProgressBar
          value={60}
          size="xs"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <ProgressBar
          value={60}
          size="sm"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
        <ProgressBar
          value={60}
          size="md"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <ProgressBar
          value={60}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div>
        <h3 className="text-sm font-medium mb-1">Primary</h3>
        <ProgressBar
          value={60}
          colorScheme="primary"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Secondary</h3>
        <ProgressBar
          value={60}
          colorScheme="secondary"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Success</h3>
        <ProgressBar
          value={60}
          colorScheme="success"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Danger</h3>
        <ProgressBar
          value={60}
          colorScheme="danger"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Warning</h3>
        <ProgressBar
          value={60}
          colorScheme="warning"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Info</h3>
        <ProgressBar
          value={60}
          colorScheme="info"
        />
      </div>
    </div>
  ),
};

export const WithStripe: Story = {
  args: {
    value: 60,
    hasStripe: true,
  },
};

export const WithAnimation: Story = {
  args: {
    value: 60,
    hasStripe: true,
    isAnimated: true,
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};

export const CustomBorderRadius: Story = {
  args: {
    value: 60,
    borderRadius: '0',
  },
};

export const WithCustomStyling: Story = {
  args: {
    value: 60,
    className: 'shadow-lg',
    trackClassName: 'bg-gradient-to-r from-gray-200 to-gray-300',
    filledTrackClassName: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
};

export const MultipleProgressBars: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Fortschritt 1</span>
          <span className="text-sm font-medium">30%</span>
        </div>
        <ProgressBar
          value={30}
          colorScheme="primary"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Fortschritt 2</span>
          <span className="text-sm font-medium">60%</span>
        </div>
        <ProgressBar
          value={60}
          colorScheme="success"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Fortschritt 3</span>
          <span className="text-sm font-medium">90%</span>
        </div>
        <ProgressBar
          value={90}
          colorScheme="danger"
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    
    const increment = () => {
      setValue((prev) => Math.min(prev + 10, 100));
    };
    
    const decrement = () => {
      setValue((prev) => Math.max(prev - 10, 0));
    };
    
    const reset = () => {
      setValue(0);
    };
    
    return (
      <div className="space-y-4 w-[400px]">
        <ProgressBar
          value={value}
          showLabel
        />
        
        <div className="flex space-x-2">
          <Button onClick={decrement} disabled={value === 0}>-10%</Button>
          <Button onClick={increment} disabled={value === 100}>+10%</Button>
          <Button onClick={reset} variant="ghost">Reset</Button>
        </div>
      </div>
    );
  },
};

export const FileUploadExample: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    
    const startUpload = () => {
      setIsUploading(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          
          return newProgress;
        });
      }, 300);
    };
    
    return (
      <div className="space-y-4 w-[400px]">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">Datei hochladen</h3>
          
          <div className="mb-4">
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          {(isUploading || progress === 100) && (
            <div className="mb-4">
              <ProgressBar
                value={progress}
                colorScheme={progress === 100 ? 'success' : 'primary'}
                showLabel
                labelFormat={(value) => `${value}%${progress === 100 ? ' - Abgeschlossen' : ''}`}
              />
            </div>
          )}
          
          <Button
            onClick={startUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Wird hochgeladen...' : 'Hochladen'}
          </Button>
        </div>
      </div>
    );
  },
};

export const MultiStepExample: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const totalSteps = 4;
    
    const nextStep = () => {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };
    
    const prevStep = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    };
    
    const progress = (currentStep - 1) / (totalSteps - 1) * 100;
    
    return (
      <div className="space-y-6 w-[500px]">
        <div>
          <ProgressBar
            value={progress}
            colorScheme="primary"
            showLabel
            labelFormat={() => `Schritt ${currentStep} von ${totalSteps}`}
          />
        </div>
        
        <div className="p-6 border rounded-lg">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Persönliche Informationen</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
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
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E-Mail eingeben"
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Adresse</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="street">
                    Straße
                  </label>
                  <input
                    id="street"
                    type="text"
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
                      type="text"
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
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Stadt eingeben"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Zahlungsinformationen</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="card">
                    Kartennummer
                  </label>
                  <input
                    id="card"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Kartennummer eingeben"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="expiry">
                      Ablaufdatum
                    </label>
                    <input
                      id="expiry"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/JJ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cvc">
                      CVC
                    </label>
                    <input
                      id="cvc"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CVC eingeben"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Bestätigung</h3>
              <p className="mb-4">Bitte überprüfen Sie Ihre Eingaben und bestätigen Sie die Bestellung.</p>
              <div className="p-4 bg-green-50 text-green-800 rounded-md">
                <p>Alle Informationen wurden erfolgreich eingegeben.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
          >
            Zurück
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            {currentStep === totalSteps - 1 ? 'Abschließen' : 'Weiter'}
          </Button>
        </div>
      </div>
    );
  },
};