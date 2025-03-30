import type { Meta, StoryObj } from '@storybook/react';
import TimePicker from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Core/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: { type: 'radio' },
      options: ['12h', '24h'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    minuteStep: {
      control: { type: 'number' },
      min: 1,
      max: 30,
    },
    secondStep: {
      control: { type: 'number' },
      min: 1,
      max: 30,
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    hideSeconds: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: 'Zeit auswählen',
    placeholder: 'HH:MM',
  },
};

export const Format24h: Story = {
  args: {
    label: 'Zeit (24h)',
    format: '24h',
    defaultValue: { hours: 14, minutes: 30 },
  },
};

export const Format12h: Story = {
  args: {
    label: 'Zeit (12h)',
    format: '12h',
    defaultValue: { hours: 2, minutes: 30, period: 'PM' },
  },
};

export const WithSeconds: Story = {
  args: {
    label: 'Zeit mit Sekunden',
    hideSeconds: false,
    defaultValue: { hours: 14, minutes: 30, seconds: 45 },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Besprechungszeit',
    helperText: 'Bitte wählen Sie die Startzeit für Ihre Besprechung',
    format: '24h',
  },
};

export const WithError: Story = {
  args: {
    label: 'Besprechungszeit',
    error: 'Bitte wählen Sie eine gültige Zeit',
    format: '24h',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Zeit (deaktiviert)',
    defaultValue: { hours: 14, minutes: 30 },
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Zeit (nur lesen)',
    defaultValue: { hours: 14, minutes: 30 },
    readOnly: true,
  },
};

export const CustomSteps: Story = {
  args: {
    label: 'Zeit mit benutzerdefinierten Schritten',
    minuteStep: 15,
    secondStep: 30,
    hideSeconds: false,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Zeit auswählen',
    leftIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <TimePicker label="Small" size="sm" />
      <TimePicker label="Medium (Default)" size="md" />
      <TimePicker label="Large" size="lg" />
    </div>
  ),
};

export const ControlledComponent: Story = {
  render: () => {
    const [time, setTime] = useState({ hours: 10, minutes: 30 });
    
    return (
      <div className="space-y-4">
        <TimePicker 
          label="Kontrollierte Zeit" 
          value={time} 
          onChange={setTime} 
        />
        
        <div className="p-4 bg-gray-100 rounded">
          <p>Ausgewählte Zeit: {time.hours}:{time.minutes.toString().padStart(2, '0')}</p>
          <div className="mt-2 flex space-x-2">
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => {
                const now = new Date();
                setTime({
                  hours: now.getHours(),
                  minutes: now.getMinutes(),
                  seconds: now.getSeconds()
                });
              }}
            >
              Jetzt
            </button>
            <button 
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={() => setTime({ hours: 0, minutes: 0 })}
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithMinMaxTime: Story = {
  args: {
    label: 'Geschäftszeiten',
    minTime: { hours: 9, minutes: 0 },
    maxTime: { hours: 17, minutes: 0 },
    helperText: 'Wählen Sie eine Zeit zwischen 9:00 und 17:00 Uhr',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    label: 'Zeit auswählen',
    placeholder: 'Uhrzeit eingeben...',
  },
};