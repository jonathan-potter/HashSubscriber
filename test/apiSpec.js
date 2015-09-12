'use strict';

import HashSubscriber from 'javascript/api';

describe('HashSubscriber', () => {
  describe('ensureInitialization', () => {
    beforeEach(() => {
      spyOn(HashSubscriber, 'init');
    });

    it('calls init function when not initialized', () => {
      HashSubscriber.initialized = false;

      HashSubscriber.ensureInitialization();

      expect(HashSubscriber.init).toHaveBeenCalled();
    });

    it('calls init function when initialized', () => {
      HashSubscriber.initialized = true;

      HashSubscriber.ensureInitialization();

      expect(HashSubscriber.init).not.toHaveBeenCalled();
    });
  });
});
