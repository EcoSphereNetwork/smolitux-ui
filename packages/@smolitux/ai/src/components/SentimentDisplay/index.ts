import {
  SentimentDisplay as BaseSentimentDisplay,
  SentimentScore,
  EmotionScore,
  SentimentTrend,
  SentimentTopic,
  SentimentDisplayProps,
} from './SentimentDisplay';
import {
  default as SentimentDisplayA11y,
  SentimentDisplayA11yProps,
} from './SentimentDisplay.a11y';

// Erweitere SentimentDisplay um die A11y-Komponente
const SentimentDisplay = Object.assign(BaseSentimentDisplay, {
  A11y: SentimentDisplayA11y,
});

// Exportiere Komponenten und Typen
export { SentimentDisplay, SentimentScore, EmotionScore, SentimentTrend, SentimentTopic };
export type { SentimentDisplayProps, SentimentDisplayA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default SentimentDisplay;
