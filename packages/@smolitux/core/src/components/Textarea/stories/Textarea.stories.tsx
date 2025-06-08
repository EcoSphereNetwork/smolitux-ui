import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Core/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      description: 'Die Größe des Textareas',
    },
    variant: {
      control: {
        type: 'select',
        options: ['outline', 'filled', 'flushed', 'unstyled'],
      },
      description: 'Die Variante des Textareas',
    },
    placeholder: {
      control: 'text',
      description: 'Der Platzhaltertext des Textareas',
    },
    value: {
      control: 'text',
      description: 'Der Wert des Textareas (kontrollierte Komponente)',
    },
    defaultValue: {
      control: 'text',
      description: 'Der Standardwert des Textareas (unkontrollierte Komponente)',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob das Textarea deaktiviert ist',
    },
    readOnly: {
      control: 'boolean',
      description: 'Gibt an, ob das Textarea schreibgeschützt ist',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Gibt an, ob das Textarea ungültig ist',
    },
    isRequired: {
      control: 'boolean',
      description: 'Gibt an, ob das Textarea erforderlich ist',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der Wert ändert',
    },
    onFocus: {
      action: 'focused',
      description: 'Callback, der aufgerufen wird, wenn das Textarea fokussiert wird',
    },
    onBlur: {
      action: 'blurred',
      description: 'Callback, der aufgerufen wird, wenn das Textarea den Fokus verliert',
    },
    resize: {
      control: {
        type: 'select',
        options: ['none', 'horizontal', 'vertical', 'both'],
      },
      description: 'Die Resize-Eigenschaft des Textareas',
    },
    rows: {
      control: 'number',
      description: 'Die Anzahl der Zeilen des Textareas',
    },
    cols: {
      control: 'number',
      description: 'Die Anzahl der Spalten des Textareas',
    },
    maxLength: {
      control: 'number',
      description: 'Die maximale Länge des Textareas',
    },
    minLength: {
      control: 'number',
      description: 'Die minimale Länge des Textareas',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    placeholder: 'Bitte Text eingeben',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Textarea size="xs" placeholder="Extra Small" />
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Textarea variant="outline" placeholder="Outline (Standard)" />
      <Textarea variant="filled" placeholder="Filled" />
      <Textarea variant="flushed" placeholder="Flushed" />
      <Textarea variant="unstyled" placeholder="Unstyled" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <Textarea placeholder="Standard" />
      <Textarea placeholder="Disabled" disabled />
      <Textarea
        placeholder="Read Only"
        readOnly
        defaultValue="Dieser Text kann nicht geändert werden"
      />
      <Textarea placeholder="Invalid" isInvalid />
      <Textarea placeholder="Required" isRequired />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Dies ist ein Standardtext, der bereits im Textarea steht.',
    placeholder: 'Bitte Text eingeben',
  },
};

export const Resize: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div>
        <div className="mb-1 font-medium">Keine Größenänderung:</div>
        <Textarea resize="none" placeholder="Keine Größenänderung möglich" />
      </div>
      <div>
        <div className="mb-1 font-medium">Horizontale Größenänderung:</div>
        <Textarea resize="horizontal" placeholder="Nur horizontale Größenänderung möglich" />
      </div>
      <div>
        <div className="mb-1 font-medium">Vertikale Größenänderung:</div>
        <Textarea resize="vertical" placeholder="Nur vertikale Größenänderung möglich" />
      </div>
      <div>
        <div className="mb-1 font-medium">Beide Richtungen (Standard):</div>
        <Textarea resize="both" placeholder="Größenänderung in beide Richtungen möglich" />
      </div>
    </div>
  ),
};

export const WithRowsAndCols: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Textarea rows={3} cols={40} placeholder="3 Zeilen, 40 Spalten" />
      <Textarea rows={5} cols={40} placeholder="5 Zeilen, 40 Spalten" />
      <Textarea rows={10} cols={40} placeholder="10 Zeilen, 40 Spalten" />
    </div>
  ),
};

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const maxLength = 100;

    return (
      <div className="flex flex-col space-y-2 w-80">
        <Textarea
          placeholder="Maximal 100 Zeichen"
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="text-sm text-right">
          {value.length}/{maxLength} Zeichen
        </div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(true);
    const minLength = 10;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setIsValid(newValue.length >= minLength || newValue.length === 0);
    };

    return (
      <div className="flex flex-col space-y-2 w-80">
        <Textarea
          placeholder="Mindestens 10 Zeichen"
          value={value}
          onChange={handleChange}
          isInvalid={!isValid && value !== ''}
        />
        {!isValid && value !== '' && (
          <div className="text-red-500 text-sm">
            Bitte geben Sie mindestens {minLength} Zeichen ein
          </div>
        )}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col space-y-4 w-80">
        <Textarea
          placeholder="Kontrolliertes Textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          <div className="font-medium mb-1">Aktueller Wert:</div>
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">{value || '(leer)'}</div>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setValue('')}
        >
          Zurücksetzen
        </button>
      </div>
    );
  },
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    return (
      <div className="flex flex-col space-y-4 w-80">
        <div className="font-medium mb-1">Auto-resize Textarea:</div>
        <Textarea
          ref={textareaRef}
          placeholder="Tippen Sie etwas ein, um das Textarea automatisch zu vergrößern..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          resize="none"
          rows={1}
          className="overflow-hidden"
        />
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <Textarea
      placeholder="Benutzerdefiniertes Styling"
      className="border-purple-500 focus:border-purple-700 focus:ring-purple-500 bg-purple-50"
    />
  ),
};
