import { act, renderHook } from '@testing-library/react';
import { useDrawerLogic } from '../useDrawerLogic';

describe('useDrawerLogic', () => {
  it('opens and closes the drawer', () => {
    const { result } = renderHook(() => useDrawerLogic());

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles state', () => {
    const { result } = renderHook(() => useDrawerLogic());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('returns provided options', () => {
    const { result } = renderHook(() =>
      useDrawerLogic({ placement: 'left', trapFocus: false, hasOverlay: false })
    );
    expect(result.current.placement).toBe('left');
    expect(result.current.trapFocus).toBe(false);
    expect(result.current.hasOverlay).toBe(false);
  });

  it('closes on Escape when enabled', () => {
    const { result } = renderHook(() => useDrawerLogic({ closeOnEsc: true }));
    act(() => {
      result.current.open();
    });
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('does not close on Escape when disabled', () => {
    const { result } = renderHook(() => useDrawerLogic({ closeOnEsc: false }));
    act(() => {
      result.current.open();
    });
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);
    });
    expect(result.current.isOpen).toBe(true);
  });
});
