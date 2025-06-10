#!/usr/bin/env node

/**
 * Smolitux UI Progress Tracker
 * 
 * This script tracks development progress and updates status files.
 * 
 * Usage:
 * node scripts/utils/progress-tracker.js --package core --component Button --status complete
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { execSync } = require('child_process');

// Parse command line arguments
program
  .option('--package <name>', 'Package name (e.g., core)')
  .option('--component <name>', 'Component name (e.g., Button)')
  .option('--status <status>', 'Component status (complete, in-progress, needs-work)', 'complete')
  .option('--note <note>', 'Additional note')
  .option('--update-all', 'Update all status files')
  .parse(process.argv);

const options = program.opts();

// Validate required options
if (!options.package && !options.update-all) {
  console.error('Error: Package name is required');
  process.exit(1);
}

if (!options.component && !options.update-all) {
  console.error('Error: Component name is required');
  process.exit(1);
}

// Set up paths
const rootDir = process.cwd();
const componentStatusFile = path.join(rootDir, 'COMPONENT_STATUS.md');
const packageStatusFile = path.join(rootDir, 'docs', 'wiki', 'development', `component-status-${options.package}.md`);

// Get current date
const currentDate = new Date().toISOString().split('T')[0];

// Update component status
function updateComponentStatus() {
  const componentName = options.component;
  const packageName = options.package;
  const status = options.status;
  const note = options.note || '';

  // Determine status emoji
  let statusEmoji = '✅';
  if (status === 'in-progress') {
    statusEmoji = '🔄';
  } else if (status === 'needs-work') {
    statusEmoji = '⚠️';
  }

  // Create status entry
  const statusEntry = `${statusEmoji} ${componentName} (@smolitux/${packageName}): ${status} (${currentDate})${note ? ` - ${note}` : ''}\n`;

  // Update main status file
  if (fs.existsSync(componentStatusFile)) {
    // Check if component already exists in status file
    const statusContent = fs.readFileSync(componentStatusFile, 'utf8');
    const componentRegex = new RegExp(`[^\\n]*${componentName} \\(@smolitux/${packageName}\\)[^\\n]*\\n`, 'g');
    
    if (statusContent.match(componentRegex)) {
      // Update existing entry
      const updatedContent = statusContent.replace(componentRegex, statusEntry);
      fs.writeFileSync(componentStatusFile, updatedContent);
    } else {
      // Add new entry
      fs.appendFileSync(componentStatusFile, statusEntry);
    }
  } else {
    // Create new status file
    fs.writeFileSync(componentStatusFile, `# Component Status\n\n${statusEntry}`);
  }

  // Update package-specific status file
  const packageDir = path.join(rootDir, 'docs', 'wiki', 'development');
  if (!fs.existsSync(packageDir)) {
    fs.mkdirSync(packageDir, { recursive: true });
  }

  if (fs.existsSync(packageStatusFile)) {
    // Check if component already exists in status file
    const packageStatusContent = fs.readFileSync(packageStatusFile, 'utf8');
    const componentRegex = new RegExp(`[^\\n]*${componentName}[^\\n]*\\n`, 'g');
    
    if (packageStatusContent.match(componentRegex)) {
      // Update existing entry
      const updatedContent = packageStatusContent.replace(componentRegex, statusEntry);
      fs.writeFileSync(packageStatusFile, updatedContent);
    } else {
      // Add new entry
      fs.appendFileSync(packageStatusFile, statusEntry);
    }
  } else {
    // Create new status file
    fs.writeFileSync(packageStatusFile, `# @smolitux/${packageName} Component Status\n\n${statusEntry}`);
  }

  console.log(`✅ Updated status for ${componentName} (@smolitux/${packageName}) to ${status}`);
}

// Update all status files
function updateAllStatusFiles() {
  console.log('🔄 Updating all status files...');

  // Get all packages
  const packagesDir = path.join(rootDir, 'packages', '@smolitux');
  const packages = fs.readdirSync(packagesDir).filter(pkg => 
    fs.statSync(path.join(packagesDir, pkg)).isDirectory()
  );

  // Initialize main status file
  fs.writeFileSync(componentStatusFile, `# Component Status\n\nLast updated: ${currentDate}\n\n`);

  // Process each package
  let totalComponents = 0;
  let completeComponents = 0;
  let inProgressComponents = 0;
  let needsWorkComponents = 0;

  packages.forEach(pkg => {
    const packageDir = path.join(packagesDir, pkg);
    const componentsDir = path.join(packageDir, 'src', 'components');
    
    // Skip if components directory doesn't exist
    if (!fs.existsSync(componentsDir)) {
      return;
    }

    // Initialize package status file
    const packageStatusFile = path.join(rootDir, 'docs', 'wiki', 'development', `component-status-${pkg}.md`);
    fs.writeFileSync(packageStatusFile, `# @smolitux/${pkg} Component Status\n\nLast updated: ${currentDate}\n\n`);

    // Get all components
    const components = fs.readdirSync(componentsDir).filter(comp => 
      fs.statSync(path.join(componentsDir, comp)).isDirectory()
    );

    // Process each component
    components.forEach(comp => {
      const componentDir = path.join(componentsDir, comp);
      const componentFile = path.join(componentDir, `${comp}.tsx`);
      const testFile = path.join(componentDir, `${comp}.test.tsx`);
      const storyFile = path.join(componentDir, `${comp}.stories.tsx`);

      // Determine component status
      let status = 'needs-work';
      let statusEmoji = '⚠️';

      if (fs.existsSync(componentFile) && fs.existsSync(testFile) && fs.existsSync(storyFile)) {
        status = 'complete';
        statusEmoji = '✅';
        completeComponents++;
      } else if (fs.existsSync(componentFile)) {
        status = 'in-progress';
        statusEmoji = '🔄';
        inProgressComponents++;
      } else {
        needsWorkComponents++;
      }

      totalComponents++;

      // Create status entry
      const statusEntry = `${statusEmoji} ${comp}: ${status} (${currentDate})\n`;

      // Update main status file
      fs.appendFileSync(componentStatusFile, `${statusEmoji} ${comp} (@smolitux/${pkg}): ${status} (${currentDate})\n`);

      // Update package status file
      fs.appendFileSync(packageStatusFile, statusEntry);
    });

    console.log(`✅ Updated status for @smolitux/${pkg} (${components.length} components)`);
  });

  // Add summary to main status file
  const summary = `\n## Summary\n\n` +
    `- Total Components: ${totalComponents}\n` +
    `- Complete: ${completeComponents} (${Math.round(completeComponents / totalComponents * 100)}%)\n` +
    `- In Progress: ${inProgressComponents} (${Math.round(inProgressComponents / totalComponents * 100)}%)\n` +
    `- Needs Work: ${needsWorkComponents} (${Math.round(needsWorkComponents / totalComponents * 100)}%)\n`;

  fs.appendFileSync(componentStatusFile, summary);

  console.log(`\n📊 Component Status Summary:`);
  console.log(`  - Total Components: ${totalComponents}`);
  console.log(`  - Complete: ${completeComponents} (${Math.round(completeComponents / totalComponents * 100)}%)`);
  console.log(`  - In Progress: ${inProgressComponents} (${Math.round(inProgressComponents / totalComponents * 100)}%)`);
  console.log(`  - Needs Work: ${needsWorkComponents} (${Math.round(needsWorkComponents / totalComponents * 100)}%)`);
}

// Main execution
if (options.update_all) {
  updateAllStatusFiles();
} else {
  updateComponentStatus();
}

console.log('✅ Progress tracking complete!');