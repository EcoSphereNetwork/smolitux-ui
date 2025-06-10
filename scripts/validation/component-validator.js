#!/usr/bin/env node

/**
 * Smolitux UI Component Validator
 * 
 * This script validates components against quality standards, including:
 * - TypeScript compliance
 * - Accessibility compliance
 * - Test coverage
 * - Documentation
 * 
 * Usage:
 * node scripts/validation/component-validator.js --package core --component Button
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { execSync } = require('child_process');

// Parse command line arguments
program
  .option('--package <name>', 'Package name (e.g., core)')
  .option('--component <name>', 'Component name (e.g., Button)')
  .option('--verbose', 'Show detailed output')
  .parse(process.argv);

const options = program.opts();

// Validate required options
if (!options.package) {
  console.error('Error: Package name is required');
  process.exit(1);
}

if (!options.component) {
  console.error('Error: Component name is required');
  process.exit(1);
}

// Set up paths
const componentName = options.component;
const packageName = options.package;
const componentDir = path.join(process.cwd(), 'packages', '@smolitux', packageName, 'src', 'components', componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const testFile = path.join(componentDir, `${componentName}.test.tsx`);
const storyFile = path.join(componentDir, `${componentName}.stories.tsx`);

// Check if component exists
if (!fs.existsSync(componentDir)) {
  console.error(`Error: Component directory does not exist: ${componentDir}`);
  process.exit(1);
}

// Initialize validation results
const results = {
  component: {
    exists: fs.existsSync(componentFile),
    forwardRef: false,
    typescript: {
      anyTypes: 0,
      interfaces: 0,
      props: 0,
    },
    accessibility: {
      ariaAttributes: 0,
      testId: false,
    },
  },
  test: {
    exists: fs.existsSync(testFile),
    renderTest: false,
    propTests: 0,
    eventTests: 0,
    a11yTest: false,
    refTest: false,
  },
  story: {
    exists: fs.existsSync(storyFile),
    title: false,
    args: 0,
    variants: 0,
    docs: false,
  },
};

// Validate component file
if (results.component.exists) {
  const componentContent = fs.readFileSync(componentFile, 'utf8');
  
  // Check for forwardRef
  results.component.forwardRef = componentContent.includes('forwardRef');
  
  // Check for TypeScript issues
  results.component.typescript.anyTypes = (componentContent.match(/: any/g) || []).length;
  results.component.typescript.interfaces = (componentContent.match(/interface/g) || []).length;
  results.component.typescript.props = (componentContent.match(/Props/g) || []).length;
  
  // Check for accessibility
  results.component.accessibility.ariaAttributes = (componentContent.match(/aria-/g) || []).length;
  results.component.accessibility.testId = componentContent.includes('data-testid');
}

// Validate test file
if (results.test.exists) {
  const testContent = fs.readFileSync(testFile, 'utf8');
  
  // Check for render test
  results.test.renderTest = testContent.includes('renders without crashing') || 
                            testContent.includes('renders correctly');
  
  // Check for prop tests
  results.test.propTests = (testContent.match(/className|variant|size|disabled/g) || []).length;
  
  // Check for event tests
  results.test.eventTests = (testContent.match(/click|focus|blur|change/g) || []).length;
  
  // Check for a11y test
  results.test.a11yTest = testContent.includes('axe') && 
                          testContent.includes('toHaveNoViolations');
  
  // Check for ref test
  results.test.refTest = testContent.includes('createRef') || 
                         testContent.includes('useRef');
}

// Validate story file
if (results.story.exists) {
  const storyContent = fs.readFileSync(storyFile, 'utf8');
  
  // Check for title
  results.story.title = storyContent.includes('title:');
  
  // Check for args
  results.story.args = (storyContent.match(/args:/g) || []).length;
  
  // Check for variants
  results.story.variants = (storyContent.match(/export const/g) || []).length;
  
  // Check for docs
  results.story.docs = storyContent.includes('description:') || 
                       storyContent.includes('docs:');
}

// Calculate scores
const componentScore = (
  (results.component.exists ? 1 : 0) +
  (results.component.forwardRef ? 1 : 0) +
  (results.component.typescript.anyTypes === 0 ? 1 : 0) +
  (results.component.typescript.interfaces > 0 ? 1 : 0) +
  (results.component.accessibility.ariaAttributes > 0 ? 1 : 0) +
  (results.component.accessibility.testId ? 1 : 0)
) / 6 * 100;

const testScore = !results.test.exists ? 0 : (
  (results.test.renderTest ? 1 : 0) +
  (results.test.propTests > 0 ? 1 : 0) +
  (results.test.eventTests > 0 ? 1 : 0) +
  (results.test.a11yTest ? 1 : 0) +
  (results.test.refTest ? 1 : 0)
) / 5 * 100;

const storyScore = !results.story.exists ? 0 : (
  (results.story.title ? 1 : 0) +
  (results.story.args > 0 ? 1 : 0) +
  (results.story.variants > 1 ? 1 : 0) +
  (results.story.docs ? 1 : 0)
) / 4 * 100;

const totalScore = (componentScore + testScore + storyScore) / 3;

// Determine status
let status = '❌ Incomplete';
if (totalScore >= 90) {
  status = '✅ Excellent';
} else if (totalScore >= 75) {
  status = '🟢 Good';
} else if (totalScore >= 50) {
  status = '🟡 Needs Improvement';
} else if (totalScore >= 25) {
  status = '🟠 Poor';
}

// Print results
console.log(`\n🔍 COMPONENT VALIDATION REPORT: ${componentName} (@smolitux/${packageName})\n`);

console.log(`📊 OVERALL SCORE: ${totalScore.toFixed(1)}% - ${status}\n`);

console.log(`📋 COMPONENT SCORE: ${componentScore.toFixed(1)}%`);
console.log(`  - Component File: ${results.component.exists ? '✅' : '❌'}`);
console.log(`  - ForwardRef: ${results.component.forwardRef ? '✅' : '❌'}`);
console.log(`  - TypeScript: ${results.component.typescript.anyTypes === 0 ? '✅' : '❌'} (${results.component.typescript.anyTypes} any types)`);
console.log(`  - Interfaces: ${results.component.typescript.interfaces > 0 ? '✅' : '❌'} (${results.component.typescript.interfaces} interfaces)`);
console.log(`  - ARIA Attributes: ${results.component.accessibility.ariaAttributes > 0 ? '✅' : '❌'} (${results.component.accessibility.ariaAttributes} attributes)`);
console.log(`  - Test ID: ${results.component.accessibility.testId ? '✅' : '❌'}`);

console.log(`\n📋 TEST SCORE: ${testScore.toFixed(1)}%`);
console.log(`  - Test File: ${results.test.exists ? '✅' : '❌'}`);
if (results.test.exists) {
  console.log(`  - Render Test: ${results.test.renderTest ? '✅' : '❌'}`);
  console.log(`  - Prop Tests: ${results.test.propTests > 0 ? '✅' : '❌'} (${results.test.propTests} tests)`);
  console.log(`  - Event Tests: ${results.test.eventTests > 0 ? '✅' : '❌'} (${results.test.eventTests} tests)`);
  console.log(`  - A11y Test: ${results.test.a11yTest ? '✅' : '❌'}`);
  console.log(`  - Ref Test: ${results.test.refTest ? '✅' : '❌'}`);
}

console.log(`\n📋 STORY SCORE: ${storyScore.toFixed(1)}%`);
console.log(`  - Story File: ${results.story.exists ? '✅' : '❌'}`);
if (results.story.exists) {
  console.log(`  - Title: ${results.story.title ? '✅' : '❌'}`);
  console.log(`  - Args: ${results.story.args > 0 ? '✅' : '❌'} (${results.story.args} args)`);
  console.log(`  - Variants: ${results.story.variants > 1 ? '✅' : '❌'} (${results.story.variants} variants)`);
  console.log(`  - Documentation: ${results.story.docs ? '✅' : '❌'}`);
}

// Run additional checks if verbose
if (options.verbose) {
  console.log('\n🔍 ADDITIONAL CHECKS:');
  
  try {
    // Run lint check
    console.log('\n📋 LINT CHECK:');
    const lintResult = execSync(`npm run lint --workspace=@smolitux/${packageName} -- --quiet ${componentFile}`, { stdio: 'pipe' }).toString();
    console.log(`  - Lint: ${lintResult.includes('error') ? '❌' : '✅'}`);
    if (lintResult.includes('error')) {
      console.log(lintResult);
    }
  } catch (error) {
    console.log(`  - Lint: ❌ (Error running lint)`);
    if (error.stdout) {
      console.log(error.stdout.toString());
    }
  }
  
  try {
    // Run test
    console.log('\n📋 TEST CHECK:');
    const testResult = execSync(`npm test --workspace=@smolitux/${packageName} -- --testPathPattern="${componentName}" --passWithNoTests`, { stdio: 'pipe' }).toString();
    console.log(`  - Test: ${testResult.includes('FAIL') ? '❌' : '✅'}`);
    if (testResult.includes('FAIL')) {
      console.log(testResult);
    }
  } catch (error) {
    console.log(`  - Test: ❌ (Error running test)`);
    if (error.stdout) {
      console.log(error.stdout.toString());
    }
  }
}

// Provide recommendations
console.log('\n🚀 RECOMMENDATIONS:');

if (!results.component.exists) {
  console.log('  - Create component file');
} else {
  if (!results.component.forwardRef) {
    console.log('  - Use forwardRef pattern');
  }
  if (results.component.typescript.anyTypes > 0) {
    console.log('  - Replace any types with proper types');
  }
  if (results.component.typescript.interfaces === 0) {
    console.log('  - Add proper TypeScript interfaces');
  }
  if (results.component.accessibility.ariaAttributes === 0) {
    console.log('  - Add ARIA attributes for accessibility');
  }
  if (!results.component.accessibility.testId) {
    console.log('  - Add data-testid attribute');
  }
}

if (!results.test.exists) {
  console.log('  - Create test file');
} else {
  if (!results.test.renderTest) {
    console.log('  - Add render test');
  }
  if (results.test.propTests === 0) {
    console.log('  - Add prop tests');
  }
  if (results.test.eventTests === 0) {
    console.log('  - Add event tests');
  }
  if (!results.test.a11yTest) {
    console.log('  - Add accessibility test with jest-axe');
  }
  if (!results.test.refTest) {
    console.log('  - Add ref forwarding test');
  }
}

if (!results.story.exists) {
  console.log('  - Create story file');
} else {
  if (!results.story.title) {
    console.log('  - Add title to story');
  }
  if (results.story.args === 0) {
    console.log('  - Add args to story');
  }
  if (results.story.variants <= 1) {
    console.log('  - Add more variants to story');
  }
  if (!results.story.docs) {
    console.log('  - Add documentation to story');
  }
}

// Update progress
const progressFile = path.join(process.cwd(), 'COMPONENT_STATUS.md');
const progressEntry = `${status} ${componentName} (@smolitux/${packageName}): ${totalScore.toFixed(1)}% (${new Date().toISOString()})\n`;

if (fs.existsSync(progressFile)) {
  fs.appendFileSync(progressFile, progressEntry);
} else {
  fs.writeFileSync(progressFile, `# Component Status\n\n${progressEntry}`);
}

console.log(`\n📝 Updated progress in COMPONENT_STATUS.md`);

// Exit with appropriate code
if (totalScore < 50) {
  process.exit(1);
} else {
  process.exit(0);
}