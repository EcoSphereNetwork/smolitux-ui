import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeedItem } from './FeedItem';

describe('FeedItem', () => {
  const mockPost = {
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
  };

  const mockOnClick = jest.fn();
  const mockOnLike = jest.fn();
  const mockOnComment = jest.fn();
  const mockOnShare = jest.fn();
  const mockOnAuthorClick = jest.fn();
  const mockOnTagClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with post data', () => {
    render(<FeedItem post={mockPost} />);
    
    expect(screen.getByText('This is my first post about blockchain technology')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('displays post metadata correctly', () => {
    render(<FeedItem post={mockPost} />);
    
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
    
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/may 15, 2023/i)).toBeInTheDocument();
  });

  it('displays post media when available', () => {
    render(<FeedItem post={mockPost} />);
    
    const image = screen.getByAltText('Blockchain diagram');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('displays post tags when available', () => {
    render(<FeedItem post={mockPost} />);
    
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#technology')).toBeInTheDocument();
  });

  it('calls onClick when the post is clicked', () => {
    render(<FeedItem post={mockPost} onClick={mockOnClick} />);
    
    const postContent = screen.getByText('This is my first post about blockchain technology');
    fireEvent.click(postContent);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockPost);
  });

  it('calls onLike when like button is clicked', () => {
    render(<FeedItem post={mockPost} onLike={mockOnLike} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onComment when comment button is clicked', () => {
    render(<FeedItem post={mockPost} onComment={mockOnComment} />);
    
    const commentButton = screen.getByRole('button', { name: /comment/i });
    fireEvent.click(commentButton);
    
    expect(mockOnComment).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onShare when share button is clicked', () => {
    render(<FeedItem post={mockPost} onShare={mockOnShare} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(mockOnShare).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onAuthorClick when author name is clicked', () => {
    render(<FeedItem post={mockPost} onAuthorClick={mockOnAuthorClick} />);
    
    const authorName = screen.getByText('John Doe');
    fireEvent.click(authorName);
    
    expect(mockOnAuthorClick).toHaveBeenCalledWith(mockPost.author);
  });

  it('calls onTagClick when a tag is clicked', () => {
    render(<FeedItem post={mockPost} onTagClick={mockOnTagClick} />);
    
    const tag = screen.getByText('#blockchain');
    fireEvent.click(tag);
    
    expect(mockOnTagClick).toHaveBeenCalledWith('blockchain');
  });

  it('displays liked state when isLiked is true', () => {
    render(<FeedItem post={mockPost} isLiked={true} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('liked');
  });

  it('displays expanded content when isExpanded is true', () => {
    const longPost = {
      ...mockPost,
      content: 'This is a very long post that should be truncated when not expanded. '.repeat(10)
    };
    
    const { rerender } = render(<FeedItem post={longPost} isExpanded={false} />);
    
    expect(screen.getByText(/see more/i)).toBeInTheDocument();
    
    rerender(<FeedItem post={longPost} isExpanded={true} />);
    
    expect(screen.queryByText(/see more/i)).not.toBeInTheDocument();
    expect(screen.getByText(longPost.content)).toBeInTheDocument();
  });

  it('toggles expanded state when "See more" is clicked', () => {
    const longPost = {
      ...mockPost,
      content: 'This is a very long post that should be truncated when not expanded. '.repeat(10)
    };
    
    render(<FeedItem post={longPost} />);
    
    const seeMoreButton = screen.getByText(/see more/i);
    fireEvent.click(seeMoreButton);
    
    expect(screen.queryByText(/see more/i)).not.toBeInTheDocument();
    expect(screen.getByText(longPost.content)).toBeInTheDocument();
  });

  it('displays multiple media items when available', () => {
    const postWithMultipleMedia = {
      ...mockPost,
      media: [
        {
          type: 'image',
          url: 'https://example.com/image1.jpg',
          alt: 'Blockchain diagram'
        },
        {
          type: 'image',
          url: 'https://example.com/image2.jpg',
          alt: 'Crypto chart'
        }
      ]
    };
    
    render(<FeedItem post={postWithMultipleMedia} />);
    
    expect(screen.getByAltText('Blockchain diagram')).toBeInTheDocument();
    expect(screen.getByAltText('Crypto chart')).toBeInTheDocument();
  });

  it('displays video media when available', () => {
    const postWithVideo = {
      ...mockPost,
      media: [
        {
          type: 'video',
          url: 'https://example.com/video.mp4',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      ]
    };
    
    render(<FeedItem post={postWithVideo} />);
    
    const video = screen.getByTestId('video-player');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://example.com/video.mp4');
  });

  it('displays verified badge for verified authors', () => {
    const postWithVerifiedAuthor = {
      ...mockPost,
      author: {
        ...mockPost.author,
        isVerified: true
      }
    };
    
    render(<FeedItem post={postWithVerifiedAuthor} />);
    
    expect(screen.getByTestId('verified-badge')).toBeInTheDocument();
  });

  it('renders in compact mode when isCompact is true', () => {
    render(<FeedItem post={mockPost} isCompact={true} />);
    
    expect(screen.getByTestId('feed-item')).toHaveClass('item-compact');
  });

  it('renders with custom className when provided', () => {
    render(<FeedItem post={mockPost} className="custom-item" />);
    
    expect(screen.getByTestId('feed-item')).toHaveClass('custom-item');
  });

  it('displays repost information when post is a repost', () => {
    const repost = {
      ...mockPost,
      isRepost: true,
      originalAuthor: {
        id: 'user456',
        username: 'janedoe',
        displayName: 'Jane Doe',
        avatarUrl: 'https://example.com/jane-avatar.jpg'
      }
    };
    
    render(<FeedItem post={repost} />);
    
    expect(screen.getByText(/reposted by/i)).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});