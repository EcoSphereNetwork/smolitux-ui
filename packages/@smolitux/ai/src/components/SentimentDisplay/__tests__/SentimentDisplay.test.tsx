import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SentimentDisplay } from '../SentimentDisplay';

describe('SentimentDisplay', () => {
  const mockSentimentData = {
    score: 0.75, // Range from -1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive
    magnitude: 0.85, // Range from 0 to infinity, representing the strength of emotion
    categories: {
      joy: 0.65,
      sadness: 0.05,
      anger: 0.02,
      fear: 0.03,
      surprise: 0.15,
      love: 0.45,
      disgust: 0.01
    },
    keywords: [
      { text: 'happy', score: 0.8, count: 3 },
      { text: 'excited', score: 0.9, count: 2 },
      { text: 'wonderful', score: 0.85, count: 1 }
    ],
    sentences: [
      { text: 'I am so happy today!', score: 0.9 },
      { text: 'The weather is wonderful.', score: 0.8 },
      { text: 'I feel excited about the project.', score: 0.85 }
    ]
  };

  const mockOnAnalyze = jest.fn();
  const mockOnExport = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with sentiment data', () => {
    render(<SentimentDisplay sentimentData={mockSentimentData} />);
    
    expect(screen.getByText('Sentiment Analysis')).toBeInTheDocument();
    expect(screen.getByText('Positive')).toBeInTheDocument(); // Based on score of 0.75
    expect(screen.getByText('75%')).toBeInTheDocument(); // Score as percentage
    expect(screen.getByText('Magnitude: 0.85')).toBeInTheDocument();
  });

  it('displays sentiment categories', () => {
    render(<SentimentDisplay sentimentData={mockSentimentData} />);
    
    expect(screen.getByText(/emotion breakdown/i)).toBeInTheDocument();
    expect(screen.getByText('Joy')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('Love')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('Surprise')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('displays sentiment keywords', () => {
    render(<SentimentDisplay sentimentData={mockSentimentData} />);
    
    expect(screen.getByText(/key terms/i)).toBeInTheDocument();
    expect(screen.getByText('happy')).toBeInTheDocument();
    expect(screen.getByText('excited')).toBeInTheDocument();
    expect(screen.getByText('wonderful')).toBeInTheDocument();
  });

  it('displays sentence-level sentiment', () => {
    render(<SentimentDisplay sentimentData={mockSentimentData} />);
    
    expect(screen.getByText(/sentence analysis/i)).toBeInTheDocument();
    expect(screen.getByText('I am so happy today!')).toBeInTheDocument();
    expect(screen.getByText('The weather is wonderful.')).toBeInTheDocument();
    expect(screen.getByText('I feel excited about the project.')).toBeInTheDocument();
  });

  it('allows text input for analysis', () => {
    render(<SentimentDisplay onAnalyze={mockOnAnalyze} />);
    
    const textInput = screen.getByPlaceholderText(/enter text to analyze/i);
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    
    fireEvent.change(textInput, { target: { value: 'This is a test text for sentiment analysis.' } });
    fireEvent.click(analyzeButton);
    
    expect(mockOnAnalyze).toHaveBeenCalledWith('This is a test text for sentiment analysis.', expect.any(Object));
  });

  it('displays different sentiment indicators based on score', () => {
    // Very positive sentiment
    const veryPositiveSentiment = { ...mockSentimentData, score: 0.9 };
    const { rerender } = render(<SentimentDisplay sentimentData={veryPositiveSentiment} />);
    
    expect(screen.getByText('Very Positive')).toBeInTheDocument();
    
    // Positive sentiment
    const positiveSentiment = { ...mockSentimentData, score: 0.6 };
    rerender(<SentimentDisplay sentimentData={positiveSentiment} />);
    
    expect(screen.getByText('Positive')).toBeInTheDocument();
    
    // Neutral sentiment
    const neutralSentiment = { ...mockSentimentData, score: 0.1 };
    rerender(<SentimentDisplay sentimentData={neutralSentiment} />);
    
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    
    // Negative sentiment
    const negativeSentiment = { ...mockSentimentData, score: -0.6 };
    rerender(<SentimentDisplay sentimentData={negativeSentiment} />);
    
    expect(screen.getByText('Negative')).toBeInTheDocument();
    
    // Very negative sentiment
    const veryNegativeSentiment = { ...mockSentimentData, score: -0.9 };
    rerender(<SentimentDisplay sentimentData={veryNegativeSentiment} />);
    
    expect(screen.getByText('Very Negative')).toBeInTheDocument();
  });

  it('displays appropriate sentiment colors', () => {
    // Very positive sentiment (green)
    const veryPositiveSentiment = { ...mockSentimentData, score: 0.9 };
    const { rerender } = render(<SentimentDisplay sentimentData={veryPositiveSentiment} />);
    
    const sentimentIndicator = screen.getByTestId('sentiment-indicator');
    expect(sentimentIndicator).toHaveClass('sentiment-very-positive');
    
    // Negative sentiment (red)
    const negativeSentiment = { ...mockSentimentData, score: -0.6 };
    rerender(<SentimentDisplay sentimentData={negativeSentiment} />);
    
    expect(sentimentIndicator).toHaveClass('sentiment-negative');
  });

  it('calls onExport when export button is clicked', () => {
    render(
      <SentimentDisplay 
        sentimentData={mockSentimentData} 
        onExport={mockOnExport} 
      />
    );
    
    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);
    
    expect(mockOnExport).toHaveBeenCalledWith(mockSentimentData, expect.any(Object));
  });

  it('calls onReset when reset button is clicked', () => {
    render(
      <SentimentDisplay 
        sentimentData={mockSentimentData} 
        onReset={mockOnReset} 
      />
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });

  it('displays loading state when isLoading is true', () => {
    render(<SentimentDisplay isLoading={true} />);
    
    expect(screen.getByText(/analyzing sentiment/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to analyze sentiment';
    render(<SentimentDisplay error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows toggling between chart and table view', () => {
    render(<SentimentDisplay sentimentData={mockSentimentData} />);
    
    const tableViewButton = screen.getByRole('button', { name: /table view/i });
    fireEvent.click(tableViewButton);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    const chartViewButton = screen.getByRole('button', { name: /chart view/i });
    fireEvent.click(chartViewButton);
    
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays comparative sentiment when provided', () => {
    const comparativeSentimentData = {
      ...mockSentimentData,
      comparative: {
        previousScore: 0.5,
        change: 0.25,
        trend: 'improving'
      }
    };
    
    render(<SentimentDisplay sentimentData={comparativeSentimentData} />);
    
    expect(screen.getByText(/sentiment trend/i)).toBeInTheDocument();
    expect(screen.getByText(/improving/i)).toBeInTheDocument();
    expect(screen.getByText(/\+25%/i)).toBeInTheDocument();
  });

  it('displays sentiment over time when historical data is provided', () => {
    const historicalSentimentData = {
      ...mockSentimentData,
      history: [
        { date: '2023-01-01', score: 0.3 },
        { date: '2023-02-01', score: 0.4 },
        { date: '2023-03-01', score: 0.5 },
        { date: '2023-04-01', score: 0.6 },
        { date: '2023-05-01', score: 0.7 },
        { date: '2023-06-01', score: 0.75 }
      ]
    };
    
    render(<SentimentDisplay sentimentData={historicalSentimentData} />);
    
    expect(screen.getByText(/sentiment history/i)).toBeInTheDocument();
    expect(screen.getByText('Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('Jun 2023')).toBeInTheDocument();
  });
});