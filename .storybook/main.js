

import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  try {
    return dirname(require.resolve(join(value, 'package.json')))
  } catch (e) {
    console.warn(`Could not resolve package ${value}`)
    return value
  }
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "../packages/@smolitux/*/src/**/*.mdx",
    "../packages/@smolitux/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    {
      "name": getAbsolutePath('@storybook/addon-essentials'),
      "options": {
        "docs": true
      }
    },
    getAbsolutePath('@storybook/addon-onboarding'),
    // Removed @chromatic-com/storybook as it's not installed
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-webpack5'),
    "options": {}
  },
  "typescript": {
    "check": false,
    "checkOptions": {},
    "reactDocgen": 'react-docgen-typescript',
    "reactDocgenTypescriptOptions": {
      "shouldExtractLiteralValuesFromEnum": true,
      "propFilter": (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  "docs": {
    "autodocs": "tag",
  }
}
export default config;