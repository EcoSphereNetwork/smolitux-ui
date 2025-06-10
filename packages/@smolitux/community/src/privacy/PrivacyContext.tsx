import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PrivacyPreferences {
  analytics: boolean;
  personalization: boolean;
  marketing: boolean;
}

interface PrivacyConsentContextProps {
  preferences: PrivacyPreferences;
  updatePreferences: (prefs: Partial<PrivacyPreferences>) => void;
}

const DEFAULT_PREFERENCES: PrivacyPreferences = {
  analytics: false,
  personalization: false,
  marketing: false,
};

const LOCAL_STORAGE_KEY = 'smolitux-community-privacy';

const PrivacyConsentContext = createContext<PrivacyConsentContextProps>({
  preferences: DEFAULT_PREFERENCES,
  updatePreferences: () => {},
});

export const PrivacyConsentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [preferences, setPreferences] = useState<PrivacyPreferences>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      /* ignore */
    }
  }, [preferences]);

  const updatePreferences = (prefs: Partial<PrivacyPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  return (
    <PrivacyConsentContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PrivacyConsentContext.Provider>
  );
};

export const usePrivacyConsent = () => useContext(PrivacyConsentContext);

export default PrivacyConsentContext;
