import { ColorPicker as BaseColorPicker } from './ColorPicker';
import { A11yColorPicker } from './ColorPicker.a11y';

export type { ColorPickerProps, ColorFormat } from './ColorPicker';
export type { A11yColorPickerProps } from './ColorPicker.a11y';

// Erweitere ColorPicker um die A11y-Komponente
export const ColorPicker = Object.assign(BaseColorPicker, {
  A11y: A11yColorPicker
});

// Fur Abwartskompatibilitat mit dem bestehenden Export
export { ColorPicker as default } from './ColorPicker';