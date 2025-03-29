# Barrierefreiheit Implementierungsbeispiele

Dieses Dokument enthält Beispiele für die Implementierung von Barrierefreiheitsfunktionen in den Smolitux UI Komponenten.

## Carousel

### ARIA-Attribute

```tsx
<div
  role="region"
  aria-label={ariaLabel}
  aria-roledescription="carousel"
  aria-describedby={ariaDescription ? ariaDescriptionId : undefined}
  tabIndex={0}
>
  {/* Slides */}
  <div 
    role="tabpanel"
    aria-hidden={activeIndex !== index}
    aria-label={item.ariaLabel || `Bild ${index + 1}`}
    aria-roledescription="slide"
    tabIndex={activeIndex === index ? 0 : -1}
  >
    {item.content}
  </div>
</div>
```

### Tastaturnavigation

```tsx
const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
  if (disabled) return;
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      goToPrev();
      break;
    case 'ArrowRight':
      e.preventDefault();
      goToNext();
      break;
    case 'Home':
      e.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      e.preventDefault();
      goToSlide(totalItems - 1);
      break;
    case ' ':
    case 'Spacebar': // Für ältere Browser
      e.preventDefault();
      if (autoPlay > 0) {
        togglePause();
      }
      break;
    default:
      break;
  }
}, [autoPlay, disabled, goToNext, goToPrev, goToSlide, togglePause, totalItems]);
```

### Pause-Funktion

```tsx
// Render-Funktion für Pause-Button
const renderPauseButton = () => {
  if (autoPlay <= 0) return null;
  
  return (
    <button
      type="button"
      className="..."
      aria-label={isPaused ? "Wiedergabe starten" : "Wiedergabe pausieren"}
      aria-pressed={isPaused}
      onClick={togglePause}
      disabled={disabled}
      tabIndex={0}
    >
      {isPaused ? (
        <svg aria-hidden="true">...</svg>
      ) : (
        <svg aria-hidden="true">...</svg>
      )}
    </button>
  );
};
```

## ColorPicker

### ARIA-Attribute

```tsx
<button
  ref={triggerRef}
  id={uniqueId}
  type="button"
  name={name}
  onClick={togglePicker}
  className="..."
  aria-haspopup="dialog"
  aria-expanded={isOpen}
  aria-labelledby={label ? labelId : undefined}
  aria-describedby={
    [
      ariaDescription ? descriptionId : null,
      error ? errorId : null,
      helperText && !error ? helperId : null
    ].filter(Boolean).join(' ') || undefined
  }
  aria-invalid={error ? 'true' : undefined}
  aria-required={required ? 'true' : undefined}
  aria-disabled={disabled ? 'true' : undefined}
  disabled={disabled}
>
  {/* Button content */}
</button>

{isOpen && (
  <div
    ref={popoverRef}
    className="..."
    role="dialog"
    aria-modal="true"
    aria-label="Farbwähler"
  >
    {/* Dialog content */}
  </div>
)}
```

### Fokus-Management

```tsx
// Effekt für Fokus-Management
useEffect(() => {
  if (isOpen && colorInputRef.current) {
    // Fokus auf das Farbeingabefeld setzen, wenn der Picker geöffnet wird
    colorInputRef.current.focus();
  }
}, [isOpen]);

// Effekt für Tastatur-Navigation (ESC zum Schließen)
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isOpen && event.key === 'Escape') {
      setIsOpen(false);
      onOpenChange?.(false);
      // Fokus zurück auf den Trigger setzen
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }
  };
  
  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);
  }
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [isOpen, onOpenChange]);
```

### Screenreader-Unterstützung

```tsx
<span className="sr-only">
  Aktuelle Farbe: {colorValueText}. Drücken Sie Enter, um den Farbwähler zu öffnen.
</span>

<p id={`${uniqueId}-color-description`} className="sr-only">
  Verwenden Sie die Pfeiltasten, um die Farbe anzupassen, oder geben Sie einen Hex-Farbwert ein.
</p>
```

## Drawer

### ARIA-Attribute

```tsx
<div
  ref={drawerRef}
  id={uniqueId}
  role="dialog"
  aria-modal="true"
  aria-labelledby={title ? titleId : undefined}
  aria-label={!title ? ariaLabel || 'Drawer' : undefined}
  aria-describedby={ariaDescription ? descriptionId : undefined}
  className="..."
  tabIndex={-1}
>
  {/* Screenreader-Beschreibung */}
  {ariaDescription && (
    <div id={descriptionId} className="sr-only">
      {ariaDescription}
    </div>
  )}
  
  {/* Header */}
  {showHeader && (
    <div className="...">
      <h2 id={titleId} className="...">
        {title}
      </h2>
      <button
        ref={closeButtonRef}
        type="button"
        className="..."
        onClick={onClose}
        aria-label="Schließen"
      >
        <svg aria-hidden="true">...</svg>
      </button>
    </div>
  )}
  
  {/* Content */}
  <div className="...">
    {children}
  </div>
</div>
```

### Focus-Trap

```tsx
// Funktion zum Finden aller fokussierbaren Elemente im Drawer
const getFocusableElements = useCallback(() => {
  if (!drawerRef.current) return [];
  
  return Array.from(
    drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');
}, []);

// ESC-Taste zum Schließen und Focus-Trap
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    // ESC-Taste zum Schließen
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    
    // Tab-Taste für Focus-Trap
    if (e.key === 'Tab') {
      if (!firstFocusableRef.current || !lastFocusableRef.current) return;
      
      // Shift+Tab: Wenn der Fokus auf dem ersten Element ist, gehe zum letzten Element
      if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current.focus();
      }
      // Tab: Wenn der Fokus auf dem letzten Element ist, gehe zum ersten Element
      else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onClose]);
```

### Fokus-Management

```tsx
// Speichere das Element, das vor dem Öffnen des Drawers den Fokus hatte
useEffect(() => {
  if (isOpen) {
    setPreviouslyFocusedElement(document.activeElement as HTMLElement);
  }
}, [isOpen]);

// Setze den Fokus zurück, wenn der Drawer geschlossen wird
useEffect(() => {
  if (!isOpen && previouslyFocusedElement) {
    // Wenn eine ID oder ein Element zum Zurücksetzen des Fokus angegeben wurde, verwende dieses
    if (returnFocusToId) {
      const element = document.getElementById(returnFocusToId);
      if (element) {
        element.focus();
        return;
      }
    }
    
    if (returnFocusToElement) {
      returnFocusToElement.focus();
      return;
    }
    
    // Sonst setze den Fokus auf das Element, das vorher den Fokus hatte
    previouslyFocusedElement.focus();
  }
}, [isOpen, previouslyFocusedElement, returnFocusToId, returnFocusToElement]);
```

## Allgemeine Barrierefreiheitstechniken

### Screenreader-only Text

```tsx
<span className="sr-only">Zusätzliche Informationen für Screenreader</span>
```

### Fokus-Indikatoren

```css
.focus-visible:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
```

### ARIA-live Regionen

```tsx
<div aria-live="polite" className="sr-only">
  {`Bild ${activeIndex + 1} von ${totalItems}${isPaused ? ', Wiedergabe pausiert' : ''}`}
</div>
```

### Tastaturnavigation für Buttons

```tsx
<button
  type="button"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Button Text
</button>
```

### Barrierefreie Fehlermeldungen

```tsx
<div>
  <label htmlFor="input-id">Label</label>
  <input 
    id="input-id"
    aria-invalid={!!error}
    aria-describedby={error ? "error-id" : undefined}
  />
  {error && (
    <p id="error-id" className="text-red-500" role="alert">
      {error}
    </p>
  )}
</div>
```