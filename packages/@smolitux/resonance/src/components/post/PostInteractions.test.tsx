import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostInteractions } from './PostInteractions';

describe('PostInteractions', () => {
  const mockPost = {
    id: 'post1',
    likes: 42,
    comments: 7,
    shares: 3
  };

  const mockOnLike = jest.fn();
  const mockOnComment = jest.fn();
  const mockOnShare = jest.fn();
  const mockOnBookmark = jest.fn();
  const mockOnReport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with post data', () => {
    render(<PostInteractions post={mockPost} />);
    
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
  });

  it('calls onLike when like button is clicked', () => {
    render(<PostInteractions post={mockPost} onLike={mockOnLike} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onComment when comment button is clicked', () => {
    render(<PostInteractions post={mockPost} onComment={mockOnComment} />);
    
    const commentButton = screen.getByRole('button', { name: /comment/i });
    fireEvent.click(commentButton);
    
    expect(mockOnComment).toHaveBeenCalledWith(mockPost.id);
  });

  it('calls onShare when share button is clicked', () => {
    render(<PostInteractions post={mockPost} onShare={mockOnShare} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(mockOnShare).toHaveBeenCalledWith(mockPost.id);
  });

  it('displays liked state when isLiked is true', () => {
    render(<PostInteractions post={mockPost} isLiked={true} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('liked');
  });

  it('displays bookmark button when showBookmark is true', () => {
    render(<PostInteractions post={mockPost} showBookmark={true} onBookmark={mockOnBookmark} />);
    
    const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
    expect(bookmarkButton).toBeInTheDocument();
    
    fireEvent.click(bookmarkButton);
    
    expect(mockOnBookmark).toHaveBeenCalledWith(mockPost.id);
  });

  it('displays bookmarked state when isBookmarked is true', () => {
    render(<PostInteractions post={mockPost} showBookmark={true} isBookmarked={true} />);
    
    const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
    expect(bookmarkButton).toHaveClass('bookmarked');
  });

  it('displays report button when showReport is true', () => {
    render(<PostInteractions post={mockPost} showReport={true} onReport={mockOnReport} />);
    
    const reportButton = screen.getByRole('button', { name: /report/i });
    expect(reportButton).toBeInTheDocument();
    
    fireEvent.click(reportButton);
    
    expect(mockOnReport).toHaveBeenCalledWith(mockPost.id);
  });

  it('displays interaction counts when showCounts is true', () => {
    render(<PostInteractions post={mockPost} showCounts={true} />);
    
    expect(screen.getByText('42')).toBeInTheDocument(); // Likes
    expect(screen.getByText('7')).toBeInTheDocument(); // Comments
    expect(screen.getByText('3')).toBeInTheDocument(); // Shares
  });

  it('does not display interaction counts when showCounts is false', () => {
    render(<PostInteractions post={mockPost} showCounts={false} />);
    
    expect(screen.queryByText('42')).not.toBeInTheDocument(); // Likes
    expect(screen.queryByText('7')).not.toBeInTheDocument(); // Comments
    expect(screen.queryByText('3')).not.toBeInTheDocument(); // Shares
  });

  it('displays interaction labels when showLabels is true', () => {
    render(<PostInteractions post={mockPost} showLabels={true} />);
    
    expect(screen.getByText(/like/i)).toBeInTheDocument();
    expect(screen.getByText(/comment/i)).toBeInTheDocument();
    expect(screen.getByText(/share/i)).toBeInTheDocument();
  });

  it('does not display interaction labels when showLabels is false', () => {
    render(<PostInteractions post={mockPost} showLabels={false} />);
    
    expect(screen.queryByText(/like/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/comment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/share/i)).not.toBeInTheDocument();
  });

  it('renders in compact mode when isCompact is true', () => {
    render(<PostInteractions post={mockPost} isCompact={true} />);
    
    expect(screen.getByTestId('post-interactions')).toHaveClass('interactions-compact');
  });

  it('renders with custom className when provided', () => {
    render(<PostInteractions post={mockPost} className="custom-interactions" />);
    
    expect(screen.getByTestId('post-interactions')).toHaveClass('custom-interactions');
  });

  it('displays share options when share button is clicked and showShareOptions is true', () => {
    render(<PostInteractions post={mockPost} showShareOptions={true} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(screen.getByText(/share on/i)).toBeInTheDocument();
    expect(screen.getByText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/copy link/i)).toBeInTheDocument();
  });

  it('calls onShareOption when a share option is clicked', () => {
    const onShareOption = jest.fn();
    render(<PostInteractions post={mockPost} showShareOptions={true} onShareOption={onShareOption} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    const twitterOption = screen.getByText(/twitter/i);
    fireEvent.click(twitterOption);
    
    expect(onShareOption).toHaveBeenCalledWith('twitter', mockPost.id);
  });

  it('displays reaction options when showReactions is true', () => {
    render(<PostInteractions post={mockPost} showReactions={true} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.mouseOver(likeButton);
    
    expect(screen.getByText(/reactions/i)).toBeInTheDocument();
    expect(screen.getByText(/👍/)).toBeInTheDocument(); // Like
    expect(screen.getByText(/❤️/)).toBeInTheDocument(); // Love
    expect(screen.getByText(/😂/)).toBeInTheDocument(); // Laugh
    expect(screen.getByText(/😮/)).toBeInTheDocument(); // Wow
    expect(screen.getByText(/😢/)).toBeInTheDocument(); // Sad
    expect(screen.getByText(/😡/)).toBeInTheDocument(); // Angry
  });

  it('calls onReaction when a reaction is clicked', () => {
    const onReaction = jest.fn();
    render(<PostInteractions post={mockPost} showReactions={true} onReaction={onReaction} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.mouseOver(likeButton);
    
    const loveReaction = screen.getByText(/❤️/);
    fireEvent.click(loveReaction);
    
    expect(onReaction).toHaveBeenCalledWith('love', mockPost.id);
  });
});