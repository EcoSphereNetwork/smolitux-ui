import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { breakpoints } from './breakpoints';

export { colors, typography, spacing, breakpoints };

export const tokens = { colors, typography, spacing, breakpoints };
export type Tokens = typeof tokens;
