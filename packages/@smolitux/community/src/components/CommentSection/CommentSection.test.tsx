import React from 'react';
import { render } from '@testing-library/react';
import { CommentSection } from './CommentSection';

describe('CommentSection', () => {
  const baseProps = {
    comments: [],
    onAddComment: jest.fn().mockResolvedValue(undefined),
    onLikeComment: jest.fn().mockResolvedValue(undefined),
  };

  it('renders without crashing', () => {
    const { container } = render(<CommentSection {...baseProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CommentSection {...baseProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
