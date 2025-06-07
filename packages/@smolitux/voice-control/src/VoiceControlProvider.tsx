import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VoiceControlManager, EngineType } from './VoiceControlManager';

interface VoiceControlContextType {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  recognizedText: string;
  lastCommand: string;
  targetComponent: string | null;
  registerComponent: (id: string, commands: string[]) => void;
  unregisterComponent: (id: string) => void;
}

interface VoiceControlProviderProps {
  children: ReactNode;
  engineType?: EngineType;
  language?: string;
  debug?: boolean;
}

const VoiceControlContext = createContext<VoiceControlContextType | undefined>(undefined);

export const VoiceControlProvider: React.FC<VoiceControlProviderProps> = ({
  children,
  engineType = 'webSpeech',
  language = 'de-DE',
  debug = false,
}) => {
  const [manager] = useState(() => new VoiceControlManager(engineType, language));
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [targetComponent, setTargetComponent] = useState<string | null>(null);

  useEffect(() => {
    manager.onRecognitionResult = (text) => {
      setRecognizedText(text);
      if (debug) console.log('Recognized text:', text);
    };

    manager.onCommandRecognized = (command, target) => {
      setLastCommand(command);
      setTargetComponent(target);
      if (debug) console.log(`Command recognized: ${command}, Target: ${target}`);
    };

    manager.onListeningStateChanged = (listening) => {
      setIsListening(listening);
      if (debug) console.log('Listening state changed:', listening);
    };

    return () => {
      manager.cleanup();
    };
  }, [manager, debug]);

  const startListening = () => manager.startListening();
  const stopListening = () => manager.stopListening();
  const registerComponent = (id: string, commands: string[]) => manager.registerComponent(id, commands);
  const unregisterComponent = (id: string) => manager.unregisterComponent(id);

  return (
    <VoiceControlContext.Provider
      value={{
        isListening,
        startListening,
        stopListening,
        recognizedText,
        lastCommand,
        targetComponent,
        registerComponent,
        unregisterComponent,
      }}
    >
      {children}
      <div id="voice-feedback" aria-live="polite" style={{ position: 'absolute', top: -9999 }} />
    </VoiceControlContext.Provider>
  );
};

export const useVoiceControl = () => {
  const context = useContext(VoiceControlContext);
  if (context === undefined) {
    throw new Error('useVoiceControl must be used within a VoiceControlProvider');
  }
  return context;
};
