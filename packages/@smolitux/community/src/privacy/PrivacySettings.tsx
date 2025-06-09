import React from 'react';
import { Modal, Checkbox, Button } from '@smolitux/core';
import { usePrivacyConsent } from './PrivacyContext';

interface PrivacySettingsProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({ open, onClose }) => {
  const { preferences, updatePreferences } = usePrivacyConsent();

  return (
    <Modal open={open} onClose={onClose} title="Privacy Preferences">
      <div className="space-y-4 p-4" data-testid="privacy-settings">
        <Checkbox
          label="Analytics cookies"
          checked={preferences.analytics}
          onChange={(e) => updatePreferences({ analytics: e.target.checked })}
        />
        <Checkbox
          label="Personalized content"
          checked={preferences.personalization}
          onChange={(e) => updatePreferences({ personalization: e.target.checked })}
        />
        <Checkbox
          label="Marketing emails"
          checked={preferences.marketing}
          onChange={(e) => updatePreferences({ marketing: e.target.checked })}
        />
        <div className="pt-2 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};
