import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../Container';

describe('Container', () => {
  test('renders children correctly', () => {
    render(
      <Container>
        <div data-testid="test-child">Test Content</div>
      </Container>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies default classes', () => {
    const { container } = render(<Container>Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('w-full');
    expect(containerElement).toHaveClass('mx-auto');
    expect(containerElement).toHaveClass('max-w-3xl'); // lg ist der Default
    expect(containerElement).toHaveClass('px-4');
  });

  test('applies correct max-width class based on maxWidth prop', () => {
    const { rerender, container } = render(<Container maxWidth="xs">Content</Container>);

    let containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('max-w-sm'); // xs entspricht max-w-sm

    rerender(<Container maxWidth="xl">Content</Container>);
    containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('max-w-5xl');

    rerender(<Container maxWidth="full">Content</Container>);
    containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('max-w-full');

    rerender(<Container maxWidth="none">Content</Container>);
    containerElement = container.firstChild as HTMLElement;
    expect(containerElement).not.toHaveClass('max-w-full');
    expect(containerElement).not.toHaveClass('max-w-sm');
    expect(containerElement).not.toHaveClass('max-w-md');
    expect(containerElement).not.toHaveClass('max-w-lg');
    expect(containerElement).not.toHaveClass('max-w-3xl');
    expect(containerElement).not.toHaveClass('max-w-5xl');
    expect(containerElement).not.toHaveClass('max-w-7xl');
  });

  test('applies responsive max-width classes', () => {
    const { container } = render(<Container maxWidth={{ sm: 'sm', lg: 'xl' }}>Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('sm:max-w-md');
    expect(containerElement).toHaveClass('lg:max-w-5xl');
  });

  test('disables gutters when disableGutters is true', () => {
    const { container } = render(<Container disableGutters>Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).not.toHaveClass('px-4');
    expect(containerElement).not.toHaveClass('sm:px-6');
    expect(containerElement).not.toHaveClass('md:px-8');
  });

  test('applies fullHeight class when fullHeight is true', () => {
    const { container } = render(<Container fullHeight>Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('h-full');
  });

  test('applies centerContent classes when centerContent is true', () => {
    const { container } = render(<Container centerContent>Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('flex');
    expect(containerElement).toHaveClass('flex-col');
    expect(containerElement).toHaveClass('items-center');
    expect(containerElement).toHaveClass('justify-center');
  });

  test('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('custom-class');
  });

  test('forwards additional props to the div element', () => {
    const { container } = render(
      <Container data-testid="container" aria-label="Container">
        Content
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveAttribute('data-testid', 'container');
    expect(containerElement).toHaveAttribute('aria-label', 'Container');
  });
});
