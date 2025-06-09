export const generateId = (() => {
  let count = 0;
  return (prefix = 'id') => `${prefix}-${++count}`;
})();
