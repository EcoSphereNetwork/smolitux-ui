import React from 'react';
import { render } from '@testing-library/react';
import { Sidebar } from '../';

const items = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'settings', label: 'Settings', href: '#' },
];

describe('Sidebar Snapshots', () => {
  it('renders default sidebar', () => {
    const { asFragment } = render(<Sidebar items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
