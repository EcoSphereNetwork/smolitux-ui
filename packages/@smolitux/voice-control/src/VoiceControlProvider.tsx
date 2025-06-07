import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface VoiceControlContextType {
  registerComponent: (id: string, commands: string[]) => void;
  unregisterComponent: (id: string) => void;
  simulateCommand: (text: string) => void;
  targetComponent: string | null;
  lastCommand: string | null;
}

const VoiceControlContext = createContext<VoiceControlContextType | undefined>(undefined);

export const VoiceControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const components = useRef(new Map<string, string[]>());
  const [targetComponent, setTargetComponent] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const registerComponent = useCallback((id: string, commands: string[]) => {
    components.current.set(id, commands);
  }, []);

  const unregisterComponent = useCallback((id: string) => {
    components.current.delete(id);
  }, []);

  const simulateCommand = useCallback((text: string) => {
    const normalized = text.toLowerCase().trim();
    for (const [id, commands] of components.current.entries()) {
      for (const cmd of commands) {
        if (normalized.includes(cmd.toLowerCase())) {
          setLastCommand(cmd);
          setTargetComponent(id);
          return;
        }
      }
    }
  }, []);

  return (
    <VoiceControlContext.Provider
      value={{
        registerComponent,
        unregisterComponent,
        simulateCommand,
        targetComponent,
        lastCommand,
      }}
    >
      {children}
    </VoiceControlContext.Provider>
  );
};

export const useVoiceControl = () => {
  const ctx = useContext(VoiceControlContext);
  if (!ctx) {
    throw new Error('useVoiceControl must be used within VoiceControlProvider');
  }
  return ctx;
};
