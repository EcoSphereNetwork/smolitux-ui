// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState, useEffect } from 'react';
import { Card, Button, Checkbox, Tooltip, Alert } from '@smolitux/core';
import { FederatedPlatform } from '../../types';

interface CrossPlatformShareProps {
  content: string;
  contentType: 'text' | 'image' | 'video' | 'link';
  platforms: FederatedPlatform[];
  onShare: (platformIds: string[]) => Promise<boolean>;
  onClose: () => void;
  isOpen: boolean;
}

export const CrossPlatformShare: React.FC<CrossPlatformShareProps> = ({
  content,
  contentType,
  platforms,
  onShare,
  onClose,
  isOpen,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const [shareResult, setShareResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Zurücksetzen des Zustands, wenn sich isOpen ändert
  useEffect(() => {
    if (isOpen) {
      setSelectedPlatforms([]);
      setShareResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
    );
  };

  const handleShare = async () => {
    setIsSharing(true);
    setShareResult(null);

    try {
      const success = await onShare(selectedPlatforms);

      setShareResult({
        success,
        message: success
          ? 'Inhalt wurde erfolgreich geteilt!'
          : 'Beim Teilen ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      });

      if (success) {
        // Automatisch schließen nach erfolgreicher Teilung
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      setShareResult({
        success: false,
        message: 'Beim Teilen ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleClose = () => {
    setSelectedPlatforms([]);
    setShareResult(null);
    onClose();
  };

  // Prüft, ob der Text für die Plattform zu lang ist
  const checkTextLength = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform || contentType !== 'text') return true;

    return content.length <= (platform.maxTextLength || Infinity);
  };

  // Prüft, ob der Inhaltstyp von der Plattform unterstützt wird
  const checkContentType = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform) return false;

    return platform.supportedContentTypes.includes(contentType);
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Auf Plattformen teilen</h2>
        </div>

        {shareResult && (
          <Alert
            type={shareResult.success ? 'success' : 'error'}
            message={shareResult.message}
            className="mb-4"
          />
        )}

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Plattformen auswählen</h3>
          <div className="space-y-2">
            {platforms.map((platform) => {
              const isTextTooLong =
                contentType === 'text' && content.length > (platform.maxTextLength || Infinity);
              const isContentTypeSupported = platform.supportedContentTypes.includes(contentType);
              const isDisabled = isTextTooLong || !isContentTypeSupported;

              let tooltipText = '';
              if (isTextTooLong) {
                tooltipText = `Text überschreitet die maximale Länge (${platform.maxTextLength} Zeichen)`;
              } else if (!isContentTypeSupported) {
                tooltipText = `${contentType} wird auf dieser Plattform nicht unterstützt`;
              }

              return (
                <div key={platform.id} className="flex items-center">
                  <Tooltip content={tooltipText} isDisabled={!isDisabled}>
                    <div
                      className={`flex items-center w-full p-2 border rounded ${isDisabled ? 'opacity-50' : 'hover:bg-gray-50'}`}
                    >
                      <Checkbox
                        id={`platform-${platform.id}`}
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                        disabled={isDisabled || isSharing}
                      />
                      <label
                        htmlFor={`platform-${platform.id}`}
                        className="ml-2 flex items-center cursor-pointer"
                      >
                        <img src={platform.iconUrl} alt={platform.name} className="w-6 h-6 mr-2" />
                        <span>{platform.name}</span>
                      </label>
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>

          {/* Vorschau */}
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Vorschau</h3>
            <div className="text-sm text-gray-600 break-words">
              {contentType === 'text' && content}
              {contentType === 'image' && <div className="text-center">[Bild-Vorschau]</div>}
              {contentType === 'video' && <div className="text-center">[Video-Vorschau]</div>}
              {contentType === 'link' && <div className="text-blue-600 underline">{content}</div>}
            </div>
          </div>

          {/* Aktionen */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Abbrechen
            </Button>

            <Button
              variant="primary"
              onClick={handleShare}
              disabled={
                isSharing ||
                selectedPlatforms.length === 0 ||
                selectedPlatforms.some(
                  (platformId) => !checkTextLength(platformId) || !checkContentType(platformId)
                )
              }
            >
              {isSharing ? 'Wird geteilt...' : 'Teilen'}
            </Button>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default CrossPlatformShare;
