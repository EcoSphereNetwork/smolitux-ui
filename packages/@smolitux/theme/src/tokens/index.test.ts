import { tokens } from './index';

describe('tokens', () => {
  it('contains expected color palette', () => {
    expect(tokens.colors).toHaveProperty('primary');
    expect(tokens.colors.primary[500]).toBe('#0075E1');
  });

  it('contains spacing scale', () => {
    expect(tokens.spacing).toHaveProperty('4');
    expect(tokens.spacing[4]).toBe('1rem');
  });

  it('contains breakpoints', () => {
    expect(tokens.breakpoints.md).toBe(768);
  });

  it('contains typography settings', () => {
    expect(tokens.typography.fontFamily.sans).toContain('Inter');
    expect(tokens.typography.fontWeight.bold).toBe(700);
  });
});
