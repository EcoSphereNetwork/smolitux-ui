import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeedView } from './FeedView';

describe('FeedView', () => {
  const mockPosts = [
    {
      id: 'post1',
      content: 'This is my first post about blockchain technology',
      createdAt: '2023-05-15T10:30:00Z',
      likes: 42,
      comments: 7,
      shares: 3,
      author: {
        id: 'user123',
        username: 'johndoe',
        displayName: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg'
      },
      media: [
        {
          type: 'image',
          url: 'https://example.com/image1.jpg',
          alt: 'Blockchain diagram'
        }
      ],
      tags: ['blockchain', 'crypto', 'technology']
    },
    {
      id: 'post2',
      content: 'Just published a new article about decentralized finance',
      createdAt: '2023-05-10T14:20:00Z',
      likes: 28,
      comments: 5,
      shares: 2,
      author: {
        id: 'user123',
        username: 'johndoe',
        displayName: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg'
      },
      media: [],
      tags: ['defi', 'finance', 'blockchain']
    }
  ];

  const mockOnPostClick = jest.fn();
  const mockOnLikePost = jest.fn();
  const mockOnCommentPost = jest.fn();
  const mockOnSharePost = jest.fn();
  const mockOnLoadMore = jest.fn();
  const mockOnFilterChange = jest.fn();
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with posts data', () => {
    render(<FeedView posts={mockPosts} />);
    
    expect(screen.getByText('Feed')).toBeInTheDocument();
    expect(screen.getByText('This is my first post about blockchain technology')).toBeInTheDocument();
    expect(screen.getByText('Just published a new article about decentralized finance')).toBeInTheDocument();
    expect(screen.getAllByText('John Doe').length).toBe(2);
  });

  it('displays post metadata correctly', () => {
    render(<FeedView posts={mockPosts} />);
    
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
    
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/may 15, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/may 10, 2023/i)).toBeInTheDocument();
  });

  it('displays post media when available', () => {
    render(<FeedView posts={mockPosts} />);
    
    const image = screen.getByAltText('Blockchain diagram');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('displays post tags when available', () => {
    render(<FeedView posts={mockPosts} />);
    
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#technology')).toBeInTheDocument();
    expect(screen.getByText('#defi')).toBeInTheDocument();
    expect(screen.getByText('#finance')).toBeInTheDocument();
  });

  it('calls onPostClick when a post is clicked', () => {
    render(<FeedView posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    const post = screen.getByText('This is my first post about blockchain technology');
    fireEvent.click(post);
    
    expect(mockOnPostClick).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('calls onLikePost when like button is clicked', () => {
    render(<FeedView posts={mockPosts} onLikePost={mockOnLikePost} />);
    
    const likeButtons = screen.getAllByRole('button', { name: /like/i });
    fireEvent.click(likeButtons[0]);
    
    expect(mockOnLikePost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('calls onCommentPost when comment button is clicked', () => {
    render(<FeedView posts={mockPosts} onCommentPost={mockOnCommentPost} />);
    
    const commentButtons = screen.getAllByRole('button', { name: /comment/i });
    fireEvent.click(commentButtons[0]);
    
    expect(mockOnCommentPost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('calls onSharePost when share button is clicked', () => {
    render(<FeedView posts={mockPosts} onSharePost={mockOnSharePost} />);
    
    const shareButtons = screen.getAllByRole('button', { name: /share/i });
    fireEvent.click(shareButtons[0]);
    
    expect(mockOnSharePost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('calls onLoadMore when load more button is clicked', () => {
    render(<FeedView posts={mockPosts} hasMore={true} onLoadMore={mockOnLoadMore} />);
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(loadMoreButton);
    
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('does not display load more button when hasMore is false', () => {
    render(<FeedView posts={mockPosts} hasMore={false} onLoadMore={mockOnLoadMore} />);
    
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });

  it('calls onFilterChange when filter is changed', () => {
    render(<FeedView posts={mockPosts} onFilterChange={mockOnFilterChange} />);
    
    const filterSelect = screen.getByLabelText(/filter by/i);
    fireEvent.change(filterSelect, { target: { value: 'trending' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('trending');
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(<FeedView posts={mockPosts} onRefresh={mockOnRefresh} />);
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('displays loading state when isLoading is true', () => {
    render(<FeedView isLoading={true} />);
    
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load posts';
    render(<FeedView error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays empty state when no posts are available', () => {
    render(<FeedView posts={[]} />);
    
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  it('displays create post form when showCreatePost is true', () => {
    render(<FeedView posts={mockPosts} showCreatePost={true} />);
    
    expect(screen.getByPlaceholderText(/what's on your mind/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('allows creating a new post', async () => {
    const onCreatePost = jest.fn();
    render(<FeedView posts={mockPosts} showCreatePost={true} onCreatePost={onCreatePost} />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a new post' } });
    
    const postButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(postButton);
    
    await waitFor(() => {
      expect(onCreatePost).toHaveBeenCalledWith('This is a new post', expect.any(Object));
    });
  });

  it('displays sidebar when showSidebar is true', () => {
    render(<FeedView posts={mockPosts} showSidebar={true} />);
    
    expect(screen.getByTestId('feed-sidebar')).toBeInTheDocument();
  });

  it('does not display sidebar when showSidebar is false', () => {
    render(<FeedView posts={mockPosts} showSidebar={false} />);
    
    expect(screen.queryByTestId('feed-sidebar')).not.toBeInTheDocument();
  });

  it('displays different feed types based on feedType prop', () => {
    const { rerender } = render(<FeedView posts={mockPosts} feedType="home" />);
    
    expect(screen.getByText(/home feed/i)).toBeInTheDocument();
    
    rerender(<FeedView posts={mockPosts} feedType="trending" />);
    
    expect(screen.getByText(/trending feed/i)).toBeInTheDocument();
    
    rerender(<FeedView posts={mockPosts} feedType="following" />);
    
    expect(screen.getByText(/following feed/i)).toBeInTheDocument();
  });

  it('allows infinite scrolling when infiniteScroll is true', async () => {
    render(<FeedView posts={mockPosts} hasMore={true} infiniteScroll={true} onLoadMore={mockOnLoadMore} />);
    
    // Simulate scroll to bottom
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    
    await waitFor(() => {
      expect(mockOnLoadMore).toHaveBeenCalled();
    });
  });
});