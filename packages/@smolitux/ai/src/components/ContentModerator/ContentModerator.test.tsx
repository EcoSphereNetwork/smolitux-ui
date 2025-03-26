import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContentModerator } from './ContentModerator';

describe('ContentModerator', () => {
  const mockOnModerate = jest.fn();
  const mockOnApprove = jest.fn();
  const mockOnReject = jest.fn();
  const mockOnFlagContent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<ContentModerator />);
    
    expect(screen.getByPlaceholderText('Enter content to moderate...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /moderate/i })).toBeInTheDocument();
  });

  it('calls onModerate when moderate button is clicked', async () => {
    render(<ContentModerator onModerate={mockOnModerate} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(mockOnModerate).toHaveBeenCalledWith('This is a test content', expect.any(Object));
    });
  });

  it('displays loading state when moderating', async () => {
    render(<ContentModerator onModerate={mockOnModerate} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    expect(moderateButton).toBeDisabled();
    expect(screen.getByText(/moderating/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockOnModerate).toHaveBeenCalled();
    });
  });

  it('displays results after moderation', async () => {
    // Mock implementation to simulate moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: true,
        confidenceScore: 0.95,
        flags: [],
        categories: {
          hate: 0.01,
          harassment: 0.02,
          selfHarm: 0.005,
          sexual: 0.01,
          violence: 0.015,
          childAbuse: 0.001
        },
        moderationTime: 120 // ms
      });
    });

    render(<ContentModerator onModerate={mockModerateImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
      expect(screen.getByText(/approved/i)).toBeInTheDocument();
      expect(screen.getByText(/confidence score/i)).toBeInTheDocument();
      expect(screen.getByText(/95%/)).toBeInTheDocument();
      expect(screen.getByText(/no flags detected/i)).toBeInTheDocument();
      expect(screen.getByText(/hate/i)).toBeInTheDocument();
      expect(screen.getByText(/1%/)).toBeInTheDocument();
      expect(screen.getByText(/harassment/i)).toBeInTheDocument();
      expect(screen.getByText(/2%/)).toBeInTheDocument();
    });
  });

  it('displays rejected result for inappropriate content', async () => {
    // Mock implementation to simulate rejected moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: false,
        confidenceScore: 0.87,
        flags: ['hate', 'harassment'],
        categories: {
          hate: 0.75,
          harassment: 0.68,
          selfHarm: 0.05,
          sexual: 0.12,
          violence: 0.25,
          childAbuse: 0.01
        },
        moderationTime: 150 // ms
      });
    });

    render(<ContentModerator onModerate={mockModerateImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is inappropriate content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
      expect(screen.getByText(/rejected/i)).toBeInTheDocument();
      expect(screen.getByText(/confidence score/i)).toBeInTheDocument();
      expect(screen.getByText(/87%/)).toBeInTheDocument();
      expect(screen.getByText(/flags detected/i)).toBeInTheDocument();
      expect(screen.getByText(/hate/i)).toBeInTheDocument();
      expect(screen.getByText(/75%/)).toBeInTheDocument();
      expect(screen.getByText(/harassment/i)).toBeInTheDocument();
      expect(screen.getByText(/68%/)).toBeInTheDocument();
    });
  });

  it('calls onApprove when approve button is clicked', async () => {
    // Mock implementation to simulate moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: true,
        confidenceScore: 0.95,
        flags: [],
        categories: {
          hate: 0.01,
          harassment: 0.02,
          selfHarm: 0.005,
          sexual: 0.01,
          violence: 0.015,
          childAbuse: 0.001
        },
        moderationTime: 120 // ms
      });
    });

    render(
      <ContentModerator 
        onModerate={mockModerateImplementation} 
        onApprove={mockOnApprove} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
    });
    
    const approveButton = screen.getByRole('button', { name: /approve/i });
    fireEvent.click(approveButton);
    
    expect(mockOnApprove).toHaveBeenCalledWith('This is a test content', expect.any(Object));
  });

  it('calls onReject when reject button is clicked', async () => {
    // Mock implementation to simulate moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: true,
        confidenceScore: 0.95,
        flags: [],
        categories: {
          hate: 0.01,
          harassment: 0.02,
          selfHarm: 0.005,
          sexual: 0.01,
          violence: 0.015,
          childAbuse: 0.001
        },
        moderationTime: 120 // ms
      });
    });

    render(
      <ContentModerator 
        onModerate={mockModerateImplementation} 
        onReject={mockOnReject} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
    });
    
    const rejectButton = screen.getByRole('button', { name: /reject/i });
    fireEvent.click(rejectButton);
    
    expect(mockOnReject).toHaveBeenCalledWith('This is a test content', expect.any(Object));
  });

  it('calls onFlagContent when flag button is clicked', async () => {
    // Mock implementation to simulate moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: true,
        confidenceScore: 0.95,
        flags: [],
        categories: {
          hate: 0.01,
          harassment: 0.02,
          selfHarm: 0.005,
          sexual: 0.01,
          violence: 0.015,
          childAbuse: 0.001
        },
        moderationTime: 120 // ms
      });
    });

    render(
      <ContentModerator 
        onModerate={mockModerateImplementation} 
        onFlagContent={mockOnFlagContent} 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
    });
    
    const flagButton = screen.getByRole('button', { name: /flag/i });
    fireEvent.click(flagButton);
    
    // Open the flag dialog
    const flagReasonInput = screen.getByPlaceholderText(/reason for flagging/i);
    fireEvent.change(flagReasonInput, { target: { value: 'Custom flag reason' } });
    
    const submitFlagButton = screen.getByRole('button', { name: /submit flag/i });
    fireEvent.click(submitFlagButton);
    
    expect(mockOnFlagContent).toHaveBeenCalledWith('This is a test content', 'Custom flag reason', expect.any(Object));
  });

  it('resets the form when reset button is clicked', async () => {
    // Mock implementation to simulate moderation result
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.resolve({
        isApproved: true,
        confidenceScore: 0.95,
        flags: [],
        categories: {
          hate: 0.01,
          harassment: 0.02,
          selfHarm: 0.005,
          sexual: 0.01,
          violence: 0.015,
          childAbuse: 0.001
        },
        moderationTime: 120 // ms
      });
    });

    render(<ContentModerator onModerate={mockModerateImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/moderation result/i)).toBeInTheDocument();
    });
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(input).toHaveValue('');
    expect(screen.queryByText(/moderation result/i)).not.toBeInTheDocument();
  });

  it('handles errors during moderation', async () => {
    // Mock implementation to simulate error
    const mockModerateImplementation = jest.fn().mockImplementation((content, options) => {
      return Promise.reject(new Error('Moderation failed'));
    });

    render(<ContentModerator onModerate={mockModerateImplementation} />);
    
    const input = screen.getByPlaceholderText('Enter content to moderate...');
    const moderateButton = screen.getByRole('button', { name: /moderate/i });
    
    fireEvent.change(input, { target: { value: 'This is a test content' } });
    fireEvent.click(moderateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/moderation failed/i)).toBeInTheDocument();
    });
  });

  it('allows setting moderation threshold', () => {
    render(<ContentModerator threshold={0.8} />);
    
    const thresholdInput = screen.getByLabelText(/threshold/i);
    expect(thresholdInput).toHaveValue('0.8');
    
    fireEvent.change(thresholdInput, { target: { value: '0.9' } });
    expect(thresholdInput).toHaveValue('0.9');
  });

  it('allows selecting moderation categories', () => {
    render(<ContentModerator />);
    
    const categoryCheckboxes = screen.getAllByRole('checkbox');
    expect(categoryCheckboxes.length).toBeGreaterThan(0);
    
    // All categories should be checked by default
    categoryCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
    
    // Uncheck one category
    fireEvent.click(categoryCheckboxes[0]);
    expect(categoryCheckboxes[0]).not.toBeChecked();
  });
});