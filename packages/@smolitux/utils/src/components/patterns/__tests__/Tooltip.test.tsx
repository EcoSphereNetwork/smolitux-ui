import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      bottom: 150,
      right: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    // Mock window.innerWidth and window.innerHeight
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  it('renders children correctly', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>
    );

    fireEvent.focus(screen.getByText('Focus me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Focus me</button>
      </Tooltip>
    );

    fireEvent.focus(screen.getByText('Focus me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.blur(screen.getByText('Focus me'));
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Tooltip content" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip with delay', async () => {
    jest.useFakeTimers();

    render(
      <Tooltip content="Tooltip content" showDelay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('hides tooltip with delay', async () => {
    jest.useFakeTimers();

    render(
      <Tooltip content="Tooltip content" hideDelay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('renders arrow when hasArrow=true', () => {
    render(
      <Tooltip content="Tooltip content" hasArrow>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(document.querySelector('.tooltip-arrow')).toBeInTheDocument();
  });

  it('does not render arrow when hasArrow=false', () => {
    render(
      <Tooltip content="Tooltip content" hasArrow={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(document.querySelector('.tooltip-arrow')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Tooltip content" className="custom-class">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies tooltipClassName to the tooltip', () => {
    render(
      <Tooltip content="Tooltip content" tooltipClassName="custom-tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(document.querySelector('.tooltip.custom-tooltip')).toBeInTheDocument();
  });

  it('applies arrowClassName to the arrow', () => {
    render(
      <Tooltip content="Tooltip content" hasArrow arrowClassName="custom-arrow">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(document.querySelector('.tooltip-arrow.custom-arrow')).toBeInTheDocument();
  });

  it('applies tooltipStyle to the tooltip', () => {
    render(
      <Tooltip content="Tooltip content" tooltipStyle={{ backgroundColor: 'red' }}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(document.querySelector('.tooltip')).toHaveStyle('background-color: red');
  });

  it('renders with different placements', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content" placement="top">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));

    rerender(
      <Tooltip content="Tooltip content" placement="bottom">
        <button>Hover me</button>
      </Tooltip>
    );

    rerender(
      <Tooltip content="Tooltip content" placement="left">
        <button>Hover me</button>
      </Tooltip>
    );

    rerender(
      <Tooltip content="Tooltip content" placement="right">
        <button>Hover me</button>
      </Tooltip>
    );
  });

  it('calls onOpen when tooltip opens', () => {
    const handleOpen = jest.fn();
    render(
      <Tooltip content="Tooltip content" onOpen={handleOpen}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when tooltip closes', () => {
    const handleClose = jest.fn();
    render(
      <Tooltip content="Tooltip content" onClose={handleClose}>
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByText('Hover me'));
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders with controlled isOpen prop', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content" isOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    rerender(
      <Tooltip content="Tooltip content" isOpen={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('renders with defaultIsOpen prop', () => {
    render(
      <Tooltip content="Tooltip content" defaultIsOpen>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });
});
