import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: [
        'components/overview',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      items: [
        'development/guide',
        'development/roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/architecture-design',
      ],
    },
    {
      type: 'category',
      label: 'Guidelines',
      collapsed: true,
      items: [
        'guidelines/accessibility',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      collapsed: true,
      items: [
        'testing/test-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: [
        'examples/form-examples',
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
  ],
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tutorial Basics',
      collapsed: false,
      items: [
        'tutorial-basics/create-a-document',
      ],
    },
  ],
};

export default sidebars;
