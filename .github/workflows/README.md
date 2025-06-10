# Smolitux UI GitHub Actions Workflows

This directory contains a collection of GitHub Actions workflows for the Smolitux UI component library.

## Available Workflows

### 1. Quality (`quality.yml`)
Comprehensive code quality checks:
- Linting (ESLint, Prettier)
- Type checking (TypeScript)
- Code style enforcement
- Complexity analysis
- Accessibility checks

Usage:
```yaml
jobs:
  quality:
    uses: ./.github/workflows/quality.yml
    with:
      node-version: '18'
      typescript-strict: true
      eslint-config: '.eslintrc.js'
      prettier-config: '.prettierrc'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Testing (`testing.yml`)
Comprehensive testing suite:
- Unit tests
- Integration tests
- Visual regression tests
- Browser compatibility tests
- Accessibility tests
- Coverage reporting

Usage:
```yaml
jobs:
  testing:
    uses: ./.github/workflows/testing.yml
    with:
      node-version: '18'
      coverage-threshold: 80
      browsers: '["chrome", "firefox", "safari"]'
      test-command: 'npm test'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3. Documentation (`documentation.yml`)
Documentation generation and deployment:
- Storybook build
- API documentation generation
- Markdown documentation
- Deployment to GitHub Pages

Usage:
```yaml
jobs:
  documentation:
    uses: ./.github/workflows/documentation.yml
    with:
      node-version: '18'
      storybook-build-command: 'npm run build-storybook'
      docs-directory: 'docs'
      deploy-branch: 'gh-pages'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 4. CI (`ci.yml`)
Continuous integration workflow:
- Build validation
- Dependency checks
- Security scanning
- Performance benchmarking

Usage:
```yaml
jobs:
  ci:
    uses: ./.github/workflows/ci.yml
    with:
      node-version: '18'
      build-command: 'npm run build'
      security-scan: true
      performance-benchmark: true
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 5. Release (`release.yml`)
Release automation:
- Version bumping
- Changelog generation
- Package publishing
- GitHub release creation

Usage:
```yaml
jobs:
  release:
    uses: ./.github/workflows/release.yml
    with:
      node-version: '18'
      release-type: 'minor'
      publish-command: 'npm publish'
      changelog-command: 'npm run generate-changelog'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Required Secrets

Configure these secrets based on the workflows you use:

1. `GITHUB_TOKEN`: Automatically provided by GitHub
2. `NPM_TOKEN`: For publishing packages to npm

## Best Practices

1. **Workflow Selection**
   - Choose only the workflows you need
   - Customize inputs based on your requirements
   - Keep workflows modular and focused

2. **Security**
   - Store sensitive data in secrets
   - Use environment protection rules
   - Enable required status checks
   - Implement branch protection

3. **Maintenance**
   - Regularly update workflow versions
   - Monitor workflow execution times
   - Review and adjust thresholds
   - Keep dependencies updated

4. **Testing**
   - Test workflows in a fork first
   - Use matrix testing when possible
   - Set appropriate timeouts
   - Enable detailed logging when needed

## Troubleshooting

1. **Permission Issues**
   - Check workflow permissions in repository settings
   - Verify secret availability
   - Review token scopes

2. **Fork Considerations**
   - Use `pull_request_target` for fork access to secrets
   - Enable fork workflow settings
   - Configure appropriate permissions

3. **Performance**
   - Use build caching
   - Implement matrix job strategies
   - Optimize job dependencies
   - Monitor execution times