import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Core/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Upload files',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Select multiple',
    multiple: true,
  },
};

export const MaxSize: Story = {
  args: {
    label: 'Max 50KB',
    maxSize: 50 * 1024,
  },
};

export const AcceptedTypes: Story = {
  args: {
    label: 'Images only',
    accept: 'image/*',
  },
};

export const CustomList: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        fileListRenderer={(f, remove) => (
          <ul style={{ marginTop: '1rem' }}>
            {f.map((file, i) => (
              <li key={i}>
                {file.name} <button onClick={() => remove(i)}>remove</button>
              </li>
            ))}
          </ul>
        )}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
