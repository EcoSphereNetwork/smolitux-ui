import {
  createStyleObject,
  mergeStyles,
  parseStyleValue,
  isStyleProp,
  getStyleProps,
  filterStyleProps,
  createStyleFunction,
  composeStyles
} from '../style';

describe('Style Type Utilities', () => {
  describe('createStyleObject', () => {
    it('creates style object from props', () => {
      const props = {
        color: 'red',
        fontSize: '16px',
        margin: '10px',
        padding: '5px'
      };
      
      expect(createStyleObject(props)).toEqual({
        color: 'red',
        fontSize: '16px',
        margin: '10px',
        padding: '5px'
      });
    });
    
    it('filters out non-style props', () => {
      const props = {
        color: 'red',
        fontSize: '16px',
        onClick: () => {},
        children: 'Text'
      };
      
      expect(createStyleObject(props)).toEqual({
        color: 'red',
        fontSize: '16px'
      });
    });
    
    it('handles responsive style props', () => {
      const props = {
        color: {
          base: 'red',
          md: 'blue'
        },
        fontSize: {
          base: '14px',
          md: '16px'
        }
      };
      
      expect(createStyleObject(props)).toEqual({
        color: {
          base: 'red',
          md: 'blue'
        },
        fontSize: {
          base: '14px',
          md: '16px'
        }
      });
    });
  });
  
  describe('mergeStyles', () => {
    it('merges multiple style objects', () => {
      const style1 = {
        color: 'red',
        fontSize: '16px'
      };
      
      const style2 = {
        margin: '10px',
        padding: '5px'
      };
      
      const style3 = {
        color: 'blue',
        backgroundColor: 'white'
      };
      
      expect(mergeStyles(style1, style2, style3)).toEqual({
        color: 'blue',
        fontSize: '16px',
        margin: '10px',
        padding: '5px',
        backgroundColor: 'white'
      });
    });
    
    it('handles undefined and null values', () => {
      const style1 = {
        color: 'red',
        fontSize: '16px'
      };
      
      expect(mergeStyles(style1, null, undefined)).toEqual({
        color: 'red',
        fontSize: '16px'
      });
    });
    
    it('handles responsive style values', () => {
      const style1 = {
        color: {
          base: 'red',
          md: 'blue'
        }
      };
      
      const style2 = {
        color: {
          lg: 'green'
        }
      };
      
      expect(mergeStyles(style1, style2)).toEqual({
        color: {
          base: 'red',
          md: 'blue',
          lg: 'green'
        }
      });
    });
  });
  
  describe('parseStyleValue', () => {
    it('parses numeric values with units', () => {
      expect(parseStyleValue('10px')).toEqual({ value: 10, unit: 'px' });
      expect(parseStyleValue('1.5rem')).toEqual({ value: 1.5, unit: 'rem' });
      expect(parseStyleValue('20%')).toEqual({ value: 20, unit: '%' });
    });
    
    it('returns null for non-numeric values', () => {
      expect(parseStyleValue('auto')).toBeNull();
      expect(parseStyleValue('inherit')).toBeNull();
      expect(parseStyleValue('red')).toBeNull();
    });
    
    it('handles values without units', () => {
      expect(parseStyleValue('10')).toEqual({ value: 10, unit: '' });
    });
  });
  
  describe('isStyleProp', () => {
    it('returns true for valid style props', () => {
      expect(isStyleProp('color')).toBe(true);
      expect(isStyleProp('fontSize')).toBe(true);
      expect(isStyleProp('margin')).toBe(true);
      expect(isStyleProp('padding')).toBe(true);
    });
    
    it('returns false for non-style props', () => {
      expect(isStyleProp('onClick')).toBe(false);
      expect(isStyleProp('children')).toBe(false);
      expect(isStyleProp('ref')).toBe(false);
    });
  });
  
  describe('getStyleProps', () => {
    it('extracts style props from object', () => {
      const props = {
        color: 'red',
        fontSize: '16px',
        onClick: () => {},
        children: 'Text'
      };
      
      expect(getStyleProps(props)).toEqual({
        color: 'red',
        fontSize: '16px'
      });
    });
    
    it('returns empty object when no style props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text'
      };
      
      expect(getStyleProps(props)).toEqual({});
    });
  });
  
  describe('filterStyleProps', () => {
    it('removes style props from object', () => {
      const props = {
        color: 'red',
        fontSize: '16px',
        onClick: () => {},
        children: 'Text'
      };
      
      expect(filterStyleProps(props)).toEqual({
        onClick: props.onClick,
        children: 'Text'
      });
    });
    
    it('returns original object when no style props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text'
      };
      
      expect(filterStyleProps(props)).toEqual(props);
    });
  });
  
  describe('createStyleFunction', () => {
    it('creates style function from props mapping', () => {
      const styleFunction = createStyleFunction({
        width: 'width',
        height: 'height',
        color: 'color'
      });
      
      const props = {
        width: '100px',
        height: '50px',
        color: 'red',
        onClick: () => {}
      };
      
      expect(styleFunction(props)).toEqual({
        width: '100px',
        height: '50px',
        color: 'red'
      });
    });
    
    it('applies transformers to prop values', () => {
      const styleFunction = createStyleFunction({
        width: (value) => `${value}px`,
        height: (value) => `${value}px`,
        color: 'color'
      });
      
      const props = {
        width: 100,
        height: 50,
        color: 'red'
      };
      
      expect(styleFunction(props)).toEqual({
        width: '100px',
        height: '50px',
        color: 'red'
      });
    });
    
    it('handles responsive values', () => {
      const styleFunction = createStyleFunction({
        width: 'width',
        color: 'color'
      });
      
      const props = {
        width: {
          base: '100px',
          md: '200px'
        },
        color: {
          base: 'red',
          md: 'blue'
        }
      };
      
      expect(styleFunction(props)).toEqual({
        width: {
          base: '100px',
          md: '200px'
        },
        color: {
          base: 'red',
          md: 'blue'
        }
      });
    });
  });
  
  describe('composeStyles', () => {
    it('composes multiple style functions', () => {
      const colorStyleFn = (props) => ({
        color: props.color,
        backgroundColor: props.bg
      });
      
      const sizeStyleFn = (props) => ({
        width: props.width,
        height: props.height
      });
      
      const composedStyleFn = composeStyles(colorStyleFn, sizeStyleFn);
      
      const props = {
        color: 'red',
        bg: 'white',
        width: '100px',
        height: '50px'
      };
      
      expect(composedStyleFn(props)).toEqual({
        color: 'red',
        backgroundColor: 'white',
        width: '100px',
        height: '50px'
      });
    });
    
    it('later functions override earlier ones', () => {
      const styleFn1 = () => ({
        color: 'red',
        fontSize: '16px'
      });
      
      const styleFn2 = () => ({
        color: 'blue',
        margin: '10px'
      });
      
      const composedStyleFn = composeStyles(styleFn1, styleFn2);
      
      expect(composedStyleFn({})).toEqual({
        color: 'blue',
        fontSize: '16px',
        margin: '10px'
      });
    });
  });
});