import React, { useEffect, useRef, useId } from 'react';
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
    const componentRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (voiceEnabled && voiceCommands.length > 0) {
        registerComponent(id, voiceCommands);
      }
      return () => {
        if (voiceEnabled) {
          unregisterComponent(id);
        }
      };
    }, [id, registerComponent, unregisterComponent, voiceEnabled, voiceCommands]);

    useEffect(() => {
      if (targetComponent === id && lastCommand && onVoiceCommand) {
        onVoiceCommand(lastCommand);
      }
    }, [id, lastCommand, onVoiceCommand, targetComponent]);

    return <Component ref={ref || componentRef} {...(rest as P)} />;
  });
}
