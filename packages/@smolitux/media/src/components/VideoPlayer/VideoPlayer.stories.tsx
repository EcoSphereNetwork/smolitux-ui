import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Media/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Beispiel Video',
    controls: true,
  },
};

export const FileSource: Story = {
  render: () => {
    const file = new File([], 'movie.mp4', { type: 'video/mp4' });
    return <VideoPlayer src={file} title="Local File" controls />;
  },
};
