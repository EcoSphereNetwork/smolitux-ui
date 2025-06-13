# Component Development Workflow Prompt

**Version: 1.0.0**

This prompt provides a structured workflow for developing components in the Smolitux UI library.

## Development Workflow

Follow this 5-8 minute workflow for each component:

### 1. Analysis Phase (30 seconds)

```bash
# Set component and package variables
COMPONENT="ComponentName"
PACKAGE="package-name"

# Analyze current state
echo "🔍 Analyzing $COMPONENT in @smolitux/$PACKAGE"
ls -la "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/"

# Check dependencies
grep -r "import.*$COMPONENT" packages/@smolitux/ || echo "No external dependencies"

# Identify missing files
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.test.tsx" ] && echo "❌ Missing test"
[ ! -f "packages/@smolitux/$PACKAGE/src/components/$COMPONENT/$COMPONENT.stories.tsx" ] && echo "❌ Missing story"
```

### 2. Implementation Phase (2-3 minutes)

1. Create or update the component file
2. Implement the component with proper TypeScript typing
3. Use forwardRef for proper ref handling
4. Include proper accessibility attributes
5. Add data-testid for testing

### 3. Testing Phase (2-3 minutes)

1. Create or update the test file
2. Test rendering and basic functionality
3. Test prop variations
4. Test interactions
5. Test accessibility
6. Test ref forwarding

### 4. Documentation Phase (1-2 minutes)

1. Create or update the story file
2. Document all props and variants
3. Create examples for common use cases
4. Include accessibility information
5. Add interactive examples

### 5. Validation Phase (30 seconds)

```bash
# Lint the component
npm run lint --workspace=@smolitux/$PACKAGE -- --fix

# Run tests for the component
npm test --workspace=@smolitux/$PACKAGE -- --testPathPattern="$COMPONENT"

# Update progress
echo "✅ $COMPONENT: Complete ($(date))" >> COMPONENT_STATUS.md
```

## Decision Tree

```
START
  ↓
Check if component exists
  ↓
  ├── YES → Check for missing files
  │           ↓
  │           ├── Missing test → Create test
  │           ├── Missing story → Create story
  │           └── All files exist → Enhance existing files
  │
  └── NO → Create component from scratch
              ↓
              Create component, test, and story files
```

## Component Creation Checklist

- [ ] Component file with proper TypeScript typing
- [ ] forwardRef implementation
- [ ] Proper accessibility attributes
- [ ] data-testid attribute
- [ ] Test file with comprehensive tests
- [ ] Story file with documentation and examples
- [ ] Lint and test validation

## Common Issues and Solutions

### TypeScript Errors

- **Issue**: Type errors in component props
- **Solution**: Define proper interfaces and use specific event types

### Test Failures

- **Issue**: Tests fail due to missing elements
- **Solution**: Ensure data-testid is added to the component

### Accessibility Issues

- **Issue**: Accessibility violations in tests
- **Solution**: Add proper ARIA attributes and ensure keyboard navigation

### Story Issues

- **Issue**: Stories don't render properly
- **Solution**: Check for missing dependencies and ensure props are correctly defined

## Best Practices

1. **Start Simple**: Begin with a minimal implementation and add features incrementally
2. **Test First**: Write tests before or alongside implementation
3. **Document As You Go**: Add documentation comments while implementing
4. **Validate Frequently**: Run tests and lint checks regularly
5. **Refactor When Needed**: Don't hesitate to refactor for better code quality

## Time Management

- **Analysis**: 30 seconds
- **Implementation**: 2-3 minutes
- **Testing**: 2-3 minutes
- **Documentation**: 1-2 minutes
- **Validation**: 30 seconds

This task-specific prompt should be combined with the system prompt, package-specific prompts, and templates to create a complete instruction set for developing components in the Smolitux UI library.