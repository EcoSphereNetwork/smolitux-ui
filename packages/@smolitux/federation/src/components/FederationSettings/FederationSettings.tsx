import React from 'react';
import { Card, Checkbox } from '@smolitux/core';

export interface FederationSettingsProps {
  protocols: string[];
  enabled: string[];
  onToggle: (name: string, enabled: boolean) => void;
  className?: string;
}

export const FederationSettings: React.FC<FederationSettingsProps> = ({ protocols, enabled, onToggle, className }) => {
  return (
    <Card className={className} data-testid="federation-settings">
      <h3 className="font-semibold mb-2">Protocols</h3>
      <div className="space-y-2">
        {protocols.map((p) => (
          <div key={p} className="flex items-center gap-2">
            <Checkbox
              checked={enabled.includes(p)}
              onChange={(e) => onToggle(p, e.target.checked)}
              id={`protocol-${p}`}
            />
            <label htmlFor={`protocol-${p}`}>{p}</label>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FederationSettings;
