import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuDropdown } from '../MenuDropdown';
import Button from '../../Button';

describe('MenuDropdown', () => {
  it('forwards ref to dropdown container', async () => {
    const user = userEvent.setup();
    const ref = React.createRef<HTMLDivElement>();

    render(
      <MenuDropdown trigger={<Button>Open</Button>} ref={ref}>
        <div>Item</div>
      </MenuDropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
