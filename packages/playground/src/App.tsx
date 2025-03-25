// packages/playground/src/App.tsx
import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Alert, 
  Input, 
  Select, 
  Badge, 
  TabView, 
  Modal 
} from '@smolitux/core';
import { ThemeProvider, useTheme } from '@smolitux/theme';
import LoginForm from './components/LoginForm';

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const tabItems = [
  {
    id: 'tab1',
    label: 'Allgemein',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Allgemeine Einstellungen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Hier können Sie allgemeine Einstellungen für Ihre Anwendung vornehmen.
        </p>
      </div>
    )
  },
  {
    id: 'tab2',
    label: 'Benutzer',
    badge: '3',
    badgeColor: 'primary',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Benutzereinstellungen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Verwalten Sie Benutzerkonten und Berechtigungen.
        </p>
      </div>
    )
  },
  {
    id: 'tab3',
    label: 'Systeme',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Systemeinstellungen</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Konfigurieren Sie Systemparameter und Leistungsoptionen.
        </p>
      </div>
    )
  }
];

// Theme-Switcher-Komponente
const ThemeSwitcher: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      onClick={toggleTheme}
    >
      {themeMode === 'light' ? '🌙 Dunkles Theme' : '☀️ Helles Theme'}
    </Button>
  );
};

// Hauptkomponente
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [showAlert, setShowAlert] = useState(true);
  
  const handleLogin = async (values: { email: string; password: string }) => {
    console.log('Login with:', values);
    return new Promise<void>(resolve => {
      setTimeout(resolve, 2000);
    });
  };
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">smolitux UI Demo</h1>
            <ThemeSwitcher />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Linke Spalte */}
            <div className="space-y-8">
              {/* Alerts Demo */}
              <Card title="Alerts">
                <div className="space-y-4">
                  {showAlert && (
                    <Alert
                      type="info"
                      title="Willkommen"
                      message="Dies ist eine Demo der smolitux UI-Komponenten."
                      onClose={() => setShowAlert(false)}
                      closable
                    />
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Alert type="success" title="Erfolg" message="Aktion erfolgreich durchgeführt." />
                    <Alert type="error" title="Fehler" message="Etwas ist schiefgelaufen." />
                    <Alert type="warning" title="Warnung" message="Achtung, bevor Sie fortfahren." />
                    <Alert type="info" message="Wussten Sie schon? Tooltips verbessern die UX." />
                  </div>
                </div>
              </Card>
              
              {/* Forms Demo */}
              <Card title="Formularkomponenten">
                <div className="space-y-4">
                  <Input
                    label="Beispiel-Texteingabe"
                    placeholder="Text eingeben..."
                    helperText="Diese Hilfe erläutert die Eingabe."
                  />
                  
                  <Select
                    label="Dropdown-Auswahl"
                    options={selectOptions}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  
                  <div className="flex space-x-4">
                    <Button variant="primary">Primär</Button>
                    <Button variant="secondary">Sekundär</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button size="sm">Klein</Button>
                    <Button>Mittel</Button>
                    <Button size="lg">Groß</Button>
                    <Button loading>Loading</Button>
                  </div>
                </div>
              </Card>
              
              {/* Login Form Demo */}
              <LoginForm
                onSubmit={handleLogin}
                onForgotPassword={() => console.log('Forgot password')}
                onRegister={() => console.log('Register')}
              />
            </div>
            
            {/* Rechte Spalte */}
            <div className="space-y-8">
              {/* Badges Demo */}
              <Card title="Badges">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge>Standard</Badge>
                    <Badge variant="primary">Primär</Badge>
                    <Badge variant="success">Erfolg</Badge>
                    <Badge variant="warning">Warnung</Badge>
                    <Badge variant="error">Fehler</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge rounded>Standard</Badge>
                    <Badge variant="primary" rounded>Primär</Badge>
                    <Badge variant="success" rounded>Erfolg</Badge>
                    <Badge variant="warning" rounded>Warnung</Badge>
                    <Badge variant="error" rounded>Fehler</Badge>
                    <Badge variant="info" rounded>Info</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge size="sm">Klein</Badge>
                    <Badge>Mittel</Badge>
                    <Badge size="lg">Groß</Badge>
                  </div>
                </div>
              </Card>
              
              {/* TabView Demo */}
              <Card title="Tabs">
                <TabView 
                  tabs={tabItems} 
                  activeTabId={activeTab}
                  onTabChange={setActiveTab}
                  className="mt-4"
                />
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Tab-Varianten:</h4>
                  <div className="space-y-6">
                    <TabView 
                      tabs={tabItems.map(tab => ({ ...tab, content: null }))} 
                      variant="pills"
                      showContent={false}
                    />
                    
                    <TabView 
                      tabs={tabItems.map(tab => ({ ...tab, content: null }))} 
                      variant="buttons"
                      showContent={false}
                    />
                    
                    <TabView 
                      tabs={tabItems.map(tab => ({ ...tab, content: null }))} 
                      variant="underline"
                      showContent={false}
                    />
                  </div>
                </div>
              </Card>
              
              {/* Modal Demo */}
              <Card title="Modal">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full"
                >
                  Modal öffnen
                </Button>
                
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Beispiel-Modal"
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
                  <p className="text-gray-700 dark:text-gray-300">
                    Dies ist ein Beispiel für ein Modal-Fenster. Es kann für Dialoge, Formulare, Bestätigungen und mehr verwendet werden.
                  </p>
                  <div className="mt-4">
                    <Input
                      label="Beispieleingabe im Modal"
                      placeholder="Text eingeben..."
                    />
                  </div>
                </Modal>
              </Card>
            </div>
          </div>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>smolitux UI Demo © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
