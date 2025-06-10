import React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders without crashing', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Text className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Text ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
