import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileHeader } from '../ProfileHeader';

describe('ProfileHeader', () => {
  const mockProfile = {
    id: 'user123',
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Software developer and blockchain enthusiast',
    avatarUrl: 'https://example.com/avatar.jpg',
    coverUrl: 'https://example.com/cover.jpg',
    followers: 1250,
    following: 450,
    posts: 87,
    joinDate: '2023-01-15',
    isVerified: true,
    location: 'Berlin, Germany',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: 'johndoe',
      github: 'johndoe',
      linkedin: 'john-doe'
    }
  };

  const mockOnFollow = jest.fn();
  const mockOnUnfollow = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnShare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with profile data', () => {
    render(<ProfileHeader profile={mockProfile} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Software developer and blockchain enthusiast')).toBeInTheDocument();
    expect(screen.getByText('1,250')).toBeInTheDocument(); // Followers
    expect(screen.getByText('450')).toBeInTheDocument(); // Following
    expect(screen.getByText('87')).toBeInTheDocument(); // Posts
    expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('displays verified badge for verified profiles', () => {
    render(<ProfileHeader profile={mockProfile} />);
    
    expect(screen.getByTitle('Verified Account')).toBeInTheDocument();
  });

  it('does not display verified badge for non-verified profiles', () => {
    const nonVerifiedProfile = { ...mockProfile, isVerified: false };
    render(<ProfileHeader profile={nonVerifiedProfile} />);
    
    expect(screen.queryByTitle('Verified Account')).not.toBeInTheDocument();
  });

  it('displays follow button for non-followed profiles', () => {
    render(<ProfileHeader profile={mockProfile} isFollowing={false} onFollow={mockOnFollow} />);
    
    const followButton = screen.getByRole('button', { name: /follow/i });
    expect(followButton).toBeInTheDocument();
    
    fireEvent.click(followButton);
    expect(mockOnFollow).toHaveBeenCalledWith(mockProfile.id);
  });

  it('displays unfollow button for followed profiles', () => {
    render(<ProfileHeader profile={mockProfile} isFollowing={true} onUnfollow={mockOnUnfollow} />);
    
    const unfollowButton = screen.getByRole('button', { name: /unfollow/i });
    expect(unfollowButton).toBeInTheDocument();
    
    fireEvent.click(unfollowButton);
    expect(mockOnUnfollow).toHaveBeenCalledWith(mockProfile.id);
  });

  it('displays edit button for own profile', () => {
    render(<ProfileHeader profile={mockProfile} isOwnProfile={true} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit profile/i });
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('does not display edit button for other profiles', () => {
    render(<ProfileHeader profile={mockProfile} isOwnProfile={false} onEdit={mockOnEdit} />);
    
    expect(screen.queryByRole('button', { name: /edit profile/i })).not.toBeInTheDocument();
  });

  it('calls onShare when share button is clicked', () => {
    render(<ProfileHeader profile={mockProfile} onShare={mockOnShare} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toBeInTheDocument();
    
    fireEvent.click(shareButton);
    expect(mockOnShare).toHaveBeenCalledWith(mockProfile);
  });

  it('displays social links when available', () => {
    render(<ProfileHeader profile={mockProfile} />);
    
    expect(screen.getByTitle('Twitter')).toHaveAttribute('href', 'https://twitter.com/johndoe');
    expect(screen.getByTitle('GitHub')).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(screen.getByTitle('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/john-doe');
  });

  it('displays join date in correct format', () => {
    render(<ProfileHeader profile={mockProfile} />);
    
    expect(screen.getByText(/joined/i)).toBeInTheDocument();
    expect(screen.getByText(/january 15, 2023/i)).toBeInTheDocument();
  });

  it('renders correctly without optional profile data', () => {
    const minimalProfile = {
      id: 'user123',
      username: 'johndoe',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      followers: 0,
      following: 0,
      posts: 0
    };
    
    render(<ProfileHeader profile={minimalProfile} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.queryByText('Berlin, Germany')).not.toBeInTheDocument();
    expect(screen.queryByText('johndoe.com')).not.toBeInTheDocument();
  });

  it('displays loading state when profile is loading', () => {
    render(<ProfileHeader isLoading={true} />);
    
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load profile';
    render(<ProfileHeader error={errorMessage} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});