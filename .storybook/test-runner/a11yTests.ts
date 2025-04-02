import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';
import { getStoryContext } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);
    
    // Skip a11y tests if the story is marked with { parameters: { a11y: { disable: true } } }
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }
    
    // Apply story-level a11y rules
    if (storyContext.parameters?.a11y?.config) {
      await configureAxe(page, {
        rules: storyContext.parameters.a11y.config,
      });
    }
    
    // Run the accessibility tests
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Optional: Customize the violation reporting
      axeOptions: storyContext.parameters?.a11y?.options || {},
      // Optional: Customize which violations to ignore
      includedImpacts: ['critical', 'serious', 'moderate'],
    });
  },
};

export default config;