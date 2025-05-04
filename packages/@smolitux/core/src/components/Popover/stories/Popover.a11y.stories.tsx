import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../';
import { Button } from '../../Button';

const meta: Meta<typeof Popover.A11y> = {
  title: 'Core/Popover/A11y',
  component: Popover.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine barrierefreie Version der Popover-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.'
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'],
      description: 'Position des Popovers'
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'manual'],
      description: 'Trigger-Ereignis'
    },
    openDelay: {
      control: { type: 'number' },
      description: 'Verzögerung vor dem Anzeigen (in ms)'
    },
    closeDelay: {
      control: { type: 'number' },
      description: 'Verzögerung vor dem Verstecken (in ms)'
    },
    closeOnClickOutside: {
      control: { type: 'boolean' },
      description: 'Automatisch schließen, wenn außerhalb geklickt wird'
    },
    closeOnEsc: {
      control: { type: 'boolean' },
      description: 'Automatisch schließen, wenn ESC gedrückt wird'
    },
    showArrow: {
      control: { type: 'boolean' },
      description: 'Pfeil anzeigen'
    },
    offset: {
      control: { type: 'number' },
      description: 'Offset vom Trigger-Element (in px)'
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximale Breite des Popovers'
    },
    zIndex: {
      control: { type: 'number' },
      description: 'z-Index für den Popover'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA-Label für den Popover'
    },
    ariaLabelledby: {
      control: { type: 'text' },
      description: 'ARIA-Labelledby für den Popover'
    },
    ariaDescribedby: {
      control: { type: 'text' },
      description: 'ARIA-Describedby für den Popover'
    },
    ariaModal: {
      control: { type: 'boolean' },
      description: 'ARIA-Modal für den Popover'
    },
    ariaLive: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA-Live für den Popover'
    },
    ariaAtomic: {
      control: { type: 'boolean' },
      description: 'ARIA-Atomic für den Popover'
    },
    role: {
      control: { type: 'text' },
      description: 'Rolle für den Popover'
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Ob der Fokus beim Öffnen auf den Popover gesetzt werden soll'
    },
    returnFocus: {
      control: { type: 'boolean' },
      description: 'Ob der Fokus beim Schließen auf den Trigger zurückgesetzt werden soll'
    },
    trapFocus: {
      control: { type: 'boolean' },
      description: 'Ob der Fokus im Popover gefangen werden soll'
    },
    keyboardNavigation: {
      control: { type: 'boolean' },
      description: 'Ob der Popover eine Tastaturnavigation haben soll'
    },
    screenReaderSupport: {
      control: { type: 'boolean' },
      description: 'Ob der Popover eine Screenreader-Unterstützung haben soll'
    },
    description: {
      control: { type: 'text' },
      description: 'Ob der Popover eine Beschreibung haben soll'
    },
    liveRegion: {
      control: { type: 'boolean' },
      description: 'Ob der Popover eine Live-Region haben soll'
    },
    announce: {
      control: { type: 'boolean' },
      description: 'Ob der Popover eine Ankündigung haben soll'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Popover.A11y>;

export const Default: Story = {
  args: {
    content: 'Dies ist ein barrierefreier Popover mit verbesserten ARIA-Attributen.',
    ariaLabel: 'Informations-Popover',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    closeOnEsc: true,
    closeOnClickOutside: true,
    children: <Button>Klicken Sie hier</Button>
  }
};

export const WithTitle: Story = {
  args: {
    content: 'Dies ist ein barrierefreier Popover mit einem Titel.',
    title: 'Popover-Titel',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    closeOnEsc: true,
    closeOnClickOutside: true,
    children: <Button>Popover mit Titel</Button>
  }
};

export const WithDescription: Story = {
  args: {
    content: 'Dies ist ein barrierefreier Popover mit einer Beschreibung für Screenreader.',
    ariaLabel: 'Informations-Popover',
    description: 'Diese Beschreibung ist nur für Screenreader sichtbar und bietet zusätzliche Informationen.',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    closeOnEsc: true,
    closeOnClickOutside: true,
    children: <Button>Popover mit Beschreibung</Button>
  }
};

export const HoverTrigger: Story = {
  args: {
    content: 'Dieser Popover wird beim Hover angezeigt.',
    ariaLabel: 'Hover-Popover',
    placement: 'top',
    trigger: 'hover',
    showArrow: true,
    openDelay: 200,
    closeDelay: 200,
    children: <Button>Hover über mich</Button>
  }
};

export const FocusTrigger: Story = {
  args: {
    content: 'Dieser Popover wird beim Fokussieren angezeigt.',
    ariaLabel: 'Fokus-Popover',
    placement: 'right',
    trigger: 'focus',
    showArrow: true,
    children: <Button>Fokussieren Sie mich</Button>
  }
};

export const WithFocusTrap: Story = {
  args: {
    content: (
      <div>
        <p>Dieser Popover fängt den Fokus ein. Versuchen Sie, mit Tab zu navigieren.</p>
        <Button>Erster Button</Button>
        <Button>Zweiter Button</Button>
        <Button>Dritter Button</Button>
      </div>
    ),
    ariaLabel: 'Fokus-Trap-Popover',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    trapFocus: true,
    autoFocus: true,
    children: <Button>Popover mit Fokus-Trap</Button>
  }
};

export const WithLiveRegion: Story = {
  args: {
    content: 'Dieser Popover hat eine Live-Region für Ankündigungen.',
    ariaLabel: 'Live-Region-Popover',
    placement: 'left',
    trigger: 'click',
    showArrow: true,
    liveRegion: true,
    announce: true,
    ariaLive: 'assertive',
    children: <Button>Popover mit Live-Region</Button>
  }
};

export const DifferentPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', maxWidth: '600px' }}>
      {['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'].map((placement) => (
        <Popover.A11y
          key={placement}
          content={`Placement: ${placement}`}
          ariaLabel={`${placement} Popover`}
          placement={placement as any}
          trigger="click"
          showArrow
        >
          <Button>{placement}</Button>
        </Popover.A11y>
      ))}
    </div>
  )
};

export const ControlledMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div>
        <Popover.A11y
          content="Dies ist ein kontrollierter Popover."
          ariaLabel="Kontrollierter Popover"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="bottom"
          showArrow
        >
          <Button>Popover-Trigger</Button>
        </Popover.A11y>
        
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Popover schließen' : 'Popover öffnen'}
          </Button>
        </div>
      </div>
    );
  }
};

export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <h3>Popover mit reichhaltigem Inhalt</h3>
        <p>Dieser Popover enthält reichhaltigen Inhalt mit verschiedenen interaktiven Elementen.</p>
        <ul>
          <li>Listenelement 1</li>
          <li>Listenelement 2</li>
          <li>Listenelement 3</li>
        </ul>
        <Button>Ein Button im Popover</Button>
      </div>
    ),
    ariaLabel: 'Popover mit reichhaltigem Inhalt',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    maxWidth: '300px',
    trapFocus: true,
    autoFocus: true,
    children: <Button>Popover mit reichhaltigem Inhalt</Button>
  }
};