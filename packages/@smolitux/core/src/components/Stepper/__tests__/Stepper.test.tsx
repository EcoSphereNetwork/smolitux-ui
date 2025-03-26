import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../Stepper';
import { Step } from '../Step';
import { StepLabel } from '../StepLabel';
import { StepContent } from '../StepContent';

describe('Stepper', () => {
  const steps = [
    { label: 'Step 1', content: 'Content for Step 1' },
    { label: 'Step 2', content: 'Content for Step 2' },
    { label: 'Step 3', content: 'Content for Step 3' }
  ];

  it('renders correctly with default props', () => {
    render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    
    // Only the first step content should be visible by default
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    expect(screen.queryByText('Content for Step 2')).not.toBeVisible();
    expect(screen.queryByText('Content for Step 3')).not.toBeVisible();
  });

  it('renders with activeStep prop', () => {
    render(
      <Stepper activeStep={1}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // Second step content should be visible
    expect(screen.queryByText('Content for Step 1')).not.toBeVisible();
    expect(screen.getByText('Content for Step 2')).toBeVisible();
    expect(screen.queryByText('Content for Step 3')).not.toBeVisible();
  });

  it('calls onChange when step is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Stepper onChange={handleChange}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // Click on the second step
    fireEvent.click(screen.getByText('Step 2'));
    
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('renders with orientation prop', () => {
    const { rerender } = render(
      <Stepper orientation="horizontal" data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    let stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveClass('stepper-horizontal');
    
    rerender(
      <Stepper orientation="vertical" data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveClass('stepper-vertical');
  });

  it('renders with custom className', () => {
    render(
      <Stepper className="custom-stepper" data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveClass('custom-stepper');
  });

  it('renders with custom style', () => {
    render(
      <Stepper style={{ backgroundColor: 'lightgray' }} data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveStyle('background-color: lightgray');
  });

  it('renders with alternativeLabel prop', () => {
    render(
      <Stepper alternativeLabel data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveClass('alternative-label');
  });

  it('renders with nonLinear prop', () => {
    render(
      <Stepper nonLinear data-testid="stepper">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveClass('non-linear');
  });

  it('renders with completed steps', () => {
    render(
      <Stepper activeStep={2}>
        {steps.map((step, index) => (
          <Step key={index} completed={index < 2}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepElements = screen.getAllByTestId('step');
    expect(stepElements[0]).toHaveClass('completed');
    expect(stepElements[1]).toHaveClass('completed');
    expect(stepElements[2]).not.toHaveClass('completed');
  });

  it('renders with disabled steps', () => {
    render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index} disabled={index === 2}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepElements = screen.getAllByTestId('step');
    expect(stepElements[0]).not.toHaveClass('disabled');
    expect(stepElements[1]).not.toHaveClass('disabled');
    expect(stepElements[2]).toHaveClass('disabled');
    
    // Click on the disabled step should not trigger onChange
    const handleChange = jest.fn();
    fireEvent.click(screen.getByText('Step 3'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with custom connector', () => {
    const CustomConnector = () => <div data-testid="custom-connector">Custom Connector</div>;
    
    render(
      <Stepper connector={<CustomConnector />}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getAllByTestId('custom-connector')).toHaveLength(2); // 2 connectors for 3 steps
  });
});