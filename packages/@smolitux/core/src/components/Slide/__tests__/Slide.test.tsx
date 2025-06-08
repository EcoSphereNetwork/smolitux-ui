import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slide } from '../Slide';

describe('Slide', () => {
  it('renders correctly with default props', () => {
    render(
      <Slide>
        <div>Slide content</div>
      </Slide>
    );

    // Content should be hidden by default
    expect(screen.queryByText('Slide content')).not.toBeVisible();
  });

  it('renders content when in is true', () => {
    render(
      <Slide in>
        <div>Slide content</div>
      </Slide>
    );

    expect(screen.getByText('Slide content')).toBeVisible();
  });

  it('toggles content visibility when in prop changes', () => {
    const { rerender } = render(
      <Slide in={false}>
        <div>Slide content</div>
      </Slide>
    );

    expect(screen.queryByText('Slide content')).not.toBeVisible();

    rerender(
      <Slide in={true}>
        <div>Slide content</div>
      </Slide>
    );

    expect(screen.getByText('Slide content')).toBeVisible();
  });

  it('applies custom animation duration', () => {
    render(
      <Slide in duration={500}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveStyle('transition-duration: 500ms');
  });

  it('applies custom styles', () => {
    render(
      <Slide in style={{ backgroundColor: 'red' }}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveStyle('background-color: red');
  });

  it('applies custom className', () => {
    render(
      <Slide in className="custom-slide">
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveClass('custom-slide');
  });

  it('calls onEnter when animation starts', () => {
    const handleEnter = jest.fn();
    render(
      <Slide in onEnter={handleEnter}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    fireEvent.transitionStart(slideElement);

    expect(handleEnter).toHaveBeenCalled();
  });

  it('calls onEntered when animation ends', () => {
    const handleEntered = jest.fn();
    render(
      <Slide in onEntered={handleEntered}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    fireEvent.transitionEnd(slideElement);

    expect(handleEntered).toHaveBeenCalled();
  });

  it('calls onExit when exit animation starts', () => {
    const handleExit = jest.fn();
    const { rerender } = render(
      <Slide in={true} onExit={handleExit}>
        <div>Slide content</div>
      </Slide>
    );

    rerender(
      <Slide in={false} onExit={handleExit}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    fireEvent.transitionStart(slideElement);

    expect(handleExit).toHaveBeenCalled();
  });

  it('calls onExited when exit animation ends', () => {
    const handleExited = jest.fn();
    const { rerender } = render(
      <Slide in={true} onExited={handleExited}>
        <div>Slide content</div>
      </Slide>
    );

    rerender(
      <Slide in={false} onExited={handleExited}>
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    fireEvent.transitionEnd(slideElement);

    expect(handleExited).toHaveBeenCalled();
  });

  it('renders with different directions', () => {
    const { rerender } = render(
      <Slide in direction="right" data-testid="slide-container">
        <div>Slide content</div>
      </Slide>
    );

    let slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveClass('slide-right');

    rerender(
      <Slide in direction="left" data-testid="slide-container">
        <div>Slide content</div>
      </Slide>
    );

    slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveClass('slide-left');

    rerender(
      <Slide in direction="up" data-testid="slide-container">
        <div>Slide content</div>
      </Slide>
    );

    slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveClass('slide-up');

    rerender(
      <Slide in direction="down" data-testid="slide-container">
        <div>Slide content</div>
      </Slide>
    );

    slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveClass('slide-down');
  });

  it('renders with custom offset', () => {
    render(
      <Slide in offset="100px" data-testid="slide-container">
        <div>Slide content</div>
      </Slide>
    );

    const slideElement = screen.getByTestId('slide-container');
    expect(slideElement).toHaveStyle('--slide-offset: 100px');
  });
});
