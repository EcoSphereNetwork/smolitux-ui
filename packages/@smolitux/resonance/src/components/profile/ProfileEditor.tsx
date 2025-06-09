// TODO: forwardRef hinzufügen
import React, { useState } from 'react';
import { Box, Flex } from '../primitives';
import { Button, Input, TextArea } from '@smolitux/core';

export interface ProfileEditorProps {
  /** Initialer Benutzername */
  initialUsername: string;
  /** Initiale Biografie */
  initialBio: string;
  /** Initiales Profilbild */
  initialAvatar: string;
  /** Callback für Speichern */
  onSave: (data: { username: string; bio: string; avatar: string }) => void;
  /** Callback für Abbrechen */
  onCancel: () => void;
  /** Ob die Daten gespeichert werden */
  isSaving?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ProfileEditor-Komponente für die Bearbeitung von Profildaten.
 */
export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  initialUsername,
  initialBio,
  initialAvatar,
  onSave,
  onCancel,
  isSaving = false,
  className = '',
  style,
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (bio.length > 160) {
      newErrors.bio = 'Bio must be less than 160 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ username, bio, avatar });
  };

  return (
    <Box
      className={`profile-editor ${className}`}
      style={{
        ...style,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box style={{ marginBottom: '16px' }}>
          <Flex justify="center" style={{ marginBottom: '16px' }}>
            <Box
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={avatar}
                alt={username}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  textAlign: 'center',
                  padding: '4px 0',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // In einer realen Implementierung würde hier ein Datei-Upload-Dialog geöffnet
                  const newAvatar = prompt('Enter avatar URL:', avatar);
                  if (newAvatar) setAvatar(newAvatar);
                }}
              >
                Change
              </Box>
            </Box>
          </Flex>

          <Box style={{ marginBottom: '16px' }}>
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />
          </Box>

          <Box style={{ marginBottom: '16px' }}>
            <TextArea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              error={errors.bio}
              rows={4}
              maxLength={160}
              helperText={`${bio.length}/160 characters`}
            />
          </Box>
        </Box>

        <Flex justify="flex-end">
          <Button variant="outline" onClick={onCancel} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
