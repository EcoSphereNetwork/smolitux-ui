import type { Meta, StoryObj } from '@storybook/react';
import { Flex, FlexItem } from '../Flex';

const meta: Meta<typeof Flex> = {
  title: 'Components/Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex-Richtung',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex-Umbruch',
    },
    justify: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Ausrichtung entlang der Hauptachse',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Ausrichtung entlang der Querachse',
    },
    alignContent: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Ausrichtung von mehreren Zeilen/Spalten',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Abstand zwischen Elementen',
    },
    inline: {
      control: 'boolean',
      description: 'Flex-Container als Inline-Element',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Volle Breite des Containers',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Volle Höhe des Containers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

// Hilfsfunktion für Box-Elemente
const Box = ({ children, style = {} }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: '#e5e7eb',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: [<Box key="1">Item 1</Box>, <Box key="2">Item 2</Box>, <Box key="3">Item 3</Box>],
  },
};

export const Direction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Row (default)</h3>
        <Flex direction="row">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>Row Reverse</h3>
        <Flex direction="row-reverse">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>Column</h3>
        <Flex direction="column">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>Column Reverse</h3>
        <Flex direction="column-reverse">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>flex-start (default)</h3>
        <Flex justify="flex-start" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>flex-end</h3>
        <Flex justify="flex-end" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>center</h3>
        <Flex justify="center" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>space-between</h3>
        <Flex justify="space-between" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>space-around</h3>
        <Flex justify="space-around" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>space-evenly</h3>
        <Flex justify="space-evenly" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box style={{ width: '100px' }}>Item 1</Box>
          <Box style={{ width: '100px' }}>Item 2</Box>
          <Box style={{ width: '100px' }}>Item 3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>stretch (default)</h3>
        <Flex
          align="stretch"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '150px' }}
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>flex-start</h3>
        <Flex
          align="flex-start"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '150px' }}
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>flex-end</h3>
        <Flex
          align="flex-end"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '150px' }}
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>center</h3>
        <Flex
          align="center"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '150px' }}
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>baseline</h3>
        <Flex
          align="baseline"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '150px' }}
        >
          <Box style={{ paddingTop: '30px' }}>Item 1</Box>
          <Box style={{ paddingTop: '10px' }}>Item 2</Box>
          <Box style={{ paddingTop: '50px' }}>Item 3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>nowrap (default)</h3>
        <Flex wrap="nowrap" style={{ backgroundColor: '#f3f4f6', padding: '10px', width: '300px' }}>
          <Box style={{ width: '120px' }}>Item 1</Box>
          <Box style={{ width: '120px' }}>Item 2</Box>
          <Box style={{ width: '120px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>wrap</h3>
        <Flex wrap="wrap" style={{ backgroundColor: '#f3f4f6', padding: '10px', width: '300px' }}>
          <Box style={{ width: '120px' }}>Item 1</Box>
          <Box style={{ width: '120px' }}>Item 2</Box>
          <Box style={{ width: '120px' }}>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>wrap-reverse</h3>
        <Flex
          wrap="wrap-reverse"
          style={{ backgroundColor: '#f3f4f6', padding: '10px', width: '300px' }}
        >
          <Box style={{ width: '120px' }}>Item 1</Box>
          <Box style={{ width: '120px' }}>Item 2</Box>
          <Box style={{ width: '120px' }}>Item 3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const Gap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>none (default)</h3>
        <Flex gap="none" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>xs</h3>
        <Flex gap="xs" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>sm</h3>
        <Flex gap="sm" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>md</h3>
        <Flex gap="md" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>lg</h3>
        <Flex gap="lg" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>

      <div>
        <h3>xl</h3>
        <Flex gap="xl" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const FlexItems: Story = {
  render: () => (
    <Flex gap="md" style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
      <FlexItem grow>
        <Box>Wachsendes Item (grow)</Box>
      </FlexItem>
      <FlexItem shrink={0} basis="200px">
        <Box>Feste Breite (basis="200px", shrink={0})</Box>
      </FlexItem>
      <FlexItem grow={2}>
        <Box>Doppelt wachsendes Item (grow={2})</Box>
      </FlexItem>
    </Flex>
  ),
};

export const AlignSelf: Story = {
  render: () => (
    <Flex align="center" style={{ backgroundColor: '#f3f4f6', padding: '10px', height: '200px' }}>
      <FlexItem align="flex-start">
        <Box>Oben ausgerichtet (align="flex-start")</Box>
      </FlexItem>
      <FlexItem>
        <Box>Mittig ausgerichtet (vom Container)</Box>
      </FlexItem>
      <FlexItem align="flex-end">
        <Box>Unten ausgerichtet (align="flex-end")</Box>
      </FlexItem>
    </Flex>
  ),
};

export const Order: Story = {
  render: () => (
    <Flex style={{ backgroundColor: '#f3f4f6', padding: '10px' }}>
      <FlexItem order={3}>
        <Box>Drittes Element (order={3})</Box>
      </FlexItem>
      <FlexItem order={1}>
        <Box>Erstes Element (order={1})</Box>
      </FlexItem>
      <FlexItem order={2}>
        <Box>Zweites Element (order={2})</Box>
      </FlexItem>
    </Flex>
  ),
};

export const Inline: Story = {
  args: {
    inline: true,
    children: [
      <Box key="1" style={{ padding: '10px' }}>
        Inline
      </Box>,
      <Box key="2" style={{ padding: '10px' }}>
        Flex
      </Box>,
    ],
  },
  decorators: [
    (Story) => (
      <div>
        Text vor dem Flex-Container
        <Story />
        Text nach dem Flex-Container
      </div>
    ),
  ],
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: [<Box key="1">Item 1</Box>, <Box key="2">Item 2</Box>, <Box key="3">Item 3</Box>],
  },
};

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    children: [<Box key="1">Item 1</Box>, <Box key="2">Item 2</Box>, <Box key="3">Item 3</Box>],
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
};
