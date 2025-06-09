// TODO: forwardRef hinzufügen
// packages/@smolitux/core/src/components/Textarea/Textarea.tsx
// Diese Datei dient als Kompatibilitätsschicht für die TextArea-Komponente
// und leitet alle Aufrufe an die TextArea-Komponente weiter.

import { TextArea, TextAreaProps } from '../TextArea/TextArea';

/**
 * @deprecated Bitte verwenden Sie stattdessen die TextArea-Komponente.
 * Diese Komponente wird in einer zukünftigen Version entfernt.
 */
export const Textarea = TextArea;
export type TextareaProps = TextAreaProps;
export default Textarea;
