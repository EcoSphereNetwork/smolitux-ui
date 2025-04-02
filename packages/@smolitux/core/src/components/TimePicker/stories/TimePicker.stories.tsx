import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Core/Forms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Der ausgewählte Zeitwert',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardzeitwert',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich die Zeit ändert',
    },
    format: {
      control: 'text',
      description: 'Das Format der Zeit',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Gibt an, ob Sekunden angezeigt werden sollen',
    },
    use12Hours: {
      control: 'boolean',
      description: 'Gibt an, ob das 12-Stunden-Format verwendet werden soll',
    },
    hourStep: {
      control: 'number',
      description: 'Die Schrittweite für Stunden',
    },
    minuteStep: {
      control: 'number',
      description: 'Die Schrittweite für Minuten',
    },
    secondStep: {
      control: 'number',
      description: 'Die Schrittweite für Sekunden',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der TimePicker deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob der TimePicker schreibgeschützt ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob der TimePicker ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob der TimePicker erforderlich ist',
    },
    placeholder: {
      control: 'text',
      description: 'Der Platzhaltertext des TimePickers',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des TimePickers',
    },
    placement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
      description: 'Die Platzierung des Poppers',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Basic: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30:00');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          showSeconds
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const With12HourFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('02:30 PM');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          use12Hours
          format="hh:mm A"
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const With12HourFormatAndSeconds: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('02:30:15 PM');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          use12Hours
          showSeconds
          format="hh:mm:ss A"
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const WithCustomSteps: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          hourStep={2}
          minuteStep={15}
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
        <div className="text-sm text-gray-500">
          Stunden-Schrittweite: 2, Minuten-Schrittweite: 15
        </div>
      </div>
    );
  },
};

export const WithCustomFormat: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          format="HH.mm"
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Small</h3>
        <TimePicker
          defaultValue="14:30"
          size="sm"
          placeholder="Zeit auswählen"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
        <TimePicker
          defaultValue="14:30"
          size="md"
          placeholder="Zeit auswählen"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Large</h3>
        <TimePicker
          defaultValue="14:30"
          size="lg"
          placeholder="Zeit auswählen"
        />
      </div>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Top</h3>
        <TimePicker
          defaultValue="14:30"
          placement="top"
          placeholder="Zeit auswählen"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Right</h3>
        <TimePicker
          defaultValue="14:30"
          placement="right"
          placeholder="Zeit auswählen"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Bottom (Standard)</h3>
        <TimePicker
          defaultValue="14:30"
          placement="bottom"
          placeholder="Zeit auswählen"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Left</h3>
        <TimePicker
          defaultValue="14:30"
          placement="left"
          placeholder="Zeit auswählen"
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: '14:30',
    disabled: true,
    placeholder: 'Zeit auswählen',
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: '14:30',
    readOnly: true,
    placeholder: 'Zeit auswählen',
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: '14:30',
    isInvalid: true,
    placeholder: 'Zeit auswählen',
  },
};

export const Required: Story = {
  args: {
    defaultValue: '14:30',
    isRequired: true,
    placeholder: 'Zeit auswählen (erforderlich)',
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <TimePicker
      defaultValue="14:30"
      className="border-purple-500 focus:border-purple-600 focus:ring-purple-600"
      placeholder="Zeit auswählen"
    />
  ),
};

export const WithClearButton: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30');
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          allowClear
          placeholder="Zeit auswählen"
        />
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const WithTimeRangeValidation: Story = {
  render: () => {
    const [time, setTime] = React.useState<string | null>('14:30');
    const [isValid, setIsValid] = React.useState(true);
    
    const handleChange = (value: string | null) => {
      setTime(value);
      
      if (value) {
        const [hours, minutes] = value.split(':').map(Number);
        const isBusinessHours = hours >= 9 && (hours < 17 || (hours === 17 && minutes === 0));
        setIsValid(isBusinessHours);
      } else {
        setIsValid(true);
      }
    };
    
    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={handleChange}
          isInvalid={!isValid}
          placeholder="Geschäftszeit auswählen (9:00 - 17:00)"
        />
        {!isValid && (
          <div className="text-red-500 text-sm">
            Bitte wählen Sie eine Zeit zwischen 9:00 und 17:00 Uhr.
          </div>
        )}
        <div>
          Ausgewählte Zeit: {time || 'Keine'}
        </div>
      </div>
    );
  },
};

export const WithDateTimePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    const [time, setTime] = React.useState<string | null>('14:30');
    
    const combinedDateTime = React.useMemo(() => {
      if (!date || !time) return null;
      
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      
      return newDate;
    }, [date, time]);
    
    return (
      <div className="space-y-6 w-[350px]">
        <h3 className="text-lg font-medium">Datum und Zeit auswählen</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Datum</label>
            <input
              type="date"
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Zeit</label>
            <TimePicker
              value={time}
              onChange={setTime}
              placeholder="Zeit auswählen"
            />
          </div>
        </div>
        
        {combinedDateTime && (
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
            <div className="font-medium">Ausgewählter Termin:</div>
            <div>{combinedDateTime.toLocaleString()}</div>
          </div>
        )}
      </div>
    );
  },
};

export const AppointmentScheduler: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<string>(
      new Date().toISOString().split('T')[0]
    );
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    
    // Verfügbare Zeitslots
    const availableTimeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
    
    // Simuliere bereits gebuchte Zeitslots
    const bookedTimeSlots = ['10:00', '13:30', '15:00'];
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
    };
    
    return (
      <div className="w-[400px] p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-6">Termin vereinbaren</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="date">
                Datum
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Verfügbare Zeitslots
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableTimeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    disabled={bookedTimeSlots.includes(time)}
                    className={`py-2 px-3 text-sm rounded-md ${
                      selectedTime === time
                        ? 'bg-blue-500 text-white'
                        : bookedTimeSlots.includes(time)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!selectedTime}
              className={`w-full py-2 px-4 rounded-md ${
                selectedTime
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Termin buchen
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              <p className="font-medium">Termin erfolgreich gebucht!</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Termindetails:</h3>
              <p>Name: {name}</p>
              <p>E-Mail: {email}</p>
              <p>Datum: {new Date(selectedDate).toLocaleDateString()}</p>
              <p>Zeit: {selectedTime}</p>
            </div>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Neuen Termin buchen
            </button>
          </div>
        )}
      </div>
    );
  },
};