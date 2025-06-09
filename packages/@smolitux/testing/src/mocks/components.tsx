import React from 'react';

export const MockButton = ({ children }: { children?: React.ReactNode }) => (
  <button data-testid="mock-button">{children}</button>
);

export const MockInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input data-testid="mock-input" {...props} />
);

export default components;
