import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from '../Toast';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Core/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Der Titel des Toasts',
    },
    description: {
      control: 'text',
      description: 'Die Beschreibung des Toasts',
    },
    status: {
      control: {
        type: 'select',
        options: ['success', 'error', 'warning', 'info'],
      },
      description: 'Der Status des Toasts',
    },
    duration: {
      control: 'number',
      description: 'Die Dauer in Millisekunden, für die der Toast angezeigt wird',
    },
    isClosable: {
      control: 'boolean',
      description: 'Gibt an, ob der Toast geschlossen werden kann',
    },
    position: {
      control: {
        type: 'select',
        options: ['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left'],
      },
      description: 'Die Position des Toasts',
    },
    variant: {
      control: {
        type: 'select',
        options: ['solid', 'subtle', 'left-accent', 'top-accent'],
      },
      description: 'Die Variante des Toasts',
    },
    onClose: {
      action: 'closed',
      description: 'Callback, der aufgerufen wird, wenn der Toast geschlossen wird',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
  render: () => {
    const ToastExample = () => {
      const [isVisible, setIsVisible] = React.useState(false);

      return (
        <div>
          <Button onClick={() => setIsVisible(true)}>Toast anzeigen</Button>

          {isVisible && (
            <Toast
              title="Toast-Benachrichtigung"
              description="Dies ist eine einfache Toast-Benachrichtigung."
              status="info"
              isClosable
              onClose={() => setIsVisible(false)}
            />
          )}
        </div>
      );
    };

    return <ToastExample />;
  },
};

export const Statuses: Story = {
  render: () => {
    const ToastExample = () => {
      const [visibleToasts, setVisibleToasts] = React.useState<string[]>([]);

      const showToast = (status: 'success' | 'error' | 'warning' | 'info') => {
        setVisibleToasts([...visibleToasts, status]);
      };

      const closeToast = (status: string) => {
        setVisibleToasts(visibleToasts.filter((t) => t !== status));
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => showToast('success')} colorScheme="success">
              Success Toast
            </Button>
            <Button onClick={() => showToast('error')} colorScheme="danger">
              Error Toast
            </Button>
            <Button onClick={() => showToast('warning')} colorScheme="warning">
              Warning Toast
            </Button>
            <Button onClick={() => showToast('info')} colorScheme="info">
              Info Toast
            </Button>
          </div>

          <div className="space-y-2">
            {visibleToasts.includes('success') && (
              <Toast
                title="Erfolg"
                description="Der Vorgang wurde erfolgreich abgeschlossen."
                status="success"
                isClosable
                onClose={() => closeToast('success')}
              />
            )}

            {visibleToasts.includes('error') && (
              <Toast
                title="Fehler"
                description="Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
                status="error"
                isClosable
                onClose={() => closeToast('error')}
              />
            )}

            {visibleToasts.includes('warning') && (
              <Toast
                title="Warnung"
                description="Bitte beachten Sie die folgenden Hinweise."
                status="warning"
                isClosable
                onClose={() => closeToast('warning')}
              />
            )}

            {visibleToasts.includes('info') && (
              <Toast
                title="Information"
                description="Hier sind einige wichtige Informationen für Sie."
                status="info"
                isClosable
                onClose={() => closeToast('info')}
              />
            )}
          </div>
        </div>
      );
    };

    return <ToastExample />;
  },
};

export const Variants: Story = {
  render: () => {
    const ToastExample = () => {
      const [visibleToasts, setVisibleToasts] = React.useState<string[]>([]);

      const showToast = (variant: 'solid' | 'subtle' | 'left-accent' | 'top-accent') => {
        setVisibleToasts([...visibleToasts, variant]);
      };

      const closeToast = (variant: string) => {
        setVisibleToasts(visibleToasts.filter((t) => t !== variant));
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => showToast('solid')}>Solid</Button>
            <Button onClick={() => showToast('subtle')}>Subtle</Button>
            <Button onClick={() => showToast('left-accent')}>Left Accent</Button>
            <Button onClick={() => showToast('top-accent')}>Top Accent</Button>
          </div>

          <div className="space-y-2">
            {visibleToasts.includes('solid') && (
              <Toast
                title="Solid Variant"
                description="Dies ist ein Toast mit der Variante 'solid'."
                status="info"
                variant="solid"
                isClosable
                onClose={() => closeToast('solid')}
              />
            )}

            {visibleToasts.includes('subtle') && (
              <Toast
                title="Subtle Variant"
                description="Dies ist ein Toast mit der Variante 'subtle'."
                status="info"
                variant="subtle"
                isClosable
                onClose={() => closeToast('subtle')}
              />
            )}

            {visibleToasts.includes('left-accent') && (
              <Toast
                title="Left Accent Variant"
                description="Dies ist ein Toast mit der Variante 'left-accent'."
                status="info"
                variant="left-accent"
                isClosable
                onClose={() => closeToast('left-accent')}
              />
            )}

            {visibleToasts.includes('top-accent') && (
              <Toast
                title="Top Accent Variant"
                description="Dies ist ein Toast mit der Variante 'top-accent'."
                status="info"
                variant="top-accent"
                isClosable
                onClose={() => closeToast('top-accent')}
              />
            )}
          </div>
        </div>
      );
    };

    return <ToastExample />;
  },
};

export const Positions: Story = {
  render: () => {
    const ToastExample = () => {
      const toast = useToast();

      const showToast = (
        position: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'
      ) => {
        toast({
          title: `Position: ${position}`,
          description: `Dies ist ein Toast an der Position '${position}'.`,
          status: 'info',
          duration: 5000,
          isClosable: true,
          position,
        });
      };

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => showToast('top-left')}>Top Left</Button>
            <Button onClick={() => showToast('top')}>Top</Button>
            <Button onClick={() => showToast('top-right')}>Top Right</Button>
            <Button onClick={() => showToast('bottom-left')}>Bottom Left</Button>
            <Button onClick={() => showToast('bottom')}>Bottom</Button>
            <Button onClick={() => showToast('bottom-right')}>Bottom Right</Button>
          </div>
        </div>
      );
    };

    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const WithCustomDuration: Story = {
  render: () => {
    const ToastExample = () => {
      const toast = useToast();

      const showToast = (duration: number) => {
        toast({
          title: `Dauer: ${duration}ms`,
          description: `Dieser Toast wird für ${duration}ms angezeigt.`,
          status: 'info',
          duration,
          isClosable: true,
        });
      };

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => showToast(1000)}>1 Sekunde</Button>
            <Button onClick={() => showToast(3000)}>3 Sekunden</Button>
            <Button onClick={() => showToast(5000)}>5 Sekunden</Button>
            <Button onClick={() => showToast(null as any)}>Permanent</Button>
          </div>
        </div>
      );
    };

    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const WithCustomContent: Story = {
  render: () => {
    const ToastExample = () => {
      const toast = useToast();

      const showToast = () => {
        toast({
          render: () => (
            <div className="bg-blue-500 text-white p-4 rounded-md shadow-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="font-bold">Benutzerdefinierter Toast</div>
                  <div className="text-sm">Mit vollständig angepasstem Inhalt und Styling</div>
                </div>
              </div>
            </div>
          ),
          duration: 5000,
          isClosable: true,
        });
      };

      return <Button onClick={showToast}>Benutzerdefinierten Toast anzeigen</Button>;
    };

    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const ToastExample = () => {
      const toast = useToast();

      const showToast = () => {
        toast({
          title: 'Datei gelöscht',
          description: 'Die Datei wurde in den Papierkorb verschoben.',
          status: 'info',
          duration: 5000,
          isClosable: true,
          action: (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Wiederhergestellt',
                  description: 'Die Datei wurde wiederhergestellt.',
                  status: 'success',
                  duration: 3000,
                });
              }}
            >
              Rückgängig
            </Button>
          ),
        });
      };

      return <Button onClick={showToast}>Toast mit Aktion anzeigen</Button>;
    };

    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const ToastQueue: Story = {
  render: () => {
    const ToastExample = () => {
      const toast = useToast();

      const showToasts = () => {
        toast({
          title: 'Erster Toast',
          description: 'Dies ist der erste Toast in der Warteschlange.',
          status: 'info',
          duration: 3000,
        });

        setTimeout(() => {
          toast({
            title: 'Zweiter Toast',
            description: 'Dies ist der zweite Toast in der Warteschlange.',
            status: 'success',
            duration: 3000,
          });
        }, 1000);

        setTimeout(() => {
          toast({
            title: 'Dritter Toast',
            description: 'Dies ist der dritte Toast in der Warteschlange.',
            status: 'warning',
            duration: 3000,
          });
        }, 2000);
      };

      return <Button onClick={showToasts}>Mehrere Toasts anzeigen</Button>;
    };

    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};
