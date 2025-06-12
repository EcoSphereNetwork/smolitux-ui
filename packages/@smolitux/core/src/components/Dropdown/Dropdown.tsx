import React, { useState, useRef, useEffect, forwardRef } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  group?: string;
}

export interface DropdownProps {
  /** Current selected value */
  value: string;
  /** Options to display */
  options: DropdownOption[];
  /** Change handler */
  onChange: (value: string) => void;
  /** Disable the dropdown */
  disabled?: boolean;
  /** Optional label */
  label?: string;
  /** Enable search input */
  searchable?: boolean;
  /** Group options by their `group` field */
  grouped?: boolean;
  /** Optional id for the dropdown */
  id?: string;
  className?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      value,
      options,
      onChange,
      disabled = false,
      label,
      searchable = false,
      grouped = false,
      id,
      className = '',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlight, setHighlight] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const dropdownId = id || `dropdown-${Math.random().toString(36).slice(2, 9)}`;
    const listId = `${dropdownId}-list`;

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const groupedOptions = grouped
      ? filteredOptions.reduce<Record<string, DropdownOption[]>>((acc, opt) => {
          const g = opt.group || 'other';
          acc[g] = acc[g] || [];
          acc[g].push(opt);
          return acc;
        }, {})
      : { all: filteredOptions };

    const toggleOpen = () => {
      if (!disabled) setOpen((o) => !o);
    };

    const close = () => setOpen(false);

    const handleSelect = (val: string) => {
      onChange(val);
      setHighlight(val);
      close();
      buttonRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const opts = filteredOptions;
        const currentIndex = opts.findIndex((o) => o.value === highlight);
        const nextIndex =
          e.key === 'ArrowDown'
            ? Math.min(currentIndex + 1, opts.length - 1)
            : Math.max(currentIndex - 1, 0);
        const next = opts[nextIndex];
        if (next) {
          setHighlight(next.value);
          const li = document.getElementById(`${dropdownId}-option-${next.value}`) as HTMLElement | null;
          if (li && typeof li.scrollIntoView === 'function') {
            li.scrollIntoView({ block: 'nearest' });
          }
        }
      } else if (e.key === 'Enter' && open && highlight) {
        e.preventDefault();
        handleSelect(highlight);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };

    useEffect(() => {
      if (open) {
        const listener = (evt: MouseEvent) => {
          if (
            listRef.current &&
            !listRef.current.contains(evt.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(evt.target as Node)
          ) {
            close();
          }
        };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
      }
    }, [open]);

    return (
      <div ref={ref} className={className}>
        {label && (
          <label htmlFor={dropdownId} className="block mb-1 text-sm font-medium">
            {label}
          </label>
        )}
        {searchable && open && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-1 w-full border px-2 py-1 text-sm"
            placeholder="Search..."
            data-testid="dropdown-search"
          />
        )}
        <button
          ref={buttonRef}
          id={dropdownId}
          type="button"
          disabled={disabled}
          className="border px-3 py-1 rounded w-full text-left"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={highlight ? `${dropdownId}-option-${highlight}` : undefined}
          aria-disabled={disabled}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          data-testid="dropdown-button"
        >
          {options.find((o) => o.value === value)?.label || 'Select'}
        </button>
        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="mt-1 max-h-60 overflow-auto border rounded bg-white shadow"
            data-testid="dropdown-list"
          >
            {Object.entries(groupedOptions).map(([group, opts]) => (
              <React.Fragment key={group}>
                {grouped && group !== 'other' && (
                  <li className="px-3 py-1 text-xs font-semibold text-gray-500" role="presentation">
                    {group}
                  </li>
                )}
                {opts.map((opt) => (
                  <li
                    key={opt.value}
                    id={`${dropdownId}-option-${opt.value}`}
                    role="option"
                    aria-selected={value === opt.value}
                    className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                      highlight === opt.value ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlight(opt.value)}
                  >
                    {opt.label}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
