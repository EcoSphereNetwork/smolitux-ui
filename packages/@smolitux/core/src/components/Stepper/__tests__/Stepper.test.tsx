import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@smolitux/testing';
import { axe } from 'jest-axe';
import Stepper, { StepperContent, StepperActions } from '../Stepper';

describe('Stepper', () => {
  const steps = [
    { id: 'step1', title: 'Schritt 1', description: 'Beschreibung 1' },
    { id: 'step2', title: 'Schritt 2', description: 'Beschreibung 2' },
    { id: 'step3', title: 'Schritt 3', description: 'Beschreibung 3', optional: true },
  ];

  it('renders correctly with default props', () => {
    render(<Stepper steps={steps} activeStep={0} />);

    // Prüfen, ob der Stepper gerendert wurde
    const stepper = screen.getByRole('navigation');
    expect(stepper).toBeInTheDocument();

    // Prüfen, ob alle Schritte gerendert wurden
    expect(screen.getByText('Schritt 1')).toBeInTheDocument();
    expect(screen.getByText('Schritt 2')).toBeInTheDocument();
    expect(screen.getByText('Schritt 3')).toBeInTheDocument();

    // Prüfen, ob die Beschreibungen gerendert wurden
    expect(screen.getByText('Beschreibung 1')).toBeInTheDocument();
    expect(screen.getByText('Beschreibung 2')).toBeInTheDocument();
    expect(screen.getByText('Beschreibung 3')).toBeInTheDocument();

    // Prüfen, ob der optionale Schritt als solcher gekennzeichnet ist
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('renders with horizontal orientation', () => {
    render(<Stepper steps={steps} activeStep={0} orientation="horizontal" />);

    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--horizontal');
  });

  it('renders with vertical orientation', () => {
    render(<Stepper steps={steps} activeStep={0} orientation="vertical" />);

    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--vertical');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Stepper steps={steps} activeStep={0} variant="default" />);

    let stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--default');

    rerender(<Stepper steps={steps} activeStep={0} variant="outlined" />);
    stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--outlined');

    rerender(<Stepper steps={steps} activeStep={0} variant="contained" />);
    stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--contained');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Stepper steps={steps} activeStep={0} size="sm" />);

    let stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--sm');

    rerender(<Stepper steps={steps} activeStep={0} size="md" />);
    stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--md');

    rerender(<Stepper steps={steps} activeStep={0} size="lg" />);
    stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('smolitux-stepper--lg');
  });

  it('renders with custom className', () => {
    render(<Stepper steps={steps} activeStep={0} className="custom-class" />);

    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveClass('custom-class');
  });

  it('renders with custom ariaLabel', () => {
    render(<Stepper steps={steps} activeStep={0} ariaLabel="Benutzerdefinierter Stepper" />);

    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveAttribute('aria-label', 'Benutzerdefinierter Stepper');
  });

  it('renders with connector', () => {
    render(<Stepper steps={steps} activeStep={0} showConnector={true} />);

    const connectors = document.querySelectorAll('.smolitux-stepper-connector');
    expect(connectors.length).toBe(2); // 2 Verbindungen für 3 Schritte
  });

  it('renders without connector', () => {
    render(<Stepper steps={steps} activeStep={0} showConnector={false} />);

    const connectors = document.querySelectorAll('.smolitux-stepper-connector');
    expect(connectors.length).toBe(0);
  });

  it('handles step click when clickable', () => {
    const handleStepChange = jest.fn();
    render(
      <Stepper steps={steps} activeStep={0} onStepChange={handleStepChange} clickable={true} />
    );

    // Klicken auf den zweiten Schritt
    const stepHeaders = document.querySelectorAll('.smolitux-stepper-step-header');
    fireEvent.click(stepHeaders[1]);

    expect(handleStepChange).toHaveBeenCalledWith(1);
  });

  it('does not handle step click when not clickable', () => {
    const handleStepChange = jest.fn();
    render(
      <Stepper steps={steps} activeStep={0} onStepChange={handleStepChange} clickable={false} />
    );

    // Klicken auf den zweiten Schritt
    const stepHeaders = document.querySelectorAll('.smolitux-stepper-step-header');
    fireEvent.click(stepHeaders[1]);

    expect(handleStepChange).not.toHaveBeenCalled();
  });

  it('does not handle click on disabled step', () => {
    const handleStepChange = jest.fn();
    const stepsWithDisabled = [...steps.slice(0, 2), { ...steps[2], disabled: true }];

    render(
      <Stepper
        steps={stepsWithDisabled}
        activeStep={0}
        onStepChange={handleStepChange}
        clickable={true}
      />
    );

    // Klicken auf den dritten (deaktivierten) Schritt
    const stepHeaders = document.querySelectorAll('.smolitux-stepper-step-header');
    fireEvent.click(stepHeaders[2]);

    expect(handleStepChange).not.toHaveBeenCalled();
  });

  it('renders StepperContent correctly', () => {
    render(
      <Stepper steps={steps} activeStep={1}>
        <StepperContent>
          <div data-testid="content-1">Inhalt 1</div>
          <div data-testid="content-2">Inhalt 2</div>
          <div data-testid="content-3">Inhalt 3</div>
        </StepperContent>
      </Stepper>
    );

    // Prüfen, ob der richtige Inhalt angezeigt wird (basierend auf activeStep)
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
    expect(screen.queryByTestId('content-3')).not.toBeInTheDocument();
  });

  it('renders StepperActions correctly with default buttons', () => {
    render(
      <Stepper steps={steps} activeStep={1}>
        <StepperActions />
      </Stepper>
    );

    // Prüfen, ob die Standard-Buttons gerendert wurden
    expect(screen.getByText('Zurück')).toBeInTheDocument();
    expect(screen.getByText('Weiter')).toBeInTheDocument();
  });

  it('renders StepperActions with complete button on last step', () => {
    render(
      <Stepper steps={steps} activeStep={2}>
        <StepperActions />
      </Stepper>
    );

    // Prüfen, ob der Abschließen-Button angezeigt wird
    expect(screen.getByText('Zurück')).toBeInTheDocument();
    expect(screen.getByText('Abschließen')).toBeInTheDocument();
    expect(screen.queryByText('Weiter')).not.toBeInTheDocument();
  });

  it('handles back button click', () => {
    const handleStepChange = jest.fn();
    render(
      <Stepper steps={steps} activeStep={1} onStepChange={handleStepChange}>
        <StepperActions />
      </Stepper>
    );

    // Klicken auf den Zurück-Button
    fireEvent.click(screen.getByText('Zurück'));

    expect(handleStepChange).toHaveBeenCalledWith(0);
  });

  it('handles next button click', () => {
    const handleStepChange = jest.fn();
    render(
      <Stepper steps={steps} activeStep={1} onStepChange={handleStepChange}>
        <StepperActions />
      </Stepper>
    );

    // Klicken auf den Weiter-Button
    fireEvent.click(screen.getByText('Weiter'));

    expect(handleStepChange).toHaveBeenCalledWith(2);
  });

  it('handles complete button click', () => {
    const handleComplete = jest.fn();
    render(
      <Stepper steps={steps} activeStep={2}>
        <StepperActions onComplete={handleComplete} />
      </Stepper>
    );

    // Klicken auf den Abschließen-Button
    fireEvent.click(screen.getByText('Abschließen'));

    expect(handleComplete).toHaveBeenCalled();
  });

  it('renders StepperActions with custom button labels', () => {
    render(
      <Stepper steps={steps} activeStep={1}>
        <StepperActions
          backLabel="Zurück gehen"
          nextLabel="Fortfahren"
          completeLabel="Fertigstellen"
        />
      </Stepper>
    );

    // Prüfen, ob die benutzerdefinierten Button-Labels gerendert wurden
    expect(screen.getByText('Zurück gehen')).toBeInTheDocument();
    expect(screen.getByText('Fortfahren')).toBeInTheDocument();
  });

  it('renders StepperActions with custom className', () => {
    render(
      <Stepper steps={steps} activeStep={1}>
        <StepperActions className="custom-actions-class" />
      </Stepper>
    );

    const actions = document.querySelector('.smolitux-stepper-actions');
    expect(actions).toHaveClass('custom-actions-class');
  });

  it('renders StepperActions with custom children', () => {
    render(
      <Stepper steps={steps} activeStep={1}>
        <StepperActions>
          <button data-testid="custom-button">Benutzerdefinierter Button</button>
        </StepperActions>
      </Stepper>
    );

    // Prüfen, ob die benutzerdefinierten Kinder gerendert wurden
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    expect(screen.queryByText('Zurück')).not.toBeInTheDocument();
    expect(screen.queryByText('Weiter')).not.toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Stepper steps={steps} activeStep={1} ariaLabel="Prozess-Stepper">
        <StepperContent>
          <div>Inhalt 1</div>
          <div>Inhalt 2</div>
          <div>Inhalt 3</div>
        </StepperContent>
        <StepperActions />
      </Stepper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
