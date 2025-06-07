import React from 'react';
import { Modal, ModalProps } from '@smolitux/core';
import { withVoiceControl, VoiceControlProps } from '../withVoiceControl';

export type VoiceModalProps = ModalProps & VoiceControlProps;

const VoiceModalBase: React.FC<VoiceModalProps> = ({
  onVoiceCommand,
  onClose,
  isOpen,
  ...props
}) => {
  const handleVoice = (cmd: string) => {
    const lower = cmd.toLowerCase();
    if ((lower === 'close' || lower === 'schließen') && isOpen) {
      onClose();
    }
    if (onVoiceCommand) onVoiceCommand(cmd);
  };
  return <Modal isOpen={isOpen} onClose={onClose} {...props} />;
};

export const VoiceModal = withVoiceControl(VoiceModalBase, ['close', 'schließen']);
