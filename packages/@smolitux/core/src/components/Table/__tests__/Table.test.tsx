import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../Table';

describe('Table', () => {
  const sampleData = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' }
  ];

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'email', label: 'Email' }
  ];

  it('renders correctly with default props', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveClass('custom-table');
  });

  it('renders with custom style', () => {
    const customStyle = { width: '100%', borderCollapse: 'collapse' };
    render(
      <Table style={customStyle}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveStyle('width: 100%');
    expect(table).toHaveStyle('border-collapse: collapse');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Table variant="simple">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    let table = screen.getByRole('table');
    expect(table).toHaveClass('table-simple');
    
    rerender(
      <Table variant="striped">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-striped');
    
    rerender(
      <Table variant="bordered">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-bordered');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Table size="sm">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    let table = screen.getByRole('table');
    expect(table).toHaveClass('table-sm');
    
    rerender(
      <Table size="md">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-md');
    
    rerender(
      <Table size="lg">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    table = screen.getByRole('table');
    expect(table).toHaveClass('table-lg');
  });

  it('renders with footer', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    
    const footerCells = screen.getAllByText(/total|30/i);
    expect(footerCells.length).toBe(2);
  });

  it('renders with sortable columns', () => {
    const onSort = jest.fn();
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortable onSort={() => onSort('name')}>Name</TableCell>
            <TableCell sortable onSort={() => onSort('age')}>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const sortableHeaders = screen.getAllByRole('columnheader');
    expect(sortableHeaders[0]).toHaveClass('sortable');
    expect(sortableHeaders[1]).toHaveClass('sortable');
    
    fireEvent.click(sortableHeaders[0]);
    expect(onSort).toHaveBeenCalledWith('name');
  });

  it('renders with selectable rows', () => {
    const onSelect = jest.fn();
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow selectable onSelect={() => onSelect(1)}>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const selectableRow = screen.getByText('John Doe').closest('tr');
    expect(selectableRow).toHaveClass('selectable');
    
    fireEvent.click(selectableRow);
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('renders with hoverable rows', () => {
    render(
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveClass('table-hoverable');
  });

  it('renders with sticky header', () => {
    render(
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const tableHead = screen.getByText('Name').closest('thead');
    expect(tableHead).toHaveClass('sticky-header');
  });

  it('renders with responsive design', () => {
    render(
      <Table responsive>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const tableContainer = screen.getByRole('table').parentElement;
    expect(tableContainer).toHaveClass('table-responsive');
  });

  it('renders with caption', () => {
    render(
      <Table caption="Employee List">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    expect(screen.getByText('Employee List')).toBeInTheDocument();
  });

  it('renders with aria attributes', () => {
    render(
      <Table aria-label="Employee data" aria-describedby="table-description">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Employee data');
    expect(table).toHaveAttribute('aria-describedby', 'table-description');
  });

  it('renders with custom width', () => {
    render(
      <Table width="800px">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    const table = screen.getByRole('table');
    expect(table).toHaveStyle('width: 800px');
  });

  it('renders with loading state', () => {
    render(
      <Table isLoading>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    
    expect(screen.getByTestId('table-loading-overlay')).toBeInTheDocument();
  });

  it('renders with empty state', () => {
    render(
      <Table emptyText="No data available">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});