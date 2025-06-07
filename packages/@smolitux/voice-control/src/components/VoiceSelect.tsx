import React, { useRef } from 'react';
import { Select, SelectProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../withVoiceControl';

export type VoiceSelectProps = SelectProps & VoiceControlProps;

const VoiceSelectBase: React.FC<VoiceSelectProps> = ({ onVoiceCommand, ...props }) => {
  const ref = useRef<HTMLSelectElement>(null);
  const handleVoice = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if (ref.current) {
      for (const option of Array.from(ref.current.options)) {
        if (option.text.toLowerCase() === lower || option.value.toLowerCase() === lower) {
          ref.current.value = option.value;
          const evt = new Event('change', { bubbles: true });
          ref.current.dispatchEvent(evt);
          break;
        }
      }
    }
    if (onVoiceCommand) onVoiceCommand(cmd);
  };
  return <Select ref={ref} {...props} />;
};

export const VoiceSelect = withVoiceControl(VoiceSelectBase);
