import type { TestRunnerConfig } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getStoryContext } from '@storybook/test-runner';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);
    
    // Skip visual tests if the story is marked with { parameters: { visualTest: false } }
    if (storyContext.parameters?.visualTest === false) {
      return;
    }
    
    // Add a small delay to ensure animations complete
    await page.waitForTimeout(500);
    
    // Take a screenshot and compare it with the baseline
    const image = await page.screenshot();
    
    // Custom snapshot name based on the test context
    const customSnapshotIdentifier = `${context.id}${
      process.env.THEME ? `-${process.env.THEME}` : ''
    }${process.env.VIEWPORT ? `-${process.env.VIEWPORT}` : ''}`;
    
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier,
      failureThreshold: 0.02, // Allow for small differences (2%)
      failureThresholdType: 'percent',
    });
  },
};

export default config;