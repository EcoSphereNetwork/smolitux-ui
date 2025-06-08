import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../';

const meta: Meta<typeof Pagination.A11y> = {
  title: 'Core/Pagination/A11y',
  component: Pagination.A11y,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Pagination-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    pageCount: { control: 'number' },
    currentPage: { control: 'number' },
    onChange: { action: 'page changed' },
    siblingCount: { control: 'number' },
    boundaryCount: { control: 'number' },
    showFirstLast: { control: 'boolean' },
    showPrevNext: { control: 'boolean' },
    showPageCount: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'rounded', 'outline', 'minimal'],
    },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination.A11y>;

export const Default: Story = {
  args: {
    pageCount: 10,
    currentPage: 1,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: true,
    showPrevNext: true,
    showPageCount: true,
    description: 'Navigieren Sie durch die Ergebnisse',
  },
};

export const WithManyPages: Story = {
  args: {
    pageCount: 50,
    currentPage: 25,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: true,
    showPrevNext: true,
    showPageCount: true,
    description: 'Navigieren Sie durch die Ergebnisse',
  },
};

export const Minimal: Story = {
  args: {
    pageCount: 10,
    currentPage: 5,
    siblingCount: 0,
    boundaryCount: 0,
    showFirstLast: false,
    showPrevNext: true,
    showPageCount: false,
    variant: 'minimal',
    description: 'Minimale Pagination',
  },
};

export const Disabled: Story = {
  args: {
    pageCount: 10,
    currentPage: 5,
    disabled: true,
    showFirstLast: true,
    showPrevNext: true,
    description: 'Deaktivierte Pagination',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Pagination.A11y pageCount={10} currentPage={5} size="sm" description="Kleine Pagination" />

      <Pagination.A11y pageCount={10} currentPage={5} size="md" description="Mittlere Pagination" />

      <Pagination.A11y pageCount={10} currentPage={5} size="lg" description="Große Pagination" />
    </div>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Pagination.A11y
        pageCount={10}
        currentPage={5}
        variant="default"
        description="Standard-Pagination"
      />

      <Pagination.A11y
        pageCount={10}
        currentPage={5}
        variant="rounded"
        description="Abgerundete Pagination"
      />

      <Pagination.A11y
        pageCount={10}
        currentPage={5}
        variant="outline"
        description="Outline-Pagination"
      />

      <Pagination.A11y
        pageCount={10}
        currentPage={5}
        variant="minimal"
        description="Minimale Pagination"
      />
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    pageCount: 10,
    currentPage: 5,
    showFirstLast: true,
    showPrevNext: true,
    showPageCount: true,
    labels: {
      pagination: 'Blättern',
      previous: 'Vorherige',
      next: 'Nächste',
      first: 'Anfang',
      last: 'Ende',
      pageTemplate: 'Blatt {page} von {total}',
      ellipsis: 'Weitere Blätter',
      pageCount: 'Blatt {page} von {total}',
    },
    description: 'Pagination mit benutzerdefinierten Labels',
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="space-y-4">
        <Pagination.A11y
          pageCount={10}
          currentPage={currentPage}
          onChange={setCurrentPage}
          showFirstLast
          showPrevNext
          showPageCount
          description="Interaktive Pagination"
        />

        <div className="text-center">
          <p>Aktuelle Seite: {currentPage}</p>
        </div>
      </div>
    );
  },
};
