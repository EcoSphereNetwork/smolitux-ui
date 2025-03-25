import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Popover } from '../Popover';

describe('Popover', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders trigger element', () => {
    render(
      <Popover content="Popover Content">
        <button>Trigger</button>
      </Popover>
    );
    
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows content when trigger is clicked (click trigger)', () => {
    render(
      <Popover content="Popover Content" trigger="click">
        <button>Trigger</button>
      </Popover>
    );
    
    // Content should not be visible initially
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    
    // Click the trigger
    fireEvent.click(screen.getByText('Trigger'));
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('shows content when trigger is hovered (hover trigger)', () => {
    render(
      <Popover content="Popover Content" trigger="hover">
        <button>Trigger</button>
      </Popover>
    );
    
    // Content should not be visible initially
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    
    // Hover the trigger
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('shows content when trigger is focused (focus trigger)', () => {
    render(
      <Popover content="Popover Content" trigger="focus">
        <button>Trigger</button>
      </Popover>
    );
    
    // Content should not be visible initially
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    
    // Focus the trigger
    fireEvent.focus(screen.getByText('Trigger'));
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('shows content when isOpen is true (controlled mode)', () => {
    render(
      <Popover content="Popover Content" isOpen={true} trigger="manual">
        <button>Trigger</button>
      </Popover>
    );
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('shows content when defaultOpen is true (uncontrolled mode)', () => {
    render(
      <Popover content="Popover Content" defaultOpen={true} trigger="manual">
        <button>Trigger</button>
      </Popover>
    );
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('calls onOpenChange when popover opens/closes', () => {
    const handleOpenChange = jest.fn();
    
    render(
      <Popover 
        content="Popover Content" 
        trigger="click" 
        onOpenChange={handleOpenChange}
      >
        <button>Trigger</button>
      </Popover>
    );
    
    // Click to open
    fireEvent.click(screen.getByText('Trigger'));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    
    // Click to close
    fireEvent.click(screen.getByText('Trigger'));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('respects openDelay for hover trigger', () => {
    render(
      <Popover 
        content="Popover Content" 
        trigger="hover" 
        openDelay={500}
      >
        <button>Trigger</button>
      </Popover>
    );
    
    // Hover the trigger
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    
    // Content should not be visible immediately
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    
    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Content should be visible after delay
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('respects closeDelay for hover trigger', () => {
    render(
      <Popover 
        content="Popover Content" 
        trigger="hover" 
        closeDelay={500}
      >
        <button>Trigger</button>
      </Popover>
    );
    
    // Hover the trigger
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    
    // Content should be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    // Leave the trigger
    fireEvent.mouseLeave(screen.getByText('Trigger'));
    
    // Content should still be visible
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Content should be hidden after delay
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('closes when clicking outside if closeOnClickOutside is true', () => {
    render(
      <div>
        <Popover 
          content="Popover Content" 
          trigger="click" 
          closeOnClickOutside={true}
        >
          <button>Trigger</button>
        </Popover>
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    // Click to open
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    // Content should be hidden
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('closes when ESC key is pressed if closeOnEsc is true', () => {
    render(
      <Popover 
        content="Popover Content" 
        trigger="click" 
        closeOnEsc={true}
      >
        <button>Trigger</button>
      </Popover>
    );
    
    // Click to open
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    // Press ESC
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Content should be hidden
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('renders with arrow when showArrow is true', () => {
    render(
      <Popover 
        content="Popover Content" 
        isOpen={true}
        showArrow={true}
      >
        <button>Trigger</button>
      </Popover>
    );
    
    const arrow = screen.getByTestId('popover-arrow');
    expect(arrow).toBeInTheDocument();
  });

  it('renders with different placements', () => {
    const placements: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left'];
    
    placements.forEach(placement => {
      const { unmount } = render(
        <Popover 
          content="Popover Content" 
          isOpen={true}
          placement={placement}
        >
          <button>Trigger</button>
        </Popover>
      );
      
      const popover = screen.getByRole('tooltip');
      expect(popover).toHaveAttribute('data-placement', placement);
      
      unmount();
    });
  });
});