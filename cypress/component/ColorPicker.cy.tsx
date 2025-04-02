import React from 'react';
import { ColorPicker } from '../../packages/@smolitux/core/src/components/ColorPicker/ColorPicker';

describe('ColorPicker Component', () => {
  beforeEach(() => {
    cy.injectAxe();
  });

  it('renders with default props', () => {
    cy.mount(<ColorPicker />);
    
    cy.get('.color-picker').should('exist');
    cy.get('input[type="text"]').should('have.value', '#000000');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders with custom color value', () => {
    cy.mount(<ColorPicker value="#FF0000" />);
    
    cy.get('input[type="text"]').should('have.value', '#FF0000');
    
    // Visual test
    cy.matchImageSnapshot('color-picker-red');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('opens color picker panel when preview is clicked', () => {
    cy.mount(<ColorPicker value="#0000FF" />);
    
    cy.get('[aria-label="Farbvorschau"]').click();
    
    // Check if the panel is opened
    cy.get('[aria-label="Farbton"]').should('exist');
    
    // Visual test
    cy.matchImageSnapshot('color-picker-panel-open');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('updates color when input value changes', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    
    cy.mount(<ColorPicker onChange={onChangeSpy} />);
    
    cy.get('input[type="text"]').clear().type('#00FF00');
    cy.get('input[type="text"]').blur();
    
    // Check if onChange was called with the new color
    cy.get('@onChangeSpy').should('have.been.calledWith', '#00FF00');
    
    // Visual test
    cy.matchImageSnapshot('color-picker-green');
  });

  it('renders in disabled state', () => {
    cy.mount(<ColorPicker disabled />);
    
    cy.get('.color-picker').should('have.class', 'opacity-50');
    cy.get('.color-picker').should('have.class', 'cursor-not-allowed');
    cy.get('input[type="text"]').should('be.disabled');
    
    // Visual test
    cy.matchImageSnapshot('color-picker-disabled');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders with alpha slider when showAlpha is true', () => {
    cy.mount(<ColorPicker showAlpha />);
    
    cy.get('[aria-label="Farbvorschau"]').click();
    
    // Check if alpha slider is rendered
    cy.get('[aria-label="Transparenz"]').should('exist');
    
    // Visual test
    cy.matchImageSnapshot('color-picker-with-alpha');
    
    // Check for accessibility issues
    cy.checkA11y();
  });

  it('renders in different themes', () => {
    cy.testThemes((theme) => {
      cy.mount(<ColorPicker value="#3B82F6" />);
      
      // Visual test for each theme
      cy.matchImageSnapshot(`color-picker-${theme}-theme`);
      
      // Check for accessibility issues in each theme
      cy.checkA11y();
    });
  });
});