import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Fade } from '../Fade';

describe('Fade', () => {
  it('renders correctly with default props', () => {
    render(
      <Fade>
        <div>Fade content</div>
      </Fade>
    );
    
    // Content should be hidden by default
    expect(screen.queryByText('Fade content')).not.toBeVisible();
  });

  it('renders content when in is true', () => {
    render(
      <Fade in>
        <div>Fade content</div>
      </Fade>
    );
    
    expect(screen.getByText('Fade content')).toBeVisible();
  });

  it('toggles content visibility when in prop changes', () => {
    const { rerender } = render(
      <Fade in={false}>
        <div>Fade content</div>
      </Fade>
    );
    
    expect(screen.queryByText('Fade content')).not.toBeVisible();
    
    rerender(
      <Fade in={true}>
        <div>Fade content</div>
      </Fade>
    );
    
    expect(screen.getByText('Fade content')).toBeVisible();
  });

  it('applies custom animation duration', () => {
    render(
      <Fade in duration={500}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    expect(fadeElement).toHaveStyle('transition-duration: 500ms');
  });

  it('applies custom styles', () => {
    render(
      <Fade in style={{ backgroundColor: 'red' }}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    expect(fadeElement).toHaveStyle('background-color: red');
  });

  it('applies custom className', () => {
    render(
      <Fade in className="custom-fade">
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    expect(fadeElement).toHaveClass('custom-fade');
  });

  it('calls onEnter when animation starts', () => {
    const handleEnter = jest.fn();
    render(
      <Fade in onEnter={handleEnter}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    fireEvent.transitionStart(fadeElement);
    
    expect(handleEnter).toHaveBeenCalled();
  });

  it('calls onEntered when animation ends', () => {
    const handleEntered = jest.fn();
    render(
      <Fade in onEntered={handleEntered}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    fireEvent.transitionEnd(fadeElement);
    
    expect(handleEntered).toHaveBeenCalled();
  });

  it('calls onExit when exit animation starts', () => {
    const handleExit = jest.fn();
    const { rerender } = render(
      <Fade in={true} onExit={handleExit}>
        <div>Fade content</div>
      </Fade>
    );
    
    rerender(
      <Fade in={false} onExit={handleExit}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    fireEvent.transitionStart(fadeElement);
    
    expect(handleExit).toHaveBeenCalled();
  });

  it('calls onExited when exit animation ends', () => {
    const handleExited = jest.fn();
    const { rerender } = render(
      <Fade in={true} onExited={handleExited}>
        <div>Fade content</div>
      </Fade>
    );
    
    rerender(
      <Fade in={false} onExited={handleExited}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    fireEvent.transitionEnd(fadeElement);
    
    expect(handleExited).toHaveBeenCalled();
  });

  it('renders with custom initial opacity', () => {
    render(
      <Fade in initialOpacity={0.2}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    expect(fadeElement).toHaveStyle('opacity: 1');
  });

  it('renders with custom final opacity', () => {
    render(
      <Fade in finalOpacity={0.8}>
        <div>Fade content</div>
      </Fade>
    );
    
    const fadeElement = screen.getByTestId('fade-container');
    expect(fadeElement).toHaveStyle('opacity: 0.8');
  });
});