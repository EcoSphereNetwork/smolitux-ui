declare global {
  namespace jest {
    interface Matchers<R> {
      toBeFocusable(): R;
      toHaveVisibleFocusIndicator(): R;
    }
  }
}
export {};
