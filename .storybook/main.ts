import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../apps/**/*.stories.@(js|jsx|ts|tsx)', '../libs/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../apps/dashboard/src'),
          '@components': path.resolve(__dirname, '../apps/dashboard/src/components'),
          '@pages': path.resolve(__dirname, '../apps/dashboard/src/pages'),
          '@utils': path.resolve(__dirname, '../apps/dashboard/src/utils'),
          '@hooks': path.resolve(__dirname, '../apps/dashboard/src/hooks'),
          '@store': path.resolve(__dirname, '../apps/dashboard/src/store'),
          '@styles': path.resolve(__dirname, '../apps/dashboard/src/styles'),
        },
      },
    });
  },
};

export default config;