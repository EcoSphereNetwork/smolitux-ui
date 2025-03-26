import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileContent } from './ProfileContent';

describe('ProfileContent', () => {
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

  const mockActivities = [
    {
      id: 'activity1',
      type: 'like',
      createdAt: '2023-05-16T09:15:00Z',
      target: {
        id: 'post3',
        content: 'Exploring the future of Web3',
        author: {
          id: 'user456',
          username: 'janedoe',
          displayName: 'Jane Doe',
          avatarUrl: 'https://example.com/jane-avatar.jpg'
        }
      }
    },
    {
      id: 'activity2',
      type: 'comment',
      createdAt: '2023-05-14T11:45:00Z',
      content: 'Great insights!',
      target: {
        id: 'post4',
        content: 'The impact of blockchain on supply chain management',
        author: {
          id: 'user789',
          username: 'bobsmith',
          displayName: 'Bob Smith',
          avatarUrl: 'https://example.com/bob-avatar.jpg'
        }
      }
    }
  ];

  const mockOnTabChange = jest.fn();
  const mockOnPostClick = jest.fn();
  const mockOnLikePost = jest.fn();
  const mockOnCommentPost = jest.fn();
  const mockOnSharePost = jest.fn();
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default tab (posts)', () => {
    render(<ProfileContent posts={mockPosts} />);
    
    expect(screen.getByRole('tab', { name: /posts/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('This is my first post about blockchain technology')).toBeInTheDocument();
    expect(screen.getByText('Just published a new article about decentralized finance')).toBeInTheDocument();
  });

  it('switches to activities tab when clicked', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        activities={mockActivities} 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const activitiesTab = screen.getByRole('tab', { name: /activities/i });
    fireEvent.click(activitiesTab);
    
    expect(mockOnTabChange).toHaveBeenCalledWith('activities');
  });

  it('displays activities when activities tab is active', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        activities={mockActivities} 
        activeTab="activities" 
      />
    );
    
    expect(screen.getByRole('tab', { name: /activities/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('liked')).toBeInTheDocument();
    expect(screen.getByText('Exploring the future of Web3')).toBeInTheDocument();
    expect(screen.getByText('commented')).toBeInTheDocument();
    expect(screen.getByText('Great insights!')).toBeInTheDocument();
    expect(screen.getByText('The impact of blockchain on supply chain management')).toBeInTheDocument();
  });

  it('calls onPostClick when a post is clicked', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        onPostClick={mockOnPostClick} 
      />
    );
    
    const post = screen.getByText('This is my first post about blockchain technology');
    fireEvent.click(post);
    
    expect(mockOnPostClick).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('calls onLikePost when like button is clicked', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        onLikePost={mockOnLikePost} 
      />
    );
    
    const likeButtons = screen.getAllByRole('button', { name: /like/i });
    fireEvent.click(likeButtons[0]);
    
    expect(mockOnLikePost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('calls onCommentPost when comment button is clicked', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        onCommentPost={mockOnCommentPost} 
      />
    );
    
    const commentButtons = screen.getAllByRole('button', { name: /comment/i });
    fireEvent.click(commentButtons[0]);
    
    expect(mockOnCommentPost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('calls onSharePost when share button is clicked', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        onSharePost={mockOnSharePost} 
      />
    );
    
    const shareButtons = screen.getAllByRole('button', { name: /share/i });
    fireEvent.click(shareButtons[0]);
    
    expect(mockOnSharePost).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('displays media in posts when available', () => {
    render(<ProfileContent posts={mockPosts} />);
    
    const image = screen.getByAltText('Blockchain diagram');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('displays tags in posts when available', () => {
    render(<ProfileContent posts={mockPosts} />);
    
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#technology')).toBeInTheDocument();
    expect(screen.getByText('#defi')).toBeInTheDocument();
    expect(screen.getByText('#finance')).toBeInTheDocument();
  });

  it('displays formatted dates for posts', () => {
    render(<ProfileContent posts={mockPosts} />);
    
    // Note: The exact format might depend on the date formatting library used
    expect(screen.getByText(/may 15, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/may 10, 2023/i)).toBeInTheDocument();
  });

  it('displays load more button when hasMore is true', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        hasMore={true} 
        onLoadMore={mockOnLoadMore} 
      />
    );
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();
    
    fireEvent.click(loadMoreButton);
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('does not display load more button when hasMore is false', () => {
    render(
      <ProfileContent 
        posts={mockPosts} 
        hasMore={false} 
        onLoadMore={mockOnLoadMore} 
      />
    );
    
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    render(<ProfileContent isLoading={true} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays empty state when no posts are available', () => {
    render(<ProfileContent posts={[]} />);
    
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });

  it('displays empty state when no activities are available', () => {
    render(<ProfileContent activities={[]} activeTab="activities" />);
    
    expect(screen.getByText(/no activities yet/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load posts';
    render(<ProfileContent error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});