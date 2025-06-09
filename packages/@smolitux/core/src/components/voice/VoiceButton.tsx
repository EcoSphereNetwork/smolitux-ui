// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Button, ButtonProps } from '../Button';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceButtonProps = ButtonProps & VoiceControlProps;

const Base = withVoiceControl(Button, ['klick', 'click', 'drücken', 'press']);

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onVoiceCommand, onClick, ...props }) => {
  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (['klick', 'click', 'drücken', 'press'].includes(lower)) {
      const btn = document.getElementById(props.id || '');
      if (btn) {
        (btn as HTMLButtonElement).click();
      }
    }
    onVoiceCommand?.(command);
  };

  return <Base onClick={onClick} onVoiceCommand={handleVoiceCommand} {...props} />;
};
