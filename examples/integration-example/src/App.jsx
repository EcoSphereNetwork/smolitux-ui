// examples/integration-example/src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@smolitux/theme';
import { 
  Button,
  Card,
  Alert,
  TabView,
  Modal
} from '@smolitux/core';

// Beispiel für eine bestehende Komponente im Projekt
function ExistingComponent() {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold">Bestehende Komponente</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Dies ist eine bestehende Komponente im Projekt, die mit smolitux UI 
        integriert werden kann.
      </p>
    </div>
  );
}

// Theme-Switcher mit smolitux UI Button
function ThemeSwitcher() {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      onClick={toggleTheme}
    >
      {themeMode === 'light' ? '🌙 Dunkles Theme' : '☀️ Helles Theme'}
    </Button>
  );
}

// Hauptanwendung
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState('tab1');
  
  // Beispiel-Tabs
  const tabs = [
    {
      id: 'tab1',
      label: 'Übersicht',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Projektalternative 1</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Funktionale Komponenten mit React Hooks
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Einfacher zu implementieren</li>
            <li>Moderner Ansatz</li>
            <li>Gut für kleinere Komponenten</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Details',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Projektalternative 2</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Klassenbasierte Komponenten
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Besser für komplexe Komponenten</li>
            <li>Unterstützt Legacy-Code</li>
            <li>Übersichtlicher für große Komponenten</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab3',
      label: 'Schnittstellen',
      content: (
        <ExistingComponent />
      )
    }
  ];
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Integration von smolitux UI
            </h1>
            <ThemeSwitcher />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Benachrichtung mit smolitux Alert */}
          <Alert
            type="info"
            title="Integration von smolitux UI"
            message="Dieses Beispiel zeigt, wie Sie die smolitux UI-Komponenten in ein bestehendes Projekt integrieren können."
            className="mb-6"
          />
          
          {/* Bestehende Komponente und smolitux Card kombinieren */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ExistingComponent />
            
            <Card title="smolitux Card-Komponente">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Diese Karte verwendet die smolitux UI Card-Komponente.
              </p>
              <Button>Mehr erfahren</Button>
            </Card>
          </div>
          
          {/* smolitux TabView-Komponente */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Projektoptionen
            </h2>
            <TabView
              tabs={tabs}
              activeTabId={activeTabId}
              onTabChange={setActiveTabId}
            />
          </div>
          
          {/* Modal mit smolitux-Komponenten */}
          <div className="mb-6">
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Modal öffnen
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="smolitux Modal"
              footer={
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Bestätigen
                  </Button>
                </div>
              }
            >
              <div className="text-gray-600 dark:text-gray-300">
                <p>Dieses Modal verwendet die smolitux UI Modal-Komponente.</p>
                <p className="mt-2">
                  Sie können beliebige Inhalte hinzufügen, auch bestehende Komponenten 
                  aus Ihrem Projekt.
                </p>
                <div className="mt-4">
                  <ExistingComponent />
                </div>
              </div>
            </Modal>
          </div>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>Integration von smolitux UI in bestehende Projekte</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
