import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/smolitux-ui/ur/blog',
    component: ComponentCreator('/smolitux-ui/ur/blog', 'cb7'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/archive',
    component: ComponentCreator('/smolitux-ui/ur/blog/archive', '618'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/authors',
    component: ComponentCreator('/smolitux-ui/ur/blog/authors', '330'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/smolitux-ui/ur/blog/authors/all-sebastien-lorber-articles', '2a0'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/authors/yangshun',
    component: ComponentCreator('/smolitux-ui/ur/blog/authors/yangshun', 'e28'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/first-blog-post',
    component: ComponentCreator('/smolitux-ui/ur/blog/first-blog-post', '40c'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/long-blog-post',
    component: ComponentCreator('/smolitux-ui/ur/blog/long-blog-post', '90a'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/mdx-blog-post',
    component: ComponentCreator('/smolitux-ui/ur/blog/mdx-blog-post', 'bc8'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/tags',
    component: ComponentCreator('/smolitux-ui/ur/blog/tags', '710'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/tags/docusaurus',
    component: ComponentCreator('/smolitux-ui/ur/blog/tags/docusaurus', '034'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/tags/facebook',
    component: ComponentCreator('/smolitux-ui/ur/blog/tags/facebook', '84b'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/tags/hello',
    component: ComponentCreator('/smolitux-ui/ur/blog/tags/hello', '682'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/tags/hola',
    component: ComponentCreator('/smolitux-ui/ur/blog/tags/hola', '00f'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/blog/welcome',
    component: ComponentCreator('/smolitux-ui/ur/blog/welcome', 'fab'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/markdown-page',
    component: ComponentCreator('/smolitux-ui/ur/markdown-page', '83e'),
    exact: true
  },
  {
    path: '/smolitux-ui/ur/docs',
    component: ComponentCreator('/smolitux-ui/ur/docs', 'e23'),
    routes: [
      {
        path: '/smolitux-ui/ur/docs',
        component: ComponentCreator('/smolitux-ui/ur/docs', 'f78'),
        routes: [
          {
            path: '/smolitux-ui/ur/docs',
            component: ComponentCreator('/smolitux-ui/ur/docs', 'd3d'),
            routes: [
              {
                path: '/smolitux-ui/ur/docs/api/reference',
                component: ComponentCreator('/smolitux-ui/ur/docs/api/reference', '9bb'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/charts/line-chart',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/charts/line-chart', 'c6d'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/data-display/avatar',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/data-display/avatar', '7e8'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/data-display/badge',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/data-display/badge', '93f'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/data-display/list',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/data-display/list', 'd40'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/data-display/table',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/data-display/table', 'add'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/disclosure/accordion',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/disclosure/accordion', '4f9'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/feedback/alert',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/feedback/alert', '783'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/feedback/progress',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/feedback/progress', 'b9a'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/feedback/spinner',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/feedback/spinner', '5ff'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/feedback/toast',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/feedback/toast', 'b56'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/checkbox',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/checkbox', '486'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/colorpicker',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/colorpicker', '6ee'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/fileupload',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/fileupload', 'ac6'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/form-control',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/form-control', 'b4f'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/radio',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/radio', '549'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/radiogroup',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/radiogroup', '254'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/select',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/select', '4da'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/slider',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/slider', '5ef'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/switch',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/switch', 'e43'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/textarea',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/textarea', '92f'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/forms/timepicker',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/forms/timepicker', 'f07'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/inputs/button',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/inputs/button', 'd0b'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/layout/card',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/layout/card', '4ba'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/layout/container',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/layout/container', '76a'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/layout/grid',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/layout/grid', '1b2'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/media/carousel',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/media/carousel', '956'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/media/mediaplayer',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/media/mediaplayer', '129'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/breadcrumb',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/breadcrumb', '693'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/menu',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/menu', 'b0f'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/pagination',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/pagination', '094'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/stepper',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/stepper', '160'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/tabs',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/tabs', '295'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/navigation/tabview',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/navigation/tabview', '0e2'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overlay/dialog',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overlay/dialog', 'ea3'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overlay/drawer',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overlay/drawer', 'bcd'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overlay/modal',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overlay/modal', 'f79'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overlay/popover',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overlay/popover', 'ecb'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overlay/tooltip',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overlay/tooltip', '28b'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/components/overview',
                component: ComponentCreator('/smolitux-ui/ur/docs/components/overview', '273'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/development/guide',
                component: ComponentCreator('/smolitux-ui/ur/docs/development/guide', '565'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/development/roadmap',
                component: ComponentCreator('/smolitux-ui/ur/docs/development/roadmap', 'ef6'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/intro',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/intro', 'aa0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/congratulations',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/congratulations', '7fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-blog-post', '569'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-document',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-document', '5cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-page',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/create-a-page', '79d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/deploy-your-site', '93c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-basics/markdown-features',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-basics/markdown-features', '371'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-extras/manage-docs-versions', 'd8d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/docusaurus/tutorial-extras/translate-your-site',
                component: ComponentCreator('/smolitux-ui/ur/docs/docusaurus/tutorial-extras/translate-your-site', '0ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/examples/form-examples',
                component: ComponentCreator('/smolitux-ui/ur/docs/examples/form-examples', '2f1'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/examples/form-validation-examples',
                component: ComponentCreator('/smolitux-ui/ur/docs/examples/form-validation-examples', '1d6'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/examples/layout-examples',
                component: ComponentCreator('/smolitux-ui/ur/docs/examples/layout-examples', '2c9'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/guidelines/accessibility',
                component: ComponentCreator('/smolitux-ui/ur/docs/guidelines/accessibility', 'fcb'),
                exact: true
              },
              {
                path: '/smolitux-ui/ur/docs/guidelines/best-practices',
                component: ComponentCreator('/smolitux-ui/ur/docs/guidelines/best-practices', 'f8d'),
                exact: true
              },
              {
                path: '/smolitux-ui/ur/docs/guides/animations',
                component: ComponentCreator('/smolitux-ui/ur/docs/guides/animations', 'de2'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/guides/form-validation',
                component: ComponentCreator('/smolitux-ui/ur/docs/guides/form-validation', 'e69'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/guides/internationalization',
                component: ComponentCreator('/smolitux-ui/ur/docs/guides/internationalization', '5a8'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/guides/quickstart',
                component: ComponentCreator('/smolitux-ui/ur/docs/guides/quickstart', 'df3'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/ur/docs/guides/reorganize',
                component: ComponentCreator('/smolitux-ui/ur/docs/guides/reorganize', '763'),
                exact: true,
                sidebar: "wikiSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/smolitux-ui/ur/',
    component: ComponentCreator('/smolitux-ui/ur/', '1fc'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
