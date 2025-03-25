import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

// Hier können wir später den ThemeProvider hinzufügen, wenn wir ihn implementieren
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Custom render mit Providern
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
};

// Re-export alles von testing-library
export * from '@testing-library/react';
export { customRender as render };