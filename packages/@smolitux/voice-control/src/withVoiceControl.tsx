import React, { useId, useRef, useEffect } from 'react';
import { useVoiceControl } from './VoiceControlProvider';

export interface VoiceControlProps {
  voiceCommands?: string[];
  voiceEnabled?: boolean;
  onVoiceCommand?: (command: string) => void;
}

export function withVoiceControl<P extends object>(
  Component: React.ComponentType<P>,
  defaultCommands: string[] = []
) {
  return React.forwardRef<unknown, P & VoiceControlProps>((props, ref) => {
    const { voiceCommands = defaultCommands, voiceEnabled = true, onVoiceCommand, ...rest } = props;

    const id = useId();
    const { registerComponent, unregisterComponent, targetComponent, lastCommand } =
      useVoiceControl();
    const innerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (voiceEnabled && voiceCommands.length > 0) {
        registerComponent(id, voiceCommands);
      }
      return () => {
        if (voiceEnabled) {
          unregisterComponent(id);
        }
      };
    }, [voiceEnabled, voiceCommands, id, registerComponent, unregisterComponent]);

    useEffect(() => {
      if (voiceEnabled && targetComponent === id && lastCommand && onVoiceCommand) {
        onVoiceCommand(lastCommand);
      }
    }, [voiceEnabled, targetComponent, lastCommand, onVoiceCommand, id]);

    return (
      <Component ref={(ref as any) || innerRef} {...(rest as P)} onVoiceCommand={onVoiceCommand} />
    );
  });
}
