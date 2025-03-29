import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from '../Stepper';
import { Step } from '../Step';
import { StepLabel } from '../StepLabel';
import { StepContent } from '../StepContent';
import { StepButton } from '../StepButton';
import { StepConnector } from '../StepConnector';
import { StepIcon } from '../StepIcon';

describe('Stepper', () => {
  const steps = [
    { label: 'Step 1', content: 'Content for Step 1', optional: false },
    { label: 'Step 2', content: 'Content for Step 2', optional: true },
    { label: 'Step 3', content: 'Content for Step 3', optional: false }
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
    const handleChange = jest.fn();
    render(
      <Stepper onChange={handleChange}>
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

  it('renders with StepConnector component', () => {
    render(
      <Stepper connector={<StepConnector />}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const connectors = screen.getAllByTestId('step-connector');
    expect(connectors).toHaveLength(2); // 2 connectors for 3 steps
  });

  it('renders with StepButton component', () => {
    const handleStep = jest.fn();
    
    render(
      <Stepper nonLinear>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepButton onClick={() => handleStep(index)}>
              {step.label}
            </StepButton>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    fireEvent.click(buttons[1]);
    expect(handleStep).toHaveBeenCalledWith(1);
  });

  it('renders with StepIcon component', () => {
    render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel icon={<StepIcon icon={index + 1} />}>
              {step.label}
            </StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const icons = screen.getAllByTestId('step-icon');
    expect(icons).toHaveLength(3);
  });

  it('handles keyboard navigation', () => {
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
    
    const stepLabels = screen.getAllByTestId('step-label');
    
    // Focus on the first step
    fireEvent.focus(stepLabels[0]);
    
    // Press Tab to move to the next step
    fireEvent.keyDown(stepLabels[0], { key: 'Tab' });
    fireEvent.focus(stepLabels[1]);
    
    // Press Enter to select the step
    fireEvent.keyDown(stepLabels[1], { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('renders with optional steps', () => {
    render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel optional={step.optional && <span>Optional</span>}>
              {step.label}
            </StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index} error={index === 1}>
            <StepLabel error={index === 1}>
              {step.label}
            </StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    const stepElements = screen.getAllByTestId('step');
    expect(stepElements[1]).toHaveClass('error');
  });

  it('handles step transitions correctly', async () => {
    const handleNext = jest.fn();
    const handleBack = jest.fn();
    const handleReset = jest.fn();
    
    const { rerender } = render(
      <div>
        <Stepper activeStep={0}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          ))}
        </Stepper>
        <div>
          <button onClick={handleBack} disabled={true}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
    
    // Initial state
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    expect(screen.getByText('Back')).toBeDisabled();
    
    // Click Next
    fireEvent.click(screen.getByText('Next'));
    expect(handleNext).toHaveBeenCalled();
    
    // Update to step 1
    rerender(
      <div>
        <Stepper activeStep={1}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          ))}
        </Stepper>
        <div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
    
    // Step 1 content should be visible
    expect(screen.getByText('Content for Step 2')).toBeVisible();
    expect(screen.getByText('Back')).not.toBeDisabled();
    
    // Click Back
    fireEvent.click(screen.getByText('Back'));
    expect(handleBack).toHaveBeenCalled();
    
    // Update to final step
    rerender(
      <div>
        <Stepper activeStep={2}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          ))}
        </Stepper>
        <div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    );
    
    // Final step content should be visible
    expect(screen.getByText('Content for Step 3')).toBeVisible();
    
    // Click Reset
    fireEvent.click(screen.getByText('Reset'));
    expect(handleReset).toHaveBeenCalled();
  });

  it('handles dynamic step addition and removal', () => {
    // Initial render with 3 steps
    const { rerender } = render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getAllByTestId('step')).toHaveLength(3);
    
    // Add a step
    const extendedSteps = [
      ...steps,
      { label: 'Step 4', content: 'Content for Step 4', optional: false }
    ];
    
    rerender(
      <Stepper>
        {extendedSteps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getAllByTestId('step')).toHaveLength(4);
    expect(screen.getByText('Step 4')).toBeInTheDocument();
    
    // Remove a step
    const reducedSteps = steps.slice(0, 2);
    
    rerender(
      <Stepper>
        {reducedSteps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    expect(screen.getAllByTestId('step')).toHaveLength(2);
    expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
  });

  it('handles controlled vs uncontrolled behavior correctly', () => {
    // Uncontrolled
    const { rerender } = render(
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // First step should be active by default
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    
    // Click on step 2
    fireEvent.click(screen.getByText('Step 2'));
    
    // In uncontrolled mode, step 2 should now be active
    expect(screen.getByText('Content for Step 2')).toBeVisible();
    
    // Controlled
    const handleChange = jest.fn();
    
    rerender(
      <Stepper activeStep={0} onChange={handleChange}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // First step should be active
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    
    // Click on step 2
    fireEvent.click(screen.getByText('Step 2'));
    
    // In controlled mode, step 1 should still be active, but onChange should be called
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('handles edge cases with invalid activeStep values', () => {
    // Negative activeStep
    const { rerender } = render(
      <Stepper activeStep={-1}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // Should default to first step
    expect(screen.getByText('Content for Step 1')).toBeVisible();
    
    // activeStep beyond the number of steps
    rerender(
      <Stepper activeStep={10}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.content}</StepContent>
          </Step>
        ))}
      </Stepper>
    );
    
    // Should clamp to the last step
    expect(screen.getByText('Content for Step 3')).toBeVisible();
  });
});