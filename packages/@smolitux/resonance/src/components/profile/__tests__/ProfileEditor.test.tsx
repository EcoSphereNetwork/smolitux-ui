import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileEditor } from '../ProfileEditor';

describe('ProfileEditor', () => {
  const mockProfile = {
    id: 'user123',
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Software developer and blockchain enthusiast',
    avatarUrl: 'https://example.com/avatar.jpg',
    coverUrl: 'https://example.com/cover.jpg',
    location: 'Berlin, Germany',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: 'johndoe',
      github: 'johndoe',
      linkedin: 'john-doe'
    }
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnAvatarUpload = jest.fn();
  const mockOnCoverUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with profile data', () => {
    render(<ProfileEditor profile={mockProfile} />);
    
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByLabelText(/display name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/bio/i)).toHaveValue('Software developer and blockchain enthusiast');
    expect(screen.getByLabelText(/location/i)).toHaveValue('Berlin, Germany');
    expect(screen.getByLabelText(/website/i)).toHaveValue('https://johndoe.com');
    expect(screen.getByLabelText(/twitter/i)).toHaveValue('johndoe');
    expect(screen.getByLabelText(/github/i)).toHaveValue('johndoe');
    expect(screen.getByLabelText(/linkedin/i)).toHaveValue('john-doe');
  });

  it('displays profile images', () => {
    render(<ProfileEditor profile={mockProfile} />);
    
    const avatarImage = screen.getByAltText('Profile avatar');
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    
    const coverImage = screen.getByAltText('Profile cover');
    expect(coverImage).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('allows editing profile fields', () => {
    render(<ProfileEditor profile={mockProfile} />);
    
    const displayNameInput = screen.getByLabelText(/display name/i);
    fireEvent.change(displayNameInput, { target: { value: 'John Smith' } });
    expect(displayNameInput).toHaveValue('John Smith');
    
    const bioInput = screen.getByLabelText(/bio/i);
    fireEvent.change(bioInput, { target: { value: 'Full-stack developer and crypto enthusiast' } });
    expect(bioInput).toHaveValue('Full-stack developer and crypto enthusiast');
    
    const locationInput = screen.getByLabelText(/location/i);
    fireEvent.change(locationInput, { target: { value: 'Munich, Germany' } });
    expect(locationInput).toHaveValue('Munich, Germany');
    
    const websiteInput = screen.getByLabelText(/website/i);
    fireEvent.change(websiteInput, { target: { value: 'https://johnsmith.com' } });
    expect(websiteInput).toHaveValue('https://johnsmith.com');
    
    const twitterInput = screen.getByLabelText(/twitter/i);
    fireEvent.change(twitterInput, { target: { value: 'johnsmith' } });
    expect(twitterInput).toHaveValue('johnsmith');
  });

  it('calls onSave with updated profile when save button is clicked', async () => {
    render(<ProfileEditor profile={mockProfile} onSave={mockOnSave} />);
    
    const displayNameInput = screen.getByLabelText(/display name/i);
    fireEvent.change(displayNameInput, { target: { value: 'John Smith' } });
    
    const bioInput = screen.getByLabelText(/bio/i);
    fireEvent.change(bioInput, { target: { value: 'Full-stack developer and crypto enthusiast' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        ...mockProfile,
        displayName: 'John Smith',
        bio: 'Full-stack developer and crypto enthusiast'
      });
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ProfileEditor profile={mockProfile} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('allows uploading a new avatar', async () => {
    render(<ProfileEditor profile={mockProfile} onAvatarUpload={mockOnAvatarUpload} />);
    
    const avatarUploadButton = screen.getByRole('button', { name: /change avatar/i });
    fireEvent.click(avatarUploadButton);
    
    const fileInput = screen.getByTestId('avatar-upload');
    
    // Mock file upload
    const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    await waitFor(() => {
      expect(mockOnAvatarUpload).toHaveBeenCalledWith(file);
    });
  });

  it('allows uploading a new cover image', async () => {
    render(<ProfileEditor profile={mockProfile} onCoverUpload={mockOnCoverUpload} />);
    
    const coverUploadButton = screen.getByRole('button', { name: /change cover/i });
    fireEvent.click(coverUploadButton);
    
    const fileInput = screen.getByTestId('cover-upload');
    
    // Mock file upload
    const file = new File(['dummy content'], 'cover.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
    
    await waitFor(() => {
      expect(mockOnCoverUpload).toHaveBeenCalledWith(file);
    });
  });

  it('displays validation errors for invalid inputs', async () => {
    render(<ProfileEditor profile={mockProfile} onSave={mockOnSave} />);
    
    // Empty display name
    const displayNameInput = screen.getByLabelText(/display name/i);
    fireEvent.change(displayNameInput, { target: { value: '' } });
    
    // Invalid website URL
    const websiteInput = screen.getByLabelText(/website/i);
    fireEvent.change(websiteInput, { target: { value: 'invalid-url' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/display name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid website url/i)).toBeInTheDocument();
    });
    
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('displays character count for bio field', () => {
    render(<ProfileEditor profile={mockProfile} />);
    
    const bioInput = screen.getByLabelText(/bio/i);
    fireEvent.change(bioInput, { target: { value: 'This is a test bio' } });
    
    expect(screen.getByText(`${16}/160`)).toBeInTheDocument();
  });

  it('displays error when bio exceeds character limit', () => {
    render(<ProfileEditor profile={mockProfile} />);
    
    const bioInput = screen.getByLabelText(/bio/i);
    fireEvent.change(bioInput, { target: { value: 'a'.repeat(161) } });
    
    expect(screen.getByText(`${161}/160`)).toHaveClass('character-limit-exceeded');
  });

  it('displays loading state when isSaving is true', () => {
    render(<ProfileEditor profile={mockProfile} isSaving={true} />);
    
    const saveButton = screen.getByRole('button', { name: /saving/i });
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveClass('loading');
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to save profile';
    render(<ProfileEditor profile={mockProfile} error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders with custom className when provided', () => {
    render(<ProfileEditor profile={mockProfile} className="custom-editor" />);
    
    expect(screen.getByTestId('profile-editor')).toHaveClass('custom-editor');
  });
});