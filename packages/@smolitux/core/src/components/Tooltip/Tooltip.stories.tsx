import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: [
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end'
      ],
    },
    delay: { control: { type: 'number' } },
    hideDelay: { control: { type: 'number' } },
    maxWidth: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    arrow: { control: { type: 'boolean' } },
    isOpen: { control: { type: 'boolean' } },
    isToggleable: { control: { type: 'boolean' } },
    closeOnOutsideClick: { control: { type: 'boolean' } },
    closeOnEsc: { control: { type: 'boolean' } },
    closeOnScroll: { control: { type: 'boolean' } },
    closeOnTooltipClick: { control: { type: 'boolean' } },
    offset: { control: { type: 'number' } },
    backgroundColor: { control: { type: 'color' } },
    textColor: { control: { type: 'color' } },
    animated: { control: { type: 'boolean' } },
    shadow: { control: { type: 'boolean' } },
    rounded: { control: { type: 'boolean' } },
    bordered: { control: { type: 'boolean' } },
    borderColor: { control: { type: 'color' } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Dies ist ein Tooltip mit Hilfeinformationen',
    placement: 'top',
    delay: 200,
    hideDelay: 100,
    arrow: true,
    animated: true,
    shadow: true,
    rounded: true,
    children: <Button>Hover über mich</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Tooltip content="Top" placement="top">
        <Button className="w-full">Top</Button>
      </Tooltip>
      <Tooltip content="Top Start" placement="top-start">
        <Button className="w-full">Top Start</Button>
      </Tooltip>
      <Tooltip content="Top End" placement="top-end">
        <Button className="w-full">Top End</Button>
      </Tooltip>
      
      <Tooltip content="Right" placement="right">
        <Button className="w-full">Right</Button>
      </Tooltip>
      <Tooltip content="Right Start" placement="right-start">
        <Button className="w-full">Right Start</Button>
      </Tooltip>
      <Tooltip content="Right End" placement="right-end">
        <Button className="w-full">Right End</Button>
      </Tooltip>
      
      <Tooltip content="Bottom" placement="bottom">
        <Button className="w-full">Bottom</Button>
      </Tooltip>
      <Tooltip content="Bottom Start" placement="bottom-start">
        <Button className="w-full">Bottom Start</Button>
      </Tooltip>
      <Tooltip content="Bottom End" placement="bottom-end">
        <Button className="w-full">Bottom End</Button>
      </Tooltip>
      
      <Tooltip content="Left" placement="left">
        <Button className="w-full">Left</Button>
      </Tooltip>
      <Tooltip content="Left Start" placement="left-start">
        <Button className="w-full">Left Start</Button>
      </Tooltip>
      <Tooltip content="Left End" placement="left-end">
        <Button className="w-full">Left End</Button>
      </Tooltip>
    </div>
  ),
};

export const WithHTMLContent: Story = {
  args: {
    content: (
      <div>
        <h3 className="font-bold mb-2">Formatierter Tooltip</h3>
        <p>Tooltips können auch <strong>HTML-Inhalte</strong> enthalten.</p>
        <ul className="list-disc pl-4 mt-2">
          <li>Punkt 1</li>
          <li>Punkt 2</li>
          <li>Punkt 3</li>
        </ul>
      </div>
    ),
    maxWidth: 300,
    placement: 'right',
    children: <Button>Hover für komplexen Tooltip</Button>,
  },
};

export const Toggleable: Story = {
  args: {
    content: 'Klicken Sie erneut, um diesen Tooltip zu schließen',
    isToggleable: true,
    placement: 'top',
    children: <Button>Klicken für Tooltip</Button>,
  },
};

export const CustomStyling: Story = {
  args: {
    content: 'Benutzerdefinierter Tooltip mit eigenen Farben',
    backgroundColor: '#6366F1', // Indigo
    textColor: '#FFFFFF',
    borderColor: '#4F46E5',
    bordered: true,
    shadow: true,
    placement: 'top',
    children: <Button>Hover für benutzerdefinierten Tooltip</Button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'Tooltip ohne Pfeil',
    arrow: false,
    placement: 'top',
    children: <Button>Hover über mich</Button>,
  },
};

export const WithDelay: Story = {
  args: {
    content: 'Dieser Tooltip erscheint mit Verzögerung',
    delay: 1000, // 1 Sekunde Verzögerung
    placement: 'top',
    children: <Button>Hover für verzögerten Tooltip</Button>,
  },
};

export const CloseOnClick: Story = {
  args: {
    content: 'Klicken Sie auf diesen Tooltip, um ihn zu schließen',
    closeOnTooltipClick: true,
    placement: 'top',
    children: <Button>Hover und dann auf Tooltip klicken</Button>,
  },
};