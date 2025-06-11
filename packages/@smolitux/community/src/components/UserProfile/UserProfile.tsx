import React, { useState, forwardRef } from 'react';
import { Button } from '@smolitux/core';
import { usePrivacyConsent, PrivacySettings } from '../../privacy';

export interface UserStats {
  /** Anzahl der Follower */
  followers: number;
  /** Anzahl der Personen, denen der Benutzer folgt */
  following: number;
  /** Anzahl der Inhalte */
  contentCount: number;
  /** Gesamte Anzahl der Likes */
  totalLikes: number;
  /** Gesamte Anzahl der Aufrufe */
  totalViews: number;
}

export interface UserSocialLinks {
  /** Twitter/X-Profil */
  twitter?: string;
  /** Instagram-Profil */
  instagram?: string;
  /** YouTube-Kanal */
  youtube?: string;
  /** Website */
  website?: string;
  /** Andere Plattformen */
  [key: string]: string | undefined;
}

export interface UserProfileProps {
  /** Benutzer-ID */
  userId: string;
  /** Benutzername */
  username: string;
  /** Anzeigename */
  displayName: string;
  /** Avatar-URL */
  avatarUrl?: string;
  /** Hintergrundbild-URL */
  coverImageUrl?: string;
  /** Biografie */
  bio?: string;
  /** Beitrittsdatum */
  joinDate: Date;
  /** Benutzerstatistiken */
  stats: UserStats;
  /** Soziale Links */
  socialLinks?: UserSocialLinks;
  /** Wallet-Adresse */
  walletAddress?: string;
  /** Ist der aktuelle Benutzer */
  isCurrentUser?: boolean;
  /** Folgt der aktuelle Benutzer diesem Benutzer */
  isFollowing?: boolean;
  /** Callback beim Klicken auf den Folgen-Button */
  onFollow?: (userId: string, follow: boolean) => Promise<void>;
  /** Callback beim Bearbeiten des Profils */
  onEdit?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * UserProfile-Komponente für die Anzeige von Benutzerprofilen
 */
export const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(
  (
    {
      userId,
      username,
      displayName,
      avatarUrl,
      coverImageUrl,
  bio,
  joinDate,
  stats,
  socialLinks,
  walletAddress,
  isCurrentUser = false,
  isFollowing = false,
  onFollow,
  onEdit,
      className = '',
    },
    ref,
  ) => {
  const [following, setFollowing] = useState(isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const { preferences } = usePrivacyConsent();
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Datum formatieren
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Wallet-Adresse formatieren
  const formatWalletAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Folgen/Entfolgen
  const handleFollow = async () => {
    if (!onFollow) return;

    setIsLoading(true);

    try {
      await onFollow(userId, !following);
      setFollowing(!following);
    } catch (error) {
      console.error('Fehler beim Folgen/Entfolgen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
      >
        {/* Cover-Bild */}
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={`${displayName} Cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" />
          )}

          {/* Avatar */}
          <div className="absolute -bottom-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-4xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Aktionen */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {isCurrentUser ? (
              <Button
                variant="outline"
                onClick={onEdit}
                className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
              >
                Profil bearbeiten
              </Button>
            ) : (
              <Button
                variant={following ? 'outline' : 'primary'}
                onClick={handleFollow}
                disabled={isLoading}
              >
                {following ? 'Entfolgen' : 'Folgen'}
              </Button>
            )}
            <Button variant="text" size="sm" onClick={() => setShowPrivacy(true)}>
              Privacy
            </Button>
          </div>
        </div>

        {/* Profilinformationen */}
        {!preferences.personalization && (
          <div className="px-6 py-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
            Personalisierte Inhalte sind deaktiviert.
          </div>
        )}

        <div className="pt-20 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{displayName}</h1>
              <p className="text-gray-600 dark:text-gray-400">@{username}</p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Mitglied seit {formatDate(joinDate)}</span>
              {walletAddress && (
                <span className="ml-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  {formatWalletAddress(walletAddress)}
                </span>
              )}
            </div>
          </div>

          {/* Biografie */}
          {bio && (
            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{bio}</p>
            </div>
          )}

          {/* Statistiken */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.followers}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Follower</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.following}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Folgt</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.contentCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inhalte</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLikes}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aufrufe</p>
            </div>
          </div>

          {/* Soziale Links */}
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}

              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Website"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <PrivacySettings open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
});
