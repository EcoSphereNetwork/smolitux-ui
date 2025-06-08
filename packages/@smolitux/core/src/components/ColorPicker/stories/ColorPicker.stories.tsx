import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '../ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Core/Forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'color',
      description: 'Der ausgewählte Farbwert',
    },
    defaultValue: {
      control: 'color',
      description: 'Der Standardfarbwert',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich die Farbe ändert',
    },
    format: {
      control: {
        type: 'select',
        options: ['hex', 'rgb', 'hsl'],
      },
      description: 'Das Format, in dem die Farbe zurückgegeben wird',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der ColorPicker deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob der ColorPicker schreibgeschützt ist',
    },
    showAlpha: {
      control: 'boolean',
      description: 'Gibt an, ob der Alpha-Kanal angezeigt werden soll',
    },
    showInput: {
      control: 'boolean',
      description: 'Gibt an, ob ein Eingabefeld angezeigt werden soll',
    },
    showPreview: {
      control: 'boolean',
      description: 'Gibt an, ob eine Vorschau angezeigt werden soll',
    },
    showSwatches: {
      control: 'boolean',
      description: 'Gibt an, ob Farbfelder angezeigt werden sollen',
    },
    swatches: {
      control: 'array',
      description: 'Die Farbfelder, die angezeigt werden sollen',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des ColorPickers',
    },
    placement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
      description: 'Die Platzierung des Farbwählers relativ zum Trigger',
    },
    popoverProps: {
      description: 'Props für das Popover-Element',
    },
    triggerProps: {
      description: 'Props für das Trigger-Element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} />
        <div className="text-center">Ausgewählte Farbe: {color}</div>
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '#e74c3c',
  },
};

export const WithDifferentFormats: Story = {
  render: () => {
    const [hexColor, setHexColor] = React.useState('#3498db');
    const [rgbColor, setRgbColor] = React.useState('rgb(52, 152, 219)');
    const [hslColor, setHslColor] = React.useState('hsl(204, 70%, 53%)');

    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="font-medium">HEX Format</h3>
          <ColorPicker value={hexColor} onChange={setHexColor} format="hex" />
          <div>Wert: {hexColor}</div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">RGB Format</h3>
          <ColorPicker value={rgbColor} onChange={setRgbColor} format="rgb" />
          <div>Wert: {rgbColor}</div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">HSL Format</h3>
          <ColorPicker value={hslColor} onChange={setHslColor} format="hsl" />
          <div>Wert: {hslColor}</div>
        </div>
      </div>
    );
  },
};

export const WithAlphaChannel: Story = {
  render: () => {
    const [color, setColor] = React.useState('rgba(52, 152, 219, 0.5)');

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} showAlpha format="rgb" />
        <div className="text-center">Ausgewählte Farbe: {color}</div>
        <div className="w-full h-20 rounded border" style={{ backgroundColor: color }} />
      </div>
    );
  },
};

export const WithSwatches: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');
    const swatches = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#e74c3c',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d',
    ];

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} showSwatches swatches={swatches} />
        <div className="text-center">Ausgewählte Farbe: {color}</div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-medium">Small</h3>
        <ColorPicker defaultValue="#3498db" size="sm" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Medium (Standard)</h3>
        <ColorPicker defaultValue="#3498db" size="md" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Large</h3>
        <ColorPicker defaultValue="#3498db" size="lg" />
      </div>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="font-medium">Top</h3>
        <ColorPicker defaultValue="#3498db" placement="top" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Right</h3>
        <ColorPicker defaultValue="#3498db" placement="right" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Bottom</h3>
        <ColorPicker defaultValue="#3498db" placement="bottom" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Left</h3>
        <ColorPicker defaultValue="#3498db" placement="left" />
      </div>
    </div>
  ),
};

export const WithInput: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} showInput />
        <div className="w-full h-20 rounded border" style={{ backgroundColor: color }} />
      </div>
    );
  },
};

export const WithPreview: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');

    return (
      <div className="space-y-4">
        <ColorPicker value={color} onChange={setColor} showPreview />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '#3498db',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: '#3498db',
    readOnly: true,
  },
};

export const CustomTrigger: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');

    return (
      <div className="space-y-4">
        <ColorPicker
          value={color}
          onChange={setColor}
          triggerProps={{
            className: 'w-12 h-12 rounded-full border-4 border-white shadow-lg',
          }}
        />
        <div className="text-center">Ausgewählte Farbe: {color}</div>
      </div>
    );
  },
};

export const WithCustomPopover: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3498db');

    return (
      <div className="space-y-4">
        <ColorPicker
          value={color}
          onChange={setColor}
          popoverProps={{
            className: 'border-2 border-blue-500 rounded-lg shadow-xl',
            closeOnBlur: false,
          }}
        />
        <div className="text-center">Ausgewählte Farbe: {color}</div>
      </div>
    );
  },
};

export const ColorPalette: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = React.useState('#3498db');
    const [secondaryColor, setSecondaryColor] = React.useState('#e74c3c');
    const [accentColor, setAccentColor] = React.useState('#2ecc71');

    return (
      <div className="space-y-6 p-6 border rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Farbpalette anpassen</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Primärfarbe:</label>
            <ColorPicker value={primaryColor} onChange={setPrimaryColor} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Sekundärfarbe:</label>
            <ColorPicker value={secondaryColor} onChange={setSecondaryColor} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Akzentfarbe:</label>
            <ColorPicker value={accentColor} onChange={setAccentColor} size="sm" />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Vorschau:</h3>
          <div className="flex space-x-2">
            <div className="w-1/3 h-20 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="w-1/3 h-20 rounded" style={{ backgroundColor: secondaryColor }} />
            <div className="w-1/3 h-20 rounded" style={{ backgroundColor: accentColor }} />
          </div>
        </div>
      </div>
    );
  },
};
