import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Table', () => {
  const mockData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 40, city: 'Chicago' },
  ];

  const mockColumns = [
    { 
      id: 'name', 
      header: 'Name', 
      cell: (row: any) => row.name, 
      sortable: true 
    },
    { 
      id: 'age', 
      header: 'Age', 
      cell: (row: any) => row.age, 
      sortable: true 
    },
    { 
      id: 'city', 
      header: 'City', 
      cell: (row: any) => row.city 
    },
  ];

  it('renders table with data and columns', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    
    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('Chicago')).toBeInTheDocument();
  });

  it('renders empty state when no data is provided', () => {
    render(<Table data={[]} columns={mockColumns} emptyText="No data available" />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders with custom cell renderer', () => {
    const columnsWithRenderer = [
      ...mockColumns,
      {
        id: 'actions',
        header: 'Actions',
        accessor: (row: any) => row.id,
        cell: (value: any) => <button data-testid={`action-${value}`}>Edit</button>,
      },
    ];
    
    render(<Table data={mockData} columns={columnsWithRenderer} />);
    
    expect(screen.getByTestId('action-1')).toBeInTheDocument();
    expect(screen.getByTestId('action-2')).toBeInTheDocument();
    expect(screen.getByTestId('action-3')).toBeInTheDocument();
  });

  it('sorts data when clicking on sortable column header', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    
    // Initial order: John, Jane, Bob
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[2]).toHaveTextContent('Jane Smith');
    expect(rows[3]).toHaveTextContent('Bob Johnson');
    
    // Click on Name header to sort
    fireEvent.click(screen.getByText('Name'));
    
    // Sorted order (ascending): Bob, Jane, John
    const sortedRows = screen.getAllByRole('row');
    expect(sortedRows[1]).toHaveTextContent('Bob Johnson');
    expect(sortedRows[2]).toHaveTextContent('Jane Smith');
    expect(sortedRows[3]).toHaveTextContent('John Doe');
    
    // Click again to reverse sort
    fireEvent.click(screen.getByText('Name'));
    
    // Sorted order (descending): John, Jane, Bob
    const reverseSortedRows = screen.getAllByRole('row');
    expect(reverseSortedRows[1]).toHaveTextContent('John Doe');
    expect(reverseSortedRows[2]).toHaveTextContent('Jane Smith');
    expect(reverseSortedRows[3]).toHaveTextContent('Bob Johnson');
  });

  it('paginates data when pagination is enabled', () => {
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        pagination 
        pageSize={2}
      />
    );
    
    // First page should show first 2 items
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    
    // Go to next page
    fireEvent.click(screen.getByTestId('icon-arrow-right').parentElement!);
    
    // Second page should show last item
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('filters data when search is enabled', () => {
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        search 
      />
    );
    
    // Search input should be present
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    
    // Search for "Jane"
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    
    // Only Jane should be visible
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        variant="striped" 
      />
    );
    
    let table = screen.getByRole('table');
    expect(table).toHaveClass('table-striped');
    
    rerender(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        variant="bordered" 
      />
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-bordered');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        size="sm" 
      />
    );
    
    let table = screen.getByRole('table');
    expect(table).toHaveClass('table-sm');
    
    rerender(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        size="lg" 
      />
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-lg');
  });

  it('renders with hover effect when hover is true', () => {
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        hover 
      />
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveClass('table-hover');
  });

  it('renders with custom className', () => {
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        className="custom-table" 
      />
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveClass('custom-table');
  });

  it('calls onRowClick when a row is clicked', () => {
    const handleRowClick = jest.fn();
    
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        onRowClick={handleRowClick} 
      />
    );
    
    // Click on the first data row
    fireEvent.click(screen.getByText('John Doe'));
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders with selectable rows when selectable is true', () => {
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        selectable 
      />
    );
    
    // Checkbox in header for select all
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument();
    
    // Checkboxes for each row
    expect(screen.getAllByRole('checkbox')).toHaveLength(mockData.length + 1); // +1 for header
  });

  it('selects all rows when select all checkbox is clicked', () => {
    const handleSelectionChange = jest.fn();
    
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onSelectionChange={handleSelectionChange} 
      />
    );
    
    // Click select all checkbox
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
    
    expect(handleSelectionChange).toHaveBeenCalledWith(mockData);
  });
});