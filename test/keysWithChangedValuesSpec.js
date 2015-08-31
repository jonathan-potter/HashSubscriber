'use strict';

import keysWithChangedValues from 'javascript/keysWithChangedValues';

let event;
describe('keysWithChangedValues', () => {
  describe('returns an empty array', () => {
    it('when both params objects are empty', () => {
      let oldParams = {};
      let newParams = {};

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual([]);
    });

    it('when boolean values have not changed', () => {
      let oldParams = { boolean: true };
      let newParams = { boolean: true };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual([]);
    });

    it('when numerical values values have not changed', () => {
      let oldParams = { number: 1.234 };
      let newParams = { number: 1.234 };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual([]);
    });

    it('when string values values have not changed', () => {
      let oldParams = { string: 'string' };
      let newParams = { string: 'string' };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual([]);
    });

    it('when NaN values values have not changed', () => {
      let oldParams = { NaN: NaN };
      let newParams = { NaN: NaN };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual([]);
    });
  });

  describe('identifies changes', () => {
    it('when boolean values have changed', () => {
      let oldParams = { boolean: true };
      let newParams = { boolean: false };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['boolean']);
    });

    it('when numerical values have changed', () => {
      let oldParams = { number: 1.234 };
      let newParams = { number: 2.345 };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['number']);
    });

    it('when string values have changed', () => {
      let oldParams = { string: 'string' };
      let newParams = { string: 'different string' };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['string']);
    });

    it('when NaN values have changed', () => {
      let oldParams = { NaN: NaN };
      let newParams = { NaN: 'not NaN' };

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['NaN']);
    });
  });

  describe('also identifies changes', () => {
    it('when one boolean value is missing', () => {
      let oldParams = { boolean: true };
      let newParams = {};

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['boolean']);
    });

    it('when one numerical value is missing', () => {
      let oldParams = { number: 1.234 };
      let newParams = {};

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['number']);
    });

    it('when one string value is missing', () => {
      let oldParams = { string: 'string' };
      let newParams = {};

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['string']);
    });

    it('when one NaN value is missing', () => {
      let oldParams = { NaN: NaN };
      let newParams = {};

      let changedKeys = keysWithChangedValues(oldParams, newParams);
      expect(changedKeys).toEqual(['NaN']);
    });
  });
});
