import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostView } from '../PostView';

describe('PostView', () => {
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
      avatarUrl: 'https://example.com/avatar.jpg',
      isVerified: true
    },
    media: [
      {
        type: 'image',
        url: 'https://example.com/image1.jpg',
        alt: 'Blockchain diagram'
      }
    ],
    tags: ['blockchain', 'crypto', 'technology'],
    commentsList: [
      {
        id: 'comment1',
        content: 'Great post!',
        createdAt: '2023-05-15T11:15:00Z',
        likes: 5,
        author: {
          id: 'user456',
          username: 'janedoe',
          displayName: 'Jane Doe',
          avatarUrl: 'https://example.com/jane-avatar.jpg',
          isVerified: false
        }
      },
      {
        id: 'comment2',
        content: 'I learned a lot from this.',
        createdAt: '2023-05-15T12:30:00Z',
        likes: 3,
        author: {
          id: 'user789',
          username: 'bobsmith',
          displayName: 'Bob Smith',
          avatarUrl: 'https://example.com/bob-avatar.jpg',
          isVerified: false
        }
      }
    ]
  };

  const mockOnLike = jest.fn();
  const mockOnComment = jest.fn();
  const mockOnShare = jest.fn();
  const mockOnAuthorClick = jest.fn();
  const mockOnTagClick = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with post data', () => {
    render(<PostView post={mockPost} />);
    
    expect(screen.getByText('This is my first post about blockchain technology')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('displays post metadata correctly', () => {
    render(<PostView post={mockPost} />);
    
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
    
    // The exact format might depend on the date formatting library used
    expect(screen.getByText(/may 15, 2023/i)).toBeInTheDocument();
  });

  it('displays post media when available', () => {
    render(<PostView post={mockPost} />);
    
    const image = screen.getByAltText('Blockchain diagram');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('displays post tags when available', () => {
    render(<PostView post={mockPost} />);
    
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#technology')).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', () => {
    render(<PostView post={mockPost} onLike={mockOnLike} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onComment when comment button is clicked', () => {
    render(<PostView post={mockPost} onComment={mockOnComment} />);
    
    const commentButton = screen.getByRole('button', { name: /comment/i });
    fireEvent.click(commentButton);
    
    expect(mockOnComment).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onShare when share button is clicked', () => {
    render(<PostView post={mockPost} onShare={mockOnShare} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(mockOnShare).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onAuthorClick when author name is clicked', () => {
    render(<PostView post={mockPost} onAuthorClick={mockOnAuthorClick} />);
    
    const authorName = screen.getByText('John Doe');
    fireEvent.click(authorName);
    
    expect(mockOnAuthorClick).toHaveBeenCalledWith(mockPost.author);
  });

  it('calls onTagClick when a tag is clicked', () => {
    render(<PostView post={mockPost} onTagClick={mockOnTagClick} />);
    
    const tag = screen.getByText('#blockchain');
    fireEvent.click(tag);
    
    expect(mockOnTagClick).toHaveBeenCalledWith('blockchain');
  });

  it('displays verified badge for verified authors', () => {
    render(<PostView post={mockPost} />);
    
    expect(screen.getByTestId('verified-badge')).toBeInTheDocument();
  });

  it('displays comments when available', () => {
    render(<PostView post={mockPost} />);
    
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
    expect(screen.getByText('Great post!')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('I learned a lot from this.')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('allows adding a new comment', () => {
    render(<PostView post={mockPost} onComment={mockOnComment} />);
    
    const commentInput = screen.getByPlaceholderText(/add a comment/i);
    fireEvent.change(commentInput, { target: { value: 'This is a new comment' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(mockOnComment).toHaveBeenCalledWith(mockPost.id, 'This is a new comment');
  });

  it('calls onBack when back button is clicked', () => {
    render(<PostView post={mockPost} onBack={mockOnBack} />);
    
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('displays liked state when isLiked is true', () => {
    render(<PostView post={mockPost} isLiked={true} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('liked');
  });

  it('displays loading state when isLoading is true', () => {
    render(<PostView isLoading={true} />);
    
    expect(screen.getByText(/loading post/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load post';
    render(<PostView error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays related posts when provided', () => {
    const relatedPosts = [
      {
        id: 'related1',
        content: 'Another post about blockchain',
        author: {
          displayName: 'Alice Jones',
          username: 'alicejones'
        }
      },
      {
        id: 'related2',
        content: 'Introduction to cryptocurrency',
        author: {
          displayName: 'Bob Smith',
          username: 'bobsmith'
        }
      }
    ];
    
    render(<PostView post={mockPost} relatedPosts={relatedPosts} />);
    
    expect(screen.getByText(/related posts/i)).toBeInTheDocument();
    expect(screen.getByText('Another post about blockchain')).toBeInTheDocument();
    expect(screen.getByText('Introduction to cryptocurrency')).toBeInTheDocument();
  });

  it('displays post statistics when showStats is true', () => {
    const postWithStats = {
      ...mockPost,
      stats: {
        impressions: 1250,
        engagement: 0.12,
        clickThrough: 0.08,
        demographics: {
          age: [
            { group: '18-24', percentage: 25 },
            { group: '25-34', percentage: 40 },
            { group: '35-44', percentage: 20 },
            { group: '45+', percentage: 15 }
          ],
          gender: [
            { group: 'Male', percentage: 65 },
            { group: 'Female', percentage: 30 },
            { group: 'Other', percentage: 5 }
          ]
        }
      }
    };
    
    render(<PostView post={postWithStats} showStats={true} />);
    
    expect(screen.getByText(/post statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/impressions/i)).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument();
    expect(screen.getByText(/engagement rate/i)).toBeInTheDocument();
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText(/click-through rate/i)).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
  });

  it('renders with custom className when provided', () => {
    render(<PostView post={mockPost} className="custom-post" />);
    
    expect(screen.getByTestId('post-view')).toHaveClass('custom-post');
  });
});