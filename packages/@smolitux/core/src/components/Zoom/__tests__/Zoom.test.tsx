import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Zoom } from '../Zoom';

describe('Zoom', () => {
  it('renders correctly with default props', () => {
    render(
      <Zoom>
        <div>Zoom content</div>
      </Zoom>
    );

    // Content should be hidden by default
    expect(screen.queryByText('Zoom content')).not.toBeVisible();
  });

  it('renders content when in is true', () => {
    render(
      <Zoom in>
        <div>Zoom content</div>
      </Zoom>
    );

    expect(screen.getByText('Zoom content')).toBeVisible();
  });

  it('toggles content visibility when in prop changes', () => {
    const { rerender } = render(
      <Zoom in={false}>
        <div>Zoom content</div>
      </Zoom>
    );

    expect(screen.queryByText('Zoom content')).not.toBeVisible();

    rerender(
      <Zoom in={true}>
        <div>Zoom content</div>
      </Zoom>
    );

    expect(screen.getByText('Zoom content')).toBeVisible();
  });

  it('applies custom animation duration', () => {
    render(
      <Zoom in duration={500}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    expect(zoomElement).toHaveStyle('transition-duration: 500ms');
  });

  it('applies custom styles', () => {
    render(
      <Zoom in style={{ backgroundColor: 'red' }}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    expect(zoomElement).toHaveStyle('background-color: red');
  });

  it('applies custom className', () => {
    render(
      <Zoom in className="custom-zoom">
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    expect(zoomElement).toHaveClass('custom-zoom');
  });

  it('calls onEnter when animation starts', () => {
    const handleEnter = jest.fn();
    render(
      <Zoom in onEnter={handleEnter}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    fireEvent.transitionStart(zoomElement);

    expect(handleEnter).toHaveBeenCalled();
  });

  it('calls onEntered when animation ends', () => {
    const handleEntered = jest.fn();
    render(
      <Zoom in onEntered={handleEntered}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    fireEvent.transitionEnd(zoomElement);

    expect(handleEntered).toHaveBeenCalled();
  });

  it('calls onExit when exit animation starts', () => {
    const handleExit = jest.fn();
    const { rerender } = render(
      <Zoom in={true} onExit={handleExit}>
        <div>Zoom content</div>
      </Zoom>
    );

    rerender(
      <Zoom in={false} onExit={handleExit}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    fireEvent.transitionStart(zoomElement);

    expect(handleExit).toHaveBeenCalled();
  });

  it('calls onExited when exit animation ends', () => {
    const handleExited = jest.fn();
    const { rerender } = render(
      <Zoom in={true} onExited={handleExited}>
        <div>Zoom content</div>
      </Zoom>
    );

    rerender(
      <Zoom in={false} onExited={handleExited}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    fireEvent.transitionEnd(zoomElement);

    expect(handleExited).toHaveBeenCalled();
  });

  it('renders with custom scale', () => {
    render(
      <Zoom in scale={1.5}>
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    expect(zoomElement).toHaveStyle('--zoom-scale: 1.5');
  });

  it('renders with custom origin', () => {
    render(
      <Zoom in origin="top left">
        <div>Zoom content</div>
      </Zoom>
    );

    const zoomElement = screen.getByTestId('zoom-container');
    expect(zoomElement).toHaveStyle('transform-origin: top left');
  });
});
