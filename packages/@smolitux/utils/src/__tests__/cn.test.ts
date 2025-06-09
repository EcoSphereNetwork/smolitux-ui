import { cn } from '../cn';

describe('cn utility', () => {
  it('combines string arguments', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('handles objects and arrays', () => {
    expect(cn('base', { active: true, disabled: false }, ['extra', ['nested']])).toBe('base active extra nested');
  });

  it('deduplicates classes and ignores falsy values', () => {
    expect(cn('a', null, undefined, 'a', 0 && 'b')).toBe('a');
  });
});
