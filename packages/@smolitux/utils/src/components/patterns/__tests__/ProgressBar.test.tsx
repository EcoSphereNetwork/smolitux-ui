import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container.firstChild).toHaveClass('progress-bar');
    expect(container.querySelector('.progress-bar-fill')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ProgressBar value={50} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(<ProgressBar value={50} style={{ backgroundColor: 'red' }} />);
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('shows value when showValue=true', () => {
    render(<ProgressBar value={50} showValue />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('formats value with custom formatter', () => {
    const formatValue = (value: number, max: number) => `${value}/${max}`;
    render(<ProgressBar value={50} max={100} showValue formatValue={formatValue} />);
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('applies correct width based on value and max', () => {
    const { container } = render(<ProgressBar value={25} max={100} />);
    const progressFill = container.querySelector('.progress-bar-fill');
    expect(progressFill).toHaveStyle('width: 25%');
  });

  it('clamps value to min and max', () => {
    const { container } = render(<ProgressBar value={150} max={100} min={0} />);
    const progressFill = container.querySelector('.progress-bar-fill');
    expect(progressFill).toHaveStyle('width: 100%');

    const { container: container2 } = render(<ProgressBar value={-10} max={100} min={0} />);
    const progressFill2 = container2.querySelector('.progress-bar-fill');
    expect(progressFill2).toHaveStyle('width: 0%');
  });

  it('applies different sizes', () => {
    const { container: containerXs } = render(<ProgressBar value={50} size="xs" />);
    expect(containerXs.firstChild).toHaveStyle('height: 0.25rem');

    const { container: containerSm } = render(<ProgressBar value={50} size="sm" />);
    expect(containerSm.firstChild).toHaveStyle('height: 0.5rem');

    const { container: containerMd } = render(<ProgressBar value={50} size="md" />);
    expect(containerMd.firstChild).toHaveStyle('height: 0.75rem');

    const { container: containerLg } = render(<ProgressBar value={50} size="lg" />);
    expect(containerLg.firstChild).toHaveStyle('height: 1rem');

    const { container: containerXl } = render(<ProgressBar value={50} size="xl" />);
    expect(containerXl.firstChild).toHaveStyle('height: 1.5rem');
  });

  it('applies different color schemes', () => {
    const { container: containerPrimary } = render(
      <ProgressBar value={50} colorScheme="primary" />
    );
    const progressFillPrimary = containerPrimary.querySelector('.progress-bar-fill');
    expect(progressFillPrimary).toHaveStyle('background-color: #3b82f6');

    const { container: containerSuccess } = render(
      <ProgressBar value={50} colorScheme="success" />
    );
    const progressFillSuccess = containerSuccess.querySelector('.progress-bar-fill');
    expect(progressFillSuccess).toHaveStyle('background-color: #10b981');

    const { container: containerDanger } = render(<ProgressBar value={50} colorScheme="danger" />);
    const progressFillDanger = containerDanger.querySelector('.progress-bar-fill');
    expect(progressFillDanger).toHaveStyle('background-color: #ef4444');
  });

  it('applies rounded style when rounded=true', () => {
    const { container } = render(<ProgressBar value={50} rounded />);
    expect(container.firstChild).toHaveStyle('border-radius: 9999px');
  });

  it('does not apply rounded style when rounded=false', () => {
    const { container } = render(<ProgressBar value={50} rounded={false} />);
    expect(container.firstChild).toHaveStyle('border-radius: 0');
  });

  it('applies indeterminate style when indeterminate=true', () => {
    const { container } = render(<ProgressBar value={50} indeterminate />);
    const progressFill = container.querySelector('.progress-bar-fill');
    expect(progressFill).toHaveStyle('width: 50%');
    expect(progressFill).toHaveStyle('animation: progress-bar-indeterminate 1.5s infinite linear');
  });

  it('applies animation when animated=true', () => {
    const { container } = render(<ProgressBar value={50} animated />);
    const progressFill = container.querySelector('.progress-bar-fill');
    expect(progressFill).toHaveStyle('transition: width 0.3s ease-in-out');
  });

  it('applies progressClassName to the progress fill element', () => {
    const { container } = render(<ProgressBar value={50} progressClassName="custom-progress" />);
    const progressFill = container.querySelector('.progress-bar-fill');
    expect(progressFill).toHaveClass('custom-progress');
  });
});
