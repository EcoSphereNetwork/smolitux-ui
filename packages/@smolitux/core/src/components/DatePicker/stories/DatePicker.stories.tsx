import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Core/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'Der ausgewählte Datumswert',
    },
    defaultValue: {
      control: 'date',
      description: 'Der Standarddatumswert',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich das Datum ändert',
    },
    minDate: {
      control: 'date',
      description: 'Das früheste auswählbare Datum',
    },
    maxDate: {
      control: 'date',
      description: 'Das späteste auswählbare Datum',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker schreibgeschützt ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker erforderlich ist',
    },
    placeholder: {
      control: 'text',
      description: 'Der Platzhaltertext des DatePickers',
    },
    format: {
      control: 'text',
      description: 'Das Format des Datums',
    },
    locale: {
      control: 'text',
      description: 'Die Sprache des DatePickers',
    },
    showWeekNumbers: {
      control: 'boolean',
      description: 'Gibt an, ob Wochennummern angezeigt werden sollen',
    },
    showMonthDropdown: {
      control: 'boolean',
      description: 'Gibt an, ob ein Dropdown für Monate angezeigt werden soll',
    },
    showYearDropdown: {
      control: 'boolean',
      description: 'Gibt an, ob ein Dropdown für Jahre angezeigt werden soll',
    },
    showTimeSelect: {
      control: 'boolean',
      description: 'Gibt an, ob eine Zeitauswahl angezeigt werden soll',
    },
    timeFormat: {
      control: 'text',
      description: 'Das Format der Zeit',
    },
    timeIntervals: {
      control: 'number',
      description: 'Die Intervalle der Zeitauswahl in Minuten',
    },
    dateFormat: {
      control: 'text',
      description: 'Das Format des Datums',
    },
    monthsShown: {
      control: 'number',
      description: 'Die Anzahl der angezeigten Monate',
    },
    openToDate: {
      control: 'date',
      description: 'Das Datum, zu dem der Kalender geöffnet wird',
    },
    popperPlacement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left', 'auto'],
      },
      description: 'Die Platzierung des Poppers',
    },
    popperModifiers: {
      description: 'Modifikatoren für den Popper',
    },
    highlightDates: {
      description: 'Daten, die hervorgehoben werden sollen',
    },
    excludeDates: {
      description: 'Daten, die ausgeschlossen werden sollen',
    },
    includeDates: {
      description: 'Daten, die eingeschlossen werden sollen',
    },
    filterDate: {
      description: 'Funktion zum Filtern von Daten',
    },
    inline: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker inline angezeigt werden soll',
    },
    fixedHeight: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker eine feste Höhe haben soll',
    },
    calendarClassName: {
      control: 'text',
      description: 'Die CSS-Klasse des Kalenders',
    },
    dayClassName: {
      description: 'Funktion zum Bestimmen der CSS-Klasse eines Tages',
    },
    monthClassName: {
      description: 'Funktion zum Bestimmen der CSS-Klasse eines Monats',
    },
    yearClassName: {
      description: 'Funktion zum Bestimmen der CSS-Klasse eines Jahres',
    },
    timeClassName: {
      description: 'Funktion zum Bestimmen der CSS-Klasse einer Zeit',
    },
    className: {
      control: 'text',
      description: 'Die CSS-Klasse des DatePickers',
    },
    todayButton: {
      control: 'text',
      description: 'Text für den Heute-Button',
    },
    isClearable: {
      control: 'boolean',
      description: 'Gibt an, ob der DatePicker löschbar ist',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 5);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Datum auswählen"
          dateFormat="dd.MM.yyyy"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
        <div className="text-sm text-gray-500">
          Erlaubter Bereich: {minDate.toLocaleDateString()} bis {maxDate.toLocaleDateString()}
        </div>
      </div>
    );
  },
};

export const WithTimeSelect: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd.MM.yyyy HH:mm"
          placeholderText="Datum und Zeit auswählen"
        />
        <div>
          Ausgewähltes Datum und Zeit: {date ? date.toLocaleString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithTimeSelectOnly: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Zeit"
          dateFormat="HH:mm"
          placeholderText="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Keine'}
        </div>
      </div>
    );
  },
};

export const WithMonthYearDropdowns: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showWeekNumbers
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithMultipleMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          monthsShown={2}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithRangeSelection: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    
    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div>
            <div className="mb-1 font-medium">Startdatum</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd.MM.yyyy"
              placeholderText="Startdatum"
            />
          </div>
          <div>
            <div className="mb-1 font-medium">Enddatum</div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd.MM.yyyy"
              placeholderText="Enddatum"
            />
          </div>
        </div>
        <div>
          Ausgewählter Zeitraum: {startDate ? startDate.toLocaleDateString() : 'Keins'} bis {endDate ? endDate.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithHighlightedDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    // Erstelle ein Array von Daten für die nächsten 5 Tage
    const highlightDates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      highlightDates.push(date);
    }
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          highlightDates={highlightDates}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
        <div className="text-sm text-gray-500">
          Die nächsten 5 Tage sind hervorgehoben.
        </div>
      </div>
    );
  },
};

export const WithExcludedDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    // Erstelle ein Array von Daten für die nächsten 5 Wochenenden
    const excludeDates: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() === 0 || date.getDay() === 6) {
        excludeDates.push(date);
      }
    }
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          excludeDates={excludeDates}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
        <div className="text-sm text-gray-500">
          Wochenenden sind ausgeschlossen.
        </div>
      </div>
    );
  },
};

export const WithFilterDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    // Filterfunktion: Nur Werktage zulassen
    const isWeekday = (date: Date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          filterDate={isWeekday}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
        <div className="text-sm text-gray-500">
          Nur Werktage (Montag bis Freitag) können ausgewählt werden.
        </div>
      </div>
    );
  },
};

export const Inline: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          inline
          dateFormat="dd.MM.yyyy"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithTodayButton: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(null);
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          todayButton="Heute"
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          isClearable
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const WithCustomStyles: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    
    // Funktion zum Bestimmen der CSS-Klasse eines Tages
    const getDayClassName = (date: Date) => {
      return date.getDay() === 0 || date.getDay() === 6
        ? 'bg-red-100 text-red-800'
        : undefined;
    };
    
    return (
      <div className="space-y-4">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="Datum auswählen"
          dayClassName={getDayClassName}
          calendarClassName="bg-blue-50 border border-blue-200 rounded-lg shadow-lg"
          className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <div>
          Ausgewähltes Datum: {date ? date.toLocaleDateString() : 'Keins'}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      selected={new Date()}
      onChange={() => {}}
      disabled
      dateFormat="dd.MM.yyyy"
      placeholderText="Datum auswählen"
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DatePicker
      selected={new Date()}
      onChange={() => {}}
      readOnly
      dateFormat="dd.MM.yyyy"
      placeholderText="Datum auswählen"
    />
  ),
};

export const Invalid: Story = {
  render: () => (
    <DatePicker
      selected={null}
      onChange={() => {}}
      isInvalid
      dateFormat="dd.MM.yyyy"
      placeholderText="Datum auswählen"
      className="border-red-500 focus:border-red-500 focus:ring-red-500"
    />
  ),
};

export const Required: Story = {
  render: () => (
    <DatePicker
      selected={null}
      onChange={() => {}}
      isRequired
      dateFormat="dd.MM.yyyy"
      placeholderText="Datum auswählen (erforderlich)"
    />
  ),
};