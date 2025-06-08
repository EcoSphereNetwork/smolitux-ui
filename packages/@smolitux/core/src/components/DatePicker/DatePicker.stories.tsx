import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Core/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
    },
    format: {
      control: { type: 'select' },
      options: ['yyyy-MM-dd', 'dd.MM.yyyy', 'MM/dd/yyyy'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    popupPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'auto'],
    },
    firstDayOfWeek: {
      control: { type: 'radio' },
      options: [0, 1],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    allowKeyboardInput: { control: 'boolean' },
    allowManualInput: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    showTodayButton: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Datum auswählen',
    placeholder: 'YYYY-MM-DD',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Geburtsdatum',
    defaultValue: new Date('1990-01-01'),
    format: 'dd.MM.yyyy',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Anreisedatum',
    helperText: 'Bitte wählen Sie Ihr Anreisedatum',
    format: 'dd.MM.yyyy',
  },
};

export const WithError: Story = {
  args: {
    label: 'Anreisedatum',
    error: 'Bitte wählen Sie ein gültiges Datum',
    format: 'dd.MM.yyyy',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Datum (deaktiviert)',
    defaultValue: new Date(),
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Datum (nur lesen)',
    defaultValue: new Date(),
    readOnly: true,
  },
};

export const DateRange: Story = {
  args: {
    label: 'Zeitraum auswählen',
    selectionMode: 'range',
    placeholder: 'YYYY-MM-DD - YYYY-MM-DD',
  },
};

export const WithMinMaxDates: Story = {
  args: {
    label: 'Datum auswählen',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    helperText: 'Nur Daten im aktuellen Monat sind verfügbar',
  },
};

export const WithCustomFormat: Story = {
  args: {
    label: 'Datum auswählen',
    format: 'dd.MM.yyyy',
    placeholder: 'TT.MM.JJJJ',
  },
};

export const WithTodayAndClearButtons: Story = {
  args: {
    label: 'Datum auswählen',
    showTodayButton: true,
    showClearButton: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Datum auswählen',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <DatePicker label="Small" size="sm" />
      <DatePicker label="Medium (Default)" size="md" />
      <DatePicker label="Large" size="lg" />
    </div>
  ),
};

export const ControlledComponent: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div className="space-y-4">
        <DatePicker
          label="Kontrolliertes Datum"
          value={date}
          onChange={(newDate) => {
            if (!Array.isArray(newDate)) {
              setDate(newDate);
            }
          }}
        />

        <div className="p-4 bg-gray-100 rounded">
          <p>Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}</p>
          <div className="mt-2 flex space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setDate(new Date())}
            >
              Heute
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={() => setDate(null)}
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const ControlledDateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    return (
      <div className="space-y-4">
        <DatePicker
          label="Kontrollierter Datumsbereich"
          selectionMode="range"
          value={dateRange}
          onChange={(newRange) => {
            if (Array.isArray(newRange)) {
              setDateRange(newRange);
            }
          }}
        />

        <div className="p-4 bg-gray-100 rounded">
          <p>Ausgewählter Bereich:</p>
          <p>Start: {dateRange[0] ? dateRange[0].toLocaleDateString() : 'Nicht ausgewählt'}</p>
          <p>Ende: {dateRange[1] ? dateRange[1].toLocaleDateString() : 'Nicht ausgewählt'}</p>
          <div className="mt-2 flex space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => {
                const today = new Date();
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                setDateRange([today, nextWeek]);
              }}
            >
              Diese Woche
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={() => setDateRange([null, null])}
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithCustomWeekdayLabels: Story = {
  args: {
    label: 'Datum auswählen',
    weekDayLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
};

export const WithCustomMonthLabels: Story = {
  args: {
    label: 'Datum auswählen',
    monthLabels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
};
