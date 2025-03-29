import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
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
      label: 'Komponenten',
      collapsed: true,
      items: [
        'components/overview',
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
      label: 'API Reference',
      collapsed: true,
      items: ['api/reference'],
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
  ],
  tutorialSidebar: [
    'docusaurus/intro',
    {
      type: 'category',
      label: 'Tutorial Basics',
      collapsed: false,
      items: [
        'docusaurus/tutorial-basics/create-a-document',
        'docusaurus/tutorial-basics/create-a-blog-post',
        'docusaurus/tutorial-basics/create-a-page',
        'docusaurus/tutorial-basics/deploy-your-site',
        'docusaurus/tutorial-basics/congratulations',
        'docusaurus/tutorial-basics/markdown-features',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial Extras',
      collapsed: false,
      items: [
        'docusaurus/tutorial-extras/manage-docs-versions',
        'docusaurus/tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
