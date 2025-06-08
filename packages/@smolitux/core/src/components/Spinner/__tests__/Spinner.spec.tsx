// packages/@smolitux/core/src/components/Spinner/__tests__/Spinner.spec.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner Snapshot Tests', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with size="lg"', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with variant="dots"', () => {
    const { container } = render(<Spinner variant="dots" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with variant="ring"', () => {
    const { container } = render(<Spinner variant="ring" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with color="success"', () => {
    const { container } = render(<Spinner color="success" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with text', () => {
    const { container } = render(<Spinner text="Bitte warten..." />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with centered', () => {
    const { container } = render(<Spinner centered />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with fullWidth', () => {
    const { container } = render(<Spinner fullWidth />);
    expect(container).toMatchSnapshot();
  });
});
