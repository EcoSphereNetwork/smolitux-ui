import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostCreator } from './PostCreator';

describe('PostCreator', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnMediaUpload = jest.fn();
  const mockOnTagAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<PostCreator />);
    
    expect(screen.getByPlaceholderText(/what's on your mind/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('allows entering post content', () => {
    render(<PostCreator />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post' } });
    
    expect(input).toHaveValue('This is a test post');
  });

  it('calls onSubmit when post button is clicked', async () => {
    render(<PostCreator onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post' } });
    
    const postButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(postButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        content: 'This is a test post',
        media: [],
        tags: []
      });
    });
  });

  it('disables post button when content is empty', () => {
    render(<PostCreator />);
    
    const postButton = screen.getByRole('button', { name: /post/i });
    expect(postButton).toBeDisabled();
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post' } });
    
    expect(postButton).not.toBeDisabled();
    
    fireEvent.change(input, { target: { value: '' } });
    
    expect(postButton).toBeDisabled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<PostCreator onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('allows adding media to the post', async () => {
    render(<PostCreator onMediaUpload={mockOnMediaUpload} />);
    
    const mediaButton = screen.getByRole('button', { name: /add media/i });
    fireEvent.click(mediaButton);
    
    const fileInput = screen.getByTestId('media-upload');
    
    // Mock file upload
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    await waitFor(() => {
      expect(mockOnMediaUpload).toHaveBeenCalledWith([file]);
    });
  });

  it('displays uploaded media previews', () => {
    const media = [
      { type: 'image', url: 'https://example.com/image1.jpg', alt: 'Image 1' },
      { type: 'image', url: 'https://example.com/image2.jpg', alt: 'Image 2' }
    ];
    
    render(<PostCreator media={media} />);
    
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  it('allows removing uploaded media', () => {
    const media = [
      { type: 'image', url: 'https://example.com/image1.jpg', alt: 'Image 1' },
      { type: 'image', url: 'https://example.com/image2.jpg', alt: 'Image 2' }
    ];
    
    const onMediaRemove = jest.fn();
    render(<PostCreator media={media} onMediaRemove={onMediaRemove} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    
    expect(onMediaRemove).toHaveBeenCalledWith(0);
  });

  it('allows adding tags to the post', () => {
    render(<PostCreator onTagAdd={mockOnTagAdd} />);
    
    const tagButton = screen.getByRole('button', { name: /add tag/i });
    fireEvent.click(tagButton);
    
    const tagInput = screen.getByPlaceholderText(/enter tag/i);
    fireEvent.change(tagInput, { target: { value: 'blockchain' } });
    
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    
    expect(mockOnTagAdd).toHaveBeenCalledWith('blockchain');
  });

  it('displays added tags', () => {
    const tags = ['blockchain', 'crypto', 'technology'];
    
    render(<PostCreator tags={tags} />);
    
    expect(screen.getByText('#blockchain')).toBeInTheDocument();
    expect(screen.getByText('#crypto')).toBeInTheDocument();
    expect(screen.getByText('#technology')).toBeInTheDocument();
  });

  it('allows removing tags', () => {
    const tags = ['blockchain', 'crypto', 'technology'];
    
    const onTagRemove = jest.fn();
    render(<PostCreator tags={tags} onTagRemove={onTagRemove} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /remove tag/i });
    fireEvent.click(removeButtons[0]);
    
    expect(onTagRemove).toHaveBeenCalledWith(0);
  });

  it('displays character count and limit', () => {
    const characterLimit = 280;
    
    render(<PostCreator characterLimit={characterLimit} />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post' } });
    
    expect(screen.getByText(`${18}/${characterLimit}`)).toBeInTheDocument();
  });

  it('disables post button when character limit is exceeded', () => {
    const characterLimit = 20;
    
    render(<PostCreator characterLimit={characterLimit} />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post that exceeds the character limit' } });
    
    const postButton = screen.getByRole('button', { name: /post/i });
    expect(postButton).toBeDisabled();
    
    expect(screen.getByText(`${51}/${characterLimit}`)).toHaveClass('character-limit-exceeded');
  });

  it('displays loading state when isSubmitting is true', () => {
    render(<PostCreator isSubmitting={true} />);
    
    const postButton = screen.getByRole('button', { name: /posting/i });
    expect(postButton).toBeDisabled();
    expect(postButton).toHaveClass('loading');
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to create post';
    render(<PostCreator error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows setting visibility for the post', () => {
    render(<PostCreator />);
    
    const visibilitySelect = screen.getByLabelText(/visibility/i);
    fireEvent.change(visibilitySelect, { target: { value: 'followers' } });
    
    expect(visibilitySelect).toHaveValue('followers');
  });

  it('includes visibility in the submitted post data', async () => {
    render(<PostCreator onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(input, { target: { value: 'This is a test post' } });
    
    const visibilitySelect = screen.getByLabelText(/visibility/i);
    fireEvent.change(visibilitySelect, { target: { value: 'followers' } });
    
    const postButton = screen.getByRole('button', { name: /post/i });
    fireEvent.click(postButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        content: 'This is a test post',
        media: [],
        tags: [],
        visibility: 'followers'
      });
    });
  });

  it('renders with custom className when provided', () => {
    render(<PostCreator className="custom-creator" />);
    
    expect(screen.getByTestId('post-creator')).toHaveClass('custom-creator');
  });
});