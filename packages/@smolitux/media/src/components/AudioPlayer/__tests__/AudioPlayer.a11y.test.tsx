import React from 'react';
import { a11y } from '@smolitux/testing';
import { AudioPlayer } from '../AudioPlayer';

test('AudioPlayer is accessible', async () => {
  const { violations } = await a11y.testA11y(<AudioPlayer src="test.mp3" />);
  expect(violations).toHaveLength(0);
});
