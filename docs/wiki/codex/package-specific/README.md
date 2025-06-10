# Smolitux UI - Package-Specific Guidelines

This directory contains package-specific guidelines for the Smolitux UI component library.

## 📋 Package List

- [Core](./core.md) - Foundation components
- [Theme](./theme.md) - Design system & theming
- [Utils](./utils.md) - Utility functions
- [Testing](./testing.md) - Test utilities
- [Layout](./layout.md) - Layout components
- [Charts](./charts.md) - Data visualization
- [Media](./media.md) - Media components
- [Community](./community.md) - Social features
- [AI](./ai.md) - AI components
- [Blockchain](./blockchain.md) - Blockchain components
- [Resonance](./resonance.md) - Platform features
- [Federation](./federation.md) - Cross-platform integration
- [Voice Control](./voice-control.md) - Voice interfaces

## 📊 Package Priority Matrix

| Priority | Package | Complexity | Dependencies | Focus |
|----------|---------|------------|--------------|-------|
| **P0** | `core` | High | None | Foundation components |
| **P0** | `theme` | Medium | None | Design system |
| **P1** | `utils` | Low | None | Utility functions |
| **P1** | `testing` | Medium | Core | Test utilities |
| **P1** | `layout` | Medium | Core, Theme | Layout components |
| **P2** | `charts` | High | Core, Utils | Data visualization |
| **P2** | `media` | High | Core, Utils | Media components |
| **P3** | `community` | Medium | Core, Media | Social features |
| **P3** | `ai` | High | Core, Utils | AI components |
| **P3** | `blockchain` | High | Core, Utils | Blockchain components |
| **P4** | `resonance` | High | All above | Platform features |
| **P4** | `federation` | High | Core, Community | Cross-platform integration |
| **P4** | `voice-control` | High | Core, AI | Voice interfaces |

## 🔧 Package Development Workflow

For each package, follow this workflow:

1. **Analysis Phase**
   ```bash
   PACKAGE="core"  # Replace with target package

   # Quick package inspection
   ls packages/@smolitux/$PACKAGE/src/components/
   ```

2. **Component Inventory**
   ```bash
   # List all components
   find packages/@smolitux/$PACKAGE/src/components -type d -mindepth 1 -maxdepth 1

   # Check component status
   grep -r "$PACKAGE" COMPONENT_STATUS.md
   ```

3. **Dependency Analysis**
   ```bash
   # Check package dependencies
   cat packages/@smolitux/$PACKAGE/package.json | grep dependencies -A 10
   ```

4. **Implementation Phase**
   ```bash
   # Complete missing components
   bash scripts/workflows/complete-components.sh --package $PACKAGE
   ```

5. **Testing Phase**
   ```bash
   # Run tests
   npm test --workspace=@smolitux/$PACKAGE
   ```

6. **Documentation Phase**
   ```bash
   # Build Storybook
   npm run build-storybook
   ```

7. **Validation Phase**
   ```bash
   # Validate package
   bash scripts/workflows/validate-quality.sh --package $PACKAGE
   ```

## 🚨 Package-Specific Considerations

### Core Package
- Foundation components used by all other packages
- Must be fully accessible and well-tested
- Should have minimal dependencies

### Theme Package
- Design system and theming utilities
- Should be framework-agnostic where possible
- Must support dark mode and custom themes

### Utils Package
- Utility functions used by all other packages
- Should be pure functions with no side effects
- Must be well-documented and well-tested

### Testing Package
- Test utilities used by all other packages
- Should provide mocks for common components
- Must be compatible with Jest and React Testing Library

### Layout Package
- Layout components used by all other packages
- Should be responsive and accessible
- Must support RTL languages

### Charts Package
- Data visualization components
- Should be accessible and responsive
- Must support theming and custom styling

### Media Package
- Media components for audio, video, and images
- Should be accessible and responsive
- Must support various media formats

### Community Package
- Social features for community engagement
- Should be accessible and responsive
- Must support internationalization

### AI Package
- AI-powered components
- Should handle loading and error states gracefully
- Must be accessible and responsive

### Blockchain Package
- Blockchain components for crypto/DeFi
- Should handle loading and error states gracefully
- Must be accessible and responsive

### Resonance Package
- Platform-specific features
- Should integrate with all other packages
- Must be accessible and responsive

### Federation Package
- Cross-platform integration features
- Should handle loading and error states gracefully
- Must be accessible and responsive

### Voice Control Package
- Voice interface components
- Should handle loading and error states gracefully
- Must be accessible and responsive

For detailed guidelines on each package, refer to the corresponding package-specific documentation.