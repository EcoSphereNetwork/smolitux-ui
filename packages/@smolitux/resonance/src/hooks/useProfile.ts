import { useState, useEffect } from 'react';

/**
 * Hook für die Verwaltung von Profildaten
 * @param userId ID des Benutzers
 * @returns Profildaten und Funktionen
 */
export interface Profile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  [key: string]: unknown;
}

export interface Post {
  id: string;
  [key: string]: unknown;
}

export function useProfile(userId: string): {
  profile: Profile | null;
  posts: Post[];
  loading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<Profile>) => void;
  followUser: () => void;
  unfollowUser: () => void;
} {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Simulierte Daten-Fetch-Funktion
  const fetchProfile = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      // In einer realen Implementierung würde hier ein API-Aufruf stehen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulierte Daten
      setProfile({
        id: userId,
        name: 'Max Mustermann',
        bio: 'Dies ist eine Beispiel-Bio.',
        avatar: 'https://example.com/avatar.jpg',
        followers: 100,
        following: 50,
      });

      setPosts([]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Initialer Fetch
  useEffect(() => {
    fetchProfile();
  }, [userId]);

  // Funktion zum Aktualisieren des Profils
  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Funktion zum Folgen eines Benutzers
  const followUser = () => {
    setProfile((prev) => ({
      ...prev,
      followers: prev.followers + 1,
    }));
  };

  // Funktion zum Entfolgen eines Benutzers
  const unfollowUser = () => {
    setProfile((prev) => ({
      ...prev,
      followers: Math.max(0, prev.followers - 1),
    }));
  };

  return {
    profile,
    posts,
    loading,
    error,
    updateProfile,
    followUser,
    unfollowUser,
  };
}
