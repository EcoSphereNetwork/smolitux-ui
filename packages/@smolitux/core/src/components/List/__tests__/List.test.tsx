// packages/@smolitux/core/src/components/List/__tests__/List.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemAction } from '../List';

describe('List', () => {
  it('renders correctly with default props', () => {
    render(
      <List>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('smolitux-list');
    
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });
  
  it('renders ordered list correctly', () => {
    render(
      <List variant="ordered">
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(list).toHaveClass('smolitux-list--ordered');
  });
  
  it('renders unordered list correctly', () => {
    render(
      <List variant="unordered">
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--unordered');
  });
  
  it('renders description list correctly', () => {
    render(
      <List variant="description">
        <ListItem primary="Term 1" secondary="Description 1" />
        <ListItem primary="Term 2" secondary="Description 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--description');
    
    const terms = screen.getAllByText(/Term \d/);
    expect(terms).toHaveLength(2);
    expect(terms[0]).toHaveClass('smolitux-list-item-term');
    
    const descriptions = screen.getAllByText(/Description \d/);
    expect(descriptions).toHaveLength(2);
    expect(descriptions[0]).toHaveClass('smolitux-list-item-description');
  });
  
  it('applies size classes correctly', () => {
    const { rerender } = render(
      <List size="sm">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--sm');
    
    rerender(
      <List size="md">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--md');
    
    rerender(
      <List size="lg">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--lg');
  });
  
  it('applies density classes correctly', () => {
    const { rerender } = render(
      <List density="compact">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--compact');
    
    rerender(
      <List density="comfortable">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--comfortable');
  });
  
  it('applies alignment classes correctly', () => {
    const { rerender } = render(
      <List align="start">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--align-start');
    
    rerender(
      <List align="center">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--align-center');
    
    rerender(
      <List align="end">
        <ListItem primary="Item" />
      </List>
    );
    expect(screen.getByRole('list')).toHaveClass('smolitux-list--align-end');
  });
  
  it('applies dividers correctly', () => {
    render(
      <List dividers>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--dividers');
    
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('smolitux-list-item--divider');
    expect(items[1]).toHaveClass('smolitux-list-item--divider');
  });
  
  it('renders horizontal list correctly', () => {
    render(
      <List horizontal>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--horizontal');
    
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('smolitux-list-item--horizontal');
    expect(items[1]).toHaveClass('smolitux-list-item--horizontal');
  });
  
  it('handles selectable items correctly', () => {
    const handleSelectItem = jest.fn();
    
    render(
      <List selectable selectedItem="item2" onSelectItem={handleSelectItem}>
        <ListItem id="item1" primary="Item 1" />
        <ListItem id="item2" primary="Item 2" />
      </List>
    );
    
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveClass('smolitux-list-item--selected');
    expect(items[1]).toHaveClass('smolitux-list-item--selected');
    
    fireEvent.click(items[0]);
    expect(handleSelectItem).toHaveBeenCalledWith('item1');
  });
  
  it('handles disabled items correctly', () => {
    const handleClick = jest.fn();
    const handleSelectItem = jest.fn();
    
    render(
      <List selectable onSelectItem={handleSelectItem}>
        <ListItem id="item1" primary="Item 1" disabled onClick={handleClick} />
        <ListItem id="item2" primary="Item 2" />
      </List>
    );
    
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('smolitux-list-item--disabled');
    expect(items[0]).toHaveAttribute('aria-disabled', 'true');
    
    fireEvent.click(items[0]);
    expect(handleClick).not.toHaveBeenCalled();
    expect(handleSelectItem).not.toHaveBeenCalled();
  });
  
  it('renders ListItemText correctly', () => {
    render(
      <List>
        <ListItem>
          <ListItemText primary="Primary Text" secondary="Secondary Text" />
        </ListItem>
      </List>
    );
    
    expect(screen.getByText('Primary Text')).toHaveClass('smolitux-list-item-primary');
    expect(screen.getByText('Secondary Text')).toHaveClass('smolitux-list-item-secondary');
  });
  
  it('renders ListItemIcon correctly', () => {
    render(
      <List>
        <ListItem>
          <ListItemIcon>
            <svg data-testid="test-icon" />
          </ListItemIcon>
          <ListItemText primary="Item with Icon" />
        </ListItem>
      </List>
    );
    
    const icon = screen.getByTestId('test-icon');
    expect(icon.parentElement).toHaveClass('smolitux-list-item-icon');
  });
  
  it('renders ListItemAction correctly', () => {
    render(
      <List>
        <ListItem>
          <ListItemText primary="Item with Action" />
          <ListItemAction>
            <button data-testid="test-button">Action</button>
          </ListItemAction>
        </ListItem>
      </List>
    );
    
    const button = screen.getByTestId('test-button');
    expect(button.parentElement).toHaveClass('smolitux-list-item-action');
  });
  
  it('forwards ref to the list element', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(
      <List ref={ref}>
        <ListItem primary="Item" />
      </List>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
    expect(ref.current).toHaveClass('smolitux-list');
  });
  
  it('forwards ref to the list item element', () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <List>
        <ListItem ref={ref} primary="Item" />
      </List>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toHaveClass('smolitux-list-item');
  });
});