import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentSection } from '../CommentSection';

describe('CommentSection', () => {
  const mockComments = [
    {
      id: '1',
      author: 'User 1',
      content: 'This is a test comment',
      createdAt: new Date().toISOString(),
      likes: 5,
      replies: [],
    },
    {
      id: '2',
      author: 'User 2',
      content: 'This is another test comment',
      createdAt: new Date().toISOString(),
      likes: 10,
      replies: [
        {
          id: '3',
          author: 'User 3',
          content: 'This is a reply',
          createdAt: new Date().toISOString(),
          likes: 2,
        },
      ],
    },
  ];

  it('renders without crashing', () => {
    render(<CommentSection comments={mockComments} />);

    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('displays comments', () => {
    render(<CommentSection comments={mockComments} />);

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('This is another test comment')).toBeInTheDocument();
  });

  it('displays replies', () => {
    render(<CommentSection comments={mockComments} />);

    expect(screen.getByText('This is a reply')).toBeInTheDocument();
  });

  it('allows adding a new comment', () => {
    const mockOnAddComment = jest.fn();
    render(<CommentSection comments={mockComments} onAddComment={mockOnAddComment} />);

    const input = screen.getByPlaceholderText('Add a comment...');
    fireEvent.change(input, { target: { value: 'New comment' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockOnAddComment).toHaveBeenCalledWith('New comment');
  });

  it('shows loading state', () => {
    render(<CommentSection comments={[]} loading={true} />);

    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });
});
