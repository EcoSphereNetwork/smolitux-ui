// TODO: forwardRef hinzufügen
import React, { useState, useRef } from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface MonetizationConfig {
  enabled: boolean;
  settings: Record<string, unknown>;
}

export interface PostCreatorProps {
  /** Callback für das Erstellen eines Beitrags */
  onCreatePost: (post: {
    contentType: 'text' | 'image' | 'video' | 'audio' | 'mixed';
    content: {
      text?: string;
      media?: {
        type: 'image' | 'video' | 'audio';
        file: File;
      }[];
    };
    monetization?: MonetizationConfig;
  }) => void;
  /** Ob der Beitrag erstellt wird */
  isSubmitting?: boolean;
  /** Verfügbare Inhaltstypen */
  availableTypes?: ('text' | 'image' | 'video' | 'audio')[];
  /** Ob Monetarisierung aktiviert ist */
  monetizationEnabled?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * PostCreator-Komponente für die Erstellung von Beiträgen.
 * Unterstützt verschiedene Inhaltstypen und Monetarisierungsoptionen.
 */
export const PostCreator: React.FC<PostCreatorProps> = ({
  onCreatePost,
  isSubmitting = false,
  availableTypes = ['text', 'image', 'video', 'audio'],
  monetizationEnabled = true,
  className = '',
  style,
}) => {
  const [activeTab, setActiveTab] = useState<string>('text');
  const [text, setText] = useState<string>('');
  const [mediaFiles, setMediaFiles] = useState<
    {
      type: 'image' | 'video' | 'audio';
      file: File;
      preview: string;
    }[]
  >([]);
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationConfig>({
    enabled: false,
    settings: {},
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMediaFiles = Array.from(files).map((file) => {
      let type: 'image' | 'video' | 'audio' = 'image';
      if (file.type.startsWith('video/')) type = 'video';
      if (file.type.startsWith('audio/')) type = 'audio';

      return {
        type,
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setMediaFiles([...mediaFiles, ...newMediaFiles]);
  };

  const handleRemoveMedia = (index: number) => {
    const newMediaFiles = [...mediaFiles];
    URL.revokeObjectURL(newMediaFiles[index].preview);
    newMediaFiles.splice(index, index + 1);
    setMediaFiles(newMediaFiles);
  };

  const handleMonetizationToggle = () => {
    setMonetizationSettings({
      ...monetizationSettings,
      enabled: !monetizationSettings.enabled,
    });
  };

  const handleSubmit = () => {
    // Bestimme den Inhaltstyp basierend auf den vorhandenen Medien
    let contentType: 'text' | 'image' | 'video' | 'audio' | 'mixed' = 'text';

    if (mediaFiles.length > 0) {
      const types = new Set(mediaFiles.map((media) => media.type));
      if (types.size === 1 && !text) {
        contentType = Array.from(types)[0];
      } else {
        contentType = 'mixed';
      }
    }

    onCreatePost({
      contentType,
      content: {
        text: text || undefined,
        media:
          mediaFiles.length > 0
            ? mediaFiles.map((media) => ({
                type: media.type,
                file: media.file,
              }))
            : undefined,
      },
      monetization:
        monetizationEnabled && monetizationSettings.enabled ? monetizationSettings : undefined,
    });

    // Zurücksetzen des Formulars
    setText('');
    mediaFiles.forEach((media) => URL.revokeObjectURL(media.preview));
    setMediaFiles([]);
    setMonetizationSettings({
      enabled: false,
      settings: {},
    });
  };

  const renderTextTab = () => (
    <Box style={{ padding: '16px' }}>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={handleTextChange}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: 'inherit',
        }}
      />
    </Box>
  );

  const renderMediaTab = (type: 'image' | 'video' | 'audio') => (
    <Box style={{ padding: '16px' }}>
      <Box
        style={{
          border: '2px dashed #e5e7eb',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '16px',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept={type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'audio/*'}
          multiple
          onChange={handleFileChange}
        />
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: '0 auto 16px' }}
        >
          <path
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Text weight="medium">
          {type === 'image'
            ? 'Click to upload images'
            : type === 'video'
              ? 'Click to upload videos'
              : 'Click to upload audio files'}
        </Text>
        <Text size="sm" color="#6b7280" style={{ marginTop: '8px' }}>
          {type === 'image'
            ? 'PNG, JPG, GIF up to 10MB'
            : type === 'video'
              ? 'MP4, WebM up to 100MB'
              : 'MP3, WAV up to 50MB'}
        </Text>
      </Box>

      {mediaFiles.length > 0 && (
        <Box>
          <Text weight="medium" style={{ marginBottom: '8px' }}>
            Selected files:
          </Text>
          <Flex style={{ flexWrap: 'wrap', gap: '8px' }}>
            {mediaFiles.map((media, index) => (
              <Box
                key={index}
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {media.type === 'image' ? (
                  <img
                    src={media.preview}
                    alt={`Preview ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : media.type === 'video' ? (
                  <video
                    src={media.preview}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f3f4f6',
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
                        d="M12 2v20M2 12h20"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                <Box
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRemoveMedia(index)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );

  // Erstelle Tabs basierend auf den verfügbaren Typen
  const tabs = [
    {
      id: 'text',
      label: 'Text',
      content: renderTextTab(),
    },
    ...(availableTypes.includes('image')
      ? [
          {
            id: 'image',
            label: 'Image',
            content: renderMediaTab('image'),
          },
        ]
      : []),
    ...(availableTypes.includes('video')
      ? [
          {
            id: 'video',
            label: 'Video',
            content: renderMediaTab('video'),
          },
        ]
      : []),
    ...(availableTypes.includes('audio')
      ? [
          {
            id: 'audio',
            label: 'Audio',
            content: renderMediaTab('audio'),
          },
        ]
      : []),
  ];

  const isDisabled = isSubmitting || (text.trim() === '' && mediaFiles.length === 0);

  return (
    <Card
      data-testid="PostCreator"
      className={`post-creator ${className}`}
      style={{
        marginBottom: '24px',
        ...style,
      }}
    >
      <TabView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="enclosed" />

      <Box style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
        <Flex justify="space-between" align="center">
          {monetizationEnabled && (
            <Flex align="center">
              <input
                type="checkbox"
                id="monetization-toggle"
                checked={monetizationSettings.enabled}
                onChange={handleMonetizationToggle}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="monetization-toggle">
                <Text size="sm">Enable monetization</Text>
              </label>
            </Flex>
          )}

          <Button onClick={handleSubmit} disabled={isDisabled} loading={isSubmitting}>
            Post
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};
