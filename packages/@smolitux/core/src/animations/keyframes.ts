/**
 * Vordefinierte Keyframe-Animationen für die Verwendung in Komponenten
 */

export const keyframes = {
  // Fade Animationen
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  // Slide Animationen
  slideInRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideOutRight: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(100%)' },
  },
  slideInLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideOutLeft: {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-100%)' },
  },
  slideInUp: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideOutUp: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(-100%)' },
  },
  slideInDown: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideOutDown: {
    from: { transform: 'translateY(0)' },
    to: { transform: 'translateY(100%)' },
  },

  // Scale Animationen
  zoomIn: {
    from: { transform: 'scale(0.5)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  zoomOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0.5)', opacity: 0 },
  },

  // Rotate Animationen
  rotateIn: {
    from: { transform: 'rotate(-90deg)', opacity: 0 },
    to: { transform: 'rotate(0)', opacity: 1 },
  },
  rotateOut: {
    from: { transform: 'rotate(0)', opacity: 1 },
    to: { transform: 'rotate(90deg)', opacity: 0 },
  },

  // Bounce Animationen
  bounceIn: {
    '0%': { transform: 'scale(0.3)', opacity: 0 },
    '50%': { transform: 'scale(1.05)', opacity: 0.9 },
    '70%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)', opacity: 1 },
  },
  bounceOut: {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '20%': { transform: 'scale(0.9)', opacity: 0.9 },
    '50%': { transform: 'scale(1.05)', opacity: 0.5 },
    '100%': { transform: 'scale(0.3)', opacity: 0 },
  },

  // Flip Animationen
  flipInX: {
    '0%': { transform: 'perspective(400px) rotateX(90deg)', opacity: 0 },
    '40%': { transform: 'perspective(400px) rotateX(-10deg)' },
    '70%': { transform: 'perspective(400px) rotateX(10deg)' },
    '100%': { transform: 'perspective(400px) rotateX(0)', opacity: 1 },
  },
  flipOutX: {
    '0%': { transform: 'perspective(400px) rotateX(0)', opacity: 1 },
    '30%': { transform: 'perspective(400px) rotateX(-10deg)', opacity: 0.7 },
    '100%': { transform: 'perspective(400px) rotateX(90deg)', opacity: 0 },
  },
  flipInY: {
    '0%': { transform: 'perspective(400px) rotateY(90deg)', opacity: 0 },
    '40%': { transform: 'perspective(400px) rotateY(-10deg)' },
    '70%': { transform: 'perspective(400px) rotateY(10deg)' },
    '100%': { transform: 'perspective(400px) rotateY(0)', opacity: 1 },
  },
  flipOutY: {
    '0%': { transform: 'perspective(400px) rotateY(0)', opacity: 1 },
    '30%': { transform: 'perspective(400px) rotateY(-10deg)', opacity: 0.7 },
    '100%': { transform: 'perspective(400px) rotateY(90deg)', opacity: 0 },
  },

  // Spezielle Animationen
  pulse: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
  },
  swing: {
    '20%': { transform: 'rotate(15deg)' },
    '40%': { transform: 'rotate(-10deg)' },
    '60%': { transform: 'rotate(5deg)' },
    '80%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
  tada: {
    '0%': { transform: 'scale(1)' },
    '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
    '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
    '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
    '100%': { transform: 'scale(1) rotate(0)' },
  },

  // Loader Animationen
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  ping: {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '75%, 100%': { transform: 'scale(2)', opacity: 0 },
  },
  blink: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
};

export type KeyframeAnimation = keyof typeof keyframes;

export default keyframes;
