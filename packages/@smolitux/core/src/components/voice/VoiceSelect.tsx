import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '../Select';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceSelectProps = SelectProps & VoiceControlProps;

const Base = withVoiceControl(Select, ['wähle', 'select', 'wählen', 'auswählen']);

export const VoiceSelect: React.FC<VoiceSelectProps> = ({
  onVoiceCommand,
  onChange,
  value: propValue,
  options = [],
  ...props
}) => {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (
      lower.startsWith('wähle ') ||
      lower.startsWith('select ') ||
      lower.includes(' wählen') ||
      lower.includes(' auswählen')
    ) {
      let optionName = '';
      if (lower.startsWith('wähle ')) optionName = command.substring(6).toLowerCase();
      else if (lower.startsWith('select ')) optionName = command.substring(7).toLowerCase();
      else if (lower.includes(' wählen')) optionName = command.split(' wählen')[0].toLowerCase();
      else if (lower.includes(' auswählen'))
        optionName = command.split(' auswählen')[0].toLowerCase();

      const matching = options.find((o) => {
        const label = typeof o === 'string' ? o.toLowerCase() : (o.label || '').toLowerCase();
        return label === optionName;
      });
      if (matching) {
        const val = typeof matching === 'string' ? matching : matching.value;
        setValue(val);
        const el = document.getElementById(props.id || '') as HTMLSelectElement | null;
        if (el) {
          el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        onChange?.({
          target: { value: val },
          currentTarget: { value: val },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    }
    onVoiceCommand?.(command);
  };

  return (
    <Base
      value={value}
      onChange={handleChange}
      options={options}
      onVoiceCommand={handleVoiceCommand}
      {...props}
    />
  );
};
