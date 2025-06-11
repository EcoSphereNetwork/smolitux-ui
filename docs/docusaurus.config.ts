import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Smolitux-UI',
  tagline: 'EcoSphereNetwork',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ecospherenetwork.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/smolitux-ui/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'EcoSphereNetwork', // Usually your GitHub org/user name.
  projectName: 'smolitux-ui', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    localeConfigs: {
      de: { label: 'Deutsch' },
      en: { label: 'English' }
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/wiki/',
          routeBasePath: 'wiki',
          path: 'wiki',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          exclude: ['legacy/**', 'codex/**', 'development/prompts/**'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guide',
        path: 'guide',
        routeBasePath: 'guide',
        sidebarPath: './sidebars.ts',
        editUrl:
          'https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/guide/',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Smolitux-UI',
      logo: {
        alt: 'EcoSphereNetwork Logo',
        src: 'https://avatars.githubusercontent.com/u/168775088?s=400&u=a782fd605bdf54421b8bb4b011a8fb3d93ffa5cc&v=4',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          docsPluginId: 'guide',
          position: 'left',
          label: 'Guide',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/EcoSphereNetwork/smolitux-ui',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Wiki',
              to: '/wiki/',
            },
            {
              label: 'Guide',
              to: '/guide/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/smolitux-ui',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/smolitux-ui',
            },
            {
              label: 'X',
              href: 'https://x.com/smolitux',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/EcoSphereNetwork/smolitux-ui',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EcoSphereNetwork. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
