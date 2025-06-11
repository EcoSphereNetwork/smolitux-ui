import React from 'react';
import { Card } from '@smolitux/core';

export interface ActivityPubViewerProps {
  activity: {
    '@context'?: string | string[];
    type: string;
    id: string;
    actor: string;
    object?: string | Record<string, unknown>;
    content?: string;
    published?: string;
    to?: string[];
    cc?: string[];
  };
  className?: string;
}

export const ActivityPubViewer = React.forwardRef<HTMLDivElement, ActivityPubViewerProps>(({ activity, className }, ref) => {
  return (
    <Card ref={ref} className={className} data-testid="activitypub-viewer">
      <h3 className="font-semibold" data-testid="actor">
        {activity.actor}
      </h3>
      {activity.content && <p data-testid="content">{activity.content}</p>}
      {activity.published && (
        <p className="text-sm text-gray-500" data-testid="published">
          {new Date(activity.published).toLocaleString()}
        </p>
      )}
    </Card>

  );
});

ActivityPubViewer.displayName = 'ActivityPubViewer';

export default ActivityPubViewer;
