import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from '../Box';

describe('Box', () => {
  it('renders children correctly', () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Box className="custom-class">Test Content</Box>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(<Box style={{ backgroundColor: 'red' }}>Test Content</Box>);
    expect(container.firstChild).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('renders as a div by default', () => {
    const { container } = render(<Box>Test Content</Box>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders as a custom element when as prop is provided', () => {
    const { container } = render(<Box as="span">Test Content</Box>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Test Content</Box>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Test Content');
  });

  it('passes additional props to the DOM element', () => {
    const { container } = render(
      <Box data-testid="test-box" aria-label="Test Box">
        Test Content
      </Box>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test-box');
    expect(container.firstChild).toHaveAttribute('aria-label', 'Test Box');
  });
});
