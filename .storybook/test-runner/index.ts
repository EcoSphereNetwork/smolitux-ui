import type { TestRunnerConfig } from '@storybook/test-runner';
import visualRegressionConfig from './visualRegressionTests';
import a11yConfig from './a11yTests';

const config: TestRunnerConfig = {
  // Combine setup functions from both configs
  async setup() {
    if (visualRegressionConfig.setup) {
      await visualRegressionConfig.setup();
    }
    if (a11yConfig.setup) {
      await a11yConfig.setup();
    }
  },

  // Run preRender functions from both configs
  async preRender(page, context) {
    if (visualRegressionConfig.preRender) {
      await visualRegressionConfig.preRender(page, context);
    }
    if (a11yConfig.preRender) {
      await a11yConfig.preRender(page, context);
    }
  },

  // Run postRender functions from both configs
  async postRender(page, context) {
    // Run accessibility tests first
    if (a11yConfig.postRender) {
      await a11yConfig.postRender(page, context);
    }
    
    // Then run visual regression tests
    if (visualRegressionConfig.postRender) {
      await visualRegressionConfig.postRender(page, context);
    }
  },
};

export default config;