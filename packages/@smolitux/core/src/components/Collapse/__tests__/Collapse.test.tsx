import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapse } from '../Collapse';

describe('Collapse', () => {
  it('renders correctly with default props', () => {
    render(
      <Collapse>
        <div>Collapse content</div>
      </Collapse>
    );
    
    // Content should be hidden by default
    expect(screen.queryByText('Collapse content')).not.toBeVisible();
  });

  it('renders content when isOpen is true', () => {
    render(
      <Collapse isOpen>
        <div>Collapse content</div>
      </Collapse>
    );
    
    expect(screen.getByText('Collapse content')).toBeVisible();
  });

  it('toggles content visibility when isOpen prop changes', () => {
    const { rerender } = render(
      <Collapse isOpen={false}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    expect(screen.queryByText('Collapse content')).not.toBeVisible();
    
    rerender(
      <Collapse isOpen={true}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    expect(screen.getByText('Collapse content')).toBeVisible();
  });

  it('applies custom animation duration', () => {
    render(
      <Collapse isOpen duration={500}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    expect(collapseElement).toHaveStyle('transition-duration: 500ms');
  });

  it('applies custom styles', () => {
    render(
      <Collapse isOpen style={{ backgroundColor: 'red' }}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    expect(collapseElement).toHaveStyle('background-color: red');
  });

  it('applies custom className', () => {
    render(
      <Collapse isOpen className="custom-collapse">
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    expect(collapseElement).toHaveClass('custom-collapse');
  });

  it('calls onAnimationStart when animation starts', () => {
    const handleAnimationStart = jest.fn();
    render(
      <Collapse isOpen onAnimationStart={handleAnimationStart}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    fireEvent.transitionStart(collapseElement);
    
    expect(handleAnimationStart).toHaveBeenCalled();
  });

  it('calls onAnimationEnd when animation ends', () => {
    const handleAnimationEnd = jest.fn();
    render(
      <Collapse isOpen onAnimationEnd={handleAnimationEnd}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    fireEvent.transitionEnd(collapseElement);
    
    expect(handleAnimationEnd).toHaveBeenCalled();
  });

  it('renders with startingHeight when provided', () => {
    render(
      <Collapse isOpen={false} startingHeight={20}>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseElement = screen.getByTestId('collapse-container');
    expect(collapseElement).toHaveStyle('height: 20px');
  });

  it('renders with animateOpacity when provided', () => {
    render(
      <Collapse isOpen animateOpacity>
        <div>Collapse content</div>
      </Collapse>
    );
    
    const collapseContent = screen.getByTestId('collapse-content');
    expect(collapseContent).toHaveStyle('opacity: 1');
  });
});