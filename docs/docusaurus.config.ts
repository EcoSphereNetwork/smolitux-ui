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

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'ru', 'pt', 'ur'],
    localeConfigs: {
      de: { label: 'Deutsch' },
      en: { label: 'English' },
      zh: { label: '中文' },
      hi: { label: 'हिन्दी' },
      es: { label: 'Español' },
      ar: { label: 'العربية' },
      fr: { label: 'Français' },
      bn: { label: 'বাংলা' },
      ru: { label: 'Русский' },
      pt: { label: 'Português' },
      ur: { label: 'اردو' }
    },
  },

  // Modified to use plugins completely instead of presets for docs
  presets: [
    [
      'classic',
      {
        docs: false, // Disable the default docs plugin
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

  // Added plugins configuration for multi-instance docs
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'wiki',
        path: 'Wiki',
        routeBasePath: 'docs',
        sidebarPath: './sidebars.ts',
        sidebarCollapsible: true,
        includeCurrentVersion: true, // Make sure this is true
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl:
          'https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorial',
        path: 'docusaurus',
        routeBasePath: 'tutorial',
        sidebarPath: './sidebars.ts',
        sidebarCollapsible: true,
        includeCurrentVersion: true, // Make sure this is true
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl:
          'https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ESN',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
          docsPluginId: 'wiki', 
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
          docsPluginId: 'tutorial',
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
          title: 'Template Wiki',
          items: [
            {
              label: 'Quickstart',
              to: '/docs/guides/quickstart',
            },
          ],
        },
        {
          title: 'Docusaurus Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/tutorial/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
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
