import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../Slider';

const meta: Meta<typeof Slider> = {
  title: 'Core/Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Der aktuelle Wert des Sliders',
    },
    defaultValue: {
      control: 'number',
      description: 'Der Standardwert des Sliders',
    },
    min: {
      control: 'number',
      description: 'Der Minimalwert des Sliders',
    },
    max: {
      control: 'number',
      description: 'Der Maximalwert des Sliders',
    },
    step: {
      control: 'number',
      description: 'Die Schrittweite des Sliders',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Wert ändert',
    },
    onChangeEnd: {
      action: 'changeEnded',
      description: 'Callback, der aufgerufen wird, wenn die Änderung abgeschlossen ist',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der Slider deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob der Slider schreibgeschützt ist',
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
      description: 'Die Ausrichtung des Sliders',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des Sliders',
    },
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      },
      description: 'Das Farbschema des Sliders',
    },
    showMarks: {
      control: 'boolean',
      description: 'Gibt an, ob Markierungen angezeigt werden sollen',
    },
    marks: {
      control: 'object',
      description: 'Die Markierungen des Sliders',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Gibt an, ob ein Tooltip angezeigt werden soll',
    },
    tooltipFormat: {
      control: 'text',
      description: 'Das Format des Tooltips',
    },
    showValue: {
      control: 'boolean',
      description: 'Gibt an, ob der Wert angezeigt werden soll',
    },
    valuePosition: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
      description: 'Die Position des Werts',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
        />
        <div className="text-center">
          Wert: {value}
        </div>
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
  },
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = React.useState(25);
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={25}
        />
        <div className="text-center">
          Wert: {value} (Schrittweite: 25)
        </div>
      </div>
    );
  },
};

export const WithMarks: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    const marks = {
      0: '0°C',
      25: '25°C',
      50: '50°C',
      75: '75°C',
      100: '100°C',
    };
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          showMarks
          marks={marks}
        />
        <div className="text-center">
          Temperatur: {value}°C
        </div>
      </div>
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          showTooltip
        />
        <div className="text-center">
          Wert: {value}
        </div>
      </div>
    );
  },
};

export const WithCustomTooltipFormat: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          showTooltip
          tooltipFormat={(value) => `${value}%`}
        />
        <div className="text-center">
          Wert: {value}%
        </div>
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    return (
      <div className="w-[300px] space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Wert oben</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            showValue
            valuePosition="top"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Wert unten</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            showValue
            valuePosition="bottom"
          />
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[300px] space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <Slider
          defaultValue={50}
          size="sm"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
        <Slider
          defaultValue={50}
          size="md"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <Slider
          defaultValue={50}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-1">Primary</h3>
        <Slider
          defaultValue={50}
          colorScheme="primary"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Secondary</h3>
        <Slider
          defaultValue={50}
          colorScheme="secondary"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Success</h3>
        <Slider
          defaultValue={50}
          colorScheme="success"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Danger</h3>
        <Slider
          defaultValue={50}
          colorScheme="danger"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Warning</h3>
        <Slider
          defaultValue={50}
          colorScheme="warning"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Info</h3>
        <Slider
          defaultValue={50}
          colorScheme="info"
        />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    
    return (
      <div className="h-[300px] space-x-8 flex">
        <div>
          <h3 className="text-lg font-medium mb-2">Standard</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            orientation="vertical"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Mit Markierungen</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            orientation="vertical"
            showMarks
            marks={{
              0: '0%',
              25: '25%',
              50: '50%',
              75: '75%',
              100: '100%',
            }}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Mit Tooltip</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            orientation="vertical"
            showTooltip
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Mit Wert</h3>
          <Slider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            orientation="vertical"
            showValue
            valuePosition="right"
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: 50,
    readOnly: true,
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider
        defaultValue={50}
        className="py-4"
        trackClassName="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
        filledTrackClassName="bg-gradient-to-r from-purple-500 to-pink-500"
        thumbClassName="w-6 h-6 bg-white border-2 border-purple-500 shadow-lg"
      />
    </div>
  ),
};

export const RangeSlider: Story = {
  render: () => {
    const [range, setRange] = React.useState([20, 80]);
    
    const handleChange = (values: number[]) => {
      setRange(values);
    };
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={range}
          onChange={handleChange}
          min={0}
          max={100}
          isRange
        />
        <div className="text-center">
          Bereich: {range[0]} - {range[1]}
        </div>
      </div>
    );
  },
};

export const RangeSliderWithMarks: Story = {
  render: () => {
    const [range, setRange] = React.useState([20, 80]);
    
    const handleChange = (values: number[]) => {
      setRange(values);
    };
    
    const marks = {
      0: '0€',
      25: '25€',
      50: '50€',
      75: '75€',
      100: '100€',
    };
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={range}
          onChange={handleChange}
          min={0}
          max={100}
          isRange
          showMarks
          marks={marks}
        />
        <div className="text-center">
          Preisbereich: {range[0]}€ - {range[1]}€
        </div>
      </div>
    );
  },
};

export const RangeSliderWithTooltip: Story = {
  render: () => {
    const [range, setRange] = React.useState([20, 80]);
    
    const handleChange = (values: number[]) => {
      setRange(values);
    };
    
    return (
      <div className="w-[300px] space-y-4">
        <Slider
          value={range}
          onChange={handleChange}
          min={0}
          max={100}
          isRange
          showTooltip
          tooltipFormat={(value) => `${value}€`}
        />
        <div className="text-center">
          Preisbereich: {range[0]}€ - {range[1]}€
        </div>
      </div>
    );
  },
};

export const PriceRangeFilter: Story = {
  render: () => {
    const [range, setRange] = React.useState([200, 800]);
    const min = 0;
    const max = 1000;
    
    const handleChange = (values: number[]) => {
      setRange(values);
    };
    
    return (
      <div className="w-[350px] p-4 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Preisbereich</h3>
        
        <Slider
          value={range}
          onChange={handleChange}
          min={min}
          max={max}
          isRange
          showTooltip
          tooltipFormat={(value) => `${value}€`}
          className="mb-6"
        />
        
        <div className="flex justify-between">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="min-price">
              Min
            </label>
            <input
              id="min-price"
              type="number"
              value={range[0]}
              onChange={(e) => setRange([parseInt(e.target.value), range[1]])}
              min={min}
              max={range[1]}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="max-price">
              Max
            </label>
            <input
              id="max-price"
              type="number"
              value={range[1]}
              onChange={(e) => setRange([range[0], parseInt(e.target.value)])}
              min={range[0]}
              max={max}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Filter anwenden
          </button>
        </div>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState(50);
    
    return (
      <div className="w-[300px] p-4 border rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="text-xl">
            {volume === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : volume < 50 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </div>
          
          <Slider
            value={volume}
            onChange={setVolume}
            min={0}
            max={100}
            showTooltip
            tooltipFormat={(value) => `${value}%`}
          />
        </div>
      </div>
    );
  },
};