import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows content when open', () => {
    render(
      <Tooltip content="Info" isOpen>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Info');
  });

  it('applies custom className and forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tooltip content="Info" ref={ref} className="wrapper" isOpen>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip').parentElement).toHaveClass('wrapper');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hover text">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button', { name: 'Trigger' }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
