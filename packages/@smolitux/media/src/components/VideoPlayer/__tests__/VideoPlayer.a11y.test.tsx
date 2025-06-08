import React from 'react';
import { a11y } from '@smolitux/testing';
import { VideoPlayer } from '../VideoPlayer';

test('VideoPlayer is accessible', async () => {
  const { violations } = await a11y.testA11y(<VideoPlayer src="movie.mp4" />);
  expect(violations).toHaveLength(0);
});
