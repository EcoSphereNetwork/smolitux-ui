import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../Dropdown';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Core/Overlay/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob das Dropdown geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn das Dropdown geschlossen wird',
    },
    trigger: {
      description: 'Das Element, das das Dropdown auslöst',
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'right',
          'right-start',
          'right-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
        ],
      },
      description: 'Die Platzierung des Dropdowns relativ zum Trigger',
    },
    offset: {
      control: 'array',
      description: 'Der Offset des Dropdowns [x, y]',
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Gibt an, ob das Dropdown geschlossen werden soll, wenn außerhalb geklickt wird',
    },
    closeOnEsc: {
      control: 'boolean',
      description:
        'Gibt an, ob das Dropdown geschlossen werden soll, wenn die Escape-Taste gedrückt wird',
    },
    closeOnSelect: {
      control: 'boolean',
      description:
        'Gibt an, ob das Dropdown geschlossen werden soll, wenn ein Element ausgewählt wird',
    },
    autoSelect: {
      control: 'boolean',
      description: 'Gibt an, ob das erste Element automatisch ausgewählt werden soll',
    },
    returnFocusOnClose: {
      control: 'boolean',
      description:
        'Gibt an, ob der Fokus zurückgesetzt werden soll, wenn das Dropdown geschlossen wird',
    },
    matchWidth: {
      control: 'boolean',
      description:
        'Gibt an, ob die Breite des Dropdowns an die Breite des Triggers angepasst werden soll',
    },
    gutter: {
      control: 'number',
      description: 'Der Abstand zwischen dem Dropdown und dem Trigger',
    },
    flip: {
      control: 'boolean',
      description:
        'Gibt an, ob das Dropdown umgedreht werden soll, wenn nicht genügend Platz vorhanden ist',
    },
    preventOverflow: {
      control: 'boolean',
      description:
        'Gibt an, ob das Dropdown so positioniert werden soll, dass es nicht über den Viewport hinausragt',
    },
    boundary: {
      control: 'text',
      description: 'Die Grenze für die Positionierung des Dropdowns',
    },
    strategy: {
      control: {
        type: 'select',
        options: ['absolute', 'fixed'],
      },
      description: 'Die Positionierungsstrategie des Dropdowns',
    },
    modifiers: {
      description: 'Benutzerdefinierte Modifikatoren für die Positionierung des Dropdowns',
    },
    portal: {
      control: 'boolean',
      description: 'Gibt an, ob das Dropdown in einem Portal gerendert werden soll',
    },
    initialFocusRef: {
      description: 'Ref zum Element, das den initialen Fokus erhalten soll',
    },
    finalFocusRef: {
      description:
        'Ref zum Element, das den Fokus erhalten soll, wenn das Dropdown geschlossen wird',
    },
    children: {
      description: 'Der Inhalt des Dropdowns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={<Button onClick={() => setIsOpen(!isOpen)}>Dropdown öffnen</Button>}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 1
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 2
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 3
          </div>
        </div>
      </Dropdown>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<string>('bottom');

    const placements = [
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {placements.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={p === placement ? 'primary' : 'outline'}
              onClick={() => setPlacement(p)}
            >
              {p}
            </Button>
          ))}
        </div>

        <div className="flex justify-center items-center h-[200px]">
          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement={placement as any}
            trigger={<Button onClick={() => setIsOpen(!isOpen)}>Platzierung: {placement}</Button>}
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                Option 1
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                Option 2
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                Option 3
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export const WithOffset: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [offset, setOffset] = React.useState([0, 10]);

    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">X-Offset:</label>
            <input
              type="number"
              value={offset[0]}
              onChange={(e) => setOffset([parseInt(e.target.value), offset[1]])}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Y-Offset:</label>
            <input
              type="number"
              value={offset[1]}
              onChange={(e) => setOffset([offset[0], parseInt(e.target.value)])}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>

        <Dropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          offset={offset}
          trigger={
            <Button onClick={() => setIsOpen(!isOpen)}>
              Offset: [{offset[0]}, {offset[1]}]
            </Button>
          }
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option 1
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option 2
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option 3
            </div>
          </div>
        </Dropdown>
      </div>
    );
  },
};

export const WithMatchWidth: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <Dropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          matchWidth
          trigger={
            <Button onClick={() => setIsOpen(!isOpen)} className="w-[300px]">
              Dropdown mit angepasster Breite
            </Button>
          }
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option mit sehr langem Text, der die Breite des Triggers überschreiten würde
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option 2
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Option 3
            </div>
          </div>
        </Dropdown>
      </div>
    );
  },
};

export const WithCloseOnSelect: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [closeOnSelect, setCloseOnSelect] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

    const handleSelect = (option: string) => {
      setSelectedOption(option);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="closeOnSelect"
            checked={closeOnSelect}
            onChange={(e) => setCloseOnSelect(e.target.checked)}
          />
          <label htmlFor="closeOnSelect">Bei Auswahl schließen</label>
        </div>

        <Dropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnSelect={closeOnSelect}
          trigger={
            <Button onClick={() => setIsOpen(!isOpen)}>
              {selectedOption || 'Wählen Sie eine Option'}
            </Button>
          }
        >
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
            <div
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect('Option 1')}
            >
              Option 1
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect('Option 2')}
            >
              Option 2
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect('Option 3')}
            >
              Option 3
            </div>
          </div>
        </Dropdown>
      </div>
    );
  },
};

export const WithNestedDropdowns: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSubOpen, setIsSubOpen] = React.useState(false);

    return (
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={<Button onClick={() => setIsOpen(!isOpen)}>Hauptmenü</Button>}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 1
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 2
          </div>
          <div className="relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <Dropdown
              isOpen={isSubOpen}
              onClose={() => setIsSubOpen(false)}
              placement="right-start"
              trigger={
                <div
                  className="flex justify-between items-center w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubOpen(!isSubOpen);
                  }}
                >
                  <span>Untermenü</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            >
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[200px]">
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Unteroption 1
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Unteroption 2
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  Unteroption 3
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Option 3
          </div>
        </div>
      </Dropdown>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Benutzerdefiniertes Styling
          </Button>
        }
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-md py-2 min-w-[200px]">
          <div className="px-4 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer">
            Option 1
          </div>
          <div className="px-4 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer">
            Option 2
          </div>
          <div className="px-4 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer">
            Option 3
          </div>
        </div>
      </Dropdown>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    const options = [
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Elderberry',
      'Fig',
      'Grape',
      'Honeydew',
      'Kiwi',
      'Lemon',
      'Mango',
      'Nectarine',
      'Orange',
      'Papaya',
      'Quince',
    ];

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={<Button onClick={() => setIsOpen(!isOpen)}>Dropdown mit Suche</Button>}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 min-w-[250px]">
          <div className="px-3 pb-2">
            <input
              type="text"
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    console.log(`Selected: ${option}`);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    );
  },
};
