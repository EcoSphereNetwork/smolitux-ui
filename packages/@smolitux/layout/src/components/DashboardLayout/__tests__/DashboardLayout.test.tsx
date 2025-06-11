import React from 'react';
import { render } from '@testing-library/react';
import { DashboardLayout } from '../DashboardLayout';

jest.mock('../../Header/Header', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <header>{children}</header>,
}));
jest.mock('../../Sidebar/Sidebar', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <aside>{children}</aside>,
}));
jest.mock('../../Footer/Footer', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <footer>{children}</footer>,
}));
jest.mock('../../Container/Container', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

describe('DashboardLayout', () => {
  it('renders children inside container', () => {
    const { getByText } = render(
      <DashboardLayout header={{ show: false }} sidebar={{ show: false, items: [] }} footer={{ show: false }}>
        <span>content</span>
      </DashboardLayout>
    );
    expect(getByText('content')).toBeInTheDocument();
  });

  it('shows header, sidebar and footer when enabled', () => {
    const { container } = render(
      <DashboardLayout
        header={{ show: true, title: 'H' }}
        sidebar={{ show: true, items: [] }}
        footer={{ show: true }}
      >
        test
      </DashboardLayout>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('aside')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <DashboardLayout ref={ref} header={{ show: false }} sidebar={{ show: false, items: [] }} footer={{ show: false }}>
        test
      </DashboardLayout>
    );
    expect(ref.current).toBe(container.firstChild);
  });
});
