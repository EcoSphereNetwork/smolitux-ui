import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToastA11y } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Toast.A11y> = {
  title: 'Core/Toast/A11y',
  component: Toast.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der Toast-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Eindeutige ID des Toasts'
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Typ des Toasts'
    },
    title: {
      control: 'text',
      description: 'Titel des Toasts'
    },
    description: {
      control: 'text',
      description: 'Inhalt des Toasts'
    },
    duration: {
      control: { type: 'number' },
      description: 'Dauer in Millisekunden, nach der der Toast automatisch geschlossen wird (0 = kein automatisches Schließen)'
    },
    isClosable: {
      control: 'boolean',
      description: 'Ist der Toast schließbar?'
    },
    isPersistent: {
      control: 'boolean',
      description: 'Ist der Toast persistent?'
    },
    isVisible: {
      control: 'boolean',
      description: 'Ist der Toast aktuell sichtbar?'
    },
    icon: {
      control: 'boolean',
      description: 'Icon für den Toast anzeigen?'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position des Icons'
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für den Toast'
    },
    ariaLive: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA-Live für den Toast'
    },
    role: {
      control: { type: 'select' },
      options: ['alert', 'status', 'log', 'banner', 'dialog'],
      description: 'Rolle für den Toast'
    },
    isLiveRegion: {
      control: 'boolean',
      description: 'Ob der Toast eine Live-Region sein soll'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Ob der Toast automatisch fokussiert werden soll'
    },
    returnFocus: {
      control: 'boolean',
      description: 'Ob der Fokus beim Schließen zurückgesetzt werden soll'
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Ob der Toast eine Tastaturnavigation haben soll'
    },
    screenReaderSupport: {
      control: 'boolean',
      description: 'Ob der Toast eine Screenreader-Unterstützung haben soll'
    },
    announce: {
      control: 'boolean',
      description: 'Ob der Toast eine Ankündigung haben soll'
    },
    announceFormat: {
      control: 'text',
      description: 'Format der Ankündigung'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast.A11y>;

export const Default: Story = {
  args: {
    id: 'toast-1',
    title: 'Benachrichtigung',
    description: 'Dies ist eine Benachrichtigung.',
    type: 'info',
    isClosable: true,
    duration: 5000
  }
};

export const Success: Story = {
  args: {
    id: 'toast-2',
    title: 'Erfolg',
    description: 'Die Aktion wurde erfolgreich ausgeführt.',
    type: 'success',
    isClosable: true,
    duration: 5000
  }
};

export const Warning: Story = {
  args: {
    id: 'toast-3',
    title: 'Warnung',
    description: 'Bitte beachten Sie die folgenden Hinweise.',
    type: 'warning',
    isClosable: true,
    duration: 5000
  }
};

export const Error: Story = {
  args: {
    id: 'toast-4',
    title: 'Fehler',
    description: 'Es ist ein Fehler aufgetreten.',
    type: 'error',
    isClosable: true,
    duration: 5000
  }
};

export const WithIcon: Story = {
  args: {
    id: 'toast-5',
    title: 'Mit Icon',
    description: 'Dies ist eine Benachrichtigung mit einem Icon.',
    type: 'info',
    isClosable: true,
    duration: 5000,
    icon: true
  }
};

export const WithAction: Story = {
  args: {
    id: 'toast-6',
    title: 'Mit Aktion',
    description: 'Dies ist eine Benachrichtigung mit einer Aktion.',
    type: 'info',
    isClosable: true,
    duration: 5000,
    action: <Button size="sm">Aktion</Button>
  }
};

export const Persistent: Story = {
  args: {
    id: 'toast-7',
    title: 'Persistent',
    description: 'Diese Benachrichtigung verschwindet nicht automatisch.',
    type: 'info',
    isClosable: true,
    isPersistent: true
  }
};

export const WithCustomRole: Story = {
  args: {
    id: 'toast-8',
    title: 'Status',
    description: 'Dies ist eine Statusmeldung.',
    type: 'info',
    isClosable: true,
    duration: 5000,
    role: 'status'
  }
};

export const WithAssertiveAnnouncement: Story = {
  args: {
    id: 'toast-9',
    title: 'Wichtige Meldung',
    description: 'Diese Meldung wird sofort von Screenreadern vorgelesen.',
    type: 'warning',
    isClosable: true,
    duration: 5000,
    ariaLive: 'assertive',
    announce: true
  }
};

export const WithAutoFocus: Story = {
  args: {
    id: 'toast-10',
    title: 'Automatischer Fokus',
    description: 'Diese Benachrichtigung erhält automatisch den Fokus.',
    type: 'info',
    isClosable: true,
    duration: 5000,
    autoFocus: true
  }
};

// Komponente für die ToastProvider-Demo
const ToastDemo = () => {
  const toast = useToastA11y();
  
  const showInfoToast = () => {
    toast.show({
      title: 'Information',
      description: 'Dies ist eine Informationsmeldung.',
      type: 'info',
      ariaLive: 'polite',
      announce: true
    });
  };
  
  const showSuccessToast = () => {
    toast.show({
      title: 'Erfolg',
      description: 'Die Aktion wurde erfolgreich ausgeführt.',
      type: 'success',
      ariaLive: 'polite',
      announce: true
    });
  };
  
  const showWarningToast = () => {
    toast.show({
      title: 'Warnung',
      description: 'Bitte beachten Sie die folgenden Hinweise.',
      type: 'warning',
      ariaLive: 'assertive',
      announce: true
    });
  };
  
  const showErrorToast = () => {
    toast.show({
      title: 'Fehler',
      description: 'Es ist ein Fehler aufgetreten.',
      type: 'error',
      ariaLive: 'assertive',
      announce: true
    });
  };
  
  const showPersistentToast = () => {
    toast.show({
      title: 'Persistent',
      description: 'Diese Benachrichtigung verschwindet nicht automatisch.',
      type: 'info',
      isPersistent: true,
      announce: true
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button onClick={showInfoToast}>Info</Button>
        <Button onClick={showSuccessToast}>Erfolg</Button>
        <Button onClick={showWarningToast}>Warnung</Button>
        <Button onClick={showErrorToast}>Fehler</Button>
        <Button onClick={showPersistentToast}>Persistent</Button>
      </div>
    </div>
  );
};

export const WithToastProvider: Story = {
  render: () => (
    <ToastProvider.A11y
      position="bottom-right"
      defaultDuration={5000}
      defaultRole="alert"
      defaultAriaLive="polite"
      defaultIsClosable={true}
      defaultScreenReaderSupport={true}
      defaultAnnounce={true}
    >
      <ToastDemo />
    </ToastProvider.A11y>
  )
};

export const WithDifferentPositions: Story = {
  render: () => {
    const [position, setPosition] = useState<'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'>('bottom-right');
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setPosition('top')}>Oben</Button>
          <Button onClick={() => setPosition('top-right')}>Oben rechts</Button>
          <Button onClick={() => setPosition('top-left')}>Oben links</Button>
          <Button onClick={() => setPosition('bottom')}>Unten</Button>
          <Button onClick={() => setPosition('bottom-right')}>Unten rechts</Button>
          <Button onClick={() => setPosition('bottom-left')}>Unten links</Button>
        </div>
        
        <div className="mt-4">
          <p>Aktuelle Position: {position}</p>
        </div>
        
        <ToastProvider.A11y position={position}>
          <ToastDemo />
        </ToastProvider.A11y>
      </div>
    );
  }
};