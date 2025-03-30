import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TrollFilter } from '../TrollFilter';

describe('TrollFilter', () => {
  const mockOnFilter = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<TrollFilter />);
    
    expect(screen.getByPlaceholderText('Enter comment to filter...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });

  it('calls onFilter when filter button is clicked', async () => {
    render(<TrollFilter onFilter={mockOnFilter} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a test comment' } });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith('This is a test comment', expect.any(Object));
    });
  });

  it('displays loading state when filtering', async () => {
    render(<TrollFilter onFilter={mockOnFilter} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a test comment' } });
    fireEvent.click(filterButton);
    
    expect(filterButton).toBeDisabled();
    expect(screen.getByText(/filtering/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalled();
    });
  });

  it('displays results after filtering', async () => {
    // Mock implementation to simulate filtering result
    const mockFilterImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.resolve({
        toxicityScore: 0.15,
        insultScore: 0.05,
        threatScore: 0.02,
        identityAttackScore: 0.01,
        isToxic: false,
        filteredText: 'This is a test comment',
        flags: []
      });
    });

    render(<TrollFilter onFilter={mockFilterImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a test comment' } });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText(/toxicity score/i)).toBeInTheDocument();
      expect(screen.getByText(/15%/)).toBeInTheDocument();
      expect(screen.getByText(/insult score/i)).toBeInTheDocument();
      expect(screen.getByText(/5%/)).toBeInTheDocument();
      expect(screen.getByText(/threat score/i)).toBeInTheDocument();
      expect(screen.getByText(/2%/)).toBeInTheDocument();
      expect(screen.getByText(/identity attack score/i)).toBeInTheDocument();
      expect(screen.getByText(/1%/)).toBeInTheDocument();
      expect(screen.getByText(/safe comment/i)).toBeInTheDocument();
    });
  });

  it('displays toxic warning for toxic comments', async () => {
    // Mock implementation to simulate toxic filtering result
    const mockFilterImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.resolve({
        toxicityScore: 0.85,
        insultScore: 0.75,
        threatScore: 0.12,
        identityAttackScore: 0.31,
        isToxic: true,
        filteredText: '*** is a *** comment',
        flags: ['insult', 'profanity']
      });
    });

    render(<TrollFilter onFilter={mockFilterImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a toxic comment' } });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText(/toxicity score/i)).toBeInTheDocument();
      expect(screen.getByText(/85%/)).toBeInTheDocument();
      expect(screen.getByText(/toxic comment detected/i)).toBeInTheDocument();
      expect(screen.getByText(/filtered text/i)).toBeInTheDocument();
      expect(screen.getByText(/\*\*\* is a \*\*\* comment/)).toBeInTheDocument();
      expect(screen.getByText(/insult/i)).toBeInTheDocument();
      expect(screen.getByText(/profanity/i)).toBeInTheDocument();
    });
  });

  it('resets the filter when reset button is clicked', async () => {
    // Mock implementation to simulate filtering result
    const mockFilterImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.resolve({
        toxicityScore: 0.15,
        insultScore: 0.05,
        threatScore: 0.02,
        identityAttackScore: 0.01,
        isToxic: false,
        filteredText: 'This is a test comment',
        flags: []
      });
    });

    render(<TrollFilter onFilter={mockFilterImplementation} onReset={mockOnReset} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a test comment' } });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText(/toxicity score/i)).toBeInTheDocument();
    });
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
    expect(screen.queryByText(/toxicity score/i)).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('handles errors during filtering', async () => {
    // Mock implementation to simulate error
    const mockFilterImplementation = jest.fn().mockImplementation((text, options) => {
      return Promise.reject(new Error('Filtering failed'));
    });

    render(<TrollFilter onFilter={mockFilterImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter comment to filter...');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    
    fireEvent.change(input, { target: { value: 'This is a test comment' } });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/filtering failed/i)).toBeInTheDocument();
    });
  });
});