import React, { useRef } from 'react';
import { Button, ButtonProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../withVoiceControl';

export type VoiceButtonProps = ButtonProps & VoiceControlProps;

const VoiceButtonBase: React.FC<VoiceButtonProps> = ({ onVoiceCommand, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const handleVoice = (cmd: string) => {
    const lowered = cmd.toLowerCase();
    if (['click', 'klick', 'press', 'drücken'].includes(lowered)) {
      ref.current?.click();
    }
    if (onVoiceCommand) onVoiceCommand(cmd);
  };
  return <Button ref={ref} {...props} />;
};

export const VoiceButton = withVoiceControl(VoiceButtonBase, [
  'click',
  'klick',
  'press',
  'drücken',
]);
