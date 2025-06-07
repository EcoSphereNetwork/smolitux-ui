import React, { useRef } from 'react';
import { Card, CardProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../withVoiceControl';

export type VoiceCardProps = CardProps & VoiceControlProps;

const VoiceCardBase: React.FC<VoiceCardProps> = ({ onVoiceCommand, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleVoice = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if ((lower === 'focus' || lower === 'fokus') && ref.current) {
      ref.current.focus();
    }
    if (onVoiceCommand) onVoiceCommand(cmd);
  };
  return <Card ref={ref} {...props} />;
};

export const VoiceCard = withVoiceControl(VoiceCardBase, ['focus', 'fokus']);
