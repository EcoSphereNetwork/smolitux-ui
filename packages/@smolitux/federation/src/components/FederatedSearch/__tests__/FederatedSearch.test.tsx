import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FederatedSearch } from '../FederatedSearch';

describe('FederatedSearch', () => {
  const mockPlatforms = [
    { id: 'platform1', name: 'Platform 1', icon: 'icon1.png' },
    { id: 'platform2', name: 'Platform 2', icon: 'icon2.png' },
    { id: 'platform3', name: 'Platform 3', icon: 'icon3.png' },
  ];

  const mockResults = [
    {
      id: '1',
      title: 'Result 1',
      description: 'This is result 1',
      url: 'https://example.com/1',
      platform: 'platform1',
      type: 'post',
      author: 'Author 1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Result 2',
      description: 'This is result 2',
      url: 'https://example.com/2',
      platform: 'platform2',
      type: 'article',
      author: 'Author 2',
      createdAt: new Date().toISOString(),
    },
  ];

  it('renders without crashing', () => {
    render(<FederatedSearch platforms={mockPlatforms} />);

    expect(screen.getByPlaceholderText('Search across platforms...')).toBeInTheDocument();
  });

  it('displays platform options', () => {
    render(<FederatedSearch platforms={mockPlatforms} />);

    expect(screen.getByText('Platform 1')).toBeInTheDocument();
    expect(screen.getByText('Platform 2')).toBeInTheDocument();
    expect(screen.getByText('Platform 3')).toBeInTheDocument();
  });

  it('performs search when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<FederatedSearch platforms={mockPlatforms} onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search across platforms...');
    fireEvent.change(input, { target: { value: 'test query' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('test query', expect.any(Array));
  });

  it('displays search results', () => {
    render(
      <FederatedSearch platforms={mockPlatforms} results={mockResults} searchPerformed={true} />
    );

    expect(screen.getByText('Result 1')).toBeInTheDocument();
    expect(screen.getByText('Result 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<FederatedSearch platforms={mockPlatforms} loading={true} searchPerformed={true} />);

    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });
});
