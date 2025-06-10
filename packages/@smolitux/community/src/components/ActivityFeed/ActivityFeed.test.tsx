import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ActivityFeed, ActivityItem } from './ActivityFeed';

const sample: ActivityItem[] = [
  { id: '1', type: 'post', user: { id: 'u1', name: 'Alice', username: 'alice' }, timestamp: new Date() },
];

it('calls onLoadMore when load button is clicked', async () => {
  const handleLoadMore = jest.fn().mockResolvedValue(undefined);
  render(
    <ActivityFeed activities={sample} hasMore onLoadMore={handleLoadMore} />
  );
  await userEvent.click(screen.getByRole('button', { name: /Weitere Aktivitäten laden/i }));
  expect(handleLoadMore).toHaveBeenCalled();
});

it('forwards ref correctly', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<ActivityFeed activities={sample} ref={ref} />);
  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
