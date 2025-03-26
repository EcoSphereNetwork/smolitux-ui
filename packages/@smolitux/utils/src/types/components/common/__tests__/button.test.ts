import {
  ButtonProps,
  createButtonStyles,
  extractButtonProps,
  filterButtonProps,
  isButtonProp,
  getButtonStyleProps
} from '../button';

describe('Button Component Type Utilities', () => {
  describe('createButtonStyles', () => {
    it('creates button styles from props', () => {
      const props: ButtonProps = {
        variant: 'primary',
        size: 'md',
        isFullWidth: true,
        isDisabled: false,
        isLoading: false,
        leftIcon: 'icon',
        rightIcon: 'icon'
      };
      
      expect(createButtonStyles(props)).toEqual({
        variant: 'primary',
        size: 'md',
        isFullWidth: true,
        isDisabled: false,
        isLoading: false,
        leftIcon: 'icon',
        rightIcon: 'icon'
      });
    });
    
    it('handles theme-based values', () => {
      const theme = {
        components: {
          Button: {
            variants: {
              primary: {
                backgroundColor: 'blue',
                color: 'white'
              },
              secondary: {
                backgroundColor: 'gray',
                color: 'black'
              }
            },
            sizes: {
              sm: {
                fontSize: '14px',
                padding: '4px 8px'
              },
              md: {
                fontSize: '16px',
                padding: '8px 16px'
              }
            }
          }
        }
      };
      
      const props: ButtonProps = {
        variant: 'primary',
        size: 'md'
      };
      
      expect(createButtonStyles(props, theme)).toEqual({
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '16px',
        padding: '8px 16px'
      });
    });
    
    it('handles custom styles', () => {
      const props: ButtonProps = {
        variant: 'primary',
        size: 'md',
        style: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }
      };
      
      expect(createButtonStyles(props)).toEqual({
        variant: 'primary',
        size: 'md',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      });
    });
    
    it('handles disabled state', () => {
      const props: ButtonProps = {
        variant: 'primary',
        size: 'md',
        isDisabled: true
      };
      
      expect(createButtonStyles(props)).toEqual({
        variant: 'primary',
        size: 'md',
        isDisabled: true,
        opacity: 0.6,
        cursor: 'not-allowed'
      });
    });
    
    it('handles loading state', () => {
      const props: ButtonProps = {
        variant: 'primary',
        size: 'md',
        isLoading: true
      };
      
      expect(createButtonStyles(props)).toEqual({
        variant: 'primary',
        size: 'md',
        isLoading: true,
        position: 'relative',
        pointerEvents: 'none'
      });
    });
  });
  
  describe('extractButtonProps', () => {
    it('extracts button props from object', () => {
      const props = {
        variant: 'primary',
        size: 'md',
        isFullWidth: true,
        onClick: () => {},
        children: 'Text'
      };
      
      expect(extractButtonProps(props)).toEqual({
        variant: 'primary',
        size: 'md',
        isFullWidth: true
      });
    });
    
    it('returns empty object when no button props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text'
      };
      
      expect(extractButtonProps(props)).toEqual({});
    });
  });
  
  describe('filterButtonProps', () => {
    it('removes button props from object', () => {
      const props = {
        variant: 'primary',
        size: 'md',
        isFullWidth: true,
        onClick: () => {},
        children: 'Text'
      };
      
      expect(filterButtonProps(props)).toEqual({
        onClick: props.onClick,
        children: 'Text'
      });
    });
    
    it('returns original object when no button props are found', () => {
      const props = {
        onClick: () => {},
        children: 'Text'
      };
      
      expect(filterButtonProps(props)).toEqual(props);
    });
  });
  
  describe('isButtonProp', () => {
    it('returns true for valid button props', () => {
      expect(isButtonProp('variant')).toBe(true);
      expect(isButtonProp('size')).toBe(true);
      expect(isButtonProp('isFullWidth')).toBe(true);
      expect(isButtonProp('isDisabled')).toBe(true);
      expect(isButtonProp('isLoading')).toBe(true);
      expect(isButtonProp('leftIcon')).toBe(true);
      expect(isButtonProp('rightIcon')).toBe(true);
    });
    
    it('returns false for non-button props', () => {
      expect(isButtonProp('onClick')).toBe(false);
      expect(isButtonProp('children')).toBe(false);
      expect(isButtonProp('ref')).toBe(false);
    });
  });
  
  describe('getButtonStyleProps', () => {
    it('returns all button style prop names', () => {
      const buttonStyleProps = getButtonStyleProps();
      
      expect(buttonStyleProps).toContain('variant');
      expect(buttonStyleProps).toContain('size');
      expect(buttonStyleProps).toContain('isFullWidth');
      expect(buttonStyleProps).toContain('isDisabled');
      expect(buttonStyleProps).toContain('isLoading');
      expect(buttonStyleProps).toContain('leftIcon');
      expect(buttonStyleProps).toContain('rightIcon');
    });
  });
});