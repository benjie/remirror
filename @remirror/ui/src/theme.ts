import { ThemeContext } from '@emotion/core';
import { deepMerge } from '@remirror/core';
import { Theme as RemirrorTheme } from '@styled-system/css';
import { Context, useContext } from 'react';

export const baseTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: '#f6f6f6',
  },
};

/**
 * Provides access to the theme context
 */
export const RemirrorThemeContext = ThemeContext as Context<RemirrorTheme>;

/**
 * Hook which returns the current theme from the context
 */
export const useRemirrorTheme = () => deepMerge([{}, baseTheme, useContext(RemirrorThemeContext) || {}]);
