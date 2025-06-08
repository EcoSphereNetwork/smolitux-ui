import {
  CardProps,
  createCardStyles,
  extractCardProps,
  filterCardProps,
  isCardProp,
  getCardStyleProps,
} from '../card';

describe('Card Component Type Utilities', () => {
  describe('createCardStyles', () => {
    it('creates card styles from props', () => {
      const props: CardProps = {
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
        isDisabled: false,
        hasBorder: true,
        borderRadius: 'md',
      };

      expect(createCardStyles(props)).toEqual({
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
        isDisabled: false,
        hasBorder: true,
        borderRadius: 'md',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      });
    });

    it('handles theme-based values', () => {
      const theme = {
        components: {
          Card: {
            variants: {
              elevated: {
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
              },
              flat: {
                boxShadow: 'none',
                backgroundColor: 'gray.100',
              },
            },
            sizes: {
              sm: {
                padding: '12px',
                borderRadius: '4px',
              },
              md: {
                padding: '16px',
                borderRadius: '8px',
              },
            },
          },
        },
      };

      const props: CardProps = {
        variant: 'elevated',
        size: 'md',
      };

      expect(createCardStyles(props, theme)).toEqual({
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
      });
    });

    it('handles custom styles', () => {
      const props: CardProps = {
        variant: 'elevated',
        size: 'md',
        style: {
          maxWidth: '400px',
          margin: '20px auto',
        },
      };

      expect(createCardStyles(props)).toEqual({
        variant: 'elevated',
        size: 'md',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '20px auto',
      });
    });

    it('handles disabled state', () => {
      const props: CardProps = {
        variant: 'elevated',
        size: 'md',
        isDisabled: true,
      };

      expect(createCardStyles(props)).toEqual({
        variant: 'elevated',
        size: 'md',
        isDisabled: true,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        opacity: 0.6,
        pointerEvents: 'none',
      });
    });

    it('handles interactive state', () => {
      const props: CardProps = {
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
      };

      expect(createCardStyles(props)).toEqual({
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      });
    });

    it('handles border styles', () => {
      const props: CardProps = {
        variant: 'flat',
        size: 'md',
        hasBorder: true,
        borderColor: 'gray.200',
      };

      expect(createCardStyles(props)).toEqual({
        variant: 'flat',
        size: 'md',
        hasBorder: true,
        borderColor: 'gray.200',
        border: '1px solid',
        borderColor: 'gray.200',
      });
    });
  });

  describe('extractCardProps', () => {
    it('extracts card props from object', () => {
      const props = {
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
        onClick: () => {},
        children: 'Content',
      };

      expect(extractCardProps(props)).toEqual({
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
      });
    });

    it('returns empty object when no card props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Content',
      };

      expect(extractCardProps(props)).toEqual({});
    });
  });

  describe('filterCardProps', () => {
    it('removes card props from object', () => {
      const props = {
        variant: 'elevated',
        size: 'md',
        isInteractive: true,
        onClick: () => {},
        children: 'Content',
      };

      expect(filterCardProps(props)).toEqual({
        onClick: props.onClick,
        children: 'Content',
      });
    });

    it('returns original object when no card props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Content',
      };

      expect(filterCardProps(props)).toEqual(props);
    });
  });

  describe('isCardProp', () => {
    it('returns true for valid card props', () => {
      expect(isCardProp('variant')).toBe(true);
      expect(isCardProp('size')).toBe(true);
      expect(isCardProp('isInteractive')).toBe(true);
      expect(isCardProp('isDisabled')).toBe(true);
      expect(isCardProp('hasBorder')).toBe(true);
      expect(isCardProp('borderRadius')).toBe(true);
      expect(isCardProp('borderColor')).toBe(true);
    });

    it('returns false for non-card props', () => {
      expect(isCardProp('onClick')).toBe(false);
      expect(isCardProp('children')).toBe(false);
      expect(isCardProp('ref')).toBe(false);
    });
  });

  describe('getCardStyleProps', () => {
    it('returns all card style prop names', () => {
      const cardStyleProps = getCardStyleProps();

      expect(cardStyleProps).toContain('variant');
      expect(cardStyleProps).toContain('size');
      expect(cardStyleProps).toContain('isInteractive');
      expect(cardStyleProps).toContain('isDisabled');
      expect(cardStyleProps).toContain('hasBorder');
      expect(cardStyleProps).toContain('borderRadius');
      expect(cardStyleProps).toContain('borderColor');
    });
  });
});
