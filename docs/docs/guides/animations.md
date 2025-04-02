# Animationen und Übergänge

Die Smolitux UI Bibliothek bietet ein leistungsstarkes Animationssystem, das die Erstellung von flüssigen und ansprechenden Benutzeroberflächen erleichtert.

## Überblick

Das Animationssystem besteht aus mehreren Komponenten:

- **Komponenten**: `Fade`, `Zoom`, `Slide`, `Collapse` für häufig verwendete Animationseffekte
- **Hooks**: `useTransition` und `useAnimation` für benutzerdefinierte Animationen
- **Hilfsfunktionen**: `keyframes`, `createTransition` für die Definition von Animationen
- **Komponenten**: `Motion` und `AnimatePresence` für komplexe Animationen

## Grundlegende Verwendung

### Einfache Übergangseffekte

```tsx
import { Fade, Button } from '@smolitux/core';
import { useState } from 'react';

function FadeExample() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Ausblenden' : 'Einblenden'}
      </Button>
      
      <Fade in={isVisible}>
        <div className="content-box">
          Dieser Inhalt wird ein- und ausgeblendet.
        </div>
      </Fade>
    </div>
  );
}
```

### Verschiedene Animationskomponenten

```tsx
import { Fade, Zoom, Slide, Collapse, Button } from '@smolitux/core';
import { useState } from 'react';

function AnimationExamples() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Ausblenden' : 'Einblenden'}
      </Button>
      
      <h3>Fade</h3>
      <Fade in={isVisible}>
        <div className="content-box">Fade-Effekt</div>
      </Fade>
      
      <h3>Zoom</h3>
      <Zoom in={isVisible}>
        <div className="content-box">Zoom-Effekt</div>
      </Zoom>
      
      <h3>Slide</h3>
      <Slide in={isVisible} direction="right">
        <div className="content-box">Slide-Effekt</div>
      </Slide>
      
      <h3>Collapse</h3>
      <Collapse in={isVisible}>
        <div className="content-box">Collapse-Effekt</div>
      </Collapse>
    </div>
  );
}
```

## Erweiterte Funktionen

### Anpassung von Übergängen

Sie können die Übergänge anpassen:

```tsx
import { Fade } from '@smolitux/core';

function CustomFade() {
  return (
    <Fade
      in={true}
      timeout={500}        // Dauer in Millisekunden
      transition="easeOut" // Übergangstyp
      appear={true}        // Animation beim ersten Rendern
    >
      <div>Angepasster Fade-Effekt</div>
    </Fade>
  );
}
```

### Verwendung des useTransition Hooks

Für mehr Kontrolle können Sie den `useTransition` Hook verwenden:

```tsx
import { useTransition } from '@smolitux/core';
import { useState } from 'react';

function CustomTransition() {
  const [isVisible, setIsVisible] = useState(false);
  
  const { state, isVisible: visible, ref, style } = useTransition({
    in: isVisible,
    timeout: 300,
    transition: 'easeInOut',
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    onEntered: () => console.log('Transition completed'),
    onExited: () => console.log('Exit completed')
  });
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
      
      {visible && (
        <div ref={ref} style={style} data-state={state}>
          Dieser Inhalt wird animiert.
        </div>
      )}
    </div>
  );
}
```

### Benutzerdefinierte Animationen mit Motion

Für komplexere Animationen können Sie die `Motion` Komponente verwenden:

```tsx
import { Motion, keyframes } from '@smolitux/core';

// Definieren Sie Keyframes für die Animation
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

function BounceAnimation() {
  return (
    <Motion
      animate={{
        animation: bounce,
        duration: '1s',
        iterationCount: 'infinite'
      }}
    >
      <div className="ball" />
    </Motion>
  );
}
```

### Animationsvarianten

Sie können verschiedene Animationsvarianten definieren:

```tsx
import { Motion } from '@smolitux/core';
import { useState } from 'react';

function VariantAnimation() {
  const [isActive, setIsActive] = useState(false);
  
  const variants = {
    inactive: {
      scale: 1,
      backgroundColor: '#ccc'
    },
    active: {
      scale: 1.2,
      backgroundColor: '#f00'
    }
  };
  
  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        Toggle
      </button>
      
      <Motion
        variants={variants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.3 }}
      >
        <div className="box" />
      </Motion>
    </div>
  );
}
```

### AnimatePresence für Animationen beim Entfernen von Elementen

Die `AnimatePresence` Komponente ermöglicht Animationen beim Entfernen von Elementen aus dem DOM:

```tsx
import { AnimatePresence, Motion } from '@smolitux/core';
import { useState } from 'react';

function AnimatePresenceExample() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const removeItem = (id) => {
    setItems(items.filter(item => item !== id));
  };
  
  return (
    <div>
      <button onClick={() => setItems([...items, items.length + 1])}>
        Item hinzufügen
      </button>
      
      <ul>
        <AnimatePresence>
          {items.map(item => (
            <Motion
              key={item}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <li>
                Item {item}
                <button onClick={() => removeItem(item)}>Entfernen</button>
              </li>
            </Motion>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
```

## Animationsübergänge

Die Bibliothek bietet verschiedene vordefinierte Übergänge:

- `fade`: Ein- und Ausblenden
- `scale`: Skalierung
- `slide`: Gleiten von einer Seite
- `collapse`: Zusammenklappen
- `rotate`: Rotation
- `easeIn`: Beschleunigung
- `easeOut`: Verlangsamung
- `easeInOut`: Beschleunigung und Verlangsamung
- `bounce`: Federnder Effekt
- `elastic`: Elastischer Effekt

Sie können auch benutzerdefinierte Übergänge erstellen:

```tsx
import { createTransition, Fade } from '@smolitux/core';

// Benutzerdefinierter Übergang
const customTransition = createTransition({
  entering: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  exiting: {
    opacity: 0,
    transform: 'translateY(-20px)'
  },
  duration: 400,
  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
});

function CustomTransitionExample() {
  return (
    <Fade in={true} transition={customTransition}>
      <div>Benutzerdefinierter Übergang</div>
    </Fade>
  );
}
```

## Animationssteuerung

Mit dem `useAnimation` Hook können Sie Animationen programmatisch steuern:

```tsx
import { useAnimation, Motion } from '@smolitux/core';
import { useEffect } from 'react';

function ControlledAnimation() {
  const controls = useAnimation();
  
  // Animation starten
  const startAnimation = () => {
    controls.start({
      x: 100,
      transition: { duration: 0.5 }
    });
  };
  
  // Animation stoppen
  const stopAnimation = () => {
    controls.stop();
  };
  
  // Animation zurücksetzen
  const resetAnimation = () => {
    controls.set({ x: 0 });
  };
  
  return (
    <div>
      <div>
        <button onClick={startAnimation}>Start</button>
        <button onClick={stopAnimation}>Stop</button>
        <button onClick={resetAnimation}>Reset</button>
      </div>
      
      <Motion animate={controls}>
        <div className="box" />
      </Motion>
    </div>
  );
}
```

## Animationssequenzen

Sie können auch Animationssequenzen erstellen:

```tsx
import { useAnimation, Motion } from '@smolitux/core';

function SequenceAnimation() {
  const controls = useAnimation();
  
  const playSequence = async () => {
    await controls.start({ x: 100, transition: { duration: 0.5 } });
    await controls.start({ y: 100, transition: { duration: 0.5 } });
    await controls.start({ x: 0, transition: { duration: 0.5 } });
    await controls.start({ y: 0, transition: { duration: 0.5 } });
  };
  
  return (
    <div>
      <button onClick={playSequence}>Sequenz abspielen</button>
      
      <Motion animate={controls}>
        <div className="box" />
      </Motion>
    </div>
  );
}
```

## Zusammenfassung

Das Animationssystem der Smolitux UI Bibliothek bietet:

- Einfache Komponenten für häufig verwendete Animationseffekte
- Hooks für benutzerdefinierte Animationen
- Unterstützung für komplexe Animationen und Übergänge
- Programmatische Steuerung von Animationen
- Animationssequenzen
- Vordefinierte und benutzerdefinierte Übergänge