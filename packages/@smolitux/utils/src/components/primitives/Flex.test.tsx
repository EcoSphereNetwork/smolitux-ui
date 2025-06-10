import React from 'react';
import { render } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders without crashing', () => {
    const { container } = render(<Flex />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Flex className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
