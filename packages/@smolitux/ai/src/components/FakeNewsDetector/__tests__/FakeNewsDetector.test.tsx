import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FakeNewsDetector } from '../FakeNewsDetector';

describe('FakeNewsDetector', () => {
  const mockOnAnalyze = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<FakeNewsDetector />);

    expect(screen.getByPlaceholderText('Enter text to analyze...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
  });

  it('calls onAnalyze when analyze button is clicked', async () => {
    render(<FakeNewsDetector onAnalyze={mockOnAnalyze} />);

    const input = screen.getByPlaceholderText('Enter text to analyze...');
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'This is a test text' } });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(mockOnAnalyze).toHaveBeenCalledWith('This is a test text', expect.any(Object));
    });
  });

  it('displays loading state when analyzing', async () => {
    render(<FakeNewsDetector onAnalyze={mockOnAnalyze} />);

    const input = screen.getByPlaceholderText('Enter text to analyze...');
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'This is a test text' } });
    fireEvent.click(analyzeButton);

    expect(analyzeButton).toBeDisabled();
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnAnalyze).toHaveBeenCalled();
    });
  });

  it('displays results after analysis', async () => {
    // Mock implementation to simulate analysis result
    const mockAnalyzeImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.resolve({
        credibilityScore: 0.75,
        factualityScore: 0.8,
        biasScore: 0.3,
        sourceReliability: 0.9,
        flags: ['political bias', 'emotional language'],
      });
    });

    render(<FakeNewsDetector onAnalyze={mockAnalyzeImplementation} />);

    const input = screen.getByPlaceholderText('Enter text to analyze...');
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'This is a test text' } });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByText(/credibility score/i)).toBeInTheDocument();
      expect(screen.getByText(/75%/)).toBeInTheDocument();
      expect(screen.getByText(/factuality score/i)).toBeInTheDocument();
      expect(screen.getByText(/80%/)).toBeInTheDocument();
      expect(screen.getByText(/bias score/i)).toBeInTheDocument();
      expect(screen.getByText(/30%/)).toBeInTheDocument();
      expect(screen.getByText(/source reliability/i)).toBeInTheDocument();
      expect(screen.getByText(/90%/)).toBeInTheDocument();
      expect(screen.getByText(/political bias/i)).toBeInTheDocument();
      expect(screen.getByText(/emotional language/i)).toBeInTheDocument();
    });
  });

  it('resets the analysis when reset button is clicked', async () => {
    // Mock implementation to simulate analysis result
    const mockAnalyzeImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.resolve({
        credibilityScore: 0.75,
        factualityScore: 0.8,
        biasScore: 0.3,
        sourceReliability: 0.9,
        flags: ['political bias', 'emotional language'],
      });
    });

    render(<FakeNewsDetector onAnalyze={mockAnalyzeImplementation} onReset={mockOnReset} />);

    const input = screen.getByPlaceholderText('Enter text to analyze...');
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'This is a test text' } });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByText(/credibility score/i)).toBeInTheDocument();
    });

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockOnReset).toHaveBeenCalled();
    expect(screen.queryByText(/credibility score/i)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('handles errors during analysis', async () => {
    // Mock implementation to simulate error
    const mockAnalyzeImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.reject(new Error('Analysis failed'));
    });

    render(<FakeNewsDetector onAnalyze={mockAnalyzeImplementation} />);

    const input = screen.getByPlaceholderText('Enter text to analyze...');
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'This is a test text' } });
    fireEvent.click(analyzeButton);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/analysis failed/i)).toBeInTheDocument();
    });
  });
});
