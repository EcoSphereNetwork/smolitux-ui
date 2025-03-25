import React from 'react';
import { render } from '../../../../../../../../test-utils';
import { Button } from '../Button';

// Mock für den Theme-Context
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({ themeMode: 'light' }),
}));

describe('Button Component Memoization', () => {
  // Memoization-Test mit React.memo
  test('does not re-render when props have not changed', () => {
    // Erstelle eine Wrapper-Komponente, um Re-Renders zu zählen
    const renderCounter = jest.fn();
    
    const TestComponent = ({ label, onClick }: { label: string, onClick: () => void }) => {
      renderCounter();
      return <Button onClick={onClick}>{label}</Button>;
    };
    
    const onClick = jest.fn();
    const { rerender } = render(<TestComponent label="Click me" onClick={onClick} />);
    
    // Erster Render
    expect(renderCounter).toHaveBeenCalledTimes(1);
    
    // Re-render mit den gleichen Props
    rerender(<TestComponent label="Click me" onClick={onClick} />);
    
    // Der Button sollte nicht neu gerendert werden, da die Props gleich sind
    // und die Komponente mit React.memo umhüllt ist
    expect(renderCounter).toHaveBeenCalledTimes(1);
    
    // Re-render mit unterschiedlichen Props
    const newOnClick = jest.fn();
    rerender(<TestComponent label="New label" onClick={newOnClick} />);
    
    // Jetzt sollte ein Re-render stattfinden
    expect(renderCounter).toHaveBeenCalledTimes(2);
  });
});