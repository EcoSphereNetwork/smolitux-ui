import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Flex } from '../Flex';

describe('Flex', () => {
  it('applies flex styles', () => {
    const { container } = render(<Flex justify="center" align="flex-end" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle('display: flex');
    expect(div).toHaveStyle('justify-content: center');
    expect(div).toHaveStyle('align-items: flex-end');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('renders with gap style', () => {
    const { container } = render(<Flex data-testid="flex" gap={4} />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ display: 'flex' });
    expect(div).toHaveStyle({ gap: '4' });
  });

  it('applies flex styles', () => {
    const { container } = render(<Flex justify="center" align="flex-end" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle('display: flex');
    expect(div).toHaveStyle('justify-content: center');
    expect(div).toHaveStyle('align-items: flex-end');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
