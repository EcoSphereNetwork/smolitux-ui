// 🔧 TODO [Codex]: Tests fehlen – prüfen & umsetzen
// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Card } from '@smolitux/core';

export interface NFTItem {
  tokenId: string;
  name?: string;
  imageUrl?: string;
  description?: string;
  chainId?: number;
}

export interface NFTGalleryProps {
  /** NFTs to display */
  nfts: NFTItem[];
  /** Callback when NFT is selected */
  onSelect?: (nft: NFTItem) => void;
  /** Number of columns */
  columns?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * NFTGallery component to showcase NFTs in a grid layout
 */
export const NFTGallery: React.FC<NFTGalleryProps> = ({
  nfts,
  onSelect,
  columns = 3,
  className = '',
}) => {
  const handleClick = (nft: NFTItem) => {
    if (onSelect) {
      onSelect(nft);
    }
  };

  return (
    <div className={className} data-testid="nft-gallery">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {nfts.map((nft) => (
          <Card
            key={nft.tokenId}
            className="p-2 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleClick(nft)}
          >
            {nft.imageUrl ? (
              <img
                src={nft.imageUrl}
                alt={nft.name || `NFT ${nft.tokenId}`}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                No Image
              </div>
            )}
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {nft.name || `Token ${nft.tokenId}`}
              </h4>
              {nft.chainId && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Chain ID: {nft.chainId}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
