import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from '../LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Core/Navigation/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    languages: {
      control: 'object',
      description: 'Die verfügbaren Sprachen',
    },
    currentLanguage: {
      control: 'text',
      description: 'Die aktuell ausgewählte Sprache',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich die Sprache ändert',
    },
    variant: {
      control: {
        type: 'select',
        options: ['dropdown', 'buttons', 'flags'],
      },
      description: 'Die Variante des LanguageSwitchers',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'Die Größe des LanguageSwitchers',
    },
    showLabels: {
      control: 'boolean',
      description: 'Gibt an, ob Labels angezeigt werden sollen',
    },
    showFlags: {
      control: 'boolean',
      description: 'Gibt an, ob Flaggen angezeigt werden sollen',
    },
    disabled: {
      control: 'boolean',
      description: 'Gibt an, ob der LanguageSwitcher deaktiviert ist',
    },
    className: {
      control: 'text',
      description: 'Zusätzliche CSS-Klassen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

const languages = {
  de: { name: 'Deutsch', flag: '🇩🇪' },
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  it: { name: 'Italiano', flag: '🇮🇹' },
};

export const Basic: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const DropdownVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          variant="dropdown"
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const ButtonsVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          variant="buttons"
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const FlagsVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          variant="flags"
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Small</h3>
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLanguage}
            onChange={setCurrentLanguage}
            size="sm"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Medium (Standard)</h3>
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLanguage}
            onChange={setCurrentLanguage}
            size="md"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Large</h3>
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLanguage}
            onChange={setCurrentLanguage}
            size="lg"
          />
        </div>
      </div>
    );
  },
};

export const WithoutLabels: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          showLabels={false}
          showFlags={true}
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const WithoutFlags: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          showLabels={true}
          showFlags={false}
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <LanguageSwitcher
      languages={languages}
      currentLanguage="de"
      onChange={() => {}}
      disabled
    />
  ),
};

export const WithCustomStyling: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg"
        />
        <div className="text-center">
          Aktuelle Sprache: {languages[currentLanguage as keyof typeof languages].name}
        </div>
      </div>
    );
  },
};

export const WithLimitedLanguages: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    const limitedLanguages = {
      de: { name: 'Deutsch', flag: '🇩🇪' },
      en: { name: 'English', flag: '🇬🇧' },
    };
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={limitedLanguages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
        />
        <div className="text-center">
          Aktuelle Sprache: {limitedLanguages[currentLanguage as keyof typeof limitedLanguages].name}
        </div>
      </div>
    );
  },
};

export const WithCustomFlags: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    const customLanguages = {
      de: {
        name: 'Deutsch',
        flag: (
          <svg className="w-5 h-5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
            <rect width="5" height="1" fill="#000000" />
            <rect width="5" height="1" y="1" fill="#FF0000" />
            <rect width="5" height="1" y="2" fill="#FFCC00" />
          </svg>
        ),
      },
      en: {
        name: 'English',
        flag: (
          <svg className="w-5 h-5" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#s)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </svg>
        ),
      },
    };
    
    return (
      <div className="space-y-4">
        <LanguageSwitcher
          languages={customLanguages}
          currentLanguage={currentLanguage}
          onChange={setCurrentLanguage}
        />
        <div className="text-center">
          Aktuelle Sprache: {customLanguages[currentLanguage as keyof typeof customLanguages].name}
        </div>
      </div>
    );
  },
};

export const InNavbar: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = React.useState('de');
    
    return (
      <div className="w-full">
        <div className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="font-bold text-xl">Logo</div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-gray-300">Home</a>
              <a href="#" className="hover:text-gray-300">About</a>
              <a href="#" className="hover:text-gray-300">Services</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
              <LanguageSwitcher
                languages={languages}
                currentLanguage={currentLanguage}
                onChange={setCurrentLanguage}
                variant="dropdown"
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};