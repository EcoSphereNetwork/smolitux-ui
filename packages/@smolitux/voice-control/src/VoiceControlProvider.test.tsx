import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { VoiceControlProvider, useVoiceControl } from './VoiceControlProvider';
import { VoiceControlManager } from './VoiceControlManager';

type ManagerMock = jest.Mocked<VoiceControlManager>;

jest.mock('./VoiceControlManager');

const createManager = () => {
  const manager: ManagerMock = {
    startListening: jest.fn(),
    stopListening: jest.fn(),
    registerComponent: jest.fn(),
    unregisterComponent: jest.fn(),
    cleanup: jest.fn(),
    onRecognitionResult: (_text: string) => {},
    onCommandRecognized: (_cmd: string, _target: string) => {},
    onListeningStateChanged: (_state: boolean) => {},
  } as unknown as ManagerMock;
  (VoiceControlManager as jest.Mock).mockImplementation(() => manager);
  return manager;
};

describe('VoiceControlProvider', () => {
  it('exposes start and stop methods', () => {
    const manager = createManager();
    const wrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
      <VoiceControlProvider>{children}</VoiceControlProvider>
    );

    const { result } = renderHook(() => useVoiceControl(), { wrapper });

    act(() => {
      result.current.startListening();
      result.current.stopListening();
    });

    expect(manager.startListening).toHaveBeenCalled();
    expect(manager.stopListening).toHaveBeenCalled();
  });
});

