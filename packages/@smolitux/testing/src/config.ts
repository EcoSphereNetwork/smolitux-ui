import { ThemeOptions, defaultTheme } from '@smolitux/theme';

export interface TestingConfig {
  theme: ThemeOptions;
}

let config: TestingConfig = {
  theme: defaultTheme,
};

/**
 * Configure global options used by testing utilities.
 */
export function configure(options: Partial<TestingConfig>): void {
  config = { ...config, ...options };
}

/**
 * Get the current testing configuration.
 */
export function getConfig(): TestingConfig {
  return config;
}

export default {
  configure,
  getConfig,
};
