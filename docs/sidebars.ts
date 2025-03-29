import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: [
        'components/overview',
        'components/README',
        {
          type: 'category',
          label: 'Inputs',
          collapsed: true,
          items: [
            'components/inputs/button',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          collapsed: true,
          items: [
            'components/forms/checkbox',
            'components/forms/colorpicker',
            'components/forms/fileupload',
            'components/forms/form-control',
            'components/forms/radio',
            'components/forms/radiogroup',
            'components/forms/select',
            'components/forms/slider',
            'components/forms/switch',
            'components/forms/textarea',
            'components/forms/timepicker',
          ],
        },
        {
          type: 'category',
          label: 'Layout',
          collapsed: true,
          items: [
            'components/layout/card',
            'components/layout/container',
            'components/layout/grid',
          ],
        },
        {
          type: 'category',
          label: 'Data Display',
          collapsed: true,
          items: [
            'components/data-display/avatar',
            'components/data-display/badge',
            'components/data-display/list',
            'components/data-display/table',
          ],
        },
        {
          type: 'category',
          label: 'Disclosure',
          collapsed: true,
          items: [
            'components/disclosure/accordion',
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          collapsed: true,
          items: [
            'components/feedback/alert',
            'components/feedback/progress',
            'components/feedback/spinner',
            'components/feedback/toast',
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          collapsed: true,
          items: [
            'components/navigation/breadcrumb',
            'components/navigation/menu',
            'components/navigation/pagination',
            'components/navigation/stepper',
            'components/navigation/tabs',
            'components/navigation/tabview',
          ],
        },
        {
          type: 'category',
          label: 'Overlay',
          collapsed: true,
          items: [
            'components/overlay/dialog',
            'components/overlay/drawer',
            'components/overlay/modal',
            'components/overlay/popover',
            'components/overlay/tooltip',
          ],
        },
        {
          type: 'category',
          label: 'Media',
          collapsed: true,
          items: [
            'components/media/carousel',
            'components/media/mediaplayer',
          ],
        },
        {
          type: 'category',
          label: 'Charts',
          collapsed: true,
          items: [
            'components/charts/line-chart',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/quickstart',
        'guides/reorganize',
        'guides/form-validation',
        'guides/internationalization',
        'guides/animations',
        'guides/migration-guide',
        'guides/mvp-development',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      items: [
        'development/README',
        'development/guide',
        'development/roadmap',
        'development/status-report',
        'development/v0.2.1-release-notes',
        'development/build-analysis',
        'development/build-fix-guide',
        'development/build-troubleshooting',
        'development/development-strategy',
        'development/documentation-strategy',
        'development/implementation-roadmap',
        'development/improvement-plan',
        'development/local-installation',
        'development/performance-optimization',
        'development/project-guide',
        'development/security-compatibility',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/architecture-design',
        'architecture/build-process',
        'architecture/component-specification',
        'architecture/dependencies',
        'architecture/package-structure',
        'architecture/requirements-analysis',
        'architecture/technical-requirements',
      ],
    },
    {
      type: 'category',
      label: 'Guidelines',
      collapsed: true,
      items: [
        'guidelines/accessibility',
        'guidelines/best-practices',
        'guidelines/coding-standards',
        'guidelines/component-structure',
        'guidelines/testing-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      collapsed: true,
      items: [
        'testing/test-strategy',
        'testing/test-coverage-report',
        {
          type: 'category',
          label: 'Implementation',
          collapsed: true,
          items: [
            'testing/implementation/component-tests',
            'testing/implementation/snapshot-tests',
          ],
        },
        {
          type: 'category',
          label: 'Presentation',
          collapsed: true,
          items: [
            'testing/presentation/testplan-implementation',
          ],
        },
        {
          type: 'category',
          label: 'Testplan',
          collapsed: true,
          items: [
            'testing/testplan/01-Testplan-Übersicht',
            'testing/testplan/02-Testinfrastruktur',
            'testing/testplan/03-Unit-Tests',
            'testing/testplan/04-Integrationstests',
            'testing/testplan/05-Spezielle-Komponententests',
            'testing/testplan/06-Visuelle-Tests',
            'testing/testplan/07-Browserkompatibilitätstests',
            'testing/testplan/08-CI-CD-Integration',
            'testing/testplan/09-Implementierungsplan',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: [
        'examples/form-examples',
        'examples/layout-examples',
        'examples/form-validation-examples',
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: true,
      items: [
        'api/reference',
      ],
    },
    {
      type: 'category',
      label: 'Improvement Plan',
      collapsed: true,
      items: [
        'improvement-plan/README',
      ],
    },
    {
      type: 'category',
      label: 'Styling',
      collapsed: true,
      items: [
        'styling/README',
      ],
    },
  ],
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial Basics',
      collapsed: false,
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/create-a-page',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
        'tutorial-basics/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial Extras',
      collapsed: false,
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
