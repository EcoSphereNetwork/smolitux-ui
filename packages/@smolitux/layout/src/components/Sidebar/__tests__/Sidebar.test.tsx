import React from 'react';
import { render, act } from '@testing-library/react';
import { Sidebar } from '../';

describe('Sidebar responsive behaviour', () => {
  beforeEach(() => {
    (window as any).innerWidth = 1024;
  });

  test('collapses below breakpoint when responsive', () => {
    const { container } = render(
      <Sidebar items={[{ id: 'home', label: 'Home' }]} responsive collapseBreakpoint="md" />
    );
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar.style.width).toBe('240px');
    act(() => {
      (window as any).innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });
    expect(sidebar.style.width).toBe('64px');
  });

  test('does not collapse when responsive is false', () => {
    (window as any).innerWidth = 500;
    const { container } = render(
      <Sidebar items={[{ id: 'home', label: 'Home' }]} responsive={false} />
    );
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar.style.width).toBe('240px');
  });
});
