import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModelTrainingComponent } from './ModelTrainingComponent';

describe('ModelTrainingComponent', () => {
  it('renders without crashing', () => {
    render(<ModelTrainingComponent />);
    expect(screen.getByRole('button', { name: /ModelTrainingComponent/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ModelTrainingComponent className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ModelTrainingComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
