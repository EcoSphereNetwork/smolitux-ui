import { join, dirname } from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

function getAbsolutePath(value: string) {
  try {
    return dirname(require.resolve(join(value, 'package.json')));
  } catch {
    console.warn(`Konnte Paket ${value} nicht auflösen`);
    return value;
  }
}

const config: StorybookConfig = {
  stories: [
    '../packages/@smolitux/*/src/**/*.mdx',
    '../packages/@smolitux/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    {
      name: getAbsolutePath('@storybook/addon-essentials'),
      options: {
        docs: true,
      },
    },
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;