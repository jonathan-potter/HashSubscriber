'use strict';

import getHashParams from 'javascript/hashSubscriber';

const path ='http://someurl.com/this-text-shouldnt-matter';

describe('getHashParams', () => {
  describe('returns an empty object', () => {
    it('when no hash is in the url', () => {
      let url = path;
      expect(getHashParams(url)).toEqual({});
    });

    it('when an empty hash is in the url', () => {
      let urlHash = '';
      let url = [path, '#', urlHash].join('');
      expect(getHashParams(url)).toEqual({});
    });
  });

  describe('returns an object', () => {
    it('with a key pointing to true', () => {
      let urlHash = 'boolean';
      let url = [path, '#', urlHash].join('');
      expect(getHashParams(url)).toEqual({ 'boolean': true });
    });

    it('with a key and numerical value', () => {
      let urlHash = 'number=1.234';
      let url = [path, '#', urlHash].join('');
      expect(getHashParams(url)).toEqual({ 'number': 1.234 });
    });

    it('with a key and numerical value', () => {
      let urlHash = 'string=value';
      let url = [path, '#', urlHash].join('');
      expect(getHashParams(url)).toEqual({ 'string': 'value' });
    });

    it('with a variety of value types', () => {
      let urlHash = 'boolean&number=1.234&string=value';
      let url = [path, '#', urlHash].join('');
      expect(getHashParams(url)).toEqual({
        'boolean': true,
        'number': 1.234, 
        'string': 'value'
      });
    });
  });
});
