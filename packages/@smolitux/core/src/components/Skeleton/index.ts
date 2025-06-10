// packages/@smolitux/core/src/components/Skeleton/index.ts
import { default as BaseSkeleton, type SkeletonProps } from './Skeleton';
import { default as SkeletonA11y, type SkeletonProps as SkeletonA11yProps } from './Skeleton.a11y';

// Erweitere Skeleton um die A11y-Komponente
const Skeleton = Object.assign(BaseSkeleton, {
  A11y: SkeletonA11y,
});

// Exportiere Komponenten und Typen
export { Skeleton };
export type { SkeletonProps, SkeletonA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Skeleton;
