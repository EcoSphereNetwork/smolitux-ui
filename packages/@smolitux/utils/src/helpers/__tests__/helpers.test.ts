import {
  debounce,
  throttle,
  memoize,
  deepClone,
  deepMerge,
  generateUUID,
  sleep,
  retry,
  groupBy,
  sortBy,
  chunk
} from './helpers';

describe('helpers', () => {
  describe('debounce', () => {
    jest.useFakeTimers();

    it('delays function execution until after wait time', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(500);
      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(500);
      expect(func).toBeCalled();
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('only executes the function once if called multiple times within wait period', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('executes the function with the latest arguments', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc('first');
      debouncedFunc('second');
      debouncedFunc('third');

      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledWith('third');
    });

    it('executes immediately with immediate option', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000, true);

      debouncedFunc();
      expect(func).toBeCalled();
      expect(func).toHaveBeenCalledTimes(1);

      // Should not call again if invoked during wait time
      debouncedFunc();
      expect(func).toHaveBeenCalledTimes(1);

      // After wait time, it can be called again
      jest.advanceTimersByTime(1000);
      debouncedFunc();
      expect(func).toHaveBeenCalledTimes(2);
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    it('executes the function immediately', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 1000);

      throttledFunc();
      expect(func).toBeCalled();
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('limits the number of calls within the wait period', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 1000);

      throttledFunc();
      throttledFunc();
      throttledFunc();

      expect(func).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledTimes(2);
    });

    it('executes with the latest arguments after wait period', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 1000);

      throttledFunc('first');
      throttledFunc('second');
      throttledFunc('third');

      expect(func).toHaveBeenCalledWith('first');

      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledWith('third');
    });

    it('executes at trailing edge with trailing option', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 1000, { trailing: true, leading: false });

      throttledFunc();
      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(1000);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('memoize', () => {
    it('caches function results based on arguments', () => {
      const func = jest.fn((a, b) => a + b);
      const memoizedFunc = memoize(func);

      expect(memoizedFunc(1, 2)).toBe(3);
      expect(func).toHaveBeenCalledTimes(1);

      expect(memoizedFunc(1, 2)).toBe(3);
      expect(func).toHaveBeenCalledTimes(1);

      expect(memoizedFunc(2, 3)).toBe(5);
      expect(func).toHaveBeenCalledTimes(2);
    });

    it('uses custom resolver if provided', () => {
      const func = jest.fn((a, b) => a + b);
      const resolver = jest.fn((a, b) => `${a}-${b}`);
      const memoizedFunc = memoize(func, resolver);

      memoizedFunc(1, 2);
      expect(resolver).toHaveBeenCalledWith(1, 2);

      memoizedFunc(1, 2);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('handles edge cases', () => {
      const func = jest.fn(() => null);
      const memoizedFunc = memoize(func);

      expect(memoizedFunc()).toBe(null);
      expect(memoizedFunc()).toBe(null);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('deepClone', () => {
    it('creates a deep copy of objects', () => {
      const original = {
        a: 1,
        b: { c: 2, d: [3, 4, { e: 5 }] },
        f: new Date(),
        g: /test/,
        h: null,
        i: undefined
      };

      const clone = deepClone(original);

      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone.b).not.toBe(original.b);
      expect(clone.b.d).not.toBe(original.b.d);
      expect(clone.b.d[2]).not.toBe(original.b.d[2]);
      expect(clone.f).toEqual(original.f);
      expect(clone.g).toEqual(original.g);
    });

    it('handles arrays', () => {
      const original = [1, 2, [3, 4, { a: 5 }]];
      const clone = deepClone(original);

      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone[2]).not.toBe(original[2]);
      expect(clone[2][2]).not.toBe(original[2][2]);
    });

    it('handles primitive values', () => {
      expect(deepClone(1)).toBe(1);
      expect(deepClone('test')).toBe('test');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('handles circular references', () => {
      const original = { a: 1 };
      original.self = original;

      const clone = deepClone(original);
      expect(clone.a).toBe(1);
      expect(clone.self).toBe(clone);
    });
  });

  describe('deepMerge', () => {
    it('merges objects deeply', () => {
      const obj1 = {
        a: 1,
        b: { c: 2, d: 3 },
        e: [1, 2]
      };

      const obj2 = {
        b: { d: 4, f: 5 },
        e: [3, 4],
        g: 6
      };

      const result = deepMerge(obj1, obj2);

      expect(result).toEqual({
        a: 1,
        b: { c: 2, d: 4, f: 5 },
        e: [3, 4],
        g: 6
      });
    });

    it('does not modify source objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { b: { d: 3 } };

      const result = deepMerge(obj1, obj2);

      expect(obj1).toEqual({ a: 1, b: { c: 2 } });
      expect(obj2).toEqual({ b: { d: 3 } });
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 } });
    });

    it('handles arrays', () => {
      const obj1 = { a: [1, 2] };
      const obj2 = { a: [3, 4] };

      const result = deepMerge(obj1, obj2);
      expect(result).toEqual({ a: [3, 4] });
    });

    it('handles null and undefined values', () => {
      const obj1 = { a: null, b: 1 };
      const obj2 = { a: 2, c: undefined };

      const result = deepMerge(obj1, obj2);
      expect(result).toEqual({ a: 2, b: 1, c: undefined });
    });

    it('merges multiple objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };

      const result = deepMerge(obj1, obj2, obj3);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('generateUUID', () => {
    it('generates a valid UUID', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it('generates unique UUIDs', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('sleep', () => {
    jest.useFakeTimers();

    it('returns a promise that resolves after the specified time', async () => {
      const callback = jest.fn();
      const promise = sleep(1000).then(callback);

      expect(callback).not.toBeCalled();

      jest.advanceTimersByTime(1000);
      await promise;

      expect(callback).toBeCalled();
    });
  });

  describe('retry', () => {
    jest.useFakeTimers();

    it('retries a function until it succeeds', async () => {
      let attempts = 0;
      const func = jest.fn().mockImplementation(() => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Fail');
        }
        return 'success';
      });

      const promise = retry(func, { retries: 3, delay: 1000 });

      jest.advanceTimersByTime(1000);
      jest.advanceTimersByTime(1000);
      const result = await promise;

      expect(func).toHaveBeenCalledTimes(3);
      expect(result).toBe('success');
    });

    it('fails after maximum retries', async () => {
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Fail');
      });

      const promise = retry(func, { retries: 3, delay: 1000 });

      jest.advanceTimersByTime(1000);
      jest.advanceTimersByTime(1000);
      jest.advanceTimersByTime(1000);

      await expect(promise).rejects.toThrow('Fail');
      expect(func).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });

    it('uses exponential backoff if specified', async () => {
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Fail');
      });

      const promise = retry(func, { retries: 3, delay: 1000, backoff: true });

      jest.advanceTimersByTime(1000); // First retry after 1000ms
      jest.advanceTimersByTime(2000); // Second retry after 2000ms
      jest.advanceTimersByTime(4000); // Third retry after 4000ms

      await expect(promise).rejects.toThrow('Fail');
      expect(func).toHaveBeenCalledTimes(4);
    });
  });

  describe('groupBy', () => {
    it('groups array items by key', () => {
      const items = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
        { id: 4, category: 'C' },
        { id: 5, category: 'B' }
      ];

      const result = groupBy(items, 'category');

      expect(result).toEqual({
        A: [
          { id: 1, category: 'A' },
          { id: 3, category: 'A' }
        ],
        B: [
          { id: 2, category: 'B' },
          { id: 5, category: 'B' }
        ],
        C: [
          { id: 4, category: 'C' }
        ]
      });
    });

    it('groups by function', () => {
      const items = [1, 2, 3, 4, 5, 6];
      const result = groupBy(items, (num) => num % 2 === 0 ? 'even' : 'odd');

      expect(result).toEqual({
        even: [2, 4, 6],
        odd: [1, 3, 5]
      });
    });

    it('handles empty arrays', () => {
      expect(groupBy([], 'key')).toEqual({});
    });

    it('handles missing keys', () => {
      const items = [{ id: 1 }, { id: 2, category: 'A' }];
      const result = groupBy(items, 'category');

      expect(result).toEqual({
        undefined: [{ id: 1 }],
        A: [{ id: 2, category: 'A' }]
      });
    });
  });

  describe('sortBy', () => {
    it('sorts array by key in ascending order', () => {
      const items = [
        { id: 3, name: 'C' },
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ];

      const result = sortBy(items, 'id');

      expect(result).toEqual([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' }
      ]);
    });

    it('sorts array by key in descending order', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 3, name: 'C' },
        { id: 2, name: 'B' }
      ];

      const result = sortBy(items, 'id', 'desc');

      expect(result).toEqual([
        { id: 3, name: 'C' },
        { id: 2, name: 'B' },
        { id: 1, name: 'A' }
      ]);
    });

    it('sorts by function', () => {
      const items = ['apple', 'banana', 'cherry'];
      const result = sortBy(items, (item) => item.length);

      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('handles empty arrays', () => {
      expect(sortBy([], 'key')).toEqual([]);
    });

    it('handles missing keys', () => {
      const items = [{ id: 2 }, { id: 1, name: 'A' }];
      const result = sortBy(items, 'name');

      // Items with undefined values typically come first in ascending sort
      expect(result[0]).toEqual({ id: 2 });
      expect(result[1]).toEqual({ id: 1, name: 'A' });
    });
  });

  describe('chunk', () => {
    it('splits array into chunks of specified size', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = chunk(array, 3);

      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10]
      ]);
    });

    it('handles empty arrays', () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it('handles size larger than array length', () => {
      const array = [1, 2, 3];
      const result = chunk(array, 5);

      expect(result).toEqual([[1, 2, 3]]);
    });

    it('handles size of 1', () => {
      const array = [1, 2, 3];
      const result = chunk(array, 1);

      expect(result).toEqual([[1], [2], [3]]);
    });

    it('throws error for invalid size', () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow();
      expect(() => chunk([1, 2, 3], -1)).toThrow();
    });
  });
});