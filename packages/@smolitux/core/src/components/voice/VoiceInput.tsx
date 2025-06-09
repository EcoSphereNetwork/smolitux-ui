// TODO: forwardRef hinzufügen
import React, { useState, useEffect } from 'react';
import { Input, InputProps } from '../Input';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceInputProps = InputProps & VoiceControlProps;

const Base = withVoiceControl(Input, ['eingabe', 'input', 'löschen', 'clear']);

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onVoiceCommand,
  onChange,
  value: propValue,
  ...props
}) => {
  const [value, setValue] = useState(propValue || '');

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (lower.startsWith('eingabe ') || lower.startsWith('input ')) {
      const text = command.substring(lower.startsWith('eingabe ') ? 8 : 6);
      setValue(text);
      const el = document.getElementById(props.id || '') as HTMLInputElement | null;
      if (el) {
        el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      onChange?.({
        target: { value: text },
        currentTarget: { value: text },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (lower === 'löschen' || lower === 'clear') {
      setValue('');
      const el = document.getElementById(props.id || '') as HTMLInputElement | null;
      if (el) {
        el.value = '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      onChange?.({
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onVoiceCommand?.(command);
  };

  return (
    <Base value={value} onChange={handleChange} onVoiceCommand={handleVoiceCommand} {...props} />
  );
};
