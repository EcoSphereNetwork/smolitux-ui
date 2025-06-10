import React, { useState, useEffect, forwardRef } from 'react';
import { Button } from '@smolitux/core';
import { usePrivacyConsent, PrivacySettings } from '../../privacy';

export interface FollowButtonProps {
  /** Benutzer-ID des zu folgenden Benutzers */
  userId: string;
  /** Benutzername des zu folgenden Benutzers */
  /** Folgt der aktuelle Benutzer bereits diesem Benutzer? */
  isFollowing?: boolean;
  /** Ist der aktuelle Benutzer angemeldet? */
  isLoggedIn?: boolean;
  /** Ist der zu folgende Benutzer der aktuelle Benutzer? */
  isSelf?: boolean;
  /** Anzahl der Follower */
  followerCount?: number;
  /** Callback beim Folgen/Entfolgen */
  onFollowChange: (userId: string, follow: boolean) => Promise<void>;
  /** Callback beim Klicken, wenn nicht angemeldet */
  onLoginRequired?: () => void;
  /** Größe des Buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Variante des Buttons */
  variant?: 'primary' | 'outline' | 'text' | 'icon';
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Anzahl der Follower anzeigen? */
  showCount?: boolean;
}

/**
 * FollowButton-Komponente zum Folgen/Entfolgen von Benutzern
 */
export const FollowButton = forwardRef<HTMLButtonElement, FollowButtonProps>(
  (
    {
      userId,
      isFollowing = false,
      isLoggedIn = true,
      isSelf = false,
  followerCount,
  onFollowChange,
  onLoginRequired,
  size = 'md',
  variant = 'primary',
  className = '',
      showCount = false,
    },
    ref,
  ) => {
  const [following, setFollowing] = useState(isFollowing);
  const [count, setCount] = useState(followerCount || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { preferences } = usePrivacyConsent();
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Aktualisiere den Status, wenn sich die Props ändern
  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    if (followerCount !== undefined) {
      setCount(followerCount);
    }
  }, [followerCount]);

  // Folgen/Entfolgen
  const handleFollowClick = async () => {
    if (!isLoggedIn && onLoginRequired) {
      onLoginRequired();
      return;
    }

    if (isSelf) return;

    setIsLoading(true);

    try {
      await onFollowChange(userId, !following);
      setFollowing(!following);
      setCount((prevCount) => (!following ? prevCount + 1 : prevCount - 1));
    } catch (error) {
      console.error('Fehler beim Folgen/Entfolgen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Button-Text basierend auf Status
  const getButtonText = () => {
    if (isSelf) {
      return 'Du';
    }

    if (following) {
      return isHovered ? 'Entfolgen' : 'Folgst du';
    }

    return 'Folgen';
  };

  // Button-Variante basierend auf Status
  const getButtonVariant = (): FollowButtonProps['variant'] => {
    if (variant !== 'primary' && variant !== 'outline') {
      return variant;
    }

    if (following) {
      return isHovered ? 'outline' : 'primary';
    }

    return variant;
  };

  // Button-Größe in Tailwind-Klassen
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-1 px-2';
      case 'lg':
        return 'text-base py-2 px-4';
      case 'md':
      default:
        return 'text-sm py-1.5 px-3';
    }
  };

  // Icon-Variante
  if (variant === 'icon') {
    const element = (
      <button
        ref={ref}
        onClick={handleFollowClick}
        disabled={isLoading || isSelf}
        className={`inline-flex items-center justify-center ${
          following
            ? 'text-primary-600 dark:text-primary-400 hover:text-red-500 dark:hover:text-red-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
        } focus:outline-none disabled:opacity-50 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={following ? 'Entfolgen' : 'Folgen'}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : following ? (
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            ></path>
          </svg>
        )}

        {showCount && preferences.analytics && <span className="ml-1 text-xs">{count}</span>}
      </button>
    );
    return (
      <>
        {element}
        <PrivacySettings open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      </>
    );
  }

  // Text-Variante
  if (variant === 'text') {
    const element = (
      <button
        ref={ref}
        onClick={handleFollowClick}
        disabled={isLoading || isSelf}
        className={`inline-flex items-center ${
          following
            ? 'text-primary-600 dark:text-primary-400 hover:text-red-500 dark:hover:text-red-400'
            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
        } font-medium focus:outline-none disabled:opacity-50 ${getSizeClasses()} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <>
            {following ? (
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            )}
          </>
        )}

        <span>{getButtonText()}</span>

        {showCount && preferences.analytics && (
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({count})</span>
        )}
      </button>
    );
    return (
      <>
        {element}
        <PrivacySettings open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      </>
    );
  }

  // Standard-Button (primary oder outline)
  const element = (
    <Button
      ref={ref}
      variant={getButtonVariant()}
      size={size}
      onClick={handleFollowClick}
      disabled={isLoading || isSelf}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {following ? (
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isHovered ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                />
              ) : (
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              )}
            </svg>
          ) : (
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          )}
        </>
      )}

      <span>{getButtonText()}</span>

      {showCount && preferences.analytics && <span className="ml-1 text-xs">({count})</span>}
    </Button>
  );
  return (
    <>
      {element}
      <PrivacySettings open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
});
