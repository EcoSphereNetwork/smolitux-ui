import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders children correctly', () => {
    render(
      <Tooltip content="Tooltip Content">
        <button>Hover Me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover Me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', () => {
    render(
      <Tooltip content="Tooltip Content" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Tooltip should not be visible initially
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to trigger the tooltip display
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be visible
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip Content" delay={0} hideDelay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to trigger the tooltip display
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be visible
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();

    // Leave the trigger
    fireEvent.mouseLeave(screen.getByText('Hover Me'));

    // Advance timers to trigger the tooltip hiding
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be hidden
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('respects delay prop for showing tooltip', () => {
    render(
      <Tooltip content="Tooltip Content" delay={500}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Tooltip should not be visible immediately
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Tooltip should be visible after delay
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
  });

  it('respects hideDelay prop for hiding tooltip', () => {
    render(
      <Tooltip content="Tooltip Content" delay={0} hideDelay={500}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be visible
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();

    // Leave the trigger
    fireEvent.mouseLeave(screen.getByText('Hover Me'));

    // Tooltip should still be visible before delay
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Tooltip should be hidden after delay
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled is true', () => {
    render(
      <Tooltip content="Tooltip Content" disabled>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Tooltip should not be visible
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });

  it('renders with different positions', () => {
    const positions: Array<'top' | 'right' | 'bottom' | 'left'> = [
      'top',
      'right',
      'bottom',
      'left',
    ];

    positions.forEach((position) => {
      const { unmount } = render(
        <Tooltip content="Tooltip Content" position={position} delay={0}>
          <button>Hover Me</button>
        </Tooltip>
      );

      // Hover over the trigger
      fireEvent.mouseEnter(screen.getByText('Hover Me'));

      // Advance timers to show tooltip
      act(() => {
        jest.advanceTimersByTime(10);
      });

      const tooltip = screen.getByText('Tooltip Content').closest('.tooltip');
      expect(tooltip).toHaveClass(`tooltip-${position}`);

      unmount();
    });
  });

  it('renders with arrow when arrow is true', () => {
    render(
      <Tooltip content="Tooltip Content" arrow delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const tooltipArrow = screen.getByTestId('tooltip-arrow');
    expect(tooltipArrow).toBeInTheDocument();
  });

  it('renders without arrow when arrow is false', () => {
    render(
      <Tooltip content="Tooltip Content" arrow={false} delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(screen.queryByTestId('tooltip-arrow')).not.toBeInTheDocument();
  });

  it('applies maxWidth to tooltip', () => {
    render(
      <Tooltip content="Tooltip Content" maxWidth={200} delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const tooltip = screen.getByText('Tooltip Content').closest('.tooltip');
    expect(tooltip).toHaveStyle('max-width: 200px');
  });

  it('applies custom className to tooltip', () => {
    render(
      <Tooltip content="Tooltip Content" className="custom-tooltip" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    const tooltip = screen.getByText('Tooltip Content').closest('.tooltip');
    expect(tooltip).toHaveClass('custom-tooltip');
  });

  it('renders with rich content', () => {
    render(
      <Tooltip
        content={
          <div>
            <h4>Tooltip Title</h4>
            <p>Tooltip description</p>
          </div>
        }
        delay={0}
      >
        <button>Hover Me</button>
      </Tooltip>
    );

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.getByText('Tooltip description')).toBeInTheDocument();
  });

  it('handles focus and blur events for accessibility', () => {
    render(
      <Tooltip content="Tooltip Content" delay={0} hideDelay={0}>
        <button>Focus Me</button>
      </Tooltip>
    );

    // Focus the trigger
    fireEvent.focus(screen.getByText('Focus Me'));

    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be visible
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();

    // Blur the trigger
    fireEvent.blur(screen.getByText('Focus Me'));

    // Advance timers to hide tooltip
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Tooltip should be hidden
    expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
  });
});
