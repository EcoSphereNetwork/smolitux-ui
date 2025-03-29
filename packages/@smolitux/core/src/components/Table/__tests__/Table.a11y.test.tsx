import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { a11y } from '@smolitux/testing';
import Table from '../Table';

describe('Table Accessibility', () => {
  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: (row: any) => row.name,
      sortable: true
    },
    {
      id: 'age',
      header: 'Alter',
      cell: (row: any) => row.age,
      sortable: true
    },
    {
      id: 'city',
      header: 'Stadt',
      cell: (row: any) => row.city,
      sortable: false
    }
  ];

  const data = [
    { name: 'Max Mustermann', age: 30, city: 'Berlin' },
    { name: 'Erika Musterfrau', age: 25, city: 'Hamburg' },
    { name: 'John Doe', age: 40, city: 'München' }
  ];

  it('should not have accessibility violations in basic state', async () => {
    const { violations } = await a11y.testA11y(
      <Table columns={columns} data={data} />
    );
    expect(violations).toHaveLength(0);
  });

  it('should have correct ARIA attributes for table', () => {
    render(<Table columns={columns} data={data} id="test-table" ariaLabel="Test Tabelle" />);
    
    const table = screen.getByRole('grid');
    expect(table).toHaveAttribute('id', 'test-table');
    expect(table).toHaveAttribute('aria-label', 'Test Tabelle');
  });

  it('should have correct ARIA attributes for sortable columns', () => {
    render(<Table columns={columns} data={data} sortable={true} />);
    
    // Check column headers
    const nameHeader = screen.getByText('Name').closest('th');
    const ageHeader = screen.getByText('Alter').closest('th');
    const cityHeader = screen.getByText('Stadt').closest('th');
    
    expect(nameHeader).toHaveAttribute('role', 'columnheader');
    expect(nameHeader).toHaveAttribute('aria-label', expect.stringContaining('Name, klicken zum Sortieren'));
    expect(nameHeader).toHaveAttribute('tabIndex', '0');
    
    expect(ageHeader).toHaveAttribute('role', 'columnheader');
    expect(ageHeader).toHaveAttribute('aria-label', expect.stringContaining('Alter, klicken zum Sortieren'));
    expect(ageHeader).toHaveAttribute('tabIndex', '0');
    
    expect(cityHeader).toHaveAttribute('role', 'columnheader');
    expect(cityHeader).not.toHaveAttribute('aria-label');
    expect(cityHeader).not.toHaveAttribute('tabIndex');
  });

  it('should update aria-sort attribute when sorting', () => {
    render(<Table columns={columns} data={data} sortable={true} />);
    
    const nameHeader = screen.getByText('Name').closest('th');
    
    // Initial state - no sorting
    expect(nameHeader).not.toHaveAttribute('aria-sort');
    
    // Click to sort ascending
    fireEvent.click(nameHeader!);
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(nameHeader).toHaveAttribute('aria-label', expect.stringContaining('sortiert aufsteigend'));
    
    // Click again to sort descending
    fireEvent.click(nameHeader!);
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    expect(nameHeader).toHaveAttribute('aria-label', expect.stringContaining('sortiert absteigend'));
  });

  it('should support keyboard navigation for sorting', () => {
    render(<Table columns={columns} data={data} sortable={true} />);
    
    const nameHeader = screen.getByText('Name').closest('th');
    
    // Focus the header
    nameHeader?.focus();
    expect(document.activeElement).toBe(nameHeader);
    
    // Press Enter to sort
    fireEvent.keyDown(nameHeader!, { key: 'Enter' });
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    
    // Press Space to sort
    fireEvent.keyDown(nameHeader!, { key: ' ' });
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('should have correct ARIA attributes for rows and cells', () => {
    render(<Table columns={columns} data={data} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4); // Header row + 3 data rows
    
    // Check header row
    expect(rows[0]).toHaveAttribute('role', 'row');
    
    // Check data rows
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i]).toHaveAttribute('role', 'row');
      expect(rows[i]).toHaveAttribute('aria-selected', 'false');
      
      // Check cells in this row
      const cells = rows[i].querySelectorAll('[role="gridcell"]');
      expect(cells.length).toBe(3); // 3 columns
      
      cells.forEach(cell => {
        expect(cell).toHaveAttribute('role', 'gridcell');
      });
    }
  });

  it('should support keyboard navigation for clickable rows', () => {
    const onRowClick = jest.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    
    // Check that rows are focusable
    rows.forEach(row => {
      expect(row).toHaveAttribute('tabIndex', '0');
    });
    
    // Focus the first row
    rows[0].focus();
    expect(document.activeElement).toBe(rows[0]);
    
    // Press Enter to click
    fireEvent.keyDown(rows[0], { key: 'Enter' });
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
    
    // Focus the second row
    rows[1].focus();
    
    // Press Space to click
    fireEvent.keyDown(rows[1], { key: ' ' });
    expect(onRowClick).toHaveBeenCalledWith(data[1], 1);
  });

  it('should have accessible pagination controls', () => {
    render(
      <Table 
        columns={columns} 
        data={data} 
        paginated={true} 
        itemsPerPage={1} 
      />
    );
    
    // Check pagination buttons
    const prevButton = screen.getByLabelText('Vorherige Seite');
    const nextButton = screen.getByLabelText('Nächste Seite');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    
    // Check initial state
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    
    // Navigate to next page
    fireEvent.click(nextButton);
    
    // Check updated state
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    
    // Check pagination info
    const paginationInfo = screen.getByText(/Zeige/);
    expect(paginationInfo).toHaveAttribute('aria-live', 'polite');
  });

  it('should have accessible loading and empty states', () => {
    const { rerender } = render(
      <Table 
        columns={columns} 
        data={[]} 
      />
    );
    
    // Check empty state
    const emptyState = screen.getByText('Keine Daten vorhanden');
    expect(emptyState).toHaveAttribute('role', 'status');
    expect(emptyState).toHaveAttribute('aria-live', 'polite');
    
    // Check loading state
    rerender(
      <Table 
        columns={columns} 
        data={[]} 
        loading={true}
      />
    );
    
    const loadingState = screen.getByText('Laden...');
    expect(loadingState).toHaveAttribute('role', 'status');
    expect(loadingState).toHaveAttribute('aria-live', 'polite');
  });
});