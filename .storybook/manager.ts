import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Smolitux UI',
  brandUrl: 'https://github.com/EcoSphereNetwork/smolitux-ui',
  brandTarget: '_blank',
  colorPrimary: '#3b82f6',
  colorSecondary: '#2563eb',
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 6,
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontCode: 'monospace',
  textColor: '#1e293b',
  textInverseColor: '#ffffff',
  barTextColor: '#64748b',
  barSelectedColor: '#3b82f6',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#1e293b',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  showToolbar: true,
  sidebar: {
    showRoots: true,
  },
});