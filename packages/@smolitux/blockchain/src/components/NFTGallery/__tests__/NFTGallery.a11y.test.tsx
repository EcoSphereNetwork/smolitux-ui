import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { NFTGallery, NFTItem } from '../NFTGallery';

const nfts: NFTItem[] = [
  { tokenId: '1', name: 'NFT 1', imageUrl: 'img1.png' },
];

describe('NFTGallery Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<NFTGallery nfts={nfts} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
