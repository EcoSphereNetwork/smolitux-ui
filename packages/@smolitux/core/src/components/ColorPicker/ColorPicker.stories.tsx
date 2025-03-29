import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Core/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'circle', 'button'],
    },
    popupPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'auto'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    showPresets: { control: 'boolean' },
    showAlpha: { control: 'boolean' },
    showGradient: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Farbe auswählen',
    placeholder: 'Farbe auswählen',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Hintergrundfarbe',
    defaultValue: '#3b82f6',
    format: 'hex',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Farbe auswählen',
    helperText: 'Wählen Sie eine Farbe für den Hintergrund',
    defaultValue: '#3b82f6',
  },
};

export const WithError: Story = {
  args: {
    label: 'Farbe auswählen',
    error: 'Bitte wählen Sie eine gültige Farbe',
    defaultValue: '#3b82f6',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Farbe (deaktiviert)',
    defaultValue: '#3b82f6',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Farbe (nur lesen)',
    defaultValue: '#3b82f6',
    readOnly: true,
  },
};

export const WithAlpha: Story = {
  args: {
    label: 'Farbe mit Transparenz',
    defaultValue: 'rgba(59, 130, 246, 0.5)',
    format: 'rgba',
    showAlpha: true,
  },
};

export const WithoutGradient: Story = {
  args: {
    label: 'Farbe ohne Farbverlauf',
    defaultValue: '#3b82f6',
    showGradient: false,
  },
};

export const WithoutPresets: Story = {
  args: {
    label: 'Farbe ohne vordefinierte Farben',
    defaultValue: '#3b82f6',
    showPresets: false,
  },
};

export const WithCustomPresets: Story = {
  args: {
    label: 'Farbe mit benutzerdefinierten Farben',
    defaultValue: '#3b82f6',
    presets: [
      '#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51',
      '#001219', '#005f73', '#0a9396', '#94d2bd', '#e9d8a6',
      '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226',
    ],
  },
};

export const CompactVariant: Story = {
  args: {
    label: 'Kompakter Farbwähler',
    defaultValue: '#3b82f6',
    variant: 'compact',
  },
};

export const CircleVariant: Story = {
  args: {
    label: 'Kreisförmiger Farbwähler',
    defaultValue: '#3b82f6',
    variant: 'circle',
  },
};

export const ButtonVariant: Story = {
  args: {
    label: 'Button-Farbwähler',
    defaultValue: '#3b82f6',
    variant: 'button',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <ColorPicker label="Small" size="sm" defaultValue="#3b82f6" />
      <ColorPicker label="Medium (Default)" size="md" defaultValue="#3b82f6" />
      <ColorPicker label="Large" size="lg" defaultValue="#3b82f6" />
    </div>
  ),
};

export const DifferentFormats: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <ColorPicker label="HEX Format" format="hex" defaultValue="#3b82f6" />
      <ColorPicker label="RGB Format" format="rgb" defaultValue="rgb(59, 130, 246)" />
      <ColorPicker label="RGBA Format" format="rgba" defaultValue="rgba(59, 130, 246, 1)" showAlpha />
      <ColorPicker label="HSL Format" format="hsl" defaultValue="hsl(217, 91%, 60%)" />
      <ColorPicker label="HSLA Format" format="hsla" defaultValue="hsla(217, 91%, 60%, 1)" showAlpha />
    </div>
  ),
};

export const ControlledComponent: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6');
    
    return (
      <div className="space-y-4">
        <ColorPicker 
          label="Kontrollierter Farbwähler" 
          value={color} 
          onChange={setColor} 
        />
        
        <div className="p-4 bg-gray-100 rounded">
          <p>Ausgewählte Farbe: {color}</p>
          <div className="mt-2 flex space-x-2">
            <div 
              className="w-8 h-8 rounded-md border border-gray-300"
              style={{ backgroundColor: color }}
            ></div>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setColor('#ff0000')}
            >
              Rot
            </button>
            <button 
              className="px-3 py-1 bg-green-500 text-white rounded"
              onClick={() => setColor('#00ff00')}
            >
              Grün
            </button>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setColor('#0000ff')}
            >
              Blau
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithCustomClasses: Story = {
  args: {
    label: 'Farbwähler mit benutzerdefinierten Klassen',
    defaultValue: '#3b82f6',
    className: 'border-2 border-blue-500',
    popupClassName: 'border-2 border-blue-500',
    pickerClassName: 'bg-blue-50 p-2 rounded',
    presetsClassName: 'bg-gray-50 p-2 rounded',
    gradientClassName: 'border-2 border-blue-300',
    alphaClassName: 'border-2 border-blue-300',
    inputClassName: 'border-2 border-blue-300',
  },
};