import React, { useRef } from 'react';
import { Input, InputProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../withVoiceControl';

export type VoiceInputProps = InputProps & VoiceControlProps;

const VoiceInputBase: React.FC<VoiceInputProps> = ({ onVoiceCommand, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleVoice = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if (lower.startsWith('eingabe ')) {
      const text = cmd.slice(8);
      if (ref.current) {
        ref.current.value = text;
        const event = new Event('input', { bubbles: true });
        ref.current.dispatchEvent(event);
      }
    } else if (lower === 'clear' || lower === 'löschen') {
      if (ref.current) {
        ref.current.value = '';
        const event = new Event('input', { bubbles: true });
        ref.current.dispatchEvent(event);
      }
    }
    if (onVoiceCommand) onVoiceCommand(cmd);
  };
  return <Input ref={ref} {...props} />;
};

export const VoiceInput = withVoiceControl(VoiceInputBase, [
  'eingabe',
  'input',
  'clear',
  'löschen',
]);
