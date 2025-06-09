import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Media/AudioPlayer',
  component: AudioPlayer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://www.w3schools.com/html/horse.mp3',
    title: 'Beispiel Audio',
    artist: 'Smolitux',
  },
};

export const FileSource: Story = {
  render: () => {
    const file = new File([], 'audio.mp3', { type: 'audio/mpeg' });
    return <AudioPlayer src={file} title="Lokale Datei" />;
  },
};
