import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/smolitux-ui/blog',
    component: ComponentCreator('/smolitux-ui/blog', '873'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/archive',
    component: ComponentCreator('/smolitux-ui/blog/archive', 'cea'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/authors',
    component: ComponentCreator('/smolitux-ui/blog/authors', '44e'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/smolitux-ui/blog/authors/all-sebastien-lorber-articles', '0ee'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/authors/yangshun',
    component: ComponentCreator('/smolitux-ui/blog/authors/yangshun', '889'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/first-blog-post',
    component: ComponentCreator('/smolitux-ui/blog/first-blog-post', '357'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/long-blog-post',
    component: ComponentCreator('/smolitux-ui/blog/long-blog-post', '71c'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/mdx-blog-post',
    component: ComponentCreator('/smolitux-ui/blog/mdx-blog-post', '16d'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/tags',
    component: ComponentCreator('/smolitux-ui/blog/tags', 'f29'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/tags/docusaurus',
    component: ComponentCreator('/smolitux-ui/blog/tags/docusaurus', '9c9'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/tags/facebook',
    component: ComponentCreator('/smolitux-ui/blog/tags/facebook', '315'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/tags/hello',
    component: ComponentCreator('/smolitux-ui/blog/tags/hello', 'ace'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/tags/hola',
    component: ComponentCreator('/smolitux-ui/blog/tags/hola', '9ae'),
    exact: true
  },
  {
    path: '/smolitux-ui/blog/welcome',
    component: ComponentCreator('/smolitux-ui/blog/welcome', 'c63'),
    exact: true
  },
  {
    path: '/smolitux-ui/markdown-page',
    component: ComponentCreator('/smolitux-ui/markdown-page', 'd4f'),
    exact: true
  },
  {
    path: '/smolitux-ui/docs',
    component: ComponentCreator('/smolitux-ui/docs', '87d'),
    routes: [
      {
        path: '/smolitux-ui/docs',
        component: ComponentCreator('/smolitux-ui/docs', 'a07'),
        routes: [
          {
            path: '/smolitux-ui/docs',
            component: ComponentCreator('/smolitux-ui/docs', '8e0'),
            routes: [
              {
                path: '/smolitux-ui/docs',
                component: ComponentCreator('/smolitux-ui/docs', '5ca'),
                exact: true,
                sidebar: "wikiSidebar"
              },
              {
                path: '/smolitux-ui/docs/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/accessibility', '1bc'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/a11y-components',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/a11y-components', '156'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/component-status',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/component-status', '19f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/carousel',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/carousel', '298'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/colorpicker',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/colorpicker', '0ea'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/drawer',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/drawer', 'c85'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/dropdown',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/dropdown', 'acb'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/fade',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/fade', '8fa'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/fileupload',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/fileupload', 'd27'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/flex',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/flex', '7fe'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/form',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/form', '8fe'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/formcontrol',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/formcontrol', '043'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/formfield',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/formfield', 'd95'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/input',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/input', '65f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/languageswitcher',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/languageswitcher', 'a01'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/list',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/list', '3b1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/mediaplayer',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/mediaplayer', 'e78'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/menu',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/menu', 'f5c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/pagination',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/pagination', '6c3'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/popover',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/popover', '257'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/progressbar',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/progressbar', '5e9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/radio',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/radio', '46f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/select',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/select', '43d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/skeleton',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/skeleton', '8c5'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/slide',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/slide', '24e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/slider',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/slider', '93e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/spinner',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/spinner', 'e87'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/stepper',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/stepper', 'a29'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/switch',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/switch', 'e84'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/tabview',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/tabview', '791'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/textarea',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/textarea', '70d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/timepicker',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/timepicker', '01e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/accessibility/components/zoom',
                component: ComponentCreator('/smolitux-ui/docs/accessibility/components/zoom', '287'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/api/reference',
                component: ComponentCreator('/smolitux-ui/docs/api/reference', 'ffb'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/architecture-design',
                component: ComponentCreator('/smolitux-ui/docs/architecture/architecture-design', 'f18'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/build-process',
                component: ComponentCreator('/smolitux-ui/docs/architecture/build-process', 'f4e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/component-specification',
                component: ComponentCreator('/smolitux-ui/docs/architecture/component-specification', '4af'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/dependencies',
                component: ComponentCreator('/smolitux-ui/docs/architecture/dependencies', '1f4'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/package-structure',
                component: ComponentCreator('/smolitux-ui/docs/architecture/package-structure', 'dcf'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/requirements-analysis',
                component: ComponentCreator('/smolitux-ui/docs/architecture/requirements-analysis', '2e5'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/architecture/technical-requirements',
                component: ComponentCreator('/smolitux-ui/docs/architecture/technical-requirements', 'ffa'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components',
                component: ComponentCreator('/smolitux-ui/docs/components', '1a0'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/charts/line-chart',
                component: ComponentCreator('/smolitux-ui/docs/components/charts/line-chart', '94f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/avatar',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/avatar', '580'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/avatar/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/avatar/accessibility', '302'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/badge',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/badge', 'd18'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/badge/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/badge/accessibility', '8dd'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/list',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/list', '462'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data-display/table',
                component: ComponentCreator('/smolitux-ui/docs/components/data-display/table', '443'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/data/table/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/data/table/accessibility', '105'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/disclosure/accordion',
                component: ComponentCreator('/smolitux-ui/docs/components/disclosure/accordion', '229'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/disclosure/accordion/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/disclosure/accordion/accessibility', 'cd3'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/alert',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/alert', '2ec'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/alert/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/alert/accessibility', 'f97'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/progress',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/progress', '056'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/spinner',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/spinner', '9a5'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/toast',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/toast', '985'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/feedback/toast/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/feedback/toast/accessibility', '36c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/checkbox',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/checkbox', 'f1d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/colorpicker',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/colorpicker', '4b2'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/datepicker/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/datepicker/accessibility', '2bb'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/fileupload',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/fileupload', '1bb'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/form-control',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/form-control', '813'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/radio',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/radio', '18b'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/radiogroup',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/radiogroup', '0b1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/select',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/select', 'f6d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/slider',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/slider', 'bee'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/switch',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/switch', 'd0d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/textarea',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/textarea', 'fda'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/forms/timepicker',
                component: ComponentCreator('/smolitux-ui/docs/components/forms/timepicker', '0c1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/button',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/button', '87e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/Button',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/Button', '2c1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/button/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/button/accessibility', '5a7'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/Checkbox',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/Checkbox', '343'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/checkbox/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/checkbox/accessibility', 'c73'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/Input',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/Input', 'fbc'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/inputs/Select',
                component: ComponentCreator('/smolitux-ui/docs/components/inputs/Select', 'b7b'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/layout/card',
                component: ComponentCreator('/smolitux-ui/docs/components/layout/card', 'e6c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/layout/card/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/layout/card/accessibility', '6d1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/layout/collapse/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/layout/collapse/accessibility', '58a'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/layout/container',
                component: ComponentCreator('/smolitux-ui/docs/components/layout/container', 'e54'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/layout/grid',
                component: ComponentCreator('/smolitux-ui/docs/components/layout/grid', 'f57'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/media/carousel',
                component: ComponentCreator('/smolitux-ui/docs/components/media/carousel', '66a'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/media/mediaplayer',
                component: ComponentCreator('/smolitux-ui/docs/components/media/mediaplayer', 'e35'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/breadcrumb',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/breadcrumb', '5b1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/breadcrumb/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/breadcrumb/accessibility', 'e18'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/menu',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/menu', 'c2c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/pagination',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/pagination', '3fa'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/stepper',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/stepper', 'ccc'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/tabs',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/tabs', '4b3'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/tabs/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/tabs/accessibility', '3e9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/navigation/tabview',
                component: ComponentCreator('/smolitux-ui/docs/components/navigation/tabview', '932'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/dialog',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/dialog', '9fa'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/dialog/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/dialog/accessibility', '296'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/drawer',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/drawer', 'e39'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/modal',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/modal', 'f91'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/modal/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/modal/accessibility', '135'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/popover',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/popover', '566'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overlay/tooltip',
                component: ComponentCreator('/smolitux-ui/docs/components/overlay/tooltip', 'e6d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/components/overview',
                component: ComponentCreator('/smolitux-ui/docs/components/overview', '30f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development',
                component: ComponentCreator('/smolitux-ui/docs/development', '3ce'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/archive/implementation-roadmap',
                component: ComponentCreator('/smolitux-ui/docs/development/archive/implementation-roadmap', 'dcf'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/archive/improvement-plan',
                component: ComponentCreator('/smolitux-ui/docs/development/archive/improvement-plan', 'f5f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/archive/roadmap',
                component: ComponentCreator('/smolitux-ui/docs/development/archive/roadmap', '1e9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/build-analysis',
                component: ComponentCreator('/smolitux-ui/docs/development/build-analysis', '1b7'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/build-fix-guide',
                component: ComponentCreator('/smolitux-ui/docs/development/build-fix-guide', '4f9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/build-troubleshooting',
                component: ComponentCreator('/smolitux-ui/docs/development/build-troubleshooting', 'd39'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/changelog',
                component: ComponentCreator('/smolitux-ui/docs/development/changelog', '81d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/contributing',
                component: ComponentCreator('/smolitux-ui/docs/development/contributing', 'd06'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/credits',
                component: ComponentCreator('/smolitux-ui/docs/development/credits', '9cc'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/development-strategy',
                component: ComponentCreator('/smolitux-ui/docs/development/development-strategy', 'f48'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/documentation-strategy',
                component: ComponentCreator('/smolitux-ui/docs/development/documentation-strategy', '2b9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/Entwickler-Prompt',
                component: ComponentCreator('/smolitux-ui/docs/development/Entwickler-Prompt', '9a0'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/guide',
                component: ComponentCreator('/smolitux-ui/docs/development/guide', '939'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/implementation-report',
                component: ComponentCreator('/smolitux-ui/docs/development/implementation-report', '7bc'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/implementation-roadmap',
                component: ComponentCreator('/smolitux-ui/docs/development/implementation-roadmap', 'ff5'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/improvement-plan',
                component: ComponentCreator('/smolitux-ui/docs/development/improvement-plan', 'd46'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/local-installation',
                component: ComponentCreator('/smolitux-ui/docs/development/local-installation', '559'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/performance-optimization',
                component: ComponentCreator('/smolitux-ui/docs/development/performance-optimization', 'c6e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/project-guide',
                component: ComponentCreator('/smolitux-ui/docs/development/project-guide', '2f3'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/releases/v0.2.1',
                component: ComponentCreator('/smolitux-ui/docs/development/releases/v0.2.1', 'a78'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/roadmap',
                component: ComponentCreator('/smolitux-ui/docs/development/roadmap', '25e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/roadmap',
                component: ComponentCreator('/smolitux-ui/docs/development/roadmap', '4e2'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/roadmap/implementation-plan',
                component: ComponentCreator('/smolitux-ui/docs/development/roadmap/implementation-plan', 'd8a'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/roadmap/step-by-step-guide',
                component: ComponentCreator('/smolitux-ui/docs/development/roadmap/step-by-step-guide', 'c07'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/roadmap/summary',
                component: ComponentCreator('/smolitux-ui/docs/development/roadmap/summary', 'fb4'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/security-compatibility',
                component: ComponentCreator('/smolitux-ui/docs/development/security-compatibility', 'd6d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/status-report',
                component: ComponentCreator('/smolitux-ui/docs/development/status-report', '3d4'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/development/v0.2.1-release-notes',
                component: ComponentCreator('/smolitux-ui/docs/development/v0.2.1-release-notes', '01c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/examples/form-examples',
                component: ComponentCreator('/smolitux-ui/docs/examples/form-examples', 'c6c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/examples/form-validation-examples',
                component: ComponentCreator('/smolitux-ui/docs/examples/form-validation-examples', '672'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/examples/layout-examples',
                component: ComponentCreator('/smolitux-ui/docs/examples/layout-examples', 'f4c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guidelines/accessibility',
                component: ComponentCreator('/smolitux-ui/docs/guidelines/accessibility', '3b3'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guidelines/best-practices',
                component: ComponentCreator('/smolitux-ui/docs/guidelines/best-practices', 'c54'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guidelines/coding-standards',
                component: ComponentCreator('/smolitux-ui/docs/guidelines/coding-standards', '706'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guidelines/component-structure',
                component: ComponentCreator('/smolitux-ui/docs/guidelines/component-structure', 'bbe'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guidelines/testing-strategy',
                component: ComponentCreator('/smolitux-ui/docs/guidelines/testing-strategy', '9a7'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/animations',
                component: ComponentCreator('/smolitux-ui/docs/guides/animations', 'd1b'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/form-validation',
                component: ComponentCreator('/smolitux-ui/docs/guides/form-validation', '19b'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/internationalization',
                component: ComponentCreator('/smolitux-ui/docs/guides/internationalization', 'f5b'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/migration-guide',
                component: ComponentCreator('/smolitux-ui/docs/guides/migration-guide', '91e'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/mvp-development',
                component: ComponentCreator('/smolitux-ui/docs/guides/mvp-development', '3a9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/quickstart',
                component: ComponentCreator('/smolitux-ui/docs/guides/quickstart', 'a64'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/guides/reorganize',
                component: ComponentCreator('/smolitux-ui/docs/guides/reorganize', '19c'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/improvement-plan',
                component: ComponentCreator('/smolitux-ui/docs/improvement-plan', 'e44'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/improvement-plan/button-component',
                component: ComponentCreator('/smolitux-ui/docs/improvement-plan/button-component', '091'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/improvement-plan/phase2-accessibility',
                component: ComponentCreator('/smolitux-ui/docs/improvement-plan/phase2-accessibility', '5cd'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/styling',
                component: ComponentCreator('/smolitux-ui/docs/styling', '402'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/accessibility-testing',
                component: ComponentCreator('/smolitux-ui/docs/testing/accessibility-testing', '8c1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/e2e-testing',
                component: ComponentCreator('/smolitux-ui/docs/testing/e2e-testing', '99f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/implementation/accessibility-tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/implementation/accessibility-tests', 'e6f'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/implementation/automated-a11y-tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/implementation/automated-a11y-tests', 'b0d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/implementation/component-tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/implementation/component-tests', 'c2d'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/implementation/snapshot-tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/implementation/snapshot-tests', '584'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/presentation/testplan-implementation',
                component: ComponentCreator('/smolitux-ui/docs/testing/presentation/testplan-implementation', '0a9'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/test-coverage-report',
                component: ComponentCreator('/smolitux-ui/docs/testing/test-coverage-report', '230'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/test-strategy',
                component: ComponentCreator('/smolitux-ui/docs/testing/test-strategy', 'db1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Browserkompatibilitätstests',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Browserkompatibilitätstests', '057'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/CI-CD-Integration',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/CI-CD-Integration', 'ab7'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Implementierungsplan',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Implementierungsplan', '740'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Integrationstests',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Integrationstests', 'e55'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Spezielle-Komponententests',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Spezielle-Komponententests', '1e8'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Testinfrastruktur',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Testinfrastruktur', 'c62'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Testplan-Übersicht',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Testplan-Übersicht', '0e1'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Unit-Tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Unit-Tests', '423'),
                exact: true
              },
              {
                path: '/smolitux-ui/docs/testing/testplan/Visuelle-Tests',
                component: ComponentCreator('/smolitux-ui/docs/testing/testplan/Visuelle-Tests', 'a9e'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/smolitux-ui/',
    component: ComponentCreator('/smolitux-ui/', '530'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
