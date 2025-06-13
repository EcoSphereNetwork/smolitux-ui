import React, { forwardRef, useEffect, useId, useState } from 'react';
import { cn } from '@smolitux/utils';

export interface ListboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListboxProps {
  /** Selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Available options */
  options: ListboxOption[];
  /** Disable entire listbox */
  disabled?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** aria-describedby reference */
  ariaDescribedby?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** id attribute */
  id?: string;
  /** Placeholder text if no value */
  placeholder?: string;
  /** Additional className */
  className?: string;
}

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      value,
      onChange,
      options,
      disabled = false,
      ariaLabel,
      ariaDescribedby,
      autoFocus = false,
      id,
      placeholder = 'No options',
      className,
      ...rest
    },
    ref,
  ) => {
    const uid = useId();
    const listId = id || `listbox-${uid}`;
    const [active, setActive] = useState(() =>
      Math.max(0, options.findIndex((o) => o.value === value)),
    );

    useEffect(() => {
      if (autoFocus && ref && 'current' in ref && (ref as any).current) {
        (ref as any).current.focus();
      }
    }, [autoFocus, ref]);

    useEffect(() => {
      const idx = options.findIndex((o) => o.value === value);
      if (idx !== -1) setActive(idx);
    }, [value, options]);

    function nextEnabled(start: number, dir: 1 | -1) {
      let i = start;
      while (i >= 0 && i < options.length) {
        if (!options[i].disabled) return i;
        i += dir;
      }
      return start;
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (disabled) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => nextEnabled(Math.min(i + 1, options.length - 1), 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => nextEnabled(Math.max(i - 1, 0), -1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActive(nextEnabled(0, 1));
      } else if (e.key === 'End') {
        e.preventDefault();
        setActive(nextEnabled(options.length - 1, -1));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const opt = options[active];
        if (opt && !opt.disabled) {
          onChange(opt.value);
        }
      }
    }

    const activeId = options[active] ? `${listId}-option-${active}` : undefined;

    return (
      <div
        ref={ref}
        id={listId}
        role="listbox"
        tabIndex={disabled ? -1 : 0}
        aria-activedescendant={activeId}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        className={cn('smx-listbox border rounded', disabled && 'opacity-50', className)}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {options.length === 0 ? (
          <div className="p-2 text-gray-500" role="option" aria-disabled="true">
            {placeholder}
          </div>
        ) : (
          options.map((opt, i) => {
            const selected = value === opt.value;
            return (
              <div
                key={opt.value}
                id={`${listId}-option-${i}`}
                role="option"
                aria-selected={selected}
                aria-disabled={opt.disabled || undefined}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => !opt.disabled && onChange(opt.value)}
                className={cn(
                  'px-3 py-1 cursor-pointer',
                  selected && 'bg-primary-500 text-white',
                  !selected && active === i && 'bg-primary-100',
                  opt.disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                {opt.label}
              </div>
            );
          })
        )}
      </div>
    );
  },
);

Listbox.displayName = 'Listbox';
export default Listbox;
