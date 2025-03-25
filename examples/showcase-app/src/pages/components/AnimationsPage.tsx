import React, { useState } from 'react';
import { 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert,
  Button,
  Fade,
  Zoom,
  Slide,
  Collapse,
  Motion,
  AnimatePresence,
  useAnimation,
  keyframes,
  transitions
} from '@smolitux/core';

const AnimationsPage: React.FC = () => {
  const t = useTranslation();
  
  // Zustände für die verschiedenen Animationen
  const [fadeVisible, setFadeVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [slideVisible, setSlideVisible] = useState(false);
  const [collapseVisible, setCollapseVisible] = useState(false);
  const [items, setItems] = useState([1, 2, 3]);
  
  // Animation Controls
  const controls = useAnimation();
  
  // Benutzerdefinierte Keyframes
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
  
  // Animationssequenz
  const playSequence = async () => {
    await controls.start({ x: 100, transition: { duration: 0.5 } });
    await controls.start({ y: 50, transition: { duration: 0.5 } });
    await controls.start({ rotate: 180, transition: { duration: 0.5 } });
    await controls.start({ 
      x: 0, 
      y: 0, 
      rotate: 0, 
      transition: { duration: 0.8, ease: 'easeInOut' } 
    });
  };
  
  // Funktion zum Hinzufügen eines Elements
  const addItem = () => {
    const newItem = Math.max(...items) + 1;
    setItems([...items, newItem]);
  };
  
  // Funktion zum Entfernen eines Elements
  const removeItem = (id: number) => {
    setItems(items.filter(item => item !== id));
  };

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.components'), href: '#' },
          { label: t('components.animations'), href: '/components/animations' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('components.animations')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('animationsPage.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('animationsPage.basicTransitions')}</h2>
        
        <div className="component-grid">
          <Card className="p-2">
            <h3>Fade</h3>
            <div className="mb-2">
              <Button 
                variant="primary" 
                onClick={() => setFadeVisible(!fadeVisible)}
              >
                {fadeVisible ? t('animationsPage.hide') : t('animationsPage.show')}
              </Button>
            </div>
            
            <div style={{ height: '100px', border: '1px dashed #ccc' }}>
              <Fade in={fadeVisible}>
                <div className="p-2 bg-primary text-white">
                  {t('animationsPage.fadeContent')}
                </div>
              </Fade>
            </div>
            
            <div className="code-block mt-2">
              {`<Fade in={visible}>
  <div>Content</div>
</Fade>`}
            </div>
          </Card>
          
          <Card className="p-2">
            <h3>Zoom</h3>
            <div className="mb-2">
              <Button 
                variant="primary" 
                onClick={() => setZoomVisible(!zoomVisible)}
              >
                {zoomVisible ? t('animationsPage.hide') : t('animationsPage.show')}
              </Button>
            </div>
            
            <div style={{ height: '100px', border: '1px dashed #ccc' }}>
              <Zoom in={zoomVisible}>
                <div className="p-2 bg-secondary text-white">
                  {t('animationsPage.zoomContent')}
                </div>
              </Zoom>
            </div>
            
            <div className="code-block mt-2">
              {`<Zoom in={visible}>
  <div>Content</div>
</Zoom>`}
            </div>
          </Card>
          
          <Card className="p-2">
            <h3>Slide</h3>
            <div className="mb-2">
              <Button 
                variant="primary" 
                onClick={() => setSlideVisible(!slideVisible)}
              >
                {slideVisible ? t('animationsPage.hide') : t('animationsPage.show')}
              </Button>
            </div>
            
            <div style={{ height: '100px', border: '1px dashed #ccc' }}>
              <Slide in={slideVisible} direction="right">
                <div className="p-2 bg-success text-white">
                  {t('animationsPage.slideContent')}
                </div>
              </Slide>
            </div>
            
            <div className="code-block mt-2">
              {`<Slide in={visible} direction="right">
  <div>Content</div>
</Slide>`}
            </div>
          </Card>
          
          <Card className="p-2">
            <h3>Collapse</h3>
            <div className="mb-2">
              <Button 
                variant="primary" 
                onClick={() => setCollapseVisible(!collapseVisible)}
              >
                {collapseVisible ? t('animationsPage.hide') : t('animationsPage.show')}
              </Button>
            </div>
            
            <div style={{ border: '1px dashed #ccc' }}>
              <Collapse in={collapseVisible}>
                <div className="p-2 bg-danger text-white">
                  {t('animationsPage.collapseContent')}
                </div>
              </Collapse>
            </div>
            
            <div className="code-block mt-2">
              {`<Collapse in={visible}>
  <div>Content</div>
</Collapse>`}
            </div>
          </Card>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">{t('animationsPage.animatePresence')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <Button 
              variant="primary" 
              onClick={addItem}
            >
              {t('animationsPage.addItem')}
            </Button>
          </div>
          
          <ul className="mb-2" style={{ minHeight: '200px' }}>
            <AnimatePresence>
              {items.map(item => (
                <Motion
                  key={item}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <li className="p-2 mb-1 bg-light" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {t('animationsPage.item')} {item}
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeItem(item)}
                    >
                      {t('animationsPage.remove')}
                    </Button>
                  </li>
                </Motion>
              ))}
            </AnimatePresence>
          </ul>
          
          <div className="code-block">
            {`<AnimatePresence>
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
        <Button onClick={() => removeItem(item)}>
          Remove
        </Button>
      </li>
    </Motion>
  ))}
</AnimatePresence>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('animationsPage.customAnimations')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <Motion
              animate={{
                animation: bounce,
                duration: '1s',
                iterationCount: 'infinite'
              }}
            >
              <div 
                className="bg-primary" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%',
                  margin: '0 auto'
                }} 
              />
            </Motion>
          </div>
          
          <div className="code-block">
            {`// Definieren Sie Keyframes für die Animation
const bounce = keyframes\`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
\`;

// Verwenden Sie die Animation
<Motion
  animate={{
    animation: bounce,
    duration: '1s',
    iterationCount: 'infinite'
  }}
>
  <div className="ball" />
</Motion>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('animationsPage.animationControls')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <Button 
              variant="primary" 
              onClick={playSequence}
              className="mr-2"
            >
              {t('animationsPage.playSequence')}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => controls.stop()}
              className="mr-2"
            >
              {t('animationsPage.stop')}
            </Button>
            <Button 
              variant="danger" 
              onClick={() => controls.set({ x: 0, y: 0, rotate: 0 })}
            >
              {t('animationsPage.reset')}
            </Button>
          </div>
          
          <div style={{ height: '200px', border: '1px dashed #ccc', position: 'relative' }}>
            <Motion animate={controls}>
              <div 
                className="bg-primary" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-25px',
                  marginLeft: '-25px'
                }} 
              />
            </Motion>
          </div>
          
          <div className="code-block mt-2">
            {`// Animation Controls
const controls = useAnimation();

// Animationssequenz
const playSequence = async () => {
  await controls.start({ x: 100, transition: { duration: 0.5 } });
  await controls.start({ y: 50, transition: { duration: 0.5 } });
  await controls.start({ rotate: 180, transition: { duration: 0.5 } });
  await controls.start({ 
    x: 0, 
    y: 0, 
    rotate: 0, 
    transition: { duration: 0.8, ease: 'easeInOut' } 
  });
};

// Verwenden der Controls
<Motion animate={controls}>
  <div className="box" />
</Motion>`}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnimationsPage;