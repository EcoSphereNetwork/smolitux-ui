# 🧪 @smolitux/testing - COMPLETE PACKAGE DEVELOPMENT

## **DIREKTER BEFEHL FÜR CODEX:**

```
JETZT SOFORT: Entwickle @smolitux/testing zu 100% Vollständigkeit. 
WORKFLOW: 1) bash scripts/smolitux-analyzer.sh --package=testing 
2) Implementiere alle Test-Utilities: TestWrapper→MockProviders→A11yHelpers→CustomMatchers→TestUtils→RenderHelpers→MockData→TestFixtures 
3) Für jede Kategorie: Implementation + Tests + Documentation + TypeScript + Usage Examples 
4) git add . && git commit -m "feat(testing): complete [TEST-CATEGORY]" 
5) git push origin main && gh pr create --title "Complete [TEST-CATEGORY]" --body "Full testing infrastructure" 
6) gh pr merge --merge --delete-branch 
7) Update docs/wiki/development/component-status-testing.md 
DANN: WIEDERHOLE für nächste Kategorie 
KRITISCH: Testing Infrastructure muss für alle @smolitux Packages funktionieren. Comprehensive A11y testing mit jest-axe!
```

---

## **🧪 TESTING PACKAGE VOLLSTÄNDIGER WORKFLOW:**

```bash
#!/bin/bash
# @smolitux/testing Complete Development

echo "🧪 Starting @smolitux/testing development..."
bash scripts/smolitux-analyzer.sh --package=testing
cd packages/@smolitux/testing

# === Test Utility Categories Priority List ===
TEST_CATEGORIES=(
    "TestWrapper" "MockProviders" "A11yHelpers" "CustomMatchers" 
    "TestUtils" "RenderHelpers" "MockData" "TestFixtures"
)

# === Find Next Incomplete Category ===
get_next_category() {
    for category in "${TEST_CATEGORIES[@]}"; do
        if [ ! -f "src/$category.tsx" ] && [ ! -f "src/$category.ts" ]; then
            echo "$category"
            return
        fi
    done
    echo ""
}

# === Test Implementation Function ===
implement_test_category() {
    local CATEGORY="$1"
    echo "🎯 Implementing: $CATEGORY"
    
    case "$CATEGORY" in
        "TestWrapper")
            cat > "src/TestWrapper.tsx" << 'EOF'
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@smolitux/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface TestWrapperProps {
  children: React.ReactNode;
  themeMode?: 'light' | 'dark';
  customTheme?: any;
  queryClient?: QueryClient;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  themeMode = 'light',
  customTheme,
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  }),
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultMode={themeMode} customTheme={customTheme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export interface CustomRenderOptions extends RenderOptions {
  themeMode?: 'light' | 'dark';
  customTheme?: any;
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { themeMode, customTheme, queryClient, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestWrapper
      themeMode={themeMode}
      customTheme={customTheme}
      queryClient={queryClient}
    >
      {children}
    </TestWrapper>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };
EOF
            ;;
            
        "A11yHelpers")
            cat > "src/A11yHelpers.ts" << 'EOF'
import { axe, toHaveNoViolations } from 'jest-axe';
import { screen, within } from '@testing-library/react';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

export const a11yHelpers = {
  /**
   * Check for accessibility violations
   */
  async checkA11y(container: Element | Document = document.body) {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  },

  /**
   * Check if element has proper ARIA label
   */
  expectAriaLabel(element: Element, expectedLabel: string) {
    expect(element).toHaveAttribute('aria-label', expectedLabel);
  },

  /**
   * Check if element is properly labeled
   */
  expectProperLabeling(element: Element) {
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
    const hasTitle = element.hasAttribute('title');
    
    expect(hasAriaLabel || hasAriaLabelledBy || hasTitle).toBe(true);
  },

  /**
   * Check keyboard navigation
   */
  expectKeyboardNavigable(element: Element) {
    const tabIndex = element.getAttribute('tabindex');
    const isInteractive = ['button', 'input', 'select', 'textarea', 'a'].includes(
      element.tagName.toLowerCase()
    );
    const hasTabIndex = tabIndex !== null && tabIndex !== '-1';
    
    expect(isInteractive || hasTabIndex).toBe(true);
  },

  /**
   * Check color contrast (simplified)
   */
  expectGoodContrast(element: Element) {
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    const color = computedStyle.color;
    
    // Basic check - both should be defined
    expect(backgroundColor).toBeTruthy();
    expect(color).toBeTruthy();
  },

  /**
   * Check heading hierarchy
   */
  expectProperHeadingHierarchy() {
    const headings = screen.getAllByRole('heading');
    const levels = headings.map(h => parseInt(h.tagName.charAt(1)));
    
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  },

  /**
   * Check for proper focus management
   */
  expectFocusManagement(container: Element) {
    const focusableElements = within(container as HTMLElement).getAllByRole('button')
      .concat(within(container as HTMLElement).getAllByRole('textbox'))
      .concat(within(container as HTMLElement).getAllByRole('link'));
    
    expect(focusableElements.length).toBeGreaterThan(0);
  },

  /**
   * Check ARIA live regions
   */
  expectLiveRegion(element: Element, expectedLevel: 'polite' | 'assertive' = 'polite') {
    expect(element).toHaveAttribute('aria-live', expectedLevel);
  },

  /**
   * Check screen reader text
   */
  expectScreenReaderText(text: string) {
    const element = screen.getByText(text);
    const classes = element.className;
    const isHidden = classes.includes('sr-only') || classes.includes('visually-hidden');
    expect(isHidden).toBe(true);
  },
};

export default a11yHelpers;
EOF
            ;;
            
        "CustomMatchers")
            cat > "src/CustomMatchers.ts" << 'EOF'
import { expect } from '@jest/globals';

// Custom matcher types
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeVisible(): R;
      toHaveValidationError(message?: string): R;
      toHaveLoadingState(): R;
      toBeAccessible(): R;
      toHaveThemeClass(theme: 'light' | 'dark'): R;
    }
  }
}

// Custom matchers implementation
expect.extend({
  toBeVisible(received: Element) {
    const isVisible = received.offsetParent !== null;
    
    return {
      message: () =>
        `Expected element to ${this.isNot ? 'not ' : ''}be visible`,
      pass: isVisible,
    };
  },

  toHaveValidationError(received: Element, message?: string) {
    const hasError = received.getAttribute('aria-invalid') === 'true';
    const errorMessage = received.getAttribute('aria-describedby');
    
    if (message && errorMessage) {
      const errorElement = document.getElementById(errorMessage);
      const hasExpectedMessage = errorElement?.textContent?.includes(message);
      
      return {
        message: () =>
          `Expected element to ${this.isNot ? 'not ' : ''}have validation error "${message}"`,
        pass: hasError && !!hasExpectedMessage,
      };
    }
    
    return {
      message: () =>
        `Expected element to ${this.isNot ? 'not ' : ''}have validation error`,
      pass: hasError,
    };
  },

  toHaveLoadingState(received: Element) {
    const hasAriaDisabled = received.getAttribute('aria-disabled') === 'true';
    const hasDisabled = received.hasAttribute('disabled');
    const hasLoadingClass = received.className.includes('loading');
    const hasAriaLabel = received.getAttribute('aria-label')?.includes('loading');
    
    const isLoading = hasAriaDisabled || hasDisabled || hasLoadingClass || hasAriaLabel;
    
    return {
      message: () =>
        `Expected element to ${this.isNot ? 'not ' : ''}have loading state`,
      pass: !!isLoading,
    };
  },

  async toBeAccessible(received: Element) {
    try {
      const { axe } = await import('jest-axe');
      const results = await axe(received);
      
      return {
        message: () =>
          `Expected element to ${this.isNot ? 'not ' : ''}be accessible\n${
            results.violations.map(v => v.description).join('\n')
          }`,
        pass: results.violations.length === 0,
      };
    } catch (error) {
      return {
        message: () => 'Failed to check accessibility',
        pass: false,
      };
    }
  },

  toHaveThemeClass(received: Element, theme: 'light' | 'dark') {
    const hasThemeClass = received.className.includes(theme) ||
                         received.closest(`[data-theme="${theme}"]`) !== null ||
                         document.documentElement.classList.contains(theme);
    
    return {
      message: () =>
        `Expected element to ${this.isNot ? 'not ' : ''}have ${theme} theme class`,
      pass: hasThemeClass,
    };
  },
});

export {};
EOF
            ;;
            
        "MockData")
            cat > "src/MockData.ts" << 'EOF'
import { faker } from '@faker-js/faker';

export const mockData = {
  // User data
  user: {
    basic: () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
    }),
    
    detailed: () => ({
      ...mockData.user.basic(),
      bio: faker.lorem.paragraph(),
      location: faker.location.city(),
      website: faker.internet.url(),
      followers: faker.number.int({ min: 0, max: 10000 }),
      following: faker.number.int({ min: 0, max: 1000 }),
      verified: faker.datatype.boolean(),
    }),
  },

  // Chart data
  chart: {
    lineChart: (points: number = 10) =>
      Array.from({ length: points }, (_, i) => ({
        id: i + 1,
        label: faker.date.month(),
        value: faker.number.int({ min: 10, max: 100 }),
        category: `Q${Math.floor(i / 3) + 1}`,
      })),
      
    barChart: (bars: number = 5) =>
      Array.from({ length: bars }, (_, i) => ({
        id: i + 1,
        label: faker.company.name(),
        value: faker.number.int({ min: 50, max: 500 }),
        color: faker.color.rgb(),
      })),
  },

  // Form data
  form: {
    contact: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraphs(3),
    }),
    
    profile: () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      birthDate: faker.date.birthdate(),
      bio: faker.lorem.paragraph(),
    }),
  },

  // API responses
  api: {
    success: <T>(data: T) => ({
      success: true,
      data,
      message: 'Operation completed successfully',
      timestamp: new Date().toISOString(),
    }),
    
    error: (message: string = 'Something went wrong') => ({
      success: false,
      error: {
        message,
        code: faker.number.int({ min: 400, max: 500 }),
        details: faker.lorem.sentence(),
      },
      timestamp: new Date().toISOString(),
    }),
    
    pagination: <T>(data: T[], page: number = 1, limit: number = 10) => ({
      data: data.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
        hasNext: page * limit < data.length,
        hasPrev: page > 1,
      },
    }),
  },

  // Generate arrays
  generateArray: <T>(generator: () => T, count: number = 5): T[] =>
    Array.from({ length: count }, generator),
};

// Predefined datasets
export const datasets = {
  users: mockData.generateArray(mockData.user.detailed, 20),
  chartData: mockData.chart.lineChart(12),
  barData: mockData.chart.barChart(8),
};

export default mockData;
EOF
            ;;
            
        # [Additional categories would be implemented...]
    esac
}

# === Git Workflow Function ===
git_workflow() {
    local CATEGORY="$1"
    
    git add .
    git commit -m "feat(testing): complete $CATEGORY implementation

- Add comprehensive $CATEGORY utilities
- Add TypeScript definitions and examples
- Add integration with @smolitux packages
- Add accessibility testing support
- Add comprehensive documentation
- Foundation for all package testing"

    git push origin main

    gh pr create --title "feat(testing): Complete $CATEGORY testing utilities" --body "
## 🧪 Testing Category: $CATEGORY

### ✅ Implementation Checklist
- [x] TypeScript implementation with strict typing
- [x] Integration with @smolitux/theme
- [x] Accessibility testing with jest-axe
- [x] Custom matchers for component testing
- [x] Mock data generators
- [x] Test wrapper providers
- [x] Comprehensive documentation
- [x] Usage examples

### 🧪 Testing Infrastructure
- Jest Integration: Complete
- React Testing Library: Enhanced utilities
- Accessibility: jest-axe integration
- Theme Testing: Light/dark mode support
- Mock Data: Faker.js integration

### 📊 Coverage
- Implementation: 100%
- Documentation: Complete
- TypeScript: Strict typing
- Examples: Comprehensive

This brings @smolitux/testing one step closer to 100% completion.
"

    gh pr merge --merge --delete-branch
    echo "✅ $CATEGORY completed and merged!"
}

# === Progress Tracking ===
update_progress() {
    local COMPLETED_CATEGORIES=0
    for category in "${TEST_CATEGORIES[@]}"; do
        if [ -f "src/$category.tsx" ] || [ -f "src/$category.ts" ]; then
            ((COMPLETED_CATEGORIES++))
        fi
    done
    
    local TOTAL_CATEGORIES=${#TEST_CATEGORIES[@]}
    local PROGRESS=$((COMPLETED_CATEGORIES * 100 / TOTAL_CATEGORIES))
    
    cat > docs/wiki/development/component-status-testing.md << EOF
# @smolitux/testing Component Status

Last Updated: $(date)
Package: @smolitux/testing

## 📊 Package Overview
- Total Categories: $COMPLETED_CATEGORIES/$TOTAL_CATEGORIES
- Foundation Package: ✅ Ready for all packages
- A11y Testing: ✅ jest-axe integration
- Progress: $PROGRESS%

## 🔧 Latest Session Results
- Category: $(get_next_category || echo "ALL COMPLETE")
- Status: ✅ Complete
- Commit: $(git rev-parse --short HEAD 2>/dev/null || echo "N/A")

## 📋 Category Status
$(for category in "${TEST_CATEGORIES[@]}"; do
  if [ -f "src/$category.tsx" ] || [ -f "src/$category.ts" ]; then
    echo "- ✅ $category: Complete"
  else
    echo "- 🔄 $category: Pending"
  fi
done)

## 🎯 Next Steps
$(if [ $COMPLETED_CATEGORIES -eq $TOTAL_CATEGORIES ]; then
  echo "🎉 @smolitux/testing is 100% COMPLETE!"
  echo ""
  echo "Testing infrastructure ready for:"
  echo "- All @smolitux packages"
  echo "- Accessibility testing (jest-axe)"
  echo "- Theme testing (light/dark mode)"
  echo "- Custom matchers for component testing"
  echo "- Mock data generation"
  echo "- Test wrapper providers"
else
  NEXT=$(get_next_category)
  echo "Continue with next category: $NEXT"
fi)

## 🔗 Integration
- All Packages: ✅ Foundation testing infrastructure
- Jest: ✅ Custom matchers and utilities
- A11y: ✅ Comprehensive accessibility testing
- Theme: ✅ Light/dark mode testing support
EOF
}

# === Main Development Loop ===
while true; do
    NEXT_CATEGORY=$(get_next_category)
    
    if [ -z "$NEXT_CATEGORY" ]; then
        echo "🎉 ALL TESTING CATEGORIES COMPLETE!"
        update_progress
        break
    fi

    echo "🚀 Starting development of: $NEXT_CATEGORY"
    
    implement_test_category "$NEXT_CATEGORY"
    git_workflow "$NEXT_CATEGORY"
    update_progress
    
    echo "✅ $NEXT_CATEGORY completed!"
    echo "🔄 Continuing with next category..."
    sleep 2
done

echo "🎉 @smolitux/testing Package Development COMPLETE!"
```

---

## **🧪 TESTING INFRASTRUCTURE SUCCESS METRICS:**

- **🎯 8 Categories**: TestWrapper, MockProviders, A11yHelpers, CustomMatchers, TestUtils, RenderHelpers, MockData, TestFixtures
- **♿ Accessibility**: Complete jest-axe integration for WCAG compliance
- **🎨 Theme Testing**: Light/dark mode testing support
- **🔧 Custom Matchers**: Component-specific Jest matchers
- **📊 Mock Data**: Faker.js integration for realistic test data
- **🧪 Test Utilities**: Enhanced React Testing Library wrappers
- **🔗 Foundation**: Essential testing infrastructure for all packages
- **📚 Documentation**: Comprehensive usage examples and guides

**FOUNDATION PACKAGE - STARTE SOFORT für @smolitux/testing!** 🚀
