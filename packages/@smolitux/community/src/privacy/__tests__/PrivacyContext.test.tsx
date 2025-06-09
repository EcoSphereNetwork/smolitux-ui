import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { PrivacyConsentProvider, usePrivacyConsent } from '../PrivacyContext';

describe('PrivacyConsentProvider', () => {
  it('updates preferences', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PrivacyConsentProvider>{children}</PrivacyConsentProvider>
    );
    const { result } = renderHook(() => usePrivacyConsent(), { wrapper });

    act(() => {
      result.current.updatePreferences({ analytics: true });
    });

    expect(result.current.preferences.analytics).toBe(true);
  });
});
