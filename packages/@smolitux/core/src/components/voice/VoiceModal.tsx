// TODO: forwardRef hinzufügen
import React from 'react';
import { Modal, ModalProps } from '../Modal';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceModalProps = ModalProps & VoiceControlProps;

const Base = withVoiceControl(Modal, ['schließen', 'close', 'abbrechen', 'cancel']);

export const VoiceModal: React.FC<VoiceModalProps> = ({ onVoiceCommand, onClose, ...props }) => {
  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (['schließen', 'close', 'abbrechen', 'cancel'].includes(lower)) {
      onClose?.();
    }
    onVoiceCommand?.(command);
  };

  return <Base onClose={onClose} onVoiceCommand={handleVoiceCommand} {...props} />;
};
