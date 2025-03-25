import React from 'react';
import { render } from '@testing-library/react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuDivider } from '../MenuDivider';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Menu Snapshots', () => {
  it('renders default menu correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with different variants correctly', () => {
    const variants = ['default', 'primary', 'secondary', 'minimal'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Menu variant={variant as any}>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with variant ${variant}`);
    });
  });

  it('renders menu with different directions correctly', () => {
    const directions = ['vertical', 'horizontal'];
    
    const fragments = directions.map(direction => {
      const { asFragment } = render(
        <Menu direction={direction as any}>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { direction, fragment: asFragment() };
    });
    
    fragments.forEach(({ direction, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with direction ${direction}`);
    });
  });

  it('renders menu with fullWidth correctly', () => {
    const { asFragment } = render(
      <Menu fullWidth>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with custom className correctly', () => {
    const { asFragment } = render(
      <Menu className="custom-menu">
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with dividers correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with labeled dividers correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1">Item 1</MenuItem>
        <MenuDivider label="Section" />
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with different divider variants correctly', () => {
    const variants = ['solid', 'dashed', 'dotted'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Menu>
          <MenuItem id="item1">Item 1</MenuItem>
          <MenuDivider variant={variant as any} />
          <MenuItem id="item2">Item 2</MenuItem>
        </Menu>
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Menu with ${variant} divider`);
    });
  });

  it('renders menu with items with icons correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" icon={<span>🔍</span>}>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with items with right icons correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" rightIcon={<span>→</span>}>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with items with shortcuts correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" shortcut="Ctrl+S">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with items with badges correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" badge={<span>New</span>}>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with active items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" active>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with disabled items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" disabled>Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with link items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem id="item1" href="https://example.com">Item 1</MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with submenu items correctly', () => {
    const { asFragment } = render(
      <Menu>
        <MenuItem 
          id="item1" 
          submenu={
            <Menu>
              <MenuItem id="sub1">Submenu Item 1</MenuItem>
              <MenuItem id="sub2">Submenu Item 2</MenuItem>
            </Menu>
          }
        >
          Item 1
        </MenuItem>
        <MenuItem id="item2">Item 2</MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders menu with all features combined correctly', () => {
    const { asFragment } = render(
      <Menu variant="primary" direction="vertical" fullWidth className="custom-menu">
        <MenuItem id="item1" icon={<span>🔍</span>} active>Item 1</MenuItem>
        <MenuDivider label="Section" variant="dashed" />
        <MenuItem id="item2" rightIcon={<span>→</span>} shortcut="Ctrl+S">Item 2</MenuItem>
        <MenuItem id="item3" badge={<span>New</span>} disabled>Item 3</MenuItem>
        <MenuItem id="item4" href="https://example.com">Item 4</MenuItem>
        <MenuItem 
          id="item5" 
          submenu={
            <Menu>
              <MenuItem id="sub1">Submenu Item 1</MenuItem>
              <MenuItem id="sub2">Submenu Item 2</MenuItem>
            </Menu>
          }
        >
          Item 5
        </MenuItem>
      </Menu>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});