import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup } from '../Menu';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Menu> = {
  title: 'Core/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Gibt an, ob das Menü geöffnet ist',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn das Menü geschlossen wird',
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
      description: 'Die Platzierung des Menüs relativ zum Trigger',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Gibt an, ob das Menü geschlossen werden soll, wenn ein Element ausgewählt wird',
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Gibt an, ob das Menü geschlossen werden soll, wenn außerhalb geklickt wird',
    },
    autoSelect: {
      control: 'boolean',
      description: 'Gibt an, ob das erste Element automatisch ausgewählt werden soll',
    },
    children: {
      description: 'Der Inhalt des Menüs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü öffnen</MenuButton>
      <MenuList>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit Icons</MenuButton>
      <MenuList>
        <MenuItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          }
        >
          Home
        </MenuItem>
        <MenuItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Info
        </MenuItem>
        <MenuItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Hilfe
        </MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit Trennlinien</MenuButton>
      <MenuList>
        <MenuItem>Profil anzeigen</MenuItem>
        <MenuItem>Einstellungen</MenuItem>
        <MenuDivider />
        <MenuItem>Konto</MenuItem>
        <MenuItem>Abonnement</MenuItem>
        <MenuDivider />
        <MenuItem>Abmelden</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit Gruppen</MenuButton>
      <MenuList>
        <MenuGroup title="Profil">
          <MenuItem>Mein Konto</MenuItem>
          <MenuItem>Zahlungen</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Hilfe">
          <MenuItem>FAQ</MenuItem>
          <MenuItem>Support kontaktieren</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Rechtliches">
          <MenuItem>Datenschutz</MenuItem>
          <MenuItem>Nutzungsbedingungen</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit deaktivierten Optionen</MenuButton>
      <MenuList>
        <MenuItem>Option 1</MenuItem>
        <MenuItem isDisabled>Option 2 (Deaktiviert)</MenuItem>
        <MenuItem>Option 3</MenuItem>
        <MenuItem isDisabled>Option 4 (Deaktiviert)</MenuItem>
        <MenuItem>Option 5</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        rightIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Einstellungen
      </MenuButton>
      <MenuList>
        <MenuItem>Profil</MenuItem>
        <MenuItem>Konto</MenuItem>
        <MenuItem>Datenschutz</MenuItem>
        <MenuDivider />
        <MenuItem>Abmelden</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithCommandShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit Tastenkombinationen</MenuButton>
      <MenuList>
        <MenuItem command="⌘N">Neu</MenuItem>
        <MenuItem command="⌘O">Öffnen</MenuItem>
        <MenuItem command="⌘S">Speichern</MenuItem>
        <MenuDivider />
        <MenuItem command="⌘P">Drucken</MenuItem>
        <MenuItem command="⌘Q">Beenden</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithNestedMenus: Story = {
  render: () => (
    <Menu>
      <MenuButton as={Button}>Menü mit Untermenüs</MenuButton>
      <MenuList>
        <MenuItem>Home</MenuItem>
        <MenuItem>Profil</MenuItem>
        <Menu placement="right-start">
          <MenuButton
            as={MenuItem}
            rightIcon={
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
            }
          >
            Einstellungen
          </MenuButton>
          <MenuList>
            <MenuItem>Allgemein</MenuItem>
            <MenuItem>Sicherheit</MenuItem>
            <MenuItem>Benachrichtigungen</MenuItem>
            <Menu placement="right-start">
              <MenuButton
                as={MenuItem}
                rightIcon={
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
                }
              >
                Erweitert
              </MenuButton>
              <MenuList>
                <MenuItem>Entwickleroptionen</MenuItem>
                <MenuItem>Experimentelle Funktionen</MenuItem>
                <MenuItem>Debugging</MenuItem>
              </MenuList>
            </Menu>
          </MenuList>
        </Menu>
        <MenuDivider />
        <MenuItem>Abmelden</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Menu>
      <MenuButton
        as={Button}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        Benutzerdefiniertes Styling
      </MenuButton>
      <MenuList className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-xl">
        <MenuItem className="hover:bg-white hover:bg-opacity-20">Option 1</MenuItem>
        <MenuItem className="hover:bg-white hover:bg-opacity-20">Option 2</MenuItem>
        <MenuDivider className="border-white border-opacity-30" />
        <MenuItem className="hover:bg-white hover:bg-opacity-20">Option 3</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState([true, false, false]);

    const handleToggleItem = (index: number) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
    };

    return (
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>Filter</MenuButton>
        <MenuList>
          <MenuGroup title="Kategorien">
            <MenuItem
              onClick={() => handleToggleItem(0)}
              icon={
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {checkedItems[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              }
            >
              Elektronik
            </MenuItem>
            <MenuItem
              onClick={() => handleToggleItem(1)}
              icon={
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {checkedItems[1] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              }
            >
              Kleidung
            </MenuItem>
            <MenuItem
              onClick={() => handleToggleItem(2)}
              icon={
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {checkedItems[2] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              }
            >
              Bücher
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const items = [
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

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Menu closeOnSelect={false}>
        <MenuButton as={Button}>Früchte auswählen</MenuButton>
        <MenuList>
          <div className="px-3 py-2">
            <input
              type="text"
              placeholder="Suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <MenuDivider />
          <div className="max-h-60 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => <MenuItem key={index}>{item}</MenuItem>)
            ) : (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        </MenuList>
      </Menu>
    );
  },
};
