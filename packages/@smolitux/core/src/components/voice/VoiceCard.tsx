// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, CardProps } from '../Card';
import { withVoiceControl, VoiceControlProps } from '@smolitux/voice-control';

export type VoiceCardProps = CardProps &
  VoiceControlProps & {
    collapsible?: boolean;
    expandable?: boolean;
    onExpand?: () => void;
    onCollapse?: () => void;
  };

const Base = withVoiceControl(Card, [
  'einklappen',
  'collapse',
  'ausklappen',
  'expand',
  'maximieren',
  'maximize',
  'minimieren',
  'minimize',
]);

export const VoiceCard: React.FC<VoiceCardProps> = ({
  onVoiceCommand,
  children,
  collapsible = false,
  expandable = false,
  onExpand,
  onCollapse,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (collapsible && (lower === 'einklappen' || lower === 'collapse')) {
      setCollapsed(true);
      onCollapse?.();
    } else if (collapsible && (lower === 'ausklappen' || lower === 'expand')) {
      setCollapsed(false);
    } else if (expandable && (lower === 'maximieren' || lower === 'maximize')) {
      setExpanded(true);
      onExpand?.();
    } else if (expandable && (lower === 'minimieren' || lower === 'minimize')) {
      setExpanded(false);
    }
    onVoiceCommand?.(command);
  };

  return (
    <Base
      {...props}
      className={`${props.className || ''} ${collapsed ? 'collapsed' : ''} ${expanded ? 'expanded' : ''}`}
      onVoiceCommand={handleVoiceCommand}
    >
      {!collapsed && children}
    </Base>
  );
};
