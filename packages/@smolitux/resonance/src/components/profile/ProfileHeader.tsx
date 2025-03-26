import React from 'react';
import { Box, Flex, Text } from '@smolitux/utils/src/components/primitives';
import { Button } from '@smolitux/utils/src/components/patterns';

export interface ProfileHeaderProps {
  /** Benutzername */
  username: string;
  /** Profilbild */
  avatar: string;
  /** Biografie */
  bio?: string;
  /** Anzahl der Follower */
  followerCount: number;
  /** Anzahl der Follows */
  followingCount: number;
  /** Anzahl der Beiträge */
  postCount: number;
  /** Ob der aktuelle Benutzer diesem Profil folgt */
  isFollowing?: boolean;
  /** Ob dies das Profil des aktuellen Benutzers ist */
  isCurrentUser?: boolean;
  /** Callback für Folgen/Entfolgen */
  onFollowToggle?: () => void;
  /** Callback für Profilbearbeitung */
  onEditProfile?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ProfileHeader-Komponente für die Anzeige von Profilkopfdaten.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  avatar,
  bio,
  followerCount,
  followingCount,
  postCount,
  isFollowing = false,
  isCurrentUser = false,
  onFollowToggle,
  onEditProfile,
  className = '',
  style,
}) => {
  return (
    <Box
      className={`profile-header ${className}`}
      style={{
        ...style,
      }}
    >
      <Flex align="center" style={{ marginBottom: '16px' }}>
        <Box 
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            marginRight: '16px',
          }}
        >
          <img 
            src={avatar} 
            alt={username} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </Box>
        <Box style={{ flex: 1 }}>
          <Text weight="bold" size="xl">{username}</Text>
          {bio && <Text color="#6b7280">{bio}</Text>}
        </Box>
        {isCurrentUser ? (
          <Button variant="outline" onClick={onEditProfile}>
            Edit Profile
          </Button>
        ) : (
          <Button 
            variant={isFollowing ? 'outline' : 'solid'} 
            onClick={onFollowToggle}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </Flex>
      
      <Flex justify="space-around" style={{ marginBottom: '16px' }}>
        <Box style={{ textAlign: 'center' }}>
          <Text weight="bold">{postCount}</Text>
          <Text color="#6b7280">Posts</Text>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Text weight="bold">{followerCount}</Text>
          <Text color="#6b7280">Followers</Text>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Text weight="bold">{followingCount}</Text>
          <Text color="#6b7280">Following</Text>
        </Box>
      </Flex>
    </Box>
  );
};