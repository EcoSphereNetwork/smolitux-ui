import React from 'react';
import { render } from '@testing-library/react';
import { Container } from '../Container';

describe('Container Snapshots', () => {
  it('renders default container', () => {
    const { asFragment } = render(<Container>Content</Container>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with options', () => {
    const { asFragment } = render(
      <Container maxWidth="xl" centerContent fullHeight disableGutters>
        <p>Centered</p>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
