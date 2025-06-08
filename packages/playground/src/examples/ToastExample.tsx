// packages/playground/src/examples/ToastExample.tsx
import React from 'react';
import { Button, Card, ToastProvider, useToastMethods } from '@smolitux/core';

// Komponente, die die Toast-Methoden verwendet
const ToastButtons = () => {
  const toast = useToastMethods();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => toast.success('Die Aktion wurde erfolgreich durchgeführt!')}
        variant="primary"
      >
        Erfolgs-Toast
      </Button>

      <Button
        onClick={() => toast.error('Ein Fehler ist aufgetreten.', { title: 'Fehler' })}
        variant="outline"
      >
        Fehler-Toast
      </Button>

      <Button
        onClick={() => toast.warning('Bitte überprüfen Sie Ihre Eingaben.', { duration: 10000 })}
      >
        Warnungs-Toast (10s)
      </Button>

      <Button
        onClick={() =>
          toast.info('Diese Funktion ist noch in Entwicklung.', { position: 'bottom-center' })
        }
        variant="ghost"
      >
        Info-Toast (unten)
      </Button>

      <Button
        onClick={() =>
          toast.success('Datei wurde hochgeladen.', {
            actions: (
              <div className="mt-2">
                <Button size="sm" variant="outline">
                  Anzeigen
                </Button>
              </div>
            ),
          })
        }
      >
        Toast mit Aktion
      </Button>
    </div>
  );
};

// Hauptkomponente mit ToastProvider
const ToastExample = () => {
  return (
    <ToastProvider position="top-right" limit={5}>
      <Card title="Toast-Beispiele">
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Klicken Sie auf die Buttons, um verschiedene Toast-Benachrichtigungen anzuzeigen.
          </p>

          <ToastButtons />
        </div>
      </Card>
    </ToastProvider>
  );
};

export default ToastExample;
