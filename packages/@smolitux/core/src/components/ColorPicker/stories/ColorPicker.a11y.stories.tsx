import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '../';

const meta: Meta<typeof ColorPicker.A11y> = {
  title: 'Core/ColorPicker/A11y',
  component: ColorPicker.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version des ColorPickers mit verbesserten ARIA-Attributen und Screenreader-Unterstützung.'
      }
    }
  },
  argTypes: {
    value: { control: 'color' },
    onChange: { action: 'changed' },
    allowAlpha: { control: 'boolean' },
    disabled: { control: 'boolean' },
    popupPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right']
    },
    format: {
      control: { type: 'select' },
      options: ['hex', 'rgb', 'hsl']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    accessibleLabel: { control: 'text' },
    accessibleDescription: { control: 'text' },
    a11yTexts: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof ColorPicker.A11y>;

export const Default: Story = {
  args: {
    label: 'Wähle eine Farbe',
    value: '#3182ce',
    accessibleLabel: 'Farbauswahl für den Hintergrund',
    accessibleDescription: 'Klicken Sie, um den Farbwähler zu öffnen'
  }
};

export const WithAlpha: Story = {
  args: {
    label: 'Wähle eine Farbe mit Transparenz',
    value: 'rgba(49, 130, 206, 0.5)',
    allowAlpha: true,
    accessibleLabel: 'Farbauswahl mit Transparenz',
    accessibleDescription: 'Klicken Sie, um den Farbwähler zu öffnen und die Transparenz einzustellen'
  }
};

export const WithPresetColors: Story = {
  args: {
    label: 'Wähle eine Farbe aus den Voreinstellungen',
    value: '#3182ce',
    presetColors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'],
    accessibleLabel: 'Farbauswahl aus Voreinstellungen',
    accessibleDescription: 'Klicken Sie, um den Farbwähler zu öffnen und eine voreingestellte Farbe auszuwählen'
  }
};

export const WithError: Story = {
  args: {
    label: 'Wähle eine Farbe',
    value: '#3182ce',
    error: 'Bitte wähle eine andere Farbe',
    accessibleLabel: 'Farbauswahl mit Fehler',
    accessibleDescription: 'Es ist ein Fehler aufgetreten. Bitte wählen Sie eine andere Farbe.'
  }
};

export const Required: Story = {
  args: {
    label: 'Wähle eine Farbe',
    value: '#3182ce',
    required: true,
    accessibleLabel: 'Erforderliche Farbauswahl',
    accessibleDescription: 'Dieses Feld ist erforderlich. Bitte wählen Sie eine Farbe aus.'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Wähle eine Farbe',
    value: '#3182ce',
    disabled: true,
    accessibleLabel: 'Deaktivierte Farbauswahl',
    accessibleDescription: 'Diese Farbauswahl ist derzeit deaktiviert und kann nicht geändert werden.'
  }
};

export const CustomA11yTexts: Story = {
  args: {
    label: 'Wähle eine Farbe',
    value: '#3182ce',
    accessibleLabel: 'Farbauswahl mit benutzerdefinierten Texten',
    accessibleDescription: 'Klicken Sie, um den Farbwähler zu öffnen',
    a11yTexts: {
      dialogTitle: 'Farbe auswählen',
      colorInputLabel: 'Farbwert',
      alphaSliderLabel: 'Durchsichtigkeit',
      presetColorsLabel: 'Farbpalette',
      closeButtonLabel: 'Farbwähler schließen',
      currentColorLabel: 'Gewählte Farbe',
      colorValueLabel: 'Farbcode',
      requiredLabel: 'Pflichtfeld'
    }
  }
};

export const Interactive: Story = {
  render: (args) => {
    const [color, setColor] = useState('#3182ce');
    return (
      <div className="p-4">
        <ColorPicker.A11y
          {...args}
          value={color}
          onChange={(newColor) => {
            setColor(newColor);
            args.onChange?.(newColor);
          }}
        />
        <div className="mt-4">
          <p>Ausgewählte Farbe: {color}</p>
          <div
            className="mt-2 w-full h-20 border border-gray-300 rounded-md"
            style={{ backgroundColor: color }}
            aria-label="Farbvorschau"
          />
        </div>
      </div>
    );
  },
  args: {
    label: 'Wähle eine Farbe',
    accessibleLabel: 'Interaktive Farbauswahl',
    accessibleDescription: 'Wählen Sie eine Farbe aus. Die Vorschau wird automatisch aktualisiert.'
  }
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ColorPicker.A11y
        label="Extra Small"
        value="#3182ce"
        size="xs"
        accessibleLabel="Sehr kleine Farbauswahl"
      />
      <ColorPicker.A11y
        label="Small"
        value="#3182ce"
        size="sm"
        accessibleLabel="Kleine Farbauswahl"
      />
      <ColorPicker.A11y
        label="Medium"
        value="#3182ce"
        size="md"
        accessibleLabel="Mittlere Farbauswahl"
      />
      <ColorPicker.A11y
        label="Large"
        value="#3182ce"
        size="lg"
        accessibleLabel="Große Farbauswahl"
      />
      <ColorPicker.A11y
        label="Extra Large"
        value="#3182ce"
        size="xl"
        accessibleLabel="Sehr große Farbauswahl"
      />
    </div>
  )
};

export const DifferentFormats: Story = {
  render: () => (
    <div className="space-y-4">
      <ColorPicker.A11y
        label="HEX Format"
        value="#3182ce"
        format="hex"
        accessibleLabel="Farbauswahl im HEX-Format"
        accessibleDescription="Zeigt den Farbwert im Hexadezimal-Format an (z.B. #3182ce)"
      />
      <ColorPicker.A11y
        label="RGB Format"
        value="rgb(49, 130, 206)"
        format="rgb"
        accessibleLabel="Farbauswahl im RGB-Format"
        accessibleDescription="Zeigt den Farbwert im RGB-Format an (z.B. rgb(49, 130, 206))"
      />
      <ColorPicker.A11y
        label="HSL Format"
        value="hsl(210, 64%, 50%)"
        format="hsl"
        accessibleLabel="Farbauswahl im HSL-Format"
        accessibleDescription="Zeigt den Farbwert im HSL-Format an (z.B. hsl(210, 64%, 50%))"
      />
    </div>
  )
};