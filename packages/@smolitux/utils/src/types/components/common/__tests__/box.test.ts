import {
  BoxProps,
  createBoxStyles,
  extractBoxProps,
  filterBoxProps,
  isBoxProp,
  getBoxStyleProps,
} from '../box';

describe('Box Component Type Utilities', () => {
  describe('createBoxStyles', () => {
    it('creates box styles from props', () => {
      const props: BoxProps = {
        width: '100px',
        height: '50px',
        padding: '10px',
        margin: '5px',
        color: 'red',
        bg: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };

      expect(createBoxStyles(props)).toEqual({
        width: '100px',
        height: '50px',
        padding: '10px',
        margin: '5px',
        color: 'red',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      });
    });

    it('handles responsive values', () => {
      const props: BoxProps = {
        width: {
          base: '100px',
          md: '200px',
        },
        padding: {
          base: '10px',
          md: '20px',
        },
      };

      expect(createBoxStyles(props)).toEqual({
        width: {
          base: '100px',
          md: '200px',
        },
        padding: {
          base: '10px',
          md: '20px',
        },
      });
    });

    it('handles shorthand properties', () => {
      const props: BoxProps = {
        p: '10px',
        m: '5px',
        pt: '15px',
        mx: '20px',
      };

      expect(createBoxStyles(props)).toEqual({
        padding: '10px',
        margin: '5px',
        paddingTop: '15px',
        marginLeft: '20px',
        marginRight: '20px',
      });
    });

    it('handles theme-based values', () => {
      const theme = {
        colors: {
          primary: 'blue',
          secondary: 'green',
        },
        space: {
          sm: '8px',
          md: '16px',
        },
      };

      const props: BoxProps = {
        color: 'primary',
        bg: 'secondary',
        p: 'md',
        m: 'sm',
      };

      expect(createBoxStyles(props, theme)).toEqual({
        color: 'blue',
        backgroundColor: 'green',
        padding: '16px',
        margin: '8px',
      });
    });
  });

  describe('extractBoxProps', () => {
    it('extracts box props from object', () => {
      const props = {
        width: '100px',
        height: '50px',
        color: 'red',
        onClick: () => {},
        children: 'Text',
      };

      expect(extractBoxProps(props)).toEqual({
        width: '100px',
        height: '50px',
        color: 'red',
      });
    });

    it('returns empty object when no box props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text',
      };

      expect(extractBoxProps(props)).toEqual({});
    });
  });

  describe('filterBoxProps', () => {
    it('removes box props from object', () => {
      const props = {
        width: '100px',
        height: '50px',
        color: 'red',
        onClick: () => {},
        children: 'Text',
      };

      expect(filterBoxProps(props)).toEqual({
        onClick: props.onClick,
        children: 'Text',
      });
    });

    it('returns original object when no box props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text',
      };

      expect(filterBoxProps(props)).toEqual(props);
    });
  });

  describe('isBoxProp', () => {
    it('returns true for valid box props', () => {
      expect(isBoxProp('width')).toBe(true);
      expect(isBoxProp('height')).toBe(true);
      expect(isBoxProp('padding')).toBe(true);
      expect(isBoxProp('margin')).toBe(true);
      expect(isBoxProp('color')).toBe(true);
      expect(isBoxProp('bg')).toBe(true);
      expect(isBoxProp('p')).toBe(true);
      expect(isBoxProp('m')).toBe(true);
      expect(isBoxProp('pt')).toBe(true);
      expect(isBoxProp('mx')).toBe(true);
    });

    it('returns false for non-box props', () => {
      expect(isBoxProp('onClick')).toBe(false);
      expect(isBoxProp('children')).toBe(false);
      expect(isBoxProp('ref')).toBe(false);
    });
  });

  describe('getBoxStyleProps', () => {
    it('returns all box style prop names', () => {
      const boxStyleProps = getBoxStyleProps();

      expect(boxStyleProps).toContain('width');
      expect(boxStyleProps).toContain('height');
      expect(boxStyleProps).toContain('padding');
      expect(boxStyleProps).toContain('margin');
      expect(boxStyleProps).toContain('color');
      expect(boxStyleProps).toContain('bg');
      expect(boxStyleProps).toContain('p');
      expect(boxStyleProps).toContain('m');
      expect(boxStyleProps).toContain('pt');
      expect(boxStyleProps).toContain('mx');
    });
  });
});
