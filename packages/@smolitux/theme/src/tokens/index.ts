import { colors } from './colors';
import { typographyTokens } from './typography';
import { spacingTokens } from './spacing';
import { breakpoints } from './breakpoints';

export { colors, typographyTokens as typography, spacingTokens as spacing, breakpoints };

export const tokens = { colors, typography: typographyTokens, spacing: spacingTokens, breakpoints };
export type Tokens = typeof tokens;
export type { TypographyTokens } from './typography';
export type { SpacingTokens } from './spacing';
