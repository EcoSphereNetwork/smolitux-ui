import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SentimentDisplay } from '../SentimentDisplay';

describe('SentimentDisplay caching', () => {
  it('caches fetched sentiment', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValue({ positive: 0.5, negative: 0.2, neutral: 0.3 });

    const { rerender } = render(
      <SentimentDisplay
        sentiment={{ positive: 0, negative: 0, neutral: 0 }}
        fetchSentiment={fetcher}
        cacheKey="cache-test"
      />
    );

    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    expect(screen.getByText('50.0%')).toBeInTheDocument();

    rerender(
      <SentimentDisplay
        sentiment={{ positive: 0, negative: 0, neutral: 0 }}
        fetchSentiment={fetcher}
        cacheKey="cache-test"
      />
    );

    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('shows error message on fetch failure', async () => {
    const fetcher = jest.fn().mockRejectedValue(new Error('fail'));
    render(
      <SentimentDisplay
        sentiment={{ positive: 0, negative: 0, neutral: 0 }}
        fetchSentiment={fetcher}
        cacheKey="error-test"
      />
    );

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Fehler beim Laden der Stimmungsdaten'
    );
  });
});
