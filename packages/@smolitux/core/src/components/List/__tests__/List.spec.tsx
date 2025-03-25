// packages/@smolitux/core/src/components/List/__tests__/List.spec.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemAction } from '../List';

describe('List Snapshot Tests', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(
      <List>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with ordered variant', () => {
    const { container } = render(
      <List variant="ordered">
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with unordered variant', () => {
    const { container } = render(
      <List variant="unordered">
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with description variant', () => {
    const { container } = render(
      <List variant="description">
        <ListItem primary="Term 1" secondary="Description 1" />
        <ListItem primary="Term 2" secondary="Description 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with dividers', () => {
    const { container } = render(
      <List dividers>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with horizontal layout', () => {
    const { container } = render(
      <List horizontal>
        <ListItem primary="Item 1" />
        <ListItem primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with selectable items', () => {
    const { container } = render(
      <List selectable selectedItem="item2">
        <ListItem id="item1" primary="Item 1" />
        <ListItem id="item2" primary="Item 2" />
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with icons and actions', () => {
    const { container } = render(
      <List>
        <ListItem>
          <ListItemIcon>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Item with Icon and Action" />
          <ListItemAction>
            <button>Action</button>
          </ListItemAction>
        </ListItem>
      </List>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with different sizes', () => {
    const { container } = render(
      <>
        <List size="sm">
          <ListItem primary="Small Item" />
        </List>
        <List size="md">
          <ListItem primary="Medium Item" />
        </List>
        <List size="lg">
          <ListItem primary="Large Item" />
        </List>
      </>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('matches snapshot with different densities', () => {
    const { container } = render(
      <>
        <List density="compact">
          <ListItem primary="Compact Item" />
        </List>
        <List density="default">
          <ListItem primary="Default Item" />
        </List>
        <List density="comfortable">
          <ListItem primary="Comfortable Item" />
        </List>
      </>
    );
    expect(container).toMatchSnapshot();
  });
});