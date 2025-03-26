import React, { useState } from 'react';
import { Box, Flex, Text } from '../primitives';
import { Card, TabView } from '@smolitux/core';

export interface ProfileContentProps {
  /** Beiträge des Benutzers */
  posts: {
    id: string;
    title: string;
    content: string;
    media?: {
      type: 'image' | 'video' | 'audio';
      url: string;
    }[];
    createdAt: string;
    likes: number;
    comments: number;
  }[];
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Callback für Klick auf einen Beitrag */
  onPostClick?: (postId: string) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ProfileContent-Komponente für die Anzeige von Profilinhalten.
 */
export const ProfileContent: React.FC<ProfileContentProps> = ({
  posts,
  isLoading = false,
  onPostClick,
  className = '',
  style,
}) => {
  const [activeTab, setActiveTab] = useState('posts');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderPosts = () => {
    if (isLoading) {
      return (
        <Grid columns={{ base: 1, md: 2 }} gap={16}>
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <Box style={{ padding: '16px' }}>
                <Box
                  style={{
                    width: '70%',
                    height: '24px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                />
                <Box
                  style={{
                    width: '100%',
                    height: '32px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                />
                <Flex justify="space-between">
                  <Box
                    style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                  <Box
                    style={{
                      width: '60px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Flex>
              </Box>
            </Card>
          ))}
        </Grid>
      );
    }

    if (posts.length === 0) {
      return (
        <Card>
          <Box style={{ padding: '32px 16px', textAlign: 'center' }}>
            <Text color="#6b7280">No posts yet</Text>
          </Box>
        </Card>
      );
    }

    return (
      <Grid columns={{ base: 1, md: 2 }} gap={16}>
        {posts.map(post => (
          <Card 
            key={post.id}
            hoverable
            onClick={() => onPostClick && onPostClick(post.id)}
          >
            <Box style={{ padding: '16px' }}>
              <Text weight="bold" style={{ marginBottom: '8px' }}>{post.title}</Text>
              <Text style={{ marginBottom: '12px' }}>{post.content}</Text>
              
              {post.media && post.media.length > 0 && (
                <Box style={{ marginBottom: '12px' }}>
                  <Grid columns={post.media.length > 1 ? 2 : 1} gap={8}>
                    {post.media.map((media, index) => (
                      <Box
                        key={index}
                        style={{
                          height: '120px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        {media.type === 'image' && (
                          <img
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        {media.type === 'video' && (
                          <Box
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 3l14 9-14 9V3z"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Grid>
                </Box>
              )}
              
              <Flex justify="space-between">
                <Text size="sm" color="#6b7280">{formatDate(post.createdAt)}</Text>
                <Flex>
                  <Flex align="center" style={{ marginRight: '12px' }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: '4px' }}
                    >
                      <path
                        d="M14 10h3l-4 8v-6h-3l4-8v6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Text size="sm">{post.likes}</Text>
                  </Flex>
                  <Flex align="center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: '4px' }}
                    >
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Text size="sm">{post.comments}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Card>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      className={`profile-content ${className}`}
      style={{
        ...style,
      }}
    >
      <TabView
        tabs={[
          {
            id: 'posts',
            label: 'Posts',
            content: renderPosts(),
          },
          {
            id: 'media',
            label: 'Media',
            content: (
              <Card>
                <Box style={{ padding: '32px 16px', textAlign: 'center' }}>
                  <Text color="#6b7280">Media content will be displayed here</Text>
                </Box>
              </Card>
            ),
          },
          {
            id: 'likes',
            label: 'Likes',
            content: (
              <Card>
                <Box style={{ padding: '32px 16px', textAlign: 'center' }}>
                  <Text color="#6b7280">Liked content will be displayed here</Text>
                </Box>
              </Card>
            ),
          },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </Box>
  );
};