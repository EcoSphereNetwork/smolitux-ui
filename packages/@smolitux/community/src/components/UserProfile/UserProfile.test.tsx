import React from 'react';
import { render } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const baseProps = {
    userId: '1',
    username: 'alice',
    displayName: 'Alice',
    joinDate: new Date(),
    stats: {
      followers: 0,
      following: 0,
      contentCount: 0,
      totalLikes: 0,
      totalViews: 0,
    },
  };

  it('renders without crashing', () => {
    const { container } = render(<UserProfile {...baseProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<UserProfile {...baseProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
