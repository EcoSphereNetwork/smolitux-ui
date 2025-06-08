import React from 'react';
import { render } from '@testing-library/react';
import Table from '../Table';

// Mock für useTheme
jest.mock('@smolitux/theme', () => ({
  useTheme: () => ({
    colors: {
      primary: {
        500: '#3182ce',
      },
    },
  }),
}));

// Mock für Lucide Icons
jest.mock('lucide-react', () => ({
  ChevronUp: () => <span data-testid="icon-chevron-up">↑</span>,
  ChevronDown: () => <span data-testid="icon-chevron-down">↓</span>,
  Search: () => <span data-testid="icon-search">🔍</span>,
  Filter: () => <span data-testid="icon-filter">🔧</span>,
  ArrowLeft: () => <span data-testid="icon-arrow-left">←</span>,
  ArrowRight: () => <span data-testid="icon-arrow-right">→</span>,
  RefreshCw: () => <span data-testid="icon-refresh">↻</span>,
  Download: () => <span data-testid="icon-download">↓</span>,
}));

describe('Table Snapshots', () => {
  const mockData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 40, city: 'Chicago' },
  ];

  const mockColumns = [
    { id: 'name', header: 'Name', cell: (row: any) => row.name, sortable: true },
    { id: 'age', header: 'Age', cell: (row: any) => row.age, sortable: true },
    { id: 'city', header: 'City', cell: (row: any) => row.city },
  ];

  it('renders default table correctly', () => {
    const { asFragment } = render(<Table data={mockData} columns={mockColumns} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders empty table correctly', () => {
    const { asFragment } = render(
      <Table data={[]} columns={mockColumns} emptyText="No data available" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with custom cell renderer correctly', () => {
    const columnsWithRenderer = [
      ...mockColumns,
      {
        id: 'actions',
        header: 'Actions',
        accessor: (row: any) => row.id,
        cell: (value: any) => <button data-testid={`action-${value}`}>Edit</button>,
      },
    ];

    const { asFragment } = render(<Table data={mockData} columns={columnsWithRenderer} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with pagination correctly', () => {
    const { asFragment } = render(
      <Table data={mockData} columns={mockColumns} pagination pageSize={2} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with search correctly', () => {
    const { asFragment } = render(<Table data={mockData} columns={mockColumns} search />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with different variants correctly', () => {
    const variants = ['striped', 'bordered', 'borderless', 'hover', 'compact'];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(
        <Table data={mockData} columns={mockColumns} variant={variant as any} />
      );
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Table with variant ${variant}`);
    });
  });

  it('renders table with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(
        <Table data={mockData} columns={mockColumns} size={size as any} />
      );
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Table with size ${size}`);
    });
  });

  it('renders table with selectable rows correctly', () => {
    const { asFragment } = render(<Table data={mockData} columns={mockColumns} selectable />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with custom className correctly', () => {
    const { asFragment } = render(
      <Table data={mockData} columns={mockColumns} className="custom-table" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with sorting correctly', () => {
    const { asFragment } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        defaultSortColumn="name"
        defaultSortDirection="asc"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with custom header and footer correctly', () => {
    const { asFragment } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        header={<div>Custom Header</div>}
        footer={<div>Custom Footer</div>}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
