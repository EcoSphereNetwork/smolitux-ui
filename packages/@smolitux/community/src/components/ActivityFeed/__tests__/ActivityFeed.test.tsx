import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ActivityFeed, ActivityItem } from '../ActivityFeed';

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'post',
    user: { id: 'u1', name: 'User', username: 'user' },
    timestamp: new Date(),
  },
];

describe('ActivityFeed', () => {
  it('renders activities and triggers callbacks', async () => {
    const handleClick = jest.fn();
    render(
      <ActivityFeed activities={activities} onActivityClick={handleClick} />
    );
    await userEvent.click(screen.getByText('User'));
    expect(handleClick).toHaveBeenCalledWith(activities[0]);
  });
});
