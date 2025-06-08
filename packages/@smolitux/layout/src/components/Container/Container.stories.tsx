import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'none'],
    },
    disableGutters: { control: { type: 'boolean' } },
    fullHeight: { control: { type: 'boolean' } },
    centerContent: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// Hilfsfunktion zum Erstellen von Beispielinhalten
const ExampleContent = () => (
  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Container-Inhalt</h2>
    <p className="mb-4">
      Dieser Container passt seine maximale Breite basierend auf der <code>maxWidth</code>-Prop an.
      Probieren Sie verschiedene Werte aus, um zu sehen, wie sich der Container verhält.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Abschnitt 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Abschnitt 2</h3>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  </div>
);

// Hilfsfunktion zum Anzeigen der Container-Grenzen
const ContainerWithBorder = (props: React.ComponentProps<typeof Container>) => (
  <div className="bg-gray-200 dark:bg-gray-900 min-h-[300px] p-4">
    <div className="border-2 border-dashed border-blue-500 dark:border-blue-400">
      <Container {...props} />
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'lg',
    disableGutters: false,
    fullHeight: false,
    centerContent: false,
  },
};

export const Small: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'sm',
    disableGutters: false,
  },
};

export const Medium: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'md',
    disableGutters: false,
  },
};

export const Large: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'lg',
    disableGutters: false,
  },
};

export const ExtraLarge: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'xl',
    disableGutters: false,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'full',
    disableGutters: false,
  },
};

export const WithoutGutters: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'lg',
    disableGutters: true,
  },
};

export const CenteredContent: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Zentrierter Inhalt</h2>
        <p className="text-center">
          Dieser Container verwendet <code>centerContent</code>, um seinen Inhalt horizontal und
          vertikal zu zentrieren.
        </p>
      </div>
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: 'lg',
    centerContent: true,
    fullHeight: true,
  },
};

export const Responsive: Story = {
  render: (args) => (
    <ContainerWithBorder {...args}>
      <ExampleContent />
    </ContainerWithBorder>
  ),
  args: {
    maxWidth: { sm: 'sm', lg: 'xl' },
  },
};
