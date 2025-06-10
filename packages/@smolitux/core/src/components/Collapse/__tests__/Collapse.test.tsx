import React from 'react';
import { render, screen } from '@testing-library/react';
import { Collapse } from '../Collapse';

describe('Collapse', () => {
  it('hides content when closed', () => {
    render(
      <Collapse in={false}>
        <div>Collapse content</div>
      </Collapse>
    );
    expect(screen.getByText('Collapse content')).not.toBeVisible();
  });

  it('shows content when open', () => {
    render(
      <Collapse in={true}>
        <div>Collapse content</div>
      </Collapse>
    );
    expect(screen.getByText('Collapse content')).toBeVisible();
  });

  it('forwards ref to the container', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Collapse in={true} ref={ref}>
        <div>Collapse content</div>
      </Collapse>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
