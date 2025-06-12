import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { a11y } from '@smolitux/testing';
import { Collapse } from '../Collapse';

describe('Collapse Accessibility', () => {
  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Collapse>
        <div>Collapse Content</div>
      </Collapse>
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes when collapsed', () => {
    render(
      <Collapse in={false}>
        <div>Collapse Content</div>
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('role', 'region');
    expect(collapse).toHaveAttribute('aria-expanded', 'false');
    expect(collapse).toHaveAttribute('aria-hidden', 'true');
    expect(collapse).toHaveAttribute('id');
    expect(collapse.id).toMatch(/^collapse-/);
    expect(collapse).toHaveAttribute('data-state', 'exited');
  });

  it('should have correct ARIA attributes when expanded', () => {
    render(
      <Collapse in={true}>
        <div>Collapse Content</div>
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('role', 'region');
    expect(collapse).toHaveAttribute('aria-expanded', 'true');
    expect(collapse).toHaveAttribute('aria-hidden', 'false');
    expect(collapse).toHaveAttribute('data-state', 'entered');
  });

  it('should support custom ARIA attributes', () => {
    render(
      <Collapse
        in={true}
        ariaProps={{
          'aria-labelledby': 'header-id',
          'aria-describedby': 'description-id',
          role: 'tabpanel',
        }}
      >
        <div>Collapse Content</div>
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('role', 'tabpanel');
    expect(collapse).toHaveAttribute('aria-labelledby', 'header-id');
    expect(collapse).toHaveAttribute('aria-describedby', 'description-id');
    expect(collapse).toHaveAttribute('aria-expanded', 'true');
  });

  it('should support custom ID', () => {
    render(
      <Collapse
        in={true}
        ariaProps={{
          id: 'custom-collapse-id',
        }}
      >
        <div>Collapse Content</div>
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('id', 'custom-collapse-id');
  });

  it('should have correct data-orientation attribute', () => {
    const { rerender } = render(
      <Collapse in={true} orientation="vertical">
        <div>Collapse Content</div>
      </Collapse>
    );

    let collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('data-orientation', 'vertical');

    rerender(
      <Collapse in={true} orientation="horizontal">
        <div>Collapse Content</div>
      </Collapse>
    );

    collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('should update ARIA attributes when toggling', async () => {
    const { rerender } = render(
      <Collapse in={false}>
        <div>Collapse Content</div>
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveAttribute('aria-expanded', 'false');
    expect(collapse).toHaveAttribute('aria-hidden', 'true');

    rerender(
      <Collapse in={true}>
        <div>Collapse Content</div>
      </Collapse>
    );

    await waitFor(() => {
      expect(collapse).toHaveAttribute('aria-expanded', 'true');
      expect(collapse).toHaveAttribute('aria-hidden', 'false');
    });
  });

});
