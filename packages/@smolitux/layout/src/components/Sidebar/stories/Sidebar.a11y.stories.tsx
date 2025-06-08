import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../';

// Icons für die Beispiele
const HomeIcon = () => <span>🏠</span>;
const SettingsIcon = () => <span>⚙️</span>;
const UsersIcon = () => <span>👥</span>;
const DashboardIcon = () => <span>📊</span>;
const ProfileIcon = () => <span>👤</span>;
const NotificationsIcon = () => <span>🔔</span>;
const HelpIcon = () => <span>❓</span>;
const LogoutIcon = () => <span>🚪</span>;

const meta: Meta<typeof Sidebar.A11y> = {
  title: 'Layout/Sidebar/A11y',
  component: Sidebar.A11y,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Eine barrierefreie Version der Sidebar-Komponente mit verbesserten ARIA-Attributen und Screenreader-Unterstuetzung.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Titel der Sidebar',
    },
    collapsed: {
      control: 'boolean',
      description: 'Ist die Sidebar eingeklappt?',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position der Sidebar',
    },
    fixed: {
      control: 'boolean',
      description: 'Feste Sidebar (nicht scrollbar)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'light', 'dark', 'transparent'],
      description: 'Variante der Sidebar',
    },
    responsive: {
      control: 'boolean',
      description: 'Automatisch einklappen bei kleinem Bildschirm',
    },
    collapseBreakpoint: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Breakpoint zum automatischen Einklappen',
    },
    responsive: {
      control: 'boolean',
      description: 'Automatisch einklappen bei kleinem Bildschirm'
    },
    collapseBreakpoint: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Breakpoint zum automatischen Einklappen'
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA-Label für die Sidebar',
    },
    isNavigation: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Navigation ist',
    },
    isComplementary: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Complementary ist',
    },
    isLandmark: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Landmark ist',
    },
    isRegion: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Region ist',
    },
    isMenu: {
      control: 'boolean',
      description: 'Ob die Sidebar ein Menu ist',
    },
    isLiveRegion: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Live-Region ist',
    },
    liveRegionPoliteness: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'Politeness-Level für Live-Region',
    },
    isAtomic: {
      control: 'boolean',
      description: 'Ob die Sidebar atomar ist',
    },
    isBusy: {
      control: 'boolean',
      description: 'Ob die Sidebar busy ist',
    },
    isFocusable: {
      control: 'boolean',
      description: 'Ob die Sidebar fokussierbar ist',
    },
    hasOrientation: {
      control: 'boolean',
      description: 'Ob die Sidebar eine Orientation hat',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation der Sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar.A11y>;

export const Default: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const WithSubmenu: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      {
        id: 'users',
        label: 'Users',
        icon: <UsersIcon />,
        children: [
          { id: 'users-list', label: 'User List' },
          { id: 'users-add', label: 'Add User' },
          { id: 'users-groups', label: 'User Groups' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon />,
        children: [
          { id: 'settings-general', label: 'General' },
          { id: 'settings-security', label: 'Security' },
          { id: 'settings-notifications', label: 'Notifications' },
        ],
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <NotificationsIcon />,
        badge: 5,
        badgeColor: 'error',
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: <NotificationsIcon />,
        badge: 'New',
        badgeColor: 'primary',
      },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: true },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon />, disabled: true },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, href: '#home' },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '#dashboard' },
      { id: 'users', label: 'Users', icon: <UsersIcon />, href: '#users' },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '#settings' },
    ],
  },
};

export const DarkVariant: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    variant: 'dark',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const LightVariant: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    variant: 'light',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const RightPosition: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    position: 'right',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapseChange = (isCollapsed: boolean) => {
      setCollapsed(isCollapsed);
    };

    return (
      <div className="h-screen">
        <Sidebar.A11y
          title="Navigation"
          ariaLabel="Hauptnavigation"
          isNavigation={true}
          collapsed={collapsed}
          onCollapseChange={handleCollapseChange}
          items={[
            { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
            { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
            { id: 'users', label: 'Users', icon: <UsersIcon /> },
            { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
          ]}
        />

        <div className="ml-64 p-4">
          <h1 className="text-2xl font-bold mb-4">Hauptinhalt</h1>
          <p>
            Die Sidebar kann ein- und ausgeklappt werden. Klicken Sie auf den Pfeil in der Sidebar,
            um sie ein- oder auszuklappen.
          </p>
          <p>Aktueller Status: {collapsed ? 'Eingeklappt' : 'Ausgeklappt'}</p>
        </div>
      </div>
    );
  },
};

export const Responsive: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    responsive: true,
    collapseBreakpoint: 'md',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const Responsive: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    responsive: true,
    collapseBreakpoint: 'md',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
    ]
  }
};

export const AsComplementary: Story = {
  args: {
    title: 'Zusätzliche Informationen',
    ariaLabel: 'Zusätzliche Informationen',
    isComplementary: true,
    items: [
      { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <NotificationsIcon />,
        badge: 3,
        badgeColor: 'error',
      },
      { id: 'help', label: 'Help', icon: <HelpIcon /> },
      { id: 'logout', label: 'Logout', icon: <LogoutIcon /> },
    ],
  },
};

export const AsMenu: Story = {
  args: {
    title: 'Menü',
    ariaLabel: 'Hauptmenü',
    isMenu: true,
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};

export const WithLiveRegion: Story = {
  args: {
    title: 'Statusmeldungen',
    ariaLabel: 'Statusmeldungen',
    isLiveRegion: true,
    liveRegionPoliteness: 'polite',
    isAtomic: true,
    items: [
      { id: 'success', label: 'Erfolgreich gespeichert', icon: <span>✅</span> },
      { id: 'warning', label: 'Warnung: Sitzung läuft ab', icon: <span>⚠️</span> },
      { id: 'error', label: 'Fehler: Verbindung verloren', icon: <span>❌</span> },
    ],
  },
};

export const WithCustomOrientation: Story = {
  args: {
    title: 'Navigation',
    ariaLabel: 'Hauptnavigation',
    isNavigation: true,
    hasOrientation: true,
    orientation: 'vertical',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, active: true },
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { id: 'users', label: 'Users', icon: <UsersIcon /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};
