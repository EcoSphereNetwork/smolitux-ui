// packages/@smolitux/core/src/components/Accordion/Accordion.tsx
import React, { useState, createContext, useContext } from 'react';

// Context für den Accordion
interface AccordionContextProps {
  /** Geöffnetes Panel (oder mehrere) */
  openItems: string[];
  /** Panel öffnen/schließen */
  toggleItem: (id: string) => void;
  /** Mehrere Panels gleichzeitig öffnen */
  allowMultiple: boolean;
  /** Variante des Accordions */
  variant: 'default' | 'bordered' | 'separated';
  /** Stil der Icons */
  iconStyle: 'arrow' | 'plus' | 'chevron' | 'none';
  /** ID des Accordions */
  id: string;
  /** Lokalisierungsobjekt */
  i18n: {
    /** Text für Screenreader, wenn ein Panel geöffnet wird */
    expand: string;
    /** Text für Screenreader, wenn ein Panel geschlossen wird */
    collapse: string;
  };
}

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

// Hook für die Verwendung des Accordion-Contexts
export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionProvider');
  }
  return context;
};

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kinder-Elemente (AccordionItem) */
  children: React.ReactNode;
  /** ID des anfänglich geöffneten Panels */
  defaultOpenItems?: string | string[];
  /** Mehrere Panels gleichzeitig öffnen */
  allowMultiple?: boolean;
  /** Variante des Accordions */
  variant?: 'default' | 'bordered' | 'separated';
  /** Stil der Icons */
  iconStyle?: 'arrow' | 'plus' | 'chevron' | 'none';
  /** Callback bei Panel-Öffnung/Schließung */
  onChange?: (openItems: string[]) => void;
  /** ID für das Accordion */
  id?: string;
  /** Lokalisierungsobjekt */
  i18n?: {
    /** Text für Screenreader, wenn ein Panel geöffnet wird */
    expand?: string;
    /** Text für Screenreader, wenn ein Panel geschlossen wird */
    collapse?: string;
  };
  /** Animationen aktivieren */
  animated?: boolean;
  /** Tastaturnavigation deaktivieren */
  keyboardNavigation?: boolean;
  /** Automatische Fokussierung des geöffneten Panels */
  autoFocus?: boolean;
}

/**
 * Accordion-Komponente für ausklappbare Inhalte
 * 
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem title="Abschnitt 1">
 *     Inhalt von Abschnitt 1...
 *   </AccordionItem>
 *   <AccordionItem title="Abschnitt 2">
 *     Inhalt von Abschnitt 2...
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpenItems = [],
  allowMultiple = false,
  variant = 'default',
  iconStyle = 'chevron',
  onChange,
  className = '',
  id,
  i18n = {
    expand: 'Erweitern',
    collapse: 'Einklappen'
  },
  animated = true,
  keyboardNavigation = true,
  autoFocus = true,
  ...rest
}) => {
  // Umwandlung von String zu Array für defaultOpenItems
  const defaultItems = typeof defaultOpenItems === 'string' 
    ? [defaultOpenItems] 
    : defaultOpenItems;
  
  // Generiere eine eindeutige ID für das Accordion
  const accordionId = id || `accordion-${Math.random().toString(36).substr(2, 9)}`;
  
  // State für geöffnete Panels
  const [openItems, setOpenItems] = useState<string[]>(defaultItems);
  
  // Panel öffnen/schließen
  const toggleItem = (id: string) => {
    setOpenItems(prevOpenItems => {
      let newOpenItems: string[];
      
      if (prevOpenItems.includes(id)) {
        // Schließen
        newOpenItems = prevOpenItems.filter(item => item !== id);
      } else {
        // Öffnen
        newOpenItems = allowMultiple 
          ? [...prevOpenItems, id] 
          : [id];
      }
      
      // Callback auslösen
      if (onChange) {
        onChange(newOpenItems);
      }
      
      return newOpenItems;
    });
  };
  
  // Context-Wert erstellen
  const contextValue: AccordionContextProps = {
    openItems,
    toggleItem,
    allowMultiple,
    variant,
    iconStyle,
    id: accordionId,
    i18n: {
      expand: i18n.expand || 'Erweitern',
      collapse: i18n.collapse || 'Einklappen'
    }
  };
  
  // Varianten-spezifische Klassen
  const variantClasses = {
    default: '',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-lg',
    separated: 'space-y-2'
  };
  
  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        className={`${variantClasses[variant]} ${animated ? 'accordion-animated' : ''} ${className}`}
        id={accordionId}
        role="region"
        aria-multiselectable={allowMultiple}
        data-testid="accordion"
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
