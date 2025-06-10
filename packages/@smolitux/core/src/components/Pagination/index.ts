// packages/@smolitux/core/src/components/Pagination/index.ts
import { Pagination as BasePagination } from './Pagination';
import { PaginationA11y } from './Pagination.a11y';

export type { PaginationProps } from './Pagination';
export type { PaginationProps as PaginationA11yProps } from './Pagination.a11y';

// Erweitere Pagination um die A11y-Komponente
export const Pagination = Object.assign(BasePagination, {
  A11y: PaginationA11y,
});

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default Pagination;
